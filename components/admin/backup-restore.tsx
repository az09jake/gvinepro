"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import {
  Download,
  Upload,
  Calendar,
  Database,
  FileText,
  Image,
  Settings,
  Users,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// 백업 기록 타입 정의
interface BackupHistory {
  id: string
  date: Date
  size: string
  type: "full" | "partial"
  status: "completed" | "failed"
  items: {
    posts: number
    media: number
    users: number
    settings: number
  }
}

// 샘플 백업 기록
const sampleBackupHistory: BackupHistory[] = [
  {
    id: "backup-1",
    date: new Date(2023, 3, 15, 3, 30),
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
    date: new Date(2023, 3, 8, 3, 30),
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
    date: new Date(2023, 3, 1, 3, 30),
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
    date: new Date(2023, 2, 25, 15, 45),
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
    date: new Date(2023, 2, 20, 3, 30),
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

export function BackupRestore() {
  const [backupProgress, setBackupProgress] = useState(0)
  const [restoreProgress, setRestoreProgress] = useState(0)
  const [isBackupRunning, setIsBackupRunning] = useState(false)
  const [isRestoreRunning, setIsRestoreRunning] = useState(false)
  const [backupOptions, setBackupOptions] = useState({
    posts: true,
    media: true,
    users: true,
    settings: true,
    compress: true,
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

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

  return (
    <Tabs defaultValue="backup" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="backup">백업</TabsTrigger>
        <TabsTrigger value="restore">복원</TabsTrigger>
      </TabsList>

      <TabsContent value="backup" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>데이터 백업</CardTitle>
            <CardDescription>웹사이트의 데이터를 백업하여 안전하게 보관하세요.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">백업 옵션</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="posts"
                    checked={backupOptions.posts}
                    onCheckedChange={(checked) => setBackupOptions({ ...backupOptions, posts: checked })}
                  />
                  <Label htmlFor="posts" className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    게시물 및 페이지
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="media"
                    checked={backupOptions.media}
                    onCheckedChange={(checked) => setBackupOptions({ ...backupOptions, media: checked })}
                  />
                  <Label htmlFor="media" className="flex items-center">
                    <Image className="h-4 w-4 mr-2" />
                    미디어 파일
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="users"
                    checked={backupOptions.users}
                    onCheckedChange={(checked) => setBackupOptions({ ...backupOptions, users: checked })}
                  />
                  <Label htmlFor="users" className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    사용자 데이터
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="settings"
                    checked={backupOptions.settings}
                    onCheckedChange={(checked) => setBackupOptions({ ...backupOptions, settings: checked })}
                  />
                  <Label htmlFor="settings" className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    시스템 설정
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">백업 설정</h3>
              <div className="flex items-center space-x-2">
                <Switch
                  id="compress"
                  checked={backupOptions.compress}
                  onCheckedChange={(checked) => setBackupOptions({ ...backupOptions, compress: checked })}
                />
                <Label htmlFor="compress">백업 파일 압축</Label>
              </div>
            </div>

            {isBackupRunning && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>백업 진행 중...</span>
                  <span>{backupProgress}%</span>
                </div>
                <Progress value={backupProgress} />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">자동 백업 설정</Button>
            <Button
              onClick={startBackup}
              disabled={
                isBackupRunning ||
                (!backupOptions.posts && !backupOptions.media && !backupOptions.users && !backupOptions.settings)
              }
            >
              <Download className="h-4 w-4 mr-2" />
              백업 시작
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>백업 기록</CardTitle>
            <CardDescription>이전 백업 파일을 다운로드하거나 관리하세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleBackupHistory.map((backup) => (
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
                        <AlertCircle className="h-4 w-4 ml-2 text-red-500" />
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
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                      삭제
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="restore" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>데이터 복원</CardTitle>
            <CardDescription>
              백업 파일에서 데이터를 복원합니다. 이 작업은 현재 데이터를 덮어쓸 수 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="backup-file">백업 파일 선택</Label>
              <Input id="backup-file" type="file" accept=".zip,.json,.sql,.gz" onChange={handleFileChange} />
              {selectedFile && (
                <div className="text-sm text-muted-foreground">
                  선택된 파일: {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={startRestore} disabled={isRestoreRunning || !selectedFile}>
              <Upload className="h-4 w-4 mr-2" />
              데이터 복원 시작
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

