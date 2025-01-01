# Legal and Financial Document Assistant

## Project Overview

This project is an AI-powered document assistant that provides legal and financial advice based on uploaded documents. It uses a combination of web interfaces and phone interactions through Twilio to offer a seamless user experience.

## Application Flow

1. **Advice Type Selection**: Users choose between legal or financial advice.
2. **Phone Call Simulation**: Users initiate a simulated call to the service.
3. **Phone Verification**: A code is sent to the user's phone for verification.
4. **Document Upload**: Users upload their document for AI processing.
5. **AI Interaction**: Users interact with the AI through phone calls to get advice on their document.

## Key Components

### 1. Home Page (`app/page.tsx`)
- Handles advice type selection
- Initiates the call simulation
- Manages phone verification process

### 2. Upload Page (`app/upload/page.tsx`)
- Allows users to upload their documents
- Simulates document processing

### 3. Confirmation Page (`app/confirmation/page.tsx`)
- Confirms successful document processing
- Instructs users to continue the conversation on the phone

### 4. Twilio API Route (`app/api/twilio/route.ts`)
- Handles incoming Twilio webhook requests
- Processes user speech input
- Generates AI responses

### 5. Server Actions (`app/actions.ts`)
- Contains server-side logic for verification, document upload, and AI responses

## Changes Needed for Real Twilio Integration

1. **Twilio SDK Integration**:
   - Install the Twilio SDK: `npm install twilio`
   - Set up Twilio credentials in environment variables

2. **Phone Call Initiation**:
   - Replace the `simulateCall` function in `app/page.tsx` with actual Twilio call initiation
   - Use Twilio's API to start a call to the user's phone number

3. **Verification Process**:
   - Implement real SMS verification using Twilio's Verify API
   - Replace `mockVerifyCode` in `app/actions.ts` with actual Twilio verification

4. **Twilio Webhook Security**:
   - Implement proper Twilio signature verification in `app/api/twilio/route.ts`
   - Use Twilio's security best practices to ensure request authenticity

5. **Voice Response Handling**:
   - Enhance the Twilio route to handle different stages of the call flow
   - Implement proper error handling and fallback options

6. **Document Processing**:
   - Replace the simulated document processing in `uploadDocument` function with actual document parsing and AI training

7. **AI Integration**:
   - Enhance the `getAIResponse` function to use a real AI model trained on the uploaded document
   - Implement proper context management to maintain conversation history

8. **Queue Management**:
   - Set up separate Twilio queues for legal and financial advice
   - Modify the call flow to route users to the appropriate queue based on their selection

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:

