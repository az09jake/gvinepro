"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import LineChart from "@/components/admin/charts/line-chart"
import BarChart from "@/components/admin/charts/bar-chart"
import {
  Activity,
  RefreshCw,
  Clock,
  Cpu,
  Database,
  HardDrive,
  Globe,
  AlertTriangle,
  Download,
  Zap,
  BarChart3,
  Users,
  Info,
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

// 모의 성능 데이터 생성 함수
const generatePerformanceData = () => {
  // CPU 사용량 데이터 (최근 24시간)
  const cpuData = Array.from({ length: 24 }, (_, i) => {
    const hour = 23 - i
    return {
      time: `${hour}:00`,
      value: Math.floor(20 + Math.random() * 60),
    }
  })

  // 메모리 사용량 데이터 (최근 24시간)
  const memoryData = Array.from({ length: 24 }, (_, i) => {
    const hour = 23 - i
    return {
      time: `${hour}:00`,
      value: Math.floor(30 + Math.random() * 40),
    }
  })

  // 디스크 사용량 데이터 (최근 24시간)
  const diskData = Array.from({ length: 24 }, (_, i) => {
    const hour = 23 - i
    return {
      time: `${hour}:00`,
      value: Math.floor(50 + Math.random() * 30),
    }
  })

  // 네트워크 트래픽 데이터 (최근 24시간)
  const networkData = Array.from({ length: 24 }, (_, i) => {
    const hour = 23 - i
    return {
      time: `${hour}:00`,
      incoming: Math.floor(Math.random() * 100),
      outgoing: Math.floor(Math.random() * 80),
    }
  })

  // 페이지 로드 시간 데이터 (최근 7일)
  const pageLoadData = Array.from({ length: 7 }, (_, i) => {
    const day = 6 - i
    const date = new Date()
    date.setDate(date.getDate() - day)
    const dateStr = date.toLocaleDateString("ko-KR", { month: "short", day: "numeric" })

    return {
      date: dateStr,
      desktop: Math.floor(500 + Math.random() * 1000),
      mobile: Math.floor(800 + Math.random() * 1500),
    }
  })

  // 동시 접속자 수 데이터 (최근 24시간)
  const concurrentUsersData = Array.from({ length: 24 }, (_, i) => {
    const hour = 23 - i
    return {
      time: `${hour}:00`,
      users: Math.floor(10 + Math.random() * 90),
    }
  })

  // 서버 응답 시간 데이터 (최근 24시간)
  const serverResponseData = Array.from({ length: 24 }, (_, i) => {
    const hour = 23 - i
    return {
      time: `${hour}:00`,
      responseTime: Math.floor(50 + Math.random() * 150),
    }
  })

  // 현재 시스템 상태
  const currentStatus = {
    cpu: Math.floor(20 + Math.random() * 60),
    memory: Math.floor(30 + Math.random() * 40),
    disk: Math.floor(50 + Math.random() * 30),
    network: {
      incoming: Math.floor(Math.random() * 100),
      outgoing: Math.floor(Math.random() * 80),
    },
    uptime: "14일 7시간 32분",
    temperature: Math.floor(40 + Math.random() * 15),
    processes: Math.floor(100 + Math.random() * 50),
    connections: Math.floor(50 + Math.random() * 100),
  }

  // 알림 데이터
  const alerts = [
    {
      id: 1,
      level: "warning",
      message: "CPU 사용량이 80%를 초과했습니다.",
      time: "2시간 전",
      resolved: true,
    },
    {
      id: 2,
      level: "error",
      message: "데이터베이스 연결 오류가 발생했습니다.",
      time: "5시간 전",
      resolved: true,
    },
    {
      id: 3,
      level: "warning",
      message: "디스크 공간이 85%를 초과했습니다.",
      time: "1일 전",
      resolved: false,
    },
  ]

  return {
    cpuData,
    memoryData,
    diskData,
    networkData,
    pageLoadData,
    concurrentUsersData,
    serverResponseData,
    currentStatus,
    alerts,
  }
}

export default function PerformancePage() {
  const [timeRange, setTimeRange] = useState("24h")
  const [activeTab, setActiveTab] = useState("overview")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [performanceData, setPerformanceData] = useState(generatePerformanceData())
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  // 데이터 새로고침 처리
  const handleRefreshData = () => {
    setIsRefreshing(true)

    // 실제로는 API 호출을 통해 데이터를 가져오지만, 여기서는 모의 데이터를 생성합니다.
    setTimeout(() => {
      setPerformanceData(generatePerformanceData())
      setLastUpdated(new Date())
      setIsRefreshing(false)
    }, 1000)
  }

  // 자동 새로고침 설정 (30초마다)
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefreshData()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-light">성능 모니터링</h1>
          <p className="text-muted-foreground">서버 및 웹사이트 성능을 모니터링하고 분석합니다.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">마지막 업데이트: {lastUpdated.toLocaleTimeString()}</div>
          <Button variant="outline" size="sm" onClick={handleRefreshData} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "새로고침 중..." : "새로고침"}
          </Button>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="기간 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">최근 1시간</SelectItem>
              <SelectItem value="6h">최근 6시간</SelectItem>
              <SelectItem value="24h">최근 24시간</SelectItem>
              <SelectItem value="7d">최근 7일</SelectItem>
              <SelectItem value="30d">최근 30일</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 경고 알림 */}
      {performanceData.alerts.filter((alert) => !alert.resolved).length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>주의</AlertTitle>
          <AlertDescription>
            {performanceData.alerts.filter((alert) => !alert.resolved).length}개의 해결되지 않은 성능 문제가 있습니다.
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="server">서버 성능</TabsTrigger>
          <TabsTrigger value="website">웹사이트 성능</TabsTrigger>
          <TabsTrigger value="alerts">알림</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview" className="space-y-6">
          {/* 현재 시스템 상태 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">CPU 사용량</CardTitle>
                <Cpu className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceData.currentStatus.cpu}%</div>
                <Progress
                  value={performanceData.currentStatus.cpu}
                  className="h-2 mt-2"
                  indicatorClassName={
                    performanceData.currentStatus.cpu > 80
                      ? "bg-red-500"
                      : performanceData.currentStatus.cpu > 60
                        ? "bg-yellow-500"
                        : ""
                  }
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">메모리 사용량</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceData.currentStatus.memory}%</div>
                <Progress
                  value={performanceData.currentStatus.memory}
                  className="h-2 mt-2"
                  indicatorClassName={
                    performanceData.currentStatus.memory > 80
                      ? "bg-red-500"
                      : performanceData.currentStatus.memory > 60
                        ? "bg-yellow-500"
                        : ""
                  }
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">디스크 사용량</CardTitle>
                <HardDrive className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceData.currentStatus.disk}%</div>
                <Progress
                  value={performanceData.currentStatus.disk}
                  className="h-2 mt-2"
                  indicatorClassName={
                    performanceData.currentStatus.disk > 80
                      ? "bg-red-500"
                      : performanceData.currentStatus.disk > 60
                        ? "bg-yellow-500"
                        : ""
                  }
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">네트워크 트래픽</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs text-muted-foreground">수신</div>
                    <div className="text-lg font-bold">{performanceData.currentStatus.network.incoming} Mbps</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">송신</div>
                    <div className="text-lg font-bold">{performanceData.currentStatus.network.outgoing} Mbps</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 추가 시스템 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">가동 시간</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{performanceData.currentStatus.uptime}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">시스템 온도</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{performanceData.currentStatus.temperature}°C</div>
                <Badge
                  className={
                    performanceData.currentStatus.temperature > 70
                      ? "bg-red-500 mt-2"
                      : performanceData.currentStatus.temperature > 60
                        ? "bg-yellow-500 mt-2"
                        : "bg-green-500 mt-2"
                  }
                >
                  {performanceData.currentStatus.temperature > 70
                    ? "위험"
                    : performanceData.currentStatus.temperature > 60
                      ? "주의"
                      : "정상"}
                </Badge>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">활성 프로세스</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{performanceData.currentStatus.processes}개</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">활성 연결</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{performanceData.currentStatus.connections}개</div>
              </CardContent>
            </Card>
          </div>

          {/* 차트 섹션 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>CPU 사용량 추이</CardTitle>
                <CardDescription>최근 24시간 동안의 CPU 사용량</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  title=""
                  data={performanceData.cpuData}
                  xAxisKey="time"
                  lines={[{ key: "value", name: "CPU 사용량 (%)", color: "#7124d7" }]}
                  height={300}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>메모리 사용량 추이</CardTitle>
                <CardDescription>최근 24시간 동안의 메모리 사용량</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  title=""
                  data={performanceData.memoryData}
                  xAxisKey="time"
                  lines={[{ key: "value", name: "메모리 사용량 (%)", color: "#9a65ff" }]}
                  height={300}
                />
              </CardContent>
            </Card>
          </div>

          {/* 추가 차트 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>네트워크 트래픽</CardTitle>
                <CardDescription>최근 24시간 동안의 네트워크 트래픽</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  title=""
                  data={performanceData.networkData}
                  xAxisKey="time"
                  lines={[
                    { key: "incoming", name: "수신 (Mbps)", color: "#7124d7" },
                    { key: "outgoing", name: "송신 (Mbps)", color: "#9a65ff" },
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>페이지 로드 시간</CardTitle>
                <CardDescription>최근 7일 동안의 평균 페이지 로드 시간</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  title=""
                  data={performanceData.pageLoadData}
                  xAxisKey="date"
                  bars={[
                    { key: "desktop", name: "데스크톱 (ms)", color: "#7124d7" },
                    { key: "mobile", name: "모바일 (ms)", color: "#9a65ff" },
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 서버 성능 탭 */}
        <TabsContent value="server" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>CPU 사용량 상세</CardTitle>
                <CardDescription>코어별 CPU 사용량 및 프로세스</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>코어 1</span>
                    <span>{Math.floor(20 + Math.random() * 60)}%</span>
                  </div>
                  <Progress value={Math.floor(20 + Math.random() * 60)} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>코어 2</span>
                    <span>{Math.floor(20 + Math.random() * 60)}%</span>
                  </div>
                  <Progress value={Math.floor(20 + Math.random() * 60)} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>코어 3</span>
                    <span>{Math.floor(20 + Math.random() * 60)}%</span>
                  </div>
                  <Progress value={Math.floor(20 + Math.random() * 60)} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>코어 4</span>
                    <span>{Math.floor(20 + Math.random() * 60)}%</span>
                  </div>
                  <Progress value={Math.floor(20 + Math.random() * 60)} className="h-2" />
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">상위 프로세스 (CPU)</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>nginx</span>
                      <span>{Math.floor(5 + Math.random() * 15)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>node</span>
                      <span>{Math.floor(5 + Math.random() * 15)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>mysql</span>
                      <span>{Math.floor(5 + Math.random() * 15)}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>메모리 사용량 상세</CardTitle>
                <CardDescription>메모리 사용량 및 프로세스</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>총 메모리</span>
                    <span>16 GB</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>사용 중</span>
                    <span>
                      {Math.floor(4 + Math.random() * 6)} GB ({performanceData.currentStatus.memory}%)
                    </span>
                  </div>
                  <Progress value={performanceData.currentStatus.memory} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>캐시</span>
                    <span>{Math.floor(1 + Math.random() * 3)} GB</span>
                  </div>
                  <Progress value={Math.floor(10 + Math.random() * 20)} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>여유 메모리</span>
                    <span>{Math.floor(4 + Math.random() * 6)} GB</span>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">상위 프로세스 (메모리)</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>mysql</span>
                      <span>{Math.floor(500 + Math.random() * 500)} MB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>node</span>
                      <span>{Math.floor(300 + Math.random() * 300)} MB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>nginx</span>
                      <span>{Math.floor(100 + Math.random() * 200)} MB</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>디스크 사용량 상세</CardTitle>
                <CardDescription>디스크 파티션 및 I/O 성능</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">파티션 사용량</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>/ (루트)</span>
                        <span>{Math.floor(50 + Math.random() * 30)}% (120 GB / 250 GB)</span>
                      </div>
                      <Progress value={Math.floor(50 + Math.random() * 30)} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>/var</span>
                        <span>{Math.floor(40 + Math.random() * 40)}% (80 GB / 200 GB)</span>
                      </div>
                      <Progress value={Math.floor(40 + Math.random() * 40)} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>/home</span>
                        <span>{Math.floor(20 + Math.random() * 30)}% (30 GB / 150 GB)</span>
                      </div>
                      <Progress value={Math.floor(20 + Math.random() * 30)} className="h-2" />
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">디스크 I/O</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">읽기</div>
                      <div className="text-lg font-bold">{Math.floor(10 + Math.random() * 50)} MB/s</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">쓰기</div>
                      <div className="text-lg font-bold">{Math.floor(5 + Math.random() * 30)} MB/s</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>네트워크 상세</CardTitle>
                <CardDescription>네트워크 인터페이스 및 연결</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">네트워크 인터페이스</h3>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>eth0</span>
                        <span>1 Gbps</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-muted-foreground">수신</div>
                          <div className="text-sm">{performanceData.currentStatus.network.incoming} Mbps</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">송신</div>
                          <div className="text-sm">{performanceData.currentStatus.network.outgoing} Mbps</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">네트워크 연결</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>TCP 연결</span>
                      <span>{Math.floor(80 + Math.random() * 100)}개</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>UDP 연결</span>
                      <span>{Math.floor(10 + Math.random() * 30)}개</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>HTTP 연결</span>
                      <span>{Math.floor(50 + Math.random() * 80)}개</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>서버 응답 시간</CardTitle>
              <CardDescription>최근 24시간 동안의 서버 응답 시간</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                title=""
                data={performanceData.serverResponseData}
                xAxisKey="time"
                lines={[{ key: "responseTime", name: "응답 시간 (ms)", color: "#7124d7" }]}
                height={300}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* 웹사이트 성능 탭 */}
        <TabsContent value="website" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">평균 페이지 로드 시간</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.floor(800 + Math.random() * 400)} ms</div>
                <div className="flex items-center mt-1">
                  <Badge className="bg-green-500 text-white">-5%</Badge>
                  <span className="text-xs text-muted-foreground ml-2">지난 주 대비</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">첫 콘텐츠 표시 시간</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.floor(500 + Math.random() * 300)} ms</div>
                <div className="flex items-center mt-1">
                  <Badge className="bg-green-500 text-white">-8%</Badge>
                  <span className="text-xs text-muted-foreground ml-2">지난 주 대비</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">총 페이지 크기</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.floor(1 + Math.random() * 2)}.{Math.floor(Math.random() * 9)} MB
                </div>
                <div className="flex items-center mt-1">
                  <Badge className="bg-yellow-500 text-white">+3%</Badge>
                  <span className="text-xs text-muted-foreground ml-2">지난 주 대비</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">동시 접속자</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.floor(20 + Math.random() * 80)}명</div>
                <div className="flex items-center mt-1">
                  <Badge className="bg-green-500 text-white">+12%</Badge>
                  <span className="text-xs text-muted-foreground ml-2">지난 주 대비</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>페이지 로드 시간 (디바이스별)</CardTitle>
                <CardDescription>최근 7일 동안의 평균 페이지 로드 시간</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  title=""
                  data={performanceData.pageLoadData}
                  xAxisKey="date"
                  bars={[
                    { key: "desktop", name: "데스크톱 (ms)", color: "#7124d7" },
                    { key: "mobile", name: "모바일 (ms)", color: "#9a65ff" },
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>동시 접속자 수</CardTitle>
                <CardDescription>최근 24시간 동안의 동시 접속자 수</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  title=""
                  data={performanceData.concurrentUsersData}
                  xAxisKey="time"
                  lines={[{ key: "users", name: "접속자 수", color: "#7124d7" }]}
                  height={300}
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>페이지별 성능</CardTitle>
              <CardDescription>주요 페이지의 로드 시간 및 성능 지표</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-secondary/50">
                        <th className="px-4 py-2 text-left">페이지</th>
                        <th className="px-4 py-2 text-left">로드 시간</th>
                        <th className="px-4 py-2 text-left">크기</th>
                        <th className="px-4 py-2 text-left">요청 수</th>
                        <th className="px-4 py-2 text-left">성능 점수</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="px-4 py-2">홈페이지</td>
                        <td className="px-4 py-2">{Math.floor(700 + Math.random() * 300)} ms</td>
                        <td className="px-4 py-2">
                          {Math.floor(1 + Math.random() * 1)}.{Math.floor(Math.random() * 9)} MB
                        </td>
                        <td className="px-4 py-2">{Math.floor(20 + Math.random() * 20)}</td>
                        <td className="px-4 py-2">
                          <Badge className="bg-green-500">{Math.floor(85 + Math.random() * 15)}</Badge>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-4 py-2">블로그</td>
                        <td className="px-4 py-2">{Math.floor(800 + Math.random() * 400)} ms</td>
                        <td className="px-4 py-2">
                          {Math.floor(1 + Math.random() * 2)}.{Math.floor(Math.random() * 9)} MB
                        </td>
                        <td className="px-4 py-2">{Math.floor(25 + Math.random() * 25)}</td>
                        <td className="px-4 py-2">
                          <Badge className="bg-green-500">{Math.floor(80 + Math.random() * 15)}</Badge>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-4 py-2">제품 페이지</td>
                        <td className="px-4 py-2">{Math.floor(900 + Math.random() * 500)} ms</td>
                        <td className="px-4 py-2">
                          {Math.floor(2 + Math.random() * 2)}.{Math.floor(Math.random() * 9)} MB
                        </td>
                        <td className="px-4 py-2">{Math.floor(30 + Math.random() * 20)}</td>
                        <td className="px-4 py-2">
                          <Badge className="bg-yellow-500">{Math.floor(70 + Math.random() * 10)}</Badge>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-4 py-2">관리자 대시보드</td>
                        <td className="px-4 py-2">{Math.floor(1000 + Math.random() * 500)} ms</td>
                        <td className="px-4 py-2">
                          {Math.floor(2 + Math.random() * 3)}.{Math.floor(Math.random() * 9)} MB
                        </td>
                        <td className="px-4 py-2">{Math.floor(40 + Math.random() * 30)}</td>
                        <td className="px-4 py-2">
                          <Badge className="bg-yellow-500">{Math.floor(65 + Math.random() * 15)}</Badge>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <BarChart3 className="mr-2 h-4 w-4" />
                상세 성능 분석
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 알림 탭 */}
        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>성능 알림</CardTitle>
              <CardDescription>시스템 및 웹사이트 성능 관련 알림</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3 border-b pb-4">
                    <div
                      className={`p-1.5 rounded-full ${
                        alert.level === "error"
                          ? "bg-red-500/20"
                          : alert.level === "warning"
                            ? "bg-yellow-500/20"
                            : "bg-blue-500/20"
                      }`}
                    >
                      {alert.level === "error" ? (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      ) : alert.level === "warning" ? (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <Info className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="text-sm font-medium">{alert.message}</div>
                        {alert.resolved ? (
                          <Badge className="ml-2 bg-green-500 text-white text-xs">해결됨</Badge>
                        ) : (
                          <Badge className="ml-2 bg-red-500 text-white text-xs">미해결</Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{alert.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                모든 알림 기록 보기
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>알림 설정</CardTitle>
              <CardDescription>성능 알림 설정 및 임계값 구성</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cpu-alert">CPU 사용량 알림</Label>
                  <p className="text-sm text-muted-foreground">CPU 사용량이 임계값을 초과할 때 알림을 받습니다.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Input id="cpu-alert" type="number" className="w-16" defaultValue="80" min="1" max="100" />
                  <span>%</span>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="memory-alert">메모리 사용량 알림</Label>
                  <p className="text-sm text-muted-foreground">메모리 사용량이 임계값을 초과할 때 알림을 받습니다.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Input id="memory-alert" type="number" className="w-16" defaultValue="80" min="1" max="100" />
                  <span>%</span>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="disk-alert">디스크 사용량 알림</Label>
                  <p className="text-sm text-muted-foreground">디스크 사용량이 임계값을 초과할 때 알림을 받습니다.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Input id="disk-alert" type="number" className="w-16" defaultValue="85" min="1" max="100" />
                  <span>%</span>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="response-alert">서버 응답 시간 알림</Label>
                  <p className="text-sm text-muted-foreground">서버 응답 시간이 임계값을 초과할 때 알림을 받습니다.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Input id="response-alert" type="number" className="w-16" defaultValue="200" min="1" />
                  <span>ms</span>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="page-load-alert">페이지 로드 시간 알림</Label>
                  <p className="text-sm text-muted-foreground">
                    페이지 로드 시간이 임계값을 초과할 때 알림을 받습니다.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Input id="page-load-alert" type="number" defaultValue="1500" min="1" className="w-16" />
                  <span>ms</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-point hover:bg-point/90">알림 설정 저장</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

