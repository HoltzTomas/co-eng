"use client"
import { redirect, usePathname } from 'next/navigation'
import { Brain, FileQuestion, Calculator } from 'lucide-react'

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Folder } from "@/lib/db/types"

export function DashboardOptions({ folder }: { folder: Folder }) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">{folder.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          className="bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => {
            if (!folder) return;
            redirect(pathname + "/generate-quiz");
          }}
        > 
          <CardHeader>
            <CardTitle className="flex items-center text-lg text-primary">
              <Brain className="mr-2 h-5 w-5" />
              Crear Quiz
            </CardTitle>
            <CardDescription>Genera un cuestionario personalizado sobre {folder.name}</CardDescription>
          </CardHeader>
        </Card>

        <Card
          className="bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => {
            redirect(pathname + "/ask-documents");
          }}
        >
          <CardHeader>
            <CardTitle className="flex items-center text-lg text-primary">
              <FileQuestion className="mr-2 h-5 w-5" />
              Preguntar sobre PDF
            </CardTitle>
            <CardDescription>Haz preguntas sobre un PDF específico</CardDescription>
          </CardHeader>
        </Card>

        <Card
          className="bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        >
          <CardHeader>
            <CardTitle className="flex items-center text-lg text-primary">
              <Calculator className="mr-2 h-5 w-5" />
              Resolver Ejercicios
            </CardTitle>
            <CardDescription>Obtén ayuda para resolver problemas de {folder.name}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
