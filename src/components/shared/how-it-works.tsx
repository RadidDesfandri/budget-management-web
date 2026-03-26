function HowItWorks() {
  return (
    <section className="bg-background-light border-t border-gray-100 py-24" id="how-it-works">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-navy-dark text-3xl font-bold tracking-tight sm:text-4xl">
            How BudgetFlow Works
          </h2>
          <p className="text-slate-body mt-4 text-lg">Get up and running in minutes, not months.</p>
        </div>
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute top-12 left-0 hidden h-0.5 w-full -translate-y-1/2 border-t-2 border-dashed border-gray-300 md:block lg:px-16"
          />
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
            <div className="relative flex flex-col items-center text-center">
              <div className="bg-primary z-10 flex size-16 items-center justify-center rounded-full border-4 border-white text-2xl font-bold text-white shadow-md">
                1
              </div>
              <h3 className="text-navy-dark mt-6 text-xl font-bold">Connect Accounts</h3>
              <p className="text-slate-body mt-3 max-w-xs text-base">
                Securely link your corporate bank accounts and credit cards in just a few clicks.
              </p>
            </div>

            <div className="relative flex flex-col items-center text-center">
              <div className="bg-primary z-10 flex size-16 items-center justify-center rounded-full border-4 border-white text-2xl font-bold text-white shadow-md">
                2
              </div>
              <h3 className="text-navy-dark mt-6 text-xl font-bold">Set Limits</h3>
              <p className="text-slate-body mt-3 max-w-xs text-base">
                Define spending policies and issue virtual cards to your team members instantly.
              </p>
            </div>

            <div className="relative flex flex-col items-center text-center">
              <div className="bg-primary z-10 flex size-16 items-center justify-center rounded-full border-4 border-white text-2xl font-bold text-white shadow-md">
                3
              </div>
              <h3 className="text-navy-dark mt-6 text-xl font-bold">Track &amp; Save</h3>
              <p className="text-slate-body mt-3 max-w-xs text-base">
                Monitor transactions in real-time and export reports for hassle-free accounting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
