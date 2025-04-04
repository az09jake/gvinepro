import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SecurityLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general" disabled>
            일반 보안
          </TabsTrigger>
          <TabsTrigger value="authentication" disabled>
            인증
          </TabsTrigger>
          <TabsTrigger value="network" disabled>
            네트워크
          </TabsTrigger>
          <TabsTrigger value="api" disabled>
            API 보안
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-72" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array(3)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="flex items-center justify-between space-x-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-10 w-20" />
                  </div>
                ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-72" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array(4)
                  .fill(null)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  )
}

