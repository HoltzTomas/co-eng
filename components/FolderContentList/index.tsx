import { File, Folder } from "@/lib/db/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { FileRow } from './FileRow'
import { FolderRow } from './FolderRow'

export async function FolderContentList({ folders, files }: { folders: Folder[], files: File[] }) {

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

          {(files.length === 0 && folders.length === 0) &&
            <TableRow key={"emptyFiles"} className="cursor-pointer">
              <TableCell className="flex items-center gap-2 font-medium">
                Ingrese material teorico para empezar a estudiar
              </TableCell>
            </TableRow>
          }

          {folders.map((folder) => <FolderRow key={folder.id} folder={folder} />)}

          {files.map((file) => <FileRow key={file.id} file={file} />)}

        </TableBody>
      </Table>
    </div>
  )
}

