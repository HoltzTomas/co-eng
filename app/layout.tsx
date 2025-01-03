import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from "@vercel/analytics/react"
import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next/types';
import { Toaster } from '@/components/ui/toaster';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Notes Studio",
  description: "Potencia tus apuntes con herramientas de AI y beneficiate de compartirlos",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`${inter.className} bg-gradient-to-br from-gray-100 to-gray-200`}>
          {children}
          <Toaster />
          <Analytics/>
        </body>
      </ClerkProvider>
    </html>
  );
}

