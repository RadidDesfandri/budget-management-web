import { cn } from "@/src/lib/utils"

function ColorSwatch({
  color,
  selected,
  onClick
}: {
  color: { label: string; value: string }
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      title={color.label}
      onClick={onClick}
      className={cn(
        "h-7 w-7 rounded-full border-2 transition-all",
        selected ? "scale-110 border-neutral-800 shadow-md" : "border-transparent hover:scale-105"
      )}
      style={{ backgroundColor: color.value }}
    />
  )
}

export default ColorSwatch
