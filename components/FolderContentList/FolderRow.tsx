"use client"

import { Folder } from 'lucide-react'
import { redirect } from 'next/navigation'

import { toast } from '@/hooks/use-toast'

import { Row } from './Row'
import { Folder as FolderType } from '@/lib/db/types'
import { deleteFolderAction } from '@/actions/foldersActions'

export function FolderRow({ folder }: { folder: FolderType }) {
  const handleDelete = async (id: string) => {
    try {
      await deleteFolderAction(id);
      toast({
        title: "Éxito",
        description: "Carpeta eliminada correctamente.",
      })
    } catch (error) {
      console.error("Error deleting folder:", error)
      toast({
        title: "Error",
        description: "No se pudo eliminar la carpeta. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    }
  }

  return (
    <Row
      Icon={Folder}
      id={folder.id!}
      name={folder.name}
      handleDoubleClick={() => redirect(`/dashboard/${folder.id}`)}
      handleDelete={handleDelete}
    />
  )
}
