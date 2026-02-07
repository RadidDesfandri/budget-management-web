import PageHeader from "@/src/components/shared/page-header"
import ProfilePicture from "./components/profile-picture"
import PersonalInformation from "./components/personal-information"
import PasswordSecurity from "./components/password-security"
import DeleteAccount from "./components/delete-account"

function UserSetting() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Profile"
        description="Manage your account settings and securoty preferences."
      />
      <ProfilePicture />
      <PersonalInformation />
      <PasswordSecurity />
      <DeleteAccount />
    </div>
  )
}

export default UserSetting
