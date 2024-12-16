"use client"

import { useState } from 'react'
import { Brain, FileQuestion, Calculator, Upload, File, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter  } from 'next/navigation'

const subjects = [
  { id: "1", name: "Matemáticas" },
  { id: "2", name: "Física" },
  { id: "3", name: "Química" },
  { id: "4", name: "Literatura" },
  { id: "5", name: "Historia" },
]

// Datos de ejemplo para los archivos
const mockFiles = [
  { id: 1, name: 'Apuntes_Clase_1.pdf', size: '2.5 MB' },
  { id: 2, name: 'Tarea_Semana_2.docx', size: '1.8 MB' },
  { id: 3, name: 'Presentación_Proyecto.pptx', size: '5.3 MB' },
]

export function SubjectDashboard({ subjectId }: { subjectId: string }) {
  const subject = subjects.find(s => s.id === subjectId)
  const router = useRouter();
  const pathname = usePathname();
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Aquí iría la lógica real de subida de archivos
      console.log(`Subiendo archivo ${e.target.files[0].name} para ${subject?.name}`)
    }
  }

  const handleDelete = (fileId: number) => {
    // Aquí iría la lógica real para eliminar el archivo
    console.log(`Eliminando archivo con ID ${fileId}`)
  }

  if (!subject) {
    return <div>Materia no encontrada</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Dashboard de {subject.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card 
          className="bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => {}}
        >
          <CardHeader>
            <CardTitle className="flex items-center text-lg text-primary">
              <Brain className="mr-2 h-5 w-5" />
              Crear Quiz con IA
            </CardTitle>
            <CardDescription>Genera un cuestionario personalizado sobre {subject.name}</CardDescription>
          </CardHeader>
        </Card>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Card 
              className="bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => {}}
            >
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-primary">
                  <FileQuestion className="mr-2 h-5 w-5" />
                  Preguntar sobre PDF
                </CardTitle>
                <CardDescription>Haz preguntas sobre un PDF específico</CardDescription>
              </CardHeader>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Selecciona un PDF</DialogTitle>
            </DialogHeader>
            <Select onValueChange={(value) => {
              setSelectedPdf(value)
              setIsModalOpen(false)
            }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Elige un PDF" />
              </SelectTrigger>
              <SelectContent>
                {mockFiles.filter(file => file.name.endsWith('.pdf')).map((file) => (
                  <SelectItem key={file.id} value={file.name}>
                    {file.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </DialogContent>
        </Dialog>

        <Card 
          className="bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => { router.push(pathname + "/solve") }}
        >
          <CardHeader>
            <CardTitle className="flex items-center text-lg text-primary">
              <Calculator className="mr-2 h-5 w-5" />
              Resolver Ejercicios
            </CardTitle>
            <CardDescription>Obtén ayuda para resolver problemas de {subject.name}</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center text-lg text-primary">
            <File className="mr-2 h-5 w-5" />
            Archivos de {subject.name}
          </CardTitle>
          <CardDescription>Gestiona los archivos de esta materia</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              id={`file-upload-${subject.id}`}
            />
            <label htmlFor={`file-upload-${subject.id}`}>
              <Button className="w-full cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Subir Archivo
              </Button>
            </label>
          </div>
          <ScrollArea className="h-[200px]">
            <ul className="space-y-2">
              {mockFiles.map((file) => (
                <li key={file.id} className="flex items-center justify-between p-2 bg-secondary rounded-lg">
                  <div className="flex items-center">
                    <File className="h-5 w-5 mr-2 text-primary" />
                    <span>{file.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground mr-4">{file.size}</span>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(file.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

