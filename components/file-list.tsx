"use client"

import { useState } from "react"
import { FileText, FileSpreadsheet, FileIcon, MoreVertical, Trash, Upload, ChevronUp, ChevronDown } from 'lucide-react'
import Image from "next/image"

import { File, SortField, SortOrder } from "@/types/file"
import { Button } from "@/components/ui/button"
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

export function FileList({ initialFiles } : { initialFiles: File[] }) {
  const [files, setFiles] = useState<File[]>(initialFiles)
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")

  const getFileIcon = (type: File["type"]) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />
      case "sheet":
        return <FileSpreadsheet className="h-5 w-5 text-green-500" />
      default:
        return <FileIcon className="h-5 w-5 text-blue-500" />
    }
  }

  const handleDoubleClick = (file: File) => {
    console.log("Opening file:", file.name)
    // Implementation would go here
  }

  const handleDelete = (file: File) => {
    console.log("Deleting file:", file.name)
    // Implementation would go here
  }

  const handleUpload = () => {
    console.log("Uploading file")
    // Implementation would go here
  }

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }

    const sortedFiles = [...files].sort((a, b) => {
      if (a[field] < b[field]) return sortOrder === "asc" ? -1 : 1
      if (a[field] > b[field]) return sortOrder === "asc" ? 1 : -1
      return 0
    })

    setFiles(sortedFiles)
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    return (
      <span className="inline-flex w-4 ml-1">
        {sortField === field && (sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
      </span>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Mis archivos</h2>
        <Button onClick={handleUpload}>
          <Upload className="mr-2 h-4 w-4" />
          Subir archivo
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                <div className="flex items-center">
                  Nombre
                  <SortIcon field="name" />
                </div>
              </TableHead>
              <TableHead>Tamaño</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("lastOpened")}>
                <div className="flex items-center">
                  Última apertura
                  <SortIcon field="lastOpened" />
                </div>
              </TableHead>
              <TableHead>Propietario</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow
                key={file.id}
                onDoubleClick={() => handleDoubleClick(file)}
                className="cursor-pointer"
              >
                <TableCell className="flex items-center gap-2 font-medium">
                  {getFileIcon(file.type)}
                  {file.name}
                </TableCell>
                <TableCell>{file.size}</TableCell>
                <TableCell>{file.lastOpened}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {/*
                    REMOVED OWNER IMAGE
                    <Image
                      src={file.owner.avatar}
                      alt={file.owner.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    */}
                    {file.owner.name}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
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
    </div>
  )
}

