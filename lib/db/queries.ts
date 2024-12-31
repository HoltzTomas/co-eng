"use server"
import { eq, asc, inArray, sql } from 'drizzle-orm';
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

export async function getSubjects(userEmail: string) {
  const subjectsList = await db
    .select()
    .from(subjects)
    .where(eq(subjects.createdBy, userEmail));
  return subjectsList;
}

export async function getSubjectById(id: number) {
  const [subject] = await db
    .select()
    .from(subjects)
    .where(eq(subjects.id, id));
  return subject;
}

export async function getFilesById(ids: number[]) {
  const filesList = await db
    .select()
    .from(files)
    .where(inArray(files.id, ids));
  return filesList;
}

export async function getFilesBySubjectId(id: number) {
  const filesList = await db
    .select()
    .from(files)
    .where(eq(files.subjectId, id));
  return filesList;
}

export async function getFilesByUserEmail(userEmail: string) {
  const filesList = await db
    .select()
    .from(files)
    .where(eq(files.createdBy, userEmail));
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

export async function getChunksByFileId(id: number) {
  const chunksList = await db
    .select()
    .from(chunk)
    .where(eq(chunk.fileId, id))
    .orderBy(asc(chunk.chunkNumber));
  return chunksList;
}

export async function getRandomChunksByFileId(id: number, limit: number) {
  const chunksList = await db
    .select()
    .from(chunk)
    .where(eq(chunk.fileId, id))
    .orderBy(sql`RANDOM()`)
    .limit(limit);
  return chunksList;
}


export async function deleteFile(id: number) {
  await db
    .delete(files)
    .where(eq(files.id, id));
}

export async function deleteSubject(id: number) {
  await db
    .delete(subjects)
    .where(eq(subjects.id, id));
}

export async function deleteChunksByFileId(id: number) {
  await db
    .delete(chunk)
    .where(eq(chunk.fileId, id));
}
