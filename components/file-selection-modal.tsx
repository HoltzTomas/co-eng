import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { File } from '@/lib/db/types'

type FileSelectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onFilesSelect: (files: File[]) => void;
  files: File[]
}

export function FileSelectionModal({ isOpen, onClose, onFilesSelect, files }: FileSelectionModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const handleSelectFile = (file: File) => {
    setSelectedFiles(prev =>
      prev.some(f => f.id === file.id)
        ? prev.filter(f => f.id !== file.id)
        : [...prev, file]
    )
  }

  const handleConfirm = () => {
    onFilesSelect(selectedFiles)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Select Files</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          <div className="space-y-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted"
              >
                <Checkbox
                  id={`file-${file.id}`}
                  checked={selectedFiles.some(f => f.id === file.id)}
                  onCheckedChange={() => handleSelectFile(file)}
                />
                <label
                  htmlFor={`file-${file.id}`}
                  className="flex-grow cursor-pointer"
                >
                  <h3 className="font-medium">{file.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Size: {(file.size / (1024 * 1024)).toFixed(2)} MB | Created: {file.createdAt!.toLocaleDateString()}
                  </p>
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleConfirm} disabled={selectedFiles.length === 0}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

