"use client"

import * as React from "react"
import { ChevronDown, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover"

interface MonthYearPickerProps {
  value?: { year: number; month: number }
  onChange?: (value: { year: number; month: number }) => void
  fromYear?: number
  toYear?: number
  className?: string
  placeholder?: string
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function MonthYearPicker({
  value,
  onChange,
  fromYear = 2020,
  toYear = new Date().getFullYear() + 1,
  className,
  placeholder = "Select Month & Year"
}: MonthYearPickerProps) {
  const [open, setOpen] = React.useState(false)
  const [viewYear, setViewYear] = React.useState(value?.year ?? new Date().getFullYear())

  const canGoPrev = viewYear > fromYear
  const canGoNext = viewYear < toYear

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("flex justify-between", !value && "text-muted-foreground", className)}
        >
          {value ? format(new Date(value.year, value.month), "MMMM yyyy") : placeholder}
          <ChevronDown className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="w-64 p-3">
          <div className="mb-3 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              disabled={!canGoPrev}
              onClick={() => setViewYear((y) => y - 1)}
            >
              <ChevronLeftIcon className="size-4" />
            </Button>

            <span className="text-sm font-medium">{viewYear}</span>

            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              disabled={!canGoNext}
              onClick={() => setViewYear((y) => y + 1)}
            >
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {MONTHS.map((month, index) => {
              const isSelected = value?.year === viewYear && value?.month === index

              return (
                <Button
                  key={month}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-9 w-full text-sm",
                    isSelected &&
                      "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                  )}
                  onClick={() => {
                    onChange?.({ year: viewYear, month: index })
                    setOpen(false)
                  }}
                >
                  {month}
                </Button>
              )
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
