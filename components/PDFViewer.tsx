'use client'

import "react-pdf/dist/esm/Page/TextLayer.css"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"

import React from 'react'
import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useFileViewer } from '@/hooks/use-fileviewer'
import { toast } from '@/hooks/use-toast'
import { OnItemClickArgs } from "react-pdf/dist/esm/shared/types.js"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

export const PDFViewer: React.FC = () => {
  const { file, close } = useFileViewer()
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)

  if (!file || !file.name.endsWith("pdf")) return <></>;
  
  const fileURL = "https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK";

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setPageNumber(1)
  }

  const onDocumentError = (error: Error) => {
    toast({
        title: "Error",
        description: "No se pudo abrir el archivo. Por favor, intente de nuevo.",
        variant: "destructive",
    })
    close()
  }

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      close()
    }
  }

  const onItemClick = (item: OnItemClickArgs) => {
    if (item.dest) {
      setPageNumber(item.pageIndex + 1)
    }
  }

  return (
    <Dialog open={!!file} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>PDF Viewer</DialogTitle>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-auto">
          {fileURL && (
            <Document className="flex justify-center" file={fileURL} onItemClick={onItemClick} onLoadSuccess={onDocumentLoadSuccess} onLoadError={onDocumentError}>
              <Page pageNumber={pageNumber} />
            </Document>
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
          >
            Previous
          </Button>
          <span>
            Page {pageNumber} of {numPages}
          </span>
          <Button
            onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages || 1))}
            disabled={pageNumber >= (numPages || 1)}
          >
            Next
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
