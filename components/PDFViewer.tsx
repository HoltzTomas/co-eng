'use client'

import React from 'react'
import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { usePDFViewer } from '../contexts/PDFViewerContext'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

export const PDFViewer: React.FC = () => {
  const { isOpen, closePDF, pdfUrl } = usePDFViewer()
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setPageNumber(1)
  }

  return (
    <Dialog open={isOpen} onOpenChange={closePDF}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>PDF Viewer</DialogTitle>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-auto">
          {pdfUrl && (
            <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
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
