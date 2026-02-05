import Logo from "@/src/components/shared/logo"
import { IoShieldCheckmarkSharp } from "react-icons/io5"

function RegisterInformation() {
  return (
    <div className="flex w-full flex-col justify-between">
      <Logo variant="secondary" />

      <div className="flex w-full items-center">
        <div className="relative z-20 flex flex-1 flex-col items-center justify-center py-12">
          <div className="relative h-64 w-64">
            <div className="absolute inset-0 flex items-center justify-center rounded-[3rem] border border-white/20 bg-linear-to-b from-white/20 to-white/5 shadow-2xl backdrop-blur-md">
              <IoShieldCheckmarkSharp className="text-8xl text-white" />
            </div>
            <div className="absolute -right-16 bottom-8 h-32 w-48 rotate-6 rounded-xl bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-transform duration-700 hover:scale-105 hover:rotate-0">
              <div className="mb-3 flex items-center justify-between">
                <div className="h-2 w-12 rounded-full bg-gray-200"></div>
                <span className="text-xs font-bold text-green-500">+12.5%</span>
              </div>
              <div className="flex h-16 items-end gap-2">
                <div className="bg-primary/10 w-full rounded-t-sm" style={{ height: "40%" }}></div>
                <div className="bg-primary/20 w-full rounded-t-sm" style={{ height: "65%" }}></div>
                <div className="bg-primary/40 w-full rounded-t-sm" style={{ height: "55%" }}></div>
                <div className="bg-primary w-full rounded-t-sm" style={{ height: "85%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          &quot;Secure budgeting for modern teams. <br /> We&apos;ve scaled with confidence.&quot;
        </h1>
        <p className="text-xs text-gray-200">© {new Date().getFullYear()} BudgetFlow Inc.</p>
      </div>
    </div>
  )
}

export default RegisterInformation
