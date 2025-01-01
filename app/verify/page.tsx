'use client'

import { Lock } from 'lucide-react'
import { useState } from "react"
import { Button } from "/Users/anushkajogalekar/Downloads/legal-assistant 2/components/ui/button"
import { Input } from "/Users/anushkajogalekar/Downloads/legal-assistant 2/components/ui/input"
import { verifyCode } from "../actions"

export default function VerifyPage() {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await verifyCode(code.join(''))
      // Redirect to document upload page after verification
      window.location.href = '/upload'
    } catch (error) {
      console.error('Verification failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-lg">
          <div className="mb-6 flex items-center gap-2">
            <Lock className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold">Verify Your Phone</h1>
          </div>

          <p className="mb-8 text-muted-foreground">
            Enter the verification code sent to your phone
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between gap-2">
              {code.map((digit, index) => (
                <Input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  className="h-12 w-12 text-center text-lg"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              ))}
            </div>

            <Button 
              type="submit" 
              className="w-full text-lg"
              disabled={code.join('').length !== 6 || isLoading}
            >
              {isLoading ? "Verifying..." : "Verify Phone Number"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Didn't receive the code?{' '}
            <Button 
              variant="link" 
              className="p-0 text-blue-600"
              onClick={() => {/* Add resend logic */}}
            >
              Resend Code
            </Button>
          </p>
        </div>
      </div>
    </main>
  )
}

