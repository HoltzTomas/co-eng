'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

interface YouTubeLinkTabProps {
  onSuccess: () => void
}

export function YouTubeLinkTab({ onSuccess }: YouTubeLinkTabProps) {
  const [youtubeLink, setYoutubeLink] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async () => {
    if (!youtubeLink) return

    setIsUploading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1800))

    setIsUploading(false)
    toast({
      title: "Success",
      description: `YouTube link "${youtubeLink}" uploaded successfully.`,
    })
    onSuccess()
  }

  return (
    <div className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="youtubeLink">YouTube Link</Label>
        <Input
          id="youtubeLink"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          placeholder="Enter YouTube link"
        />
      </div>
      <Button onClick={handleUpload} disabled={!youtubeLink || isUploading}>
        {isUploading ? 'Uploading...' : 'Upload Link'}
      </Button>
    </div>
  )
}

