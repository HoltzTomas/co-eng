'use client'

import { useState, useRef } from 'react'
import { useUser } from '@clerk/nextjs'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

import { File as FileInfo } from "@/lib/db/types"
import { createFileAction } from '@/actions/filesActions'

interface FileUploadTabProps {
  folderId: string
  onSuccess: () => void
}

export function FileUploadTab({ folderId, onSuccess }: FileUploadTabProps) {
  const { user } = useUser();
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      if (!title) {
        setTitle(selectedFile.name)
      }
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)

    const fileInfo: FileInfo = {
      name: title || file.name,
      size: file.size,
      folderId: folderId,
      userId: user!.id,
      createdBy: user!.emailAddresses[0].emailAddress,
    }

    try {
      await createFileAction(file, fileInfo);
      toast({
        title: "Éxito",
        description: `Archivo "${title || file.name}" subido correctamente.`,
      })
      onSuccess()
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "No se pudo subir el archivo. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="file">File</Label>
        <Input
          id="file"
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter file title"
        />
      </div>
      <Button onClick={handleUpload} disabled={!file || isUploading}>
        {isUploading ? 'Uploading...' : 'Upload'}
      </Button>
    </div>
  )
}

