import { RiWallet3Fill } from "react-icons/ri"

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-primary rounded-md p-2 text-white">
        <RiWallet3Fill />
      </div>
      <p className="text-xl font-bold tracking-tight">BudgetFlow</p>
    </div>
  )
}

export default Logo
