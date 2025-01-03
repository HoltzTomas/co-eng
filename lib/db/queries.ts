"use server"
import { eq, and, asc, sql, isNull } from 'drizzle-orm';
import { db } from './db';
import { folders, files, chunks } from './schema';
import { Folder, File, Chunk } from './types';

export async function createFolder(folder: Folder) {
  const [createdFolder] = await db
    .insert(folders)
    .values(folder)
    .returning();
  return createdFolder;
}

export async function getRootFolders(userId: string) {
  const foldersList = await db
    .select()
    .from(folders)
    .where(and(
      eq(folders.userId, userId),
      isNull(folders.parentId)
    ));
  return foldersList;
}

export async function getFolderWithContent(id: string) {
  // Fetch the main folder
  const folderResult = await db
    .select()
    .from(folders)
    .where(eq(folders.id, id));

  if (folderResult.length === 0) {
    return null;
  }
  const folder = folderResult[0];

  // Fetch all immediate subfolders
  const subfolderResults = await db
    .select()
    .from(folders)
    .where(eq(folders.parentId, id));

  // Fetch all files in this folder
  const fileResults = await db
    .select()
    .from(files)
    .where(eq(files.folderId, id));

  // Combine them
  return {
    id: folder.id,
    parentId: folder.parentId,
    name: folder.name,
    userId: folder.userId,
    createdAt: folder.createdAt,
    subfolders: subfolderResults.map(sf => ({
      id: sf.id,
      name: sf.name,
      parentId: sf.parentId,
      userId: sf.userId,
      createdAt: sf.createdAt,
    })),
    files: fileResults.map(f => ({
      id: f.id,
      name: f.name,
      size: f.size,
      userId: f.userId,
      folderId: f.folderId,
      createdBy: f.createdBy,
      createdAt: f.createdAt,
    })),
  };
}

export async function getFilesByFolderId(id: string) {
  const rows = await db.execute(sql`
    WITH RECURSIVE subfolders AS (
      SELECT id
      FROM "folders"
      WHERE id = ${id}
      UNION ALL
      SELECT f.id
      FROM "folders" f
      JOIN subfolders sf ON f."parentId" = sf.id
    )
    SELECT *
    FROM "files"
    WHERE "folderId" IN (SELECT id FROM subfolders)
  `);
 
  // Tuve que parsear la fecha de creación porque Drizzle no lo hace por defecto (se devuelve como string) atte: j
  const parsedRows = rows.map((row) => {
    return {
      ...row,
      createdAt: row.createdAt ? new Date(row.createdAt as string) : null,
    };
  });

  return parsedRows;
}

export async function createFileAndChunks(
  fileInfo: File,
  chunkedContent: Array<{ pageContent: string }>,
  embeddings: number[][]
) {
  return await db.transaction(async (tx) => {
    // Insert the file
    const [createdFile] = await tx
      .insert(files)
      .values(fileInfo)
      .returning();

    // Build chunk rows
    const chunkRows: Chunk[] = chunkedContent.map((chunk, index) => ({
      content: chunk.pageContent,
      embedding: embeddings[index],
      chunkNumber: index,
      fileId: createdFile.id,
    }));

    // Insert chunks if any
    if (chunkRows.length > 0) {
      await tx.insert(chunks).values(chunkRows);
    }

    return createdFile;
  });
}

export async function getChunksByFileId(id: string) {
  const chunksList = await db
    .select()
    .from(chunks)
    .where(eq(chunks.fileId, id))
    .orderBy(asc(chunks.chunkNumber));
  return chunksList;
}

export async function getRandomChunksByFileId(id: string, limit: number) {
  const chunksList = await db
    .select()
    .from(chunks)
    .where(eq(chunks.fileId, id))
    .orderBy(sql`RANDOM()`)
    .limit(limit);
  return chunksList;
}


export async function deleteFile(id: string) {
  await db.transaction(async (tx) => {
    // Delete all chunks belonging to this file
    await tx.delete(chunks).where(eq(chunks.fileId, id));

    // Delete the file
    await tx.delete(files).where(eq(files.id, id));
  });
}

export async function deleteFolder(id: string) {
  await db.transaction(async (tx) => {
    // Remove all chunks associated with files in this folder and its subfolders
    await tx.execute(sql`
      WITH RECURSIVE subfolders AS (
        SELECT id
        FROM "folders"
        WHERE id = ${id}
        UNION ALL
        SELECT f.id
        FROM "folders" f
        INNER JOIN subfolders sf ON f."parentId" = sf.id
      )
      DELETE FROM "chunks"
      WHERE "fileId" IN (
        SELECT id
        FROM "files"
        WHERE "folderId" IN (SELECT id FROM subfolders)
      );
    `);

    // Remove all files in this folder and its subfolders
    await tx.execute(sql`
      WITH RECURSIVE subfolders AS (
        SELECT id
        FROM "folders"
        WHERE id = ${id}
        UNION ALL
        SELECT f.id
        FROM "folders" f
        INNER JOIN subfolders sf ON f."parentId" = sf.id
      )
      DELETE FROM "files"
      WHERE "folderId" IN (SELECT id FROM subfolders);
    `);

    // Remove all folders (target folder + its subfolders)
    await tx.execute(sql`
      WITH RECURSIVE subfolders AS (
        SELECT id
        FROM "folders"
        WHERE id = ${id}
        UNION ALL
        SELECT f.id
        FROM "folders" f
        INNER JOIN subfolders sf ON f."parentId" = sf.id
      )
      DELETE FROM "folders"
      WHERE id IN (SELECT id FROM subfolders);
    `);
  });
}
