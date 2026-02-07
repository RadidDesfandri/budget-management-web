interface PageHeaderProps {
  title: string
  description: string
  action?: React.ReactNode
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, action }) => {
  return (
    <header className="flex items-center justify-between gap-3">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-xs text-neutral-600 md:text-sm">{description}</p>
      </div>
      {action && <div>{action}</div>}
    </header>
  )
}

export default PageHeader
