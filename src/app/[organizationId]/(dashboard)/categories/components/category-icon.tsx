import { ICON_MAP } from "../category.config"

type CategoryIconProps = {
  icon: string
  iconColor?: string
  backgroundColor?: string
}

const CategoryIcon = ({
  icon,
  iconColor = "#fff",
  backgroundColor = "#3b82f6"
}: CategoryIconProps) => {
  const IconComponent = ICON_MAP[icon]

  if (!IconComponent) return null

  return (
    <div
      style={{ backgroundColor }}
      className="flex h-10 w-10 items-center justify-center rounded-full transition-all"
    >
      <IconComponent color={iconColor} className="h-5 w-5" />
    </div>
  )
}

export default CategoryIcon
