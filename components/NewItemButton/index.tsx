'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { FileUploadTab } from './FileUploadTab'
import { FolderCreateTab } from './FolderCreateTab'
// import { YouTubeLinkTab } from './YouTubeLinkTab'

export function NewItemButton({ folderId }: { folderId: string }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Nuevo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Item</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="file" className="w-full">
        {/* <TabsList className="grid w-full grid-cols-3"> */}
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">File</TabsTrigger>
            <TabsTrigger value="folder">Folder</TabsTrigger>
            {/* <TabsTrigger value="youtube">YouTube</TabsTrigger> */}
          </TabsList>
          <TabsContent value="file">
            <FileUploadTab
              folderId={folderId}
              onSuccess={() => setOpen(false)}
            />
          </TabsContent>
          <TabsContent value="folder">
            <FolderCreateTab
              folderId={folderId}
              onSuccess={() => setOpen(false)}
            />
          </TabsContent>
          {/*
          <TabsContent value="youtube">
            <YouTubeLinkTab onSuccess={() => setOpen(false)} />
          </TabsContent>
          */}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

