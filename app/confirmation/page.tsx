import { CheckCircle, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "/Users/anushkajogalekar/Downloads/legal-assistant 2/components/ui/card"

export default function ConfirmationPage() {
  return (
    <main className="min-h-screen bg-background p-4">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-6 w-6" />
            Verification Complete
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-lg">Your document has been successfully uploaded and processed.</p>
            <p>Our AI is now ready to assist you with any questions about your document.</p>
            <div className="flex items-center justify-center text-blue-600">
              <ArrowRight className="h-5 w-5 mr-2" />
              <span>Continue your conversation on the phone</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

