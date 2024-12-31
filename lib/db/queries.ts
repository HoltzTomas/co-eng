"use server"
import { eq, asc } from 'drizzle-orm';
import { db } from './db';
import { subjects, files, chunk } from './schema';
import { Subject, File, Chunk } from './types';

export async function createSubject(subject: Subject) {
  const [createdSubject] = await db
    .insert(subjects)
    .values(subject)
    .returning();
  return createdSubject;
}

export async function getSubjects(userId: string) {
  const subjectsList = await db
    .select()
    .from(subjects)
    .where(eq(subjects.userId, userId));
  return subjectsList;
}

export async function getSubjectById(id: string) {
  const [subject] = await db
    .select()
    .from(subjects)
    .where(eq(subjects.id, id));
  return subject;
}

export async function getSubjectWithFiles(id: string) {
  const result = await db
    .select({
      subject: subjects,
      file: files,
    })
    .from(subjects)
    .leftJoin(files, eq(files.subjectId, subjects.id))
    .where(eq(subjects.id, id));

  if (result.length === 0) {
    return null;
  }

  const subjectWithFiles = {
    id: result[0].subject.id,
    name: result[0].subject.name,
    userId: result[0].subject.userId,
    createdAt: result[0].subject.createdAt,
    files: result
      .map(row => row.file)
      .filter(file => file !== null)
      .map(file => ({
        id: file.id,
        name: file.name,
        size: file.size,
        userId: file.userId,
        subjectId: file.subjectId,
        createdBy: file.createdBy,
        createdAt: file.createdAt,
      })),
  };

  return subjectWithFiles;
}

export async function getFilesBySubjectId(id: string) {
  const filesList = await db
    .select()
    .from(files)
    .where(eq(files.subjectId, id));
  return filesList;
}

export async function getFilesByUserId(userId: string) {
  const filesList = await db
    .select()
    .from(files)
    .where(eq(files.userId, userId));
  return filesList;
}

export async function createFile(file: File) {
  const [createdFile] = await db
    .insert(files)
    .values(file)
    .returning();
  return createdFile;
}

export async function insertChunks(chunks: Chunk[]) {
  const [createdChunks] = await db
    .insert(chunk)
    .values(chunks)
    .returning();
  return createdChunks;
}

export async function getChunksByFileId(id: string) {
  const chunksList = await db
    .select()
    .from(chunk)
    .where(eq(chunk.fileId, id))
    .orderBy(asc(chunk.chunkNumber));
  return chunksList;
}


export async function deleteFile(id: string) {
  await db
    .delete(files)
    .where(eq(files.id, id));
}

export async function deleteSubject(id: string) {
  await db
    .delete(subjects)
    .where(eq(subjects.id, id));
}

export async function deleteChunksByFileId(id: string) {
  await db
    .delete(chunk)
    .where(eq(chunk.fileId, id));
}
