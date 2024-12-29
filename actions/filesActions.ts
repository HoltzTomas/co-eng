"use server"

import pdfParse from "pdf-parse"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { google } from "@ai-sdk/google"
import { embedMany } from "ai"

import { createFile, insertChunks, deleteFile as deleteFileDB } from "@/lib/db/queries"
import { File as FileInfo, Chunk } from "@/lib/db/types"
import { revalidatePath } from "next/cache";

//export async function uploadFile(fileInfo: FileInfo, file: File) {
export async function uploadFile(data: FormData) {
    const file = data.get("file") as File;
    const fileInfoStr = data.get("fileInfo") as string;
    if (!file || !fileInfoStr)  return;
    const fileInfo: FileInfo = JSON.parse(fileInfoStr);

    const pdfBuffer = Buffer.from(await file.arrayBuffer());
    const pdfContent = (await pdfParse(pdfBuffer)).text;

    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 })

    const chunkedContent = await textSplitter.createDocuments([pdfContent]);

    const { embeddings } = await embedMany({
        model: google.textEmbeddingModel("text-embedding-004"),
        values: chunkedContent.map((chunk) => chunk.pageContent),
    })

    const createdFile = await createFile(fileInfo);

    const chunks: Chunk[] = chunkedContent.map((chunk, index) => ({
        content: chunk.pageContent,
        embedding: embeddings[index],
        chunkNumber: index,
        fileId: createdFile.id
    }))

    if (chunks.length > 0) {
        await insertChunks(chunks);
    }
    revalidatePath("/dashboard")
}

export async function deleteFile(id: number) {
    await deleteFileDB(id);
    revalidatePath("/dashboard")
}
