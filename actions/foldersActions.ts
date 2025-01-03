"use server"
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { createFolder, deleteFolder } from "@/lib/db/queries"


export async function createFolderAction(name: string, parentId?: string) {
  const user = await currentUser();
  if (!user) return;

  const folder = {
    name: name,
    userId: user.id,
    parentId: parentId,
    createdBy: user.emailAddresses[0].emailAddress,
  }

  await createFolder(folder);

  revalidatePath("/dashboard")
}

export async function deleteFolderAction(id: string) {
  await deleteFolder(id);
  revalidatePath("/dashboard")
}
