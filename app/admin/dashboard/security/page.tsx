"use client"

import { useState } from "react"
import { Shield, Lock, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

export default function SecurityPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [loginAttempts, setLoginAttempts] = useState("5")
  const [sessionTimeout, setSessionTimeout] = useState("30")
  const [passwordPolicy, setPasswordPolicy] = useState("strong")
  const [ipRestriction, setIpRestriction] = useState(false)
  const [allowedIps, setAllowedIps] = useState("192.168.1.1, 10.0.0.1")
  const [apiKeyRotation, setApiKeyRotation] = useState(true)
  const [auditLogRetention, setAuditLogRetention] = useState("90")
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveSettings = () => {
    setIsLoading(true)
    // 실제 구현에서는 API 호출을 통해 설정을 저장합니다
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "설정이 저장되었습니다",
        description: "보안 설정이 성공적으로 업데이트되었습니다.",
      })
    }, 1000)
  }

  const handleResetToDefault = () => {
    setTwoFactorEnabled(true)
    setLoginAttempts("5")
    setSessionTimeout("30")
    setPasswordPolicy("strong")
    setIpRestriction(false)
    setAllowedIps("192.168.1.1, 10.0.0.1")
    setApiKeyRotation(true)
    setAuditLogRetention("90")

    toast({
      title: "기본 설정으로 복원되었습니다",
      description: "모든 보안 설정이 기본값으로 재설정되었습니다.",
    })
  }

  const runSecurityScan = () => {
    setIsLoading(true)
    // 실제 구현에서는 보안 스캔을 실행합니다
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "보안 스캔 완료",
        description: "시스템 보안 스캔이 완료되었습니다. 취약점이 발견되지 않았습니다.",
        variant: "success",
      })
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">보안 설정</h1>
          <p className="text-muted-foreground">시스템 보안 설정을 관리하고 보안 정책을 구성하세요.</p>
        </div>
        <Button onClick={runSecurityScan} disabled={isLoading}>
          {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Shield className="mr-2 h-4 w-4" />}
          보안 스캔 실행
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">일반 보안</TabsTrigger>
          <TabsTrigger value="authentication">인증</TabsTrigger>
          <TabsTrigger value="network">네트워크</TabsTrigger>
          <TabsTrigger value="api">API 보안</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>일반 보안 설정</CardTitle>
              <CardDescription>기본 보안 설정을 구성하여 시스템을 보호하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="session-timeout" className="flex-1">
                  세션 타임아웃 (분)
                </Label>
                <Input
                  id="session-timeout"
                  type="number"
                  className="w-20"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="audit-log-retention" className="flex-1">
                  감사 로그 보존 기간 (일)
                </Label>
                <Input
                  id="audit-log-retention"
                  type="number"
                  className="w-20"
                  value={auditLogRetention}
                  onChange={(e) => setAuditLogRetention(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="api-key-rotation" checked={apiKeyRotation} onCheckedChange={setApiKeyRotation} />
                <Label htmlFor="api-key-rotation">API 키 자동 교체 (90일마다)</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>보안 상태</CardTitle>
              <CardDescription>현재 시스템의 보안 상태를 확인하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col p-4 border border-green-200 bg-gradient-to-br from-green-50 to-green-100/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-green-100 rounded-full mr-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="font-medium text-green-800">방화벽</h3>
                  </div>
                  <p className="text-sm text-green-700 ml-12">활성화됨</p>
                </div>

                <div className="flex flex-col p-4 border border-green-200 bg-gradient-to-br from-green-50 to-green-100/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-green-100 rounded-full mr-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="font-medium text-green-800">SSL/TLS 인증서</h3>
                  </div>
                  <p className="text-sm text-green-700 ml-12">유효함</p>
                </div>

                <div className="flex flex-col p-4 border border-green-200 bg-gradient-to-br from-green-50 to-green-100/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-green-100 rounded-full mr-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="font-medium text-green-800">보안 패치</h3>
                  </div>
                  <p className="text-sm text-green-700 ml-12">최신 버전 적용됨</p>
                </div>

                <div className="flex flex-col p-4 border border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-yellow-100 rounded-full mr-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    </div>
                    <h3 className="font-medium text-yellow-800">보안 스캔</h3>
                  </div>
                  <p className="text-sm text-yellow-700 ml-12">마지막 스캔: 30일 전</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="authentication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>인증 설정</CardTitle>
              <CardDescription>사용자 인증 및 접근 제어 설정을 구성하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="two-factor" checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                <Label htmlFor="two-factor">관리자 계정에 2단계 인증 필수</Label>
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="login-attempts" className="flex-1">
                  최대 로그인 시도 횟수
                </Label>
                <Input
                  id="login-attempts"
                  type="number"
                  className="w-20"
                  value={loginAttempts}
                  onChange={(e) => setLoginAttempts(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-policy">비밀번호 정책</Label>
                <Select value={passwordPolicy} onValueChange={setPasswordPolicy}>
                  <SelectTrigger id="password-policy">
                    <SelectValue placeholder="비밀번호 정책 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">기본 (최소 8자)</SelectItem>
                    <SelectItem value="medium">중간 (최소 10자, 숫자 포함)</SelectItem>
                    <SelectItem value="strong">강력 (최소 12자, 대소문자, 숫자, 특수문자 포함)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>네트워크 보안</CardTitle>
              <CardDescription>네트워크 접근 제어 및 IP 제한 설정을 구성하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="ip-restriction" checked={ipRestriction} onCheckedChange={setIpRestriction} />
                <Label htmlFor="ip-restriction">관리자 패널 IP 제한 활성화</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allowed-ips">허용된 IP 주소 (쉼표로 구분)</Label>
                <Input
                  id="allowed-ips"
                  placeholder="예: 192.168.1.1, 10.0.0.1"
                  value={allowedIps}
                  onChange={(e) => setAllowedIps(e.target.value)}
                  disabled={!ipRestriction}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API 보안</CardTitle>
              <CardDescription>API 접근 및 인증 설정을 구성하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>API 키</Label>
                <div className="flex space-x-2">
                  <Input value="sk_live_*****************************" readOnly className="font-mono" />
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    재생성
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">API 키를 재생성하면 이전 키는 즉시 무효화됩니다.</p>
              </div>

              <div className="space-y-2">
                <Label>API 요청 제한</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rate-limit">분당 요청 제한</Label>
                    <Input id="rate-limit" type="number" defaultValue="100" />
                  </div>
                  <div>
                    <Label htmlFor="burst-limit">버스트 제한</Label>
                    <Input id="burst-limit" type="number" defaultValue="200" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleResetToDefault}>
          기본값으로 재설정
        </Button>
        <Button onClick={handleSaveSettings} disabled={isLoading}>
          {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
          설정 저장
        </Button>
      </div>
    </div>
  )
}

