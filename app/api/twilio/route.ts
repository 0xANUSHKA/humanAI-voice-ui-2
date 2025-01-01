import { headers } from 'next/headers'
import { getAIResponse } from '../../actions'

export async function POST(req: Request) {
  // Verify the request is from Twilio
  const headersList = headers()
  const twilioSignature = headersList.get('x-twilio-signature')
  
  // Add your Twilio signature verification here
  
  const formData = await req.formData()
  const userInput = formData.get('SpeechResult')
  const adviceType = formData.get('AdviceType') // Get the advice type from the request
  
  if (userInput) {
    const aiResponse = await getAIResponse(userInput as string, adviceType as string)
    
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
      <Response>
        <Say>${aiResponse}</Say>
        <Gather input="speech" action="/api/twilio" method="POST">
          <Say>Do you have any more questions about your document?</Say>
        </Gather>
      </Response>`,
      {
        headers: {
          'Content-Type': 'application/xml',
        },
      }
    )
  }
  
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Say>I'm sorry, I didn't catch that. Could you please repeat your question?</Say>
      <Gather input="speech" action="/api/twilio" method="POST" />
    </Response>`,
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    }
  )
}

