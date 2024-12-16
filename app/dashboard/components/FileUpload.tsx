"use client"

import { useState, useRef } from 'react'
import { toast } from "@/components/ui/use-toast"

interface FileUploadProps {
  children: React.ReactNode
  subjectId: number
}

export function FileUpload({ children, subjectId }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    // Aquí iría la lógica real de subida de archivos
    // Por ahora, simularemos una subida con un timeout
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsUploading(false)
    toast({
      title: "Archivo subido",
      description: `El archivo ${file.name} ha sido subido para la materia ${subjectId}.`,
    })

    // Limpiar el input de archivo
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div>
      <input
        type="file"
        className="hidden"
        onChange={handleUpload}
        ref={fileInputRef}
        disabled={isUploading}
      />
      <div onClick={() => fileInputRef.current?.click()}>
        {children}
      </div>
    </div>
  )
}

