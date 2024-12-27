'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola! Soy tu Asistente de Estudio IA. ¿En qué puedo ayudarte hoy?' },
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      setInput('')
      // Aquí iría la lógica para enviar el mensaje al backend y recibir la respuesta
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <header className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-md p-4">
        <h1 className="text-2xl font-bold text-gray-800">Asistente de Estudio IA</h1>
      </header>

      <ScrollArea className="flex-grow p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-2 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{message.role === 'user' ? 'U' : 'AI'}</AvatarFallback>
                </Avatar>
                <div className={`rounded-lg p-3 ${message.role === 'user' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg p-4">
        <div className="max-w-2xl mx-auto flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            className="flex-grow"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend} className="bg-gray-800 text-white hover:bg-gray-700">
            Enviar
          </Button>
        </div>
      </div>
    </div>
  )
}

