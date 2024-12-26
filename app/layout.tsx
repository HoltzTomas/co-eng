import { ClerkProvider } from '@clerk/nextjs';
import './globals.css'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Study Companion',
  description: 'Empower your learning with AI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-gradient-to-br from-gray-100 to-gray-200`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
