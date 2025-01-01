'use client'

import { Upload, Phone } from 'lucide-react'
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { uploadDocument } from "../actions"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('document', file)
      await uploadDocument(formData)
      setIsUploading(false)
      setIsProcessing(true)
      // Simulate LLM processing time
      setTimeout(() => {
        router.push('/confirmation')
      }, 5000) // 5 seconds delay to simulate processing
    } catch (error) {
      console.error('Upload failed:', error)
      setIsUploading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background p-4">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-6 w-6" />
            Upload Your Document
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isProcessing ? (
            <div className="text-center">
              <p className="mb-4">Processing your document...</p>
              <div className="animate-pulse flex items-center justify-center">
                <Phone className="h-8 w-8 text-blue-600" />
                <span className="ml-2">Stay on the line</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="rounded-lg border-2 border-dashed p-8 text-center">
                <input
                  type="file"
                  id="document"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                />
                <label
                  htmlFor="document"
                  className="block cursor-pointer text-muted-foreground"
                >
                  {file ? (
                    <span className="text-foreground">{file.name}</span>
                  ) : (
                    <>
                      <span className="mb-2 block">
                        Drag and drop your document here, or click to select
                      </span>
                      <span className="text-sm">
                        Supports PDF, DOC, and DOCX files
                      </span>
                    </>
                  )}
                </label>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={!file || isUploading}
              >
                {isUploading ? "Uploading..." : "Upload Document"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  )
}

