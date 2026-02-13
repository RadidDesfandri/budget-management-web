"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/src/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { IoClose } from "react-icons/io5"
import { MdAddAPhoto } from "react-icons/md"
import { createOrganizationSchema } from "../preparation.schema"
import { OrganizationData } from "../preparation.type"
import { useCreateOrganization } from "../preparation.api"

function PreparationNewForm() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const { mutate, isPending } = useCreateOrganization()

  const form = useForm<OrganizationData>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: "",
      logo: null
    }
  })

  const onSubmit = (values: OrganizationData) => {
    mutate(values, {
      onSuccess: () => {
        form.reset()
        setLogoPreview(null)
      },
      onError: (error) => {
        if (!error.fieldErrors) return

        Object.entries(error.fieldErrors).forEach(([key, message]) => {
          form.setError(key as keyof OrganizationData, {
            type: "server",
            message
          })
        })
      }
    })
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue("logo", file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    form.setValue("logo", null)
    setLogoPreview(null)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full">
          Create New
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle>Create your organization</DialogTitle>
          <DialogDescription>
            Set up your workspace to start managing your team expenses.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-10">
              <FormField
                control={form.control}
                name="logo"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel className="flex justify-center">
                      Organization Logo (Optional)
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="relative">
                          <Avatar
                            className="h-24 w-24 cursor-pointer"
                            onClick={() => document.getElementById("logo-upload")?.click()}
                          >
                            <AvatarImage src={logoPreview || ""} />
                            <AvatarFallback className="bg-muted flex flex-col items-center justify-center border-3 border-dashed">
                              <MdAddAPhoto className="text-muted-foreground h-8 w-8" />
                              <p className="text-muted-foreground text-xs font-semibold">
                                Upload Logo
                              </p>
                            </AvatarFallback>
                          </Avatar>
                          {logoPreview && (
                            <Button
                              type="button"
                              className="absolute top-0 right-0 rounded-full"
                              variant="outline"
                              size="icon-xs"
                              onClick={removeLogo}
                              disabled={isPending}
                            >
                              <IoClose className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <p className="text-muted-foreground text-xs">
                          Click to upload or drag and drop <br /> SVG, PNG, or JPG (max 800x800px)
                        </p>

                        <input
                          id="logo-upload"
                          type="file"
                          accept="image/png,image/jpeg,image/jpg"
                          className="hidden"
                          onChange={handleLogoChange}
                          disabled={isPending}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={isPending}
                        placeholder="Enter organization name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="mt-10">
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Organization"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default PreparationNewForm
