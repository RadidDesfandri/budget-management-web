function CtaAction() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="bg-navy-dark rounded-3xl bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] px-6 py-16 text-center shadow-2xl sm:px-12 md:py-20">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to take control of your budget?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-300">
            Join 10,000+ finance teams who use BudgetFlow to save time and money. No credit card
            required.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="bg-primary hover:bg-primary-dark inline-flex h-12 min-w-[160px] items-center justify-center rounded-lg px-8 text-base font-bold text-white transition-all hover:shadow-lg">
              Get Started
            </button>
            <button className="inline-flex h-12 min-w-[160px] items-center justify-center rounded-lg border border-gray-600 bg-transparent px-8 text-base font-bold text-white transition-all hover:bg-white/10">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaAction
