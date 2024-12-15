'use client'

import { useState } from 'react'
import LoginForm from '@/components/login-form'
import SignUpForm from '@/components/sign-up-form'
import ProductInfo from '@/components/product-info'

export default function Home() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center justify-center p-4">
      <main className="max-w-6xl w-full bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <ProductInfo />
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {showLogin ? 'Welcome Back' : 'Join Our Platform'}
            </h2>
            {showLogin ? <LoginForm /> : <SignUpForm />}
            <div className="mt-4 text-center">
              <button 
                onClick={() => setShowLogin(!showLogin)} 
                className="text-blue-600 hover:underline"
              >
                {showLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

