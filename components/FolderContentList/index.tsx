import { File, Folder } from "@/lib/db/types"
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
import { FileRow } from './FileRow'
import { FolderRow } from './FolderRow'

function isFile(item: File | Folder): item is File {
  return (item as File).size !== undefined
}

export async function FolderContentList({ content }: { content: (File | Folder)[] }) {
  /*
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
  */

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
          {content.length === 0 &&
            <TableRow
              key={"emptyFiles"}
              className="cursor-pointer"
            >
              <TableCell className="flex items-center gap-2 font-medium">
                Ingrese material teorico para empezar a estudiar
              </TableCell>
            </TableRow>
          }
          {content.map((item) => (
            isFile(item)
              ? <FileRow key={item.id} file={item} />
              : <FolderRow key={item.id} folder={item} />
                
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

