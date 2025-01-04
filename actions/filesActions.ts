"use server"

import pdfParse from "pdf-parse"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { google } from "@ai-sdk/google"
import { embedMany } from "ai"
import { revalidatePath } from "next/cache";

import { deleteFile, createFileAndChunks } from "@/lib/db/queries"
import { File as FileInfo } from "@/lib/db/types"


export async function createFileAction(file: File, fileInfo: FileInfo) {
  const pdfBuffer = Buffer.from(await file.arrayBuffer());
  const pdfContent = (await pdfParse(pdfBuffer)).text;

  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 })

  const chunkedContent = await textSplitter.createDocuments([pdfContent]);

  const { embeddings } = await embedMany({
    model: google.textEmbeddingModel("text-embedding-004"),
    values: chunkedContent.map((chunk) => chunk.pageContent),
  })

  await createFileAndChunks(fileInfo, chunkedContent, embeddings);

  revalidatePath("/dashboard")
}

export async function deleteFileAction(id: string) {
  await deleteFile(id);
  revalidatePath("/dashboard")
}
