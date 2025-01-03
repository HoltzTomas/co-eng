'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

import { createFolderAction } from '@/actions/foldersActions'

interface FolderCreateTabProps {
  folderId: string
  onSuccess: () => void
}

export function FolderCreateTab({ folderId, onSuccess }: FolderCreateTabProps) {
  const [folderName, setFolderName] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const handleCreate = async () => {
    if (!folderName) return

    setIsCreating(true)

    await createFolderAction(folderName, folderId)

    setIsCreating(false)
    toast({
      title: "Success",
      description: `Folder "${folderName}" created successfully.`,
    })
    onSuccess()
  }

  return (
    <div className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="folderName">Folder Name</Label>
        <Input
          id="folderName"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Enter folder name"
        />
      </div>
      <Button onClick={handleCreate} disabled={!folderName || isCreating}>
        {isCreating ? 'Creating...' : 'Create Folder'}
      </Button>
    </div>
  )
}

