import { FaUsers, FaUserShield } from "react-icons/fa"
import { IoMdMail } from "react-icons/io"
import { StatCard } from "./stat-card"

interface MembersStatsProps {
  totalMembers: number
  totalAdmins: number
  pendingInvites: number
}

export function MembersStats({ totalMembers, totalAdmins, pendingInvites }: MembersStatsProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
      <StatCard icon={FaUsers} label="Total Members" value={totalMembers} colorScheme="blue" />
      <StatCard icon={FaUserShield} label="Admins" value={totalAdmins} colorScheme="purple" />
      <StatCard
        icon={IoMdMail}
        label="Pending Invites"
        value={pendingInvites}
        colorScheme="green"
      />
    </div>
  )
}
