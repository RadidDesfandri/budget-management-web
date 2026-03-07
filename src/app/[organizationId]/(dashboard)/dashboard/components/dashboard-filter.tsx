import { Button } from "@/src/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover"
import { Calendar } from "@/src/components/ui/calendar"
import { DateRange } from "react-day-picker"

const timeRanges = [
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "This Month" },
  { value: "last_month", label: "Last Month" }
]

interface DashboardFilterProps {
  selectedTimeRange: string
  date: DateRange | undefined
  setDate: (date: DateRange | undefined) => void
  setSelectedTimeRange: (range: string) => void
}

function DashboardFilter({
  selectedTimeRange,
  date,
  setDate,
  setSelectedTimeRange
}: DashboardFilterProps) {
  return (
    <div className="flex items-center gap-2 rounded-md bg-white p-1 shadow-sm">
      {timeRanges.map((range) => (
        <Button
          key={range.value}
          size="sm"
          variant={selectedTimeRange === range.value ? "secondary" : "ghost"}
          onClick={() => {
            setSelectedTimeRange(range.value)
            setDate(undefined)
          }}
        >
          {range.label}
        </Button>
      ))}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            type="button"
            onClick={() => setSelectedTimeRange("custom")}
            variant={selectedTimeRange === "custom" ? "secondary" : "ghost"}
          >
            <CalendarIcon className="h-4 w-4" />
            <span className="sr-only">Pick a date</span>
            {date?.from &&
              (date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              ))}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="mr-4 w-auto p-0">
          <Calendar mode="range" selected={date} onSelect={setDate} numberOfMonths={2} />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DashboardFilter
