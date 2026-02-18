import { Card, CardContent, CardFooter, CardHeader } from "@/src/components/ui/card"
import { Skeleton } from "@/src/components/ui/skeleton"

function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-5">
      <Card className="w-full md:max-w-md">
        {/* CardHeader */}
        <CardHeader className="flex flex-col items-center gap-3 border-b">
          {/* Avatar */}
          <Skeleton className="size-20 rounded-md" />

          {/* Title */}
          <div className="flex w-full flex-col items-center gap-2">
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-7 w-1/2" />
          </div>

          {/* Description */}
          <div className="flex w-full flex-col items-center gap-1.5">
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>

          {/* Badge */}
          <Skeleton className="h-6 w-20 rounded-full" />
        </CardHeader>

        {/* CardContent */}
        <CardContent className="flex flex-col gap-3">
          {/* Green Alert (invited as) */}
          <div className="bg-muted/30 flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-4">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <Skeleton className="size-5 rounded-full" />
          </div>

          {/* Warning Alert */}
          <div className="bg-muted/30 flex flex-col gap-1.5 rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Skeleton className="size-4 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-3 w-48" />
          </div>

          {/* Button */}
          <Skeleton className="h-11 w-full rounded-md" />
        </CardContent>

        {/* CardFooter */}
        <CardFooter className="flex flex-col items-center gap-1.5">
          <Skeleton className="h-3 w-4/5" />
          <Skeleton className="h-3 w-3/5" />
        </CardFooter>
      </Card>
    </div>
  )
}

export default Loading
