"use client"
import { Trash, MoreVertical, type LucideIcon } from 'lucide-react'

import { TableRow, TableCell } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


type RowProps = {
  Icon: LucideIcon
  id: string
  name: string
  size?: number
  createdAt?: Date
  createdBy?: string
  handleDoubleClick: () => void
  handleDelete: (id: string) => Promise<void>
}


export function Row({ Icon, id, name, size, createdAt, createdBy, handleDoubleClick, handleDelete }: RowProps) {
  return (
    <TableRow onDoubleClick={handleDoubleClick} className="cursor-pointer">

      <TableCell className="flex items-center gap-2 font-medium">
        <Icon />
        {name}
      </TableCell>

      <TableCell>{size && (size / (1024 * 1024)).toFixed(2) + "MB"}</TableCell>

      <TableCell>{createdAt?.toDateString()}</TableCell>

      <TableCell>{createdBy}</TableCell>

      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Abrir menú</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={async () => { await handleDelete(id) }}
            >
              <Trash className="mr-2 h-4 w-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>

    </TableRow>
  )
}
