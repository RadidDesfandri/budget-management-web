import Image from "next/image"
import { AiFillPlusCircle } from "react-icons/ai"
import CardPreparation from "./components/card-preparation"
import { IoMdMail } from "react-icons/io"
import PreparationNewForm from "./components/preparation-new-form"
import JoinViaInvitation from "./components/join-via-invitation"

function Preparation() {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-6 px-5">
      <Image
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDONwz0B7njs3Hjyqrjewgd4IhvpA_8unOtwLcvFsR1SyRtoHUuV5qLMope1RqzChzFu4CWAl3Z8lL5ZTmcaWQGlFLpU1Yu0TS27Yna6XoJl44W3-i2ZGO1jmX4yKU7aDJu6T6BU7mCMjVli_IgzBW7kQl2ljGbSw6h50_o6fSaxMPTNHU85bYuV1e29th6pMWOaZw1EO-keQIZh8XH9Wcfh0EAF3tEL2o16Ljre8Y7ag4oo_i07pmfyqm2XeTW6axPzBpiUwe46f13"
        alt="Minimal flat illustration of people collaborating and building an organization"
        width={400}
        height={400}
        loading="eager"
        className="h-56 w-56 object-contain"
      />

      <h1 className="text-center text-3xl font-bold">You don&apos;t have an organization yet</h1>

      <p className="text-muted-foreground text-center">
        Start managing your finances by creating a new workspace or{" "}
        <br className="hidden md:flex" /> joining your team&apos;s existing one.
      </p>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
        <CardPreparation
          title="Create Organization"
          description="Set up a new workspace for your company from scratch."
          icon={AiFillPlusCircle}
          variant="primary"
          action={<PreparationNewForm />}
        />
        <CardPreparation
          title="Join via Invitation"
          description="Enter an invite code or accept an email invitation."
          icon={IoMdMail}
          variant="secondary"
          action={<JoinViaInvitation />}
        />
      </div>
    </div>
  )
}

export default Preparation
