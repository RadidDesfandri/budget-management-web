interface PageHeaderProps {
  title: string
  titleSuffix?: React.ReactNode
  description: string
  action?: React.ReactNode
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, action, titleSuffix }) => {
  return (
    <header className="flex items-center justify-between gap-3">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">{title}</h1>
          {titleSuffix && titleSuffix}
        </div>
        <p className="text-xs text-neutral-600 md:text-sm">{description}</p>
      </div>
      {action && <div>{action}</div>}
    </header>
  )
}

export default PageHeader
