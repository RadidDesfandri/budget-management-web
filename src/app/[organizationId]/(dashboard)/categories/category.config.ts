import {
  BarChart2,
  Briefcase,
  Building2,
  Car,
  Clapperboard,
  CreditCard,
  DollarSign,
  Droplets,
  Dumbbell,
  Gift,
  GraduationCap,
  Heart,
  House,
  PiggyBank,
  Plane,
  Receipt,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  Utensils,
  Wallet,
  Zap,
  type LucideIcon
} from "lucide-react"

const ICON_COLORS = [
  { label: "Slate", value: "#475569" },
  { label: "Red", value: "#ef4444" },
  { label: "Orange", value: "#f97316" },
  { label: "Amber", value: "#d97706" },
  { label: "Green", value: "#16a34a" },
  { label: "Blue", value: "#2563eb" }
]

const BACKGROUND_COLORS = [
  { label: "Light Gray", value: "#f1f5f9" },
  { label: "Red Light", value: "#fee2e2" },
  { label: "Orange Light", value: "#ffedd5" },
  { label: "Amber Light", value: "#fef3c7" },
  { label: "Green Light", value: "#dcfce7" },
  { label: "Blue Light", value: "#dbeafe" }
]

const CATEGORY_ICONS: { label: string; value: string; icon: LucideIcon }[] = [
  { label: "Wallet", value: "Wallet", icon: Wallet },
  { label: "Credit Card", value: "CreditCard", icon: CreditCard },
  { label: "Dollar Sign", value: "DollarSign", icon: DollarSign },
  { label: "Piggy Bank", value: "PiggyBank", icon: PiggyBank },
  { label: "Trending Up", value: "TrendingUp", icon: TrendingUp },
  { label: "Bar Chart", value: "BarChart2", icon: BarChart2 },
  { label: "Receipt", value: "Receipt", icon: Receipt },
  { label: "Shopping Cart", value: "ShoppingCart", icon: ShoppingCart },
  { label: "Shopping Bag", value: "ShoppingBag", icon: ShoppingBag },
  { label: "House", value: "House", icon: House },
  { label: "Car", value: "Car", icon: Car },
  { label: "Plane", value: "Plane", icon: Plane },
  { label: "Utensils", value: "Utensils", icon: Utensils },
  { label: "Heart", value: "Heart", icon: Heart },
  { label: "Graduation Cap", value: "GraduationCap", icon: GraduationCap },
  { label: "Briefcase", value: "Briefcase", icon: Briefcase },
  { label: "Gift", value: "Gift", icon: Gift },
  { label: "Zap", value: "Zap", icon: Zap },
  { label: "Droplets", value: "Droplets", icon: Droplets },
  { label: "Smartphone", value: "Smartphone", icon: Smartphone },
  { label: "Building", value: "Building2", icon: Building2 },
  { label: "Dumbbell", value: "Dumbbell", icon: Dumbbell },
  { label: "Clapperboard", value: "Clapperboard", icon: Clapperboard }
]

const ICON_MAP: Record<string, LucideIcon> = {
  Wallet,
  CreditCard,
  DollarSign,
  PiggyBank,
  TrendingUp,
  BarChart2,
  Receipt,
  ShoppingCart,
  ShoppingBag,
  House,
  Car,
  Plane,
  Utensils,
  Heart,
  GraduationCap,
  Briefcase,
  Gift,
  Zap,
  Droplets,
  Smartphone,
  Building2,
  Dumbbell,
  Clapperboard
}

export { BACKGROUND_COLORS, CATEGORY_ICONS, ICON_COLORS, ICON_MAP }
