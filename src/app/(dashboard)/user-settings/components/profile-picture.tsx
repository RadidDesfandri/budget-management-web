"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/src/components/ui/card"
import { useMe } from "@/src/hooks/use-me"
import { getInitialUsername } from "@/src/lib/utils"
import { useChangeAvatar, useRemoveAvatar } from "../user-setting.api"
import { useRef } from "react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/src/components/ui/alert-dialog"

function ProfilePicture() {
  const { data } = useMe()
  const changeAvatarMutation = useChangeAvatar()
  const removeAvatarMutation = useRemoveAvatar()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File) => {
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"]
    const maxSize = 2 * 1024 * 1024 // 2MB

    if (!validTypes.includes(file.type)) {
      return "Files must be in PNG, JPG, or GIF format"
    }

    if (file.size > maxSize) {
      return "Maximum file size 2MB"
    }

    return null
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    const validationError = validateFile(file)

    if (validationError) {
      toast.error(validationError)
      return
    }

    const formData = new FormData()
    formData.append("avatar", file)

    changeAvatarMutation.mutate(formData)

    // Reset input agar bisa upload file yang sama lagi
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = () => {
    if (!data?.data?.full_avatar_url) {
      toast.error("No profile picture to delete")
      return
    }

    removeAvatarMutation.mutate()
  }

  return (
    <Card>
      <CardContent className="flex items-center gap-7">
        <Avatar size="extraLarge">
          <AvatarImage src={data?.data?.full_avatar_url ?? ""} />
          <AvatarFallback>{getInitialUsername(data?.data?.name ?? "")}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl font-bold">Profile Picture</CardTitle>
          <CardDescription>PNG, JPG, or GIF. Max size of 2MB</CardDescription>
          <div className="mt-3 space-x-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/gif"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button onClick={handleUploadClick} disabled={changeAvatarMutation.isPending}>
              {changeAvatarMutation.isPending ? "Uploading..." : "Upload New Photo"}
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-destructive"
                  disabled={removeAvatarMutation.isPending || !data?.data?.avatar_url}
                >
                  {removeAvatarMutation.isPending ? "Removing..." : "Remove"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete your profile picture?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your profile picture
                    from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleRemove}
                    disabled={removeAvatarMutation.isPending || !data?.data?.avatar_url}
                  >
                    {removeAvatarMutation.isPending ? "Removing..." : "Remove"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfilePicture
