'use client'

import { useState, useRef } from 'react'
import { Upload } from 'lucide-react'

import { uploadFile } from '@/actions/filesActions'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { File as FileInfo } from '@/lib/db/types'

export function UploadButton({ subjectId, userEmail }: { subjectId: string, userEmail: string }) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleUpload(file: File) {
    setIsUploading(true)

    const fileInfo: FileInfo = {
        name: file.name,
        size: file.size / (1024 * 1024), // Convert to MB
        subjectId: Number(subjectId),
        createdBy: userEmail
      }

    const formData = new FormData()
    formData.append("file", file)
    formData.append("fileInfo", JSON.stringify(fileInfo))

    try {
      await uploadFile(formData)
      toast({
        title: "Éxito",
        description: "Archivo subido correctamente.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear el archivo. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleUpload(file)
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <Button onClick={handleButtonClick} disabled={isUploading}>
        <Upload className="mr-2 h-4 w-4" />
        {isUploading ? 'Subiendo...' : 'Subir archivo'}
      </Button>
    </div>
  )
}