"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Download,
  Database,
  Calendar,
  Clock,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  FileText,
  Image,
  Users,
  Settings,
  HardDrive,
  Save,
} from "lucide-react"
import { BackupRestore } from "@/components/admin/backup-restore"

export default function BackupPage() {
  const [isBackupRunning, setIsBackupRunning] = useState(false)
  const [backupProgress, setBackupProgress] = useState(0)
  const [isRestoreRunning, setIsRestoreRunning] = useState(false)
  const [restoreProgress, setRestoreProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [lastBackupDate, setLastBackupDate] = useState<Date | null>(new Date(Date.now() - 24 * 60 * 60 * 1000)) // 어제
  const [nextBackupDate, setNextBackupDate] = useState<Date | null>(new Date(Date.now() + 24 * 60 * 60 * 1000)) // 내일

  // 백업 시작 함수
  const startBackup = () => {
    setBackupProgress(0)
    setIsBackupRunning(true)

    // 백업 진행 시뮬레이션
    const interval = setInterval(() => {
      setBackupProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsBackupRunning(false)
          setLastBackupDate(new Date())
          return 100
        }
        return prev + 5
      })
    }, 300)
  }

  // 복원 시작 함수
  const startRestore = () => {
    if (!selectedFile) return

    setRestoreProgress(0)
    setIsRestoreRunning(true)

    // 복원 진행 시뮬레이션
    const interval = setInterval(() => {
      setRestoreProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsRestoreRunning(false)
          return 100
        }
        return prev + 4
      })
    }, 250)
  }

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  // 백업 기록 데이터 (모의 데이터)
  const backupHistory = [
    {
      id: "backup-1",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1일 전
      size: "156 MB",
      type: "full",
      status: "completed",
      items: {
        posts: 342,
        media: 1205,
        users: 87,
        settings: 24,
      },
    },
    {
      id: "backup-2",
      date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8일 전
      size: "148 MB",
      type: "full",
      status: "completed",
      items: {
        posts: 335,
        media: 1180,
        users: 85,
        settings: 24,
      },
    },
    {
      id: "backup-3",
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15일 전
      size: "142 MB",
      type: "full",
      status: "completed",
      items: {
        posts: 328,
        media: 1150,
        users: 82,
        settings: 24,
      },
    },
    {
      id: "backup-4",
      date: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000), // 22일 전
      size: "45 MB",
      type: "partial",
      status: "completed",
      items: {
        posts: 328,
        media: 0,
        users: 0,
        settings: 0,
      },
    },
    {
      id: "backup-5",
      date: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), // 29일 전
      size: "138 MB",
      type: "full",
      status: "failed",
      items: {
        posts: 0,
        media: 0,
        users: 0,
        settings: 0,
      },
    },
  ]

  // 날짜 포맷팅 함수
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date)
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-light">백업 및 복원</h1>
          <p className="text-muted-foreground">데이터 백업 및 복원을 관리합니다.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={startBackup} disabled={isBackupRunning}>
            <Database className="mr-2 h-4 w-4" />
            지금 백업하기
          </Button>
          <Button className="bg-point hover:bg-point/90" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            백업 설정
          </Button>
        </div>
      </div>

      {/* 백업 상태 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">마지막 백업</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lastBackupDate ? formatDate(lastBackupDate) : "없음"}</div>
            <div className="flex items-center mt-1">
              <Badge className="bg-green-500 text-white">성공</Badge>
              <span className="text-xs text-muted-foreground ml-2">전체 백업</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">다음 예정 백업</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nextBackupDate ? formatDate(nextBackupDate) : "예정된 백업 없음"}</div>
            <div className="flex items-center mt-1">
              <Badge variant="outline">자동 백업</Badge>
              <span className="text-xs text-muted-foreground ml-2">전체 백업</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">백업 저장소</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">로컬 서버</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">사용 가능한 공간: 1.2 TB</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 백업 및 복원 컴포넌트 */}
      <BackupRestore />

      {/* 백업 설정 */}
      <Card>
        <CardHeader>
          <CardTitle>백업 설정</CardTitle>
          <CardDescription>자동 백업 및 보관 설정을 구성합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="autoBackup">자동 백업</Label>
              <p className="text-sm text-muted-foreground">설정한 주기에 따라 자동으로 백업합니다.</p>
            </div>
            <Switch id="autoBackup" defaultChecked />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="backupFrequency">백업 주기</Label>
              <Select defaultValue="daily">
                <SelectTrigger id="backupFrequency">
                  <SelectValue placeholder="백업 주기 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">매시간</SelectItem>
                  <SelectItem value="daily">매일</SelectItem>
                  <SelectItem value="weekly">매주</SelectItem>
                  <SelectItem value="monthly">매월</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="backupTime">백업 시간</Label>
              <Select defaultValue="03:00">
                <SelectTrigger id="backupTime">
                  <SelectValue placeholder="백업 시간 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="00:00">00:00</SelectItem>
                  <SelectItem value="03:00">03:00</SelectItem>
                  <SelectItem value="06:00">06:00</SelectItem>
                  <SelectItem value="12:00">12:00</SelectItem>
                  <SelectItem value="18:00">18:00</SelectItem>
                  <SelectItem value="21:00">21:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="backupRetention">백업 보관 기간 (일)</Label>
            <Input id="backupRetention" type="number" min="1" max="365" defaultValue="30" />
            <p className="text-xs text-muted-foreground">지정된 기간이 지난 백업은 자동으로 삭제됩니다.</p>
          </div>

          <Separator />
          <h3 className="text-lg font-medium">백업 항목</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch id="backupPosts" defaultChecked />
              <Label htmlFor="backupPosts" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                게시물 및 페이지
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="backupMedia" defaultChecked />
              <Label htmlFor="backupMedia" className="flex items-center">
                <Image className="h-4 w-4 mr-2" />
                미디어 파일
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="backupUsers" defaultChecked />
              <Label htmlFor="backupUsers" className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                사용자 데이터
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="backupSettings" defaultChecked />
              <Label htmlFor="backupSettings" className="flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                시스템 설정
              </Label>
            </div>
          </div>

          <Separator />
          <h3 className="text-lg font-medium">백업 위치</h3>

          <div className="space-y-2">
            <Label htmlFor="backupLocation">백업 저장 위치</Label>
            <Select defaultValue="local">
              <SelectTrigger id="backupLocation">
                <SelectValue placeholder="백업 위치 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="local">로컬 서버</SelectItem>
                <SelectItem value="cloud">클라우드 스토리지</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cloudProvider">클라우드 제공업체</Label>
            <Select defaultValue="aws">
              <SelectTrigger id="cloudProvider">
                <SelectValue placeholder="클라우드 제공업체 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aws">Amazon S3</SelectItem>
                <SelectItem value="gcp">Google Cloud Storage</SelectItem>
                <SelectItem value="azure">Azure Blob Storage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="cloudApiKey">API 키</Label>
              <Input id="cloudApiKey" type="password" placeholder="••••••••••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cloudBucket">버킷 이름</Label>
              <Input id="cloudBucket" placeholder="my-backup-bucket" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-point hover:bg-point/90">
            <Save className="mr-2 h-4 w-4" />
            설정 저장
          </Button>
        </CardFooter>
      </Card>

      {/* 백업 기록 */}
      <Card>
        <CardHeader>
          <CardTitle>백업 기록</CardTitle>
          <CardDescription>이전 백업 파일을 다운로드하거나 관리하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {backupHistory.map((backup) => (
              <div
                key={backup.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border rounded-lg"
              >
                <div className="space-y-1 mb-2 sm:mb-0">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm font-medium">{formatDate(backup.date)}</span>
                    {backup.status === "completed" ? (
                      <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 ml-2 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Badge variant={backup.type === "full" ? "default" : "outline"} className="mr-2">
                      {backup.type === "full" ? "전체 백업" : "부분 백업"}
                    </Badge>
                    <Database className="h-3 w-3 mr-1" />
                    <span>{backup.size}</span>
                  </div>
                  {backup.status === "completed" && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {backup.items.posts > 0 && (
                        <Badge variant="outline" className="text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          게시물 {backup.items.posts}개
                        </Badge>
                      )}
                      {backup.items.media > 0 && (
                        <Badge variant="outline" className="text-xs">
                          <Image className="h-3 w-3 mr-1" />
                          미디어 {backup.items.media}개
                        </Badge>
                      )}
                      {backup.items.users > 0 && (
                        <Badge variant="outline" className="text-xs">
                          <Users className="h-3 w-3 mr-1" />
                          사용자 {backup.items.users}명
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex space-x-2 w-full sm:w-auto">
                  <Button variant="outline" size="sm" disabled={backup.status === "failed"}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" disabled={backup.status === "failed"}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                    삭제
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            모든 백업 기록 보기
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

