import NavigationBar from "@/components/shared/navigation-bar"

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavigationBar />
      <div className="mx-auto mt-20 max-w-7xl px-5">{children}</div>
    </>
  )
}

export default HomeLayout
