import { ArrowLeft, File, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FileListProps {
  subject: string
  onBack: () => void
}

// Datos de ejemplo para los archivos
const mockFiles = [
  { id: 1, name: 'Apuntes_Clase_1.pdf', size: '2.5 MB' },
  { id: 2, name: 'Tarea_Semana_2.docx', size: '1.8 MB' },
  { id: 3, name: 'Presentación_Proyecto.pptx', size: '5.3 MB' },
]

export function FileList({ subject, onBack }: FileListProps) {
  const handleDelete = (fileId: number) => {
    // Aquí iría la lógica real para eliminar el archivo
    console.log(`Eliminando archivo con ID ${fileId}`)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center mb-4">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <h2 className="text-xl font-semibold">Archivos de {subject}</h2>
      </div>
      <ScrollArea className="flex-grow">
        <ul className="space-y-2">
          {mockFiles.map((file) => (
            <li key={file.id} className="flex items-center justify-between p-2 bg-white rounded-lg shadow">
              <div className="flex items-center">
                <File className="h-5 w-5 mr-2 text-blue-500" />
                <span>{file.name}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-4">{file.size}</span>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(file.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}

