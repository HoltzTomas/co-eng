"use client"

import { File } from 'lucide-react'

import { toast } from '@/hooks/use-toast'

import { Row } from './Row'
import { File as FileType } from '@/lib/db/types'
import { deleteFileAction } from '@/actions/filesActions'

export function FileRow({ file }: { file: FileType }) {
  const handleDelete = async (id: string) => {
    try {
      await deleteFileAction(id);
      toast({
        title: "Éxito",
        description: "Archivo eliminado correctamente.",
      })
    } catch (error) {
      console.error("Error deleting folder:", error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el archivo. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    }
  }

  return (
    <Row
      Icon={File}
      id={file.id!}
      name={file.name}
      size={file.size}
      createdAt={file.createdAt}
      createdBy={file.createdBy}
      handleDoubleClick={() => {/* TODO: open file */}}
      handleDelete={handleDelete}
    />
  )
}
