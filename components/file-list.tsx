"use client"
import { FileText, MoreVertical, Trash } from 'lucide-react'

import { File } from "@/lib/db/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { deleteFile } from "@/actions/filesActions"
import { useState } from 'react'
import clsx from 'clsx'
import { fileViewer } from '@/hooks/use-fileviewer'

export function FileList({ files }: { files: File[] }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleClick = (file: File) => {
    setSelectedFile(file);
  }

  const handleDoubleClick = (file: File) => {
    fileViewer(file);
  }

  const handleDelete = async (file: File) => {
    try {
      await deleteFile(file.id!);
      toast({
        title: "Éxito",
        description: "Archivo eliminado correctamente.",
      })
    } catch (error) {
      console.error("Error deleting file:", error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el archivo. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Tamaño</TableHead>
            <TableHead>Creado</TableHead>
            <TableHead>Propietario</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.length === 0 &&
            <TableRow
              key={"emptyFiles"}
              className="cursor-pointer"
            >
              <TableCell className="flex items-center gap-2 font-medium">
                Ingrese material teorico para empezar a estudiar
              </TableCell>
            </TableRow>
          }
          {files.map((file) => (
            <TableRow
              key={file.id}
              onDoubleClick={() => handleDoubleClick(file)}
              onClick={() => handleClick(file)}
              className={clsx(
                "cursor-pointer hover:bg-gray-200", {
                "bg-gray-200": selectedFile?.id === file.id
              })}
            >
              <TableCell>
                <div className="flex items-center gap-2 font-medium">
                  <FileText className="h-5 w-5 text-red-500" />
                  {file.name}
                </div>
              </TableCell>
              <TableCell>{(file.size / (1024 * 1024)).toFixed(2)}MB</TableCell>
              <TableCell>{file.createdAt?.toDateString() || "--/--/----"}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {file.createdBy}
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Abrir menú</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={async () => await handleDelete(file)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

