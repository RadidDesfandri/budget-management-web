import OrganizationCreateForm from "@/src/components/shared/organization-create-form"
import { Button } from "@/src/components/ui/button"
import { Dialog, DialogTrigger } from "@/src/components/ui/dialog"

function PreparationNewForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full">
          Create New
        </Button>
      </DialogTrigger>
      <OrganizationCreateForm />
    </Dialog>
  )
}

export default PreparationNewForm
