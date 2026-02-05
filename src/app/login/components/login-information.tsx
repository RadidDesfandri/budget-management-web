import Logo from "@/src/components/shared/logo"
import Image from "next/image"

function LoginInformation() {
  return (
    <div className="flex w-full flex-col justify-between">
      <Logo />
      <div className="flex flex-col items-center justify-center gap-2">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQEuJaaQaFMHGyiTD6mV3vGlMEVHloJzpyxEW4u3CO-Zvur2CHfcMVZGniMtsD_bWDI3xD-eLALWxPhr0RXWyNBNAAsC2e9TlNMlGeEg4VMLA74VE3tpbw9Qi8NWbQumY8Uv7UOp4x-XQGKN6-Rg0l_fN19Q8FRwa3VgYd6Ce3Jzx3GYKmaURT2DVPBub15lyTDWgNtQdogB_z7_UUUrREm3dl0YYTzKE-d71GFllwzxMn_0eSPrQQguoEb50AjIV02AEpl1wIXn10"
          width={400}
          height={400}
          alt="Login Illustration"
          className="rounded-lg"
        />

        <h1 className="text-center text-2xl font-bold">
          Smart budgeting for growing <br /> teams
        </h1>
        <p className="text-center text-sm text-gray-700">
          Gain visibility, control spending, and scale your <br /> financial operations with
          precision.
        </p>
      </div>

      <p className="text-xs text-gray-500">© {new Date().getFullYear()} BudgetFlow Inc.</p>
    </div>
  )
}

export default LoginInformation
