import { ChartNoAxesColumnIncreasing, ChartSpline, ShieldAlert } from "lucide-react"

function FeatureSection() {
  return (
    <section className="bg-white py-14" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-navy-dark text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to control spend
          </h2>
          <p className="text-slate-body mt-4 text-lg">
            Powerful features designed for modern finance teams.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="group shadow-soft hover:border-primary/20 relative rounded-2xl border border-gray-100 bg-white p-8 transition-all hover:shadow-lg">
            <div className="text-primary mb-6 inline-flex size-14 items-center justify-center rounded-xl bg-blue-50">
              <ChartSpline />
            </div>
            <h3 className="text-navy-dark text-xl font-bold">Track Team Expenses</h3>
            <p className="text-slate-body mt-3 text-base leading-relaxed">
              Get real-time visibility into every swipe. Categorize transactions automatically and
              say goodbye to manual data entry.
            </p>
          </div>

          <div className="group shadow-soft hover:border-primary/20 relative rounded-2xl border border-gray-100 bg-white p-8 transition-all hover:shadow-lg">
            <div className="text-primary mb-6 inline-flex size-14 items-center justify-center rounded-xl bg-blue-50">
              <ChartNoAxesColumnIncreasing />
            </div>
            <h3 className="text-navy-dark text-xl font-bold">Set Monthly Budgets</h3>
            <p className="text-slate-body mt-3 text-base leading-relaxed">
              Enforce limits before spending happens. Create budgets for teams, projects, or
              individuals and get alerts when nearing limits.
            </p>
          </div>

          <div className="group shadow-soft hover:border-primary/20 relative rounded-2xl border border-gray-100 bg-white p-8 transition-all hover:shadow-lg">
            <div className="text-primary mb-6 inline-flex size-14 items-center justify-center rounded-xl bg-blue-50">
              <ShieldAlert />
            </div>
            <h3 className="text-navy-dark text-xl font-bold">Approval Workflow</h3>
            <p className="text-slate-body mt-3 text-base leading-relaxed">
              Automate policy checks and approvals. Custom routing rules ensure the right people
              approve the right expenses instantly.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
