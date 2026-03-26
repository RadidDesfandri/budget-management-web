import { Separator } from "../ui/separator"
import Logo from "./logo"

function Footer() {
  return (
    <div className="flex w-full flex-col items-center gap-7 border-t bg-white p-3 px-5 md:px-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Logo />
          <p className="text-muted-foreground text-sm">
            Making expense management effortless for modern teams. Control spend, automate
            approvals, and scale faster.
          </p>
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold tracking-wider uppercase">Product</h1>
          <p className="text-muted-foreground text-sm">Features</p>
          <p className="text-muted-foreground text-sm">Pricing</p>
          <p className="text-muted-foreground text-sm">How it works</p>
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold tracking-wider uppercase">Company</h1>
          <p className="text-muted-foreground text-sm">About</p>
          <p className="text-muted-foreground text-sm">Contact</p>
          <p className="text-muted-foreground text-sm">Blog</p>
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold tracking-wider uppercase">Resources</h1>
          <p className="text-muted-foreground text-sm">Help Center</p>
          <p className="text-muted-foreground text-sm">API Documentation</p>
          <p className="text-muted-foreground text-sm">Privacy Policy</p>
        </div>
      </div>

      <Separator />

      <p className="text-muted-foreground text-start text-sm">
        &copy; {new Date().getFullYear()} Budget Management. All rights reserved.
      </p>
    </div>
  )
}

export default Footer
