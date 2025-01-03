'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'

interface PDFViewerContextType {
  openPDF: (url: string) => void
  closePDF: () => void
  isOpen: boolean
  pdfUrl: string | null
}

const PDFViewerContext = createContext<PDFViewerContextType | undefined>(undefined)

export const usePDFViewer = () => {
  const context = useContext(PDFViewerContext)
  if (!context) {
    throw new Error('usePDFViewer must be used within a PDFViewerProvider')
  }
  return context
}

export const PDFViewerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  const openPDF = (url: string) => {
    setPdfUrl(url)
    setIsOpen(true)
  }

  const closePDF = () => {
    setIsOpen(false)
    setPdfUrl(null)
  }

  return (
    <PDFViewerContext.Provider value={{ openPDF, closePDF, isOpen, pdfUrl }}>
      {children}
    </PDFViewerContext.Provider>
  )
}