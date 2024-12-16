'use client'

import { Brain, FileQuestion, Calculator } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const mockFiles = [
  { id: 1, name: 'Apuntes_Clase_1.pdf', subject: "Literatura", size: '2.5 MB' },
  { id: 2, name: 'Tarea_Semana_2.docx', subject: "Física", size: '1.8 MB' },
  { id: 3, name: 'Presentación_Proyecto.pptx', subject: "Matemáticas", size: '5.3 MB' },
]

export function DashboardOptions() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
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
          <CardDescription>Genera cuestionarios personalizados con inteligencia artificial</CardDescription>
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
          onClick={() => {}}
        >
        <CardHeader>
            <CardTitle className="flex items-center text-lg text-primary">
              <Calculator className="mr-2 h-5 w-5" />
              Resolver Ejercicios
            </CardTitle>
          <CardDescription>Obtén ayuda para resolver problemas y ejercicios</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

