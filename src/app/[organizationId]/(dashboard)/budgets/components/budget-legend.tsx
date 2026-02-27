function BudgetLegend() {
  return (
    <div className="flex items-center gap-4 text-xs text-neutral-600">
      <span className="font-medium text-neutral-500">Legend:</span>
      {[
        { color: "bg-emerald-500", label: "On Track", range: "0–75%" },
        { color: "bg-amber-400", label: "Near Limit", range: "76–90%" },
        { color: "bg-red-500", label: "Over Budget", range: "91%+" }
      ].map(({ color, label, range }) => (
        <div key={label} className="flex items-center gap-1.5">
          <span className={`inline-block h-2.5 w-2.5 rounded-full ${color}`} />
          <span>{label}</span>
          <span className="text-neutral-400">({range})</span>
        </div>
      ))}
    </div>
  )
}

export default BudgetLegend
