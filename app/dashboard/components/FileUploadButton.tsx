"use client"

import { useState } from 'react'
import { Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const subjects = [
  { id: "1", name: "Matemáticas" },
  { id: "2", name: "Física" },
  { id: "3", name: "Química" },
  { id: "4", name: "Literatura" },
  { id: "5", name: "Historia" },
]

export function FileUploadButton() {
  const [file, setFile] = useState<File | null>(null)
  const [subject, setSubject] = useState<string>("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (file && subject) {
      // Aquí iría la lógica real de subida de archivos
      console.log(`Subiendo archivo ${file.name} para la materia ${subject}`)
      // Reiniciar el estado
      setFile(null)
      setSubject("")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Subir Archivo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Subir Archivo</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="text-right">
              Archivo
            </Label>
            <Input id="file" type="file" className="col-span-3" onChange={handleFileChange} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subject" className="text-right">
              Materia
            </Label>
            <Select onValueChange={setSubject} value={subject}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecciona una materia" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleUpload} disabled={!file || !subject}>
          Subir
        </Button>
      </DialogContent>
    </Dialog>
  )
}

