import { Play } from "lucide-react"

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Control Your Team Expenses <br className="hidden sm:block" />
          <span className="text-primary">Without the Chaos</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl">
          The all-in-one platform to manage budgets, track spending, and streamline approvals. Stop
          chasing receipts and start saving money.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="bg-primary shadow-primary/25 hover:bg-primary-dark hover:shadow-primary/30 inline-flex h-12 min-w-[160px] items-center justify-center rounded-lg px-6 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl">
            Start Free
          </button>
          <button className="text-navy-dark inline-flex h-12 min-w-[160px] items-center justify-center rounded-lg border border-gray-300 bg-white px-6 text-base font-bold transition-all hover:border-gray-400 hover:bg-gray-50">
            <Play />
            See Demo
          </button>
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-6 text-sm text-gray-400 md:flex-row">
          <span>Trusted by finance teams at</span>
          <div className="flex flex-wrap items-center justify-center gap-6 opacity-60 grayscale">
            <span className="font-bold">ACME Corp</span>
            <span className="font-bold">Globex</span>
            <span className="font-bold">Soylent</span>
            <span className="font-bold">Initech</span>
          </div>
        </div>
      </div>
      <div className="relative mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="shadow-floating rounded-xl border border-gray-200 bg-white p-2 sm:rounded-2xl lg:p-4">
          <div className="group relative aspect-video w-full overflow-hidden rounded-lg bg-gray-50">
            <div className="absolute top-0 left-0 z-10 flex h-12 w-full items-center justify-between border-b border-gray-200 bg-white px-4">
              <div className="flex items-center gap-4">
                <div className="h-4 w-24 rounded bg-gray-200"></div>
                <div className="h-4 w-16 rounded bg-gray-100"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-gray-200"></div>
              </div>
            </div>
            <div className="absolute top-12 left-0 z-0 hidden h-full w-48 border-r border-gray-200 bg-gray-50 md:block">
              <div className="flex flex-col gap-3 p-4">
                <div className="h-8 w-full rounded bg-gray-200"></div>
                <div className="h-8 w-3/4 rounded bg-gray-200"></div>
                <div className="h-8 w-full rounded bg-gray-200"></div>
                <div className="bg-primary/10 border-primary/20 mt-4 h-32 w-full rounded border"></div>
              </div>
            </div>

            <div className="flex h-full w-full flex-col gap-4 overflow-hidden bg-white p-4 pt-16 md:pt-16 md:pl-52">
              <div className="mb-2 flex items-end justify-between">
                <div className="h-8 w-1/3 rounded bg-gray-200"></div>
                <div className="bg-primary h-10 w-32 rounded"></div>
              </div>
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="h-32 rounded border border-gray-100 bg-white p-3 shadow-sm">
                  <div className="mb-2 h-4 w-1/2 rounded bg-gray-100"></div>
                  <div className="from-primary/20 h-full w-full rounded-b bg-linear-to-t to-transparent"></div>
                </div>
                <div className="h-32 rounded border border-gray-100 bg-white p-3 shadow-sm">
                  <div className="mb-2 h-4 w-1/2 rounded bg-gray-100"></div>
                  <div className="flex h-20 items-end gap-2">
                    <div className="bg-primary/40 h-[40%] w-1/5 rounded-t"></div>
                    <div className="bg-primary/60 h-[70%] w-1/5 rounded-t"></div>
                    <div className="bg-primary/40 h-[50%] w-1/5 rounded-t"></div>
                    <div className="bg-primary h-[90%] w-1/5 rounded-t"></div>
                    <div className="bg-primary/40 h-[60%] w-1/5 rounded-t"></div>
                  </div>
                </div>
                <div className="flex h-32 flex-col justify-between rounded border border-gray-100 bg-white p-3 shadow-sm">
                  <div className="mb-2 h-4 w-1/2 rounded bg-gray-100"></div>
                  <div className="h-4 w-full rounded bg-gray-100"></div>
                  <div className="h-4 w-3/4 rounded bg-gray-100"></div>
                  <div className="h-4 w-full rounded bg-gray-100"></div>
                </div>
              </div>

              <div className="flex flex-col rounded border border-gray-100">
                <div className="h-10 w-full border-b border-gray-100 bg-gray-50"></div>
                <div className="flex h-12 w-full items-center gap-4 border-b border-gray-100 px-4">
                  <div className="size-8 rounded bg-gray-200"></div>
                  <div className="h-4 w-1/4 rounded bg-gray-100"></div>
                  <div className="ml-auto h-4 w-1/4 rounded bg-gray-100"></div>
                </div>
                <div className="flex h-12 w-full items-center gap-4 border-b border-gray-100 px-4">
                  <div className="size-8 rounded bg-gray-200"></div>
                  <div className="h-4 w-1/3 rounded bg-gray-100"></div>
                  <div className="ml-auto h-4 w-1/4 rounded bg-gray-100"></div>
                </div>
                <div className="flex h-12 w-full items-center gap-4 px-4">
                  <div className="size-8 rounded bg-gray-200"></div>
                  <div className="h-4 w-1/4 rounded bg-gray-100"></div>
                  <div className="ml-auto h-4 w-1/4 rounded bg-gray-100"></div>
                </div>
              </div>
            </div>

            <div
              className="sr-only"
              data-alt="High fidelity dashboard mockup showing expense charts, budget tracking graphs and a transaction list"
            ></div>
          </div>
        </div>
        <div className="bg-primary/10 absolute -top-10 -left-10 -z-10 h-72 w-72 rounded-full blur-3xl"></div>
        <div className="absolute -right-10 -bottom-10 -z-10 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl"></div>
      </div>
    </section>
  )
}

export default HeroSection
