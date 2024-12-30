"use client"
import { useOptimistic, useState } from "react"
import { FileText, MoreVertical, Trash, ChevronUp, ChevronDown } from 'lucide-react'

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

export function FileList({ initialFiles }: { initialFiles: File[] }) {
  const [optimisticFiles, addOptimisticFile] = useOptimistic(initialFiles, (state, newFile: File) => [newFile, ...state])

  const handleDoubleClick = (file: File) => {
    console.log("Opening file:", file.name)
    // Implementation would go here
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
          {optimisticFiles.map((file) => (
            <TableRow
              key={file.id}
              onDoubleClick={() => handleDoubleClick(file)}
              className="cursor-pointer"
            >
              <TableCell className="flex items-center gap-2 font-medium">
                <FileText className="h-5 w-5 text-red-500" />
                {file.name}
              </TableCell>
              <TableCell>{file.size.toPrecision(2)}MB</TableCell>
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
                      onClick={() => handleDelete(file)}
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

