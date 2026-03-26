import Footer from "@/src/components/shared/footer"
import NavigationBar from "@/src/components/shared/navigation-bar"

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavigationBar />
      <div className="mx-auto mt-20 max-w-7xl px-5 pb-5">{children}</div>
      <Footer />
    </>
  )
}

export default HomeLayout
