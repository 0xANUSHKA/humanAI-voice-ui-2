'use server'

import OpenAI from 'openai'
import twilio from 'twilio'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export async function mockVerifyCode(code: string) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return code === '123456'
}

export async function verifyCode(phoneNumber: string, code: string) {
  try {
    const verification = await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
      .verificationChecks.create({ to: phoneNumber, code })
    return verification.status === 'approved'
  } catch (error) {
    console.error('Twilio verification error:', error)
    return false
  }
}

export async function sendVerificationCode(phoneNumber: string) {
  try {
    await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
      .verifications.create({ to: phoneNumber, channel: 'sms' })
    return true
  } catch (error) {
    console.error('Twilio send verification error:', error)
    return false
  }
}

export async function initiateCall(phoneNumber: string, adviceType: string) {
  try {
    const call = await twilioClient.calls.create({
      url: new URL(`/api/twilio/voice?adviceType=${adviceType}`, process.env.VERCEL_URL).toString(),
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
    })
    console.log(`Call initiated with SID: ${call.sid}`)
    return true
  } catch (error) {
    console.error('Twilio call initiation error:', error)
    return false
  }
}

export async function uploadDocument(formData: FormData) {
  const file = formData.get('document') as File
  if (!file) {
    throw new Error('No file provided')
  }
  

  return {
    success: true,
    message: 'Document processed successfully'
  }
}

//basic implementation of returning ai response based on document
export async function getAIResponse(userQuery: string, adviceType: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a ${adviceType} document assistant. Answer questions based on the previously uploaded document.`,
        },
        {
          role: "user",
          content: userQuery,
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    return completion.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "I apologize, but I encountered an error while processing your request. Please try again later.";
  }
}

export async function sendSMS(phoneNumber: string, message: string) {
  try {
    const sms = await twilioClient.messages.create({
      body: message,
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
    })
    console.log(`SMS sent with SID: ${sms.sid}`)
    return true
  } catch (error) {
    console.error('Twilio SMS error:', error)
    return false
  }
}

