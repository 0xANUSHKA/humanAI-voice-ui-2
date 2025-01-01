'use client'

import { useState } from 'react'
import { Phone, Lock } from 'lucide-react'
import { Button } from "/Users/anushkajogalekar/Downloads/legal-assistant 2/components/ui/button"
import { Input } from "/Users/anushkajogalekar/Downloads/legal-assistant 2/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "/Users/anushkajogalekar/Downloads/legal-assistant 2/components/ui/card"
import { mockVerifyCode } from "./actions"

export default function HomePage() {
  const [showVerification, setShowVerification] = useState(false)
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [adviceType, setAdviceType] = useState<'legal' | 'financial' | null>(null)

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      await mockVerifyCode(code.join(''))
      // Redirect to document upload page after verification
      window.location.href = '/upload'
    } catch (error) {
      setError('Verification failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const simulateCall = () => {
    setShowVerification(true)
    // In a real scenario, this would trigger the Twilio call and SMS
    // You can pass the adviceType to the Twilio service here
    console.log(`Simulating call for ${adviceType} advice`)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle className="text-4xl font-bold tracking-tight">
              Legal Document Assistant
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!adviceType ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">What type of advice do you need?</h2>
                <div className="space-y-4">
                  <Button onClick={() => setAdviceType('legal')} size="lg" className="w-full">
                    Legal Advice
                  </Button>
                  <Button onClick={() => setAdviceType('financial')} size="lg" className="w-full">
                    Financial Advice
                  </Button>
                </div>
              </div>
            ) : !showVerification ? (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Phone className="h-8 w-8 text-blue-600" />
                  <h2 className="text-2xl font-semibold">Call us to get started:</h2>
                </div>
                <p className="text-4xl font-bold text-blue-600">
                  1-800-LEGAL-AI
                </p>
                <p className="text-xl text-muted-foreground">
                  Get instant AI-powered legal document assistance through your phone
                </p>
                <Button onClick={simulateCall} size="lg" className="w-full">
                  Simulate Call
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Lock className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-semibold">Verify Your Phone</h2>
                </div>
                <p className="text-muted-foreground">
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
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button 
                    type="submit" 
                    className="w-full text-lg"
                    disabled={code.join('').length !== 6 || isLoading}
                  >
                    {isLoading ? "Verifying..." : "Verify Phone Number"}
                  </Button>
                </form>
              </div>
            )}
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-muted-foreground">
              By using this service, you agree to our Terms of Service and Privacy Policy.
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}

