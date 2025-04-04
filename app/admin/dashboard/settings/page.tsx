"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Save, Trash2, RefreshCw, AlertTriangle, Check, Upload, Download, Database, Mail } from "lucide-react"
import { useData } from "@/lib/hooks/use-swr"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function SettingsPage() {
  const { data: settings, isLoading, mutate } = useData("/api/settings")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "",
    siteDescription: "",
    contactEmail: "",
    contactPhone: "",
    contactAddress: "",
    siteUrl: "",
    favicon: "",
    logo: "",
  })
  const [blogSettings, setBlogSettings] = useState({
    postsPerPage: "10",
    allowComments: true,
    moderateComments: true,
    defaultCategory: "AI",
    showAuthor: true,
    showDate: true,
    showShareButtons: true,
    excerptLength: "150",
  })
  const [userSettings, setUserSettings] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuth: false,
    emailNotifications: true,
  })
  const [advancedSettings, setAdvancedSettings] = useState({
    enableCache: true,
    cacheLifetime: "3600",
    debugMode: false,
    maintenanceMode: false,
    analyticsId: "",
    customCss: "",
    customJs: "",
    robotsTxt: "",
    sitemapEnabled: true,
  })
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
    smtpEncryption: "tls",
    fromEmail: "",
    fromName: "",
    testEmail: "",
  })
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    backupRetention: "7",
    backupLocation: "local",
    cloudProvider: "",
    cloudApiKey: "",
    cloudBucket: "",
  })
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: "#7124d7",
    secondaryColor: "#9a65ff",
    fontPrimary: "Pretendard",
    fontSecondary: "",
    borderRadius: "1rem",
    buttonStyle: "rounded",
    darkMode: "system",
    customTheme: false,
  })

  // 데이터가 로드되면 상태 업데이트
  useEffect(() => {
    if (settings) {
      setGeneralSettings({
        siteName: settings.general?.siteName || "",
        siteDescription: settings.general?.siteDescription || "",
        contactEmail: settings.general?.contactEmail || "",
        contactPhone: settings.general?.contactPhone || "",
        contactAddress: settings.general?.contactAddress || "",
        siteUrl: settings.general?.siteUrl || "",
        favicon: settings.general?.favicon || "",
        logo: settings.general?.logo || "",
      })
      setBlogSettings({
        postsPerPage: settings.blog?.postsPerPage || "10",
        allowComments: settings.blog?.allowComments ?? true,
        moderateComments: settings.blog?.moderateComments ?? true,
        defaultCategory: settings.blog?.defaultCategory || "AI",
        showAuthor: settings.blog?.showAuthor ?? true,
        showDate: settings.blog?.showDate ?? true,
        showShareButtons: settings.blog?.showShareButtons ?? true,
        excerptLength: settings.blog?.excerptLength || "150",
      })
      setAdvancedSettings({
        enableCache: settings.advanced?.enableCache ?? true,
        cacheLifetime: settings.advanced?.cacheLifetime || "3600",
        debugMode: settings.advanced?.debugMode ?? false,
        maintenanceMode: settings.advanced?.maintenanceMode ?? false,
        analyticsId: settings.advanced?.analyticsId || "",
        customCss: settings.advanced?.customCss || "",
        customJs: settings.advanced?.customJs || "",
        robotsTxt: settings.advanced?.robotsTxt || "",
        sitemapEnabled: settings.advanced?.sitemapEnabled ?? true,
      })
      setEmailSettings({
        smtpHost: settings.email?.smtpHost || "",
        smtpPort: settings.email?.smtpPort || "587",
        smtpUsername: settings.email?.smtpUsername || "",
        smtpPassword: settings.email?.smtpPassword || "",
        smtpEncryption: settings.email?.smtpEncryption || "tls",
        fromEmail: settings.email?.fromEmail || "",
        fromName: settings.email?.fromName || "",
        testEmail: settings.email?.testEmail || "",
      })
      setBackupSettings({
        autoBackup: settings.backup?.autoBackup ?? true,
        backupFrequency: settings.backup?.backupFrequency || "daily",
        backupRetention: settings.backup?.backupRetention || "7",
        backupLocation: settings.backup?.backupLocation || "local",
        cloudProvider: settings.backup?.cloudProvider || "",
        cloudApiKey: settings.backup?.cloudApiKey || "",
        cloudBucket: settings.backup?.cloudBucket || "",
      })
      setThemeSettings({
        primaryColor: settings.theme?.primaryColor || "#7124d7",
        secondaryColor: settings.theme?.secondaryColor || "#9a65ff",
        fontPrimary: settings.theme?.fontPrimary || "Pretendard",
        fontSecondary: settings.theme?.fontSecondary || "",
        borderRadius: settings.theme?.borderRadius || "1rem",
        buttonStyle: settings.theme?.buttonStyle || "rounded",
        darkMode: settings.theme?.darkMode || "system",
        customTheme: settings.theme?.customTheme ?? false,
      })
      setUserSettings({
        username: settings.user?.username || "",
        email: settings.user?.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        twoFactorAuth: settings.user?.twoFactorAuth ?? false,
        emailNotifications: settings.user?.emailNotifications ?? true,
      })
    }
  }, [settings])

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlogChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBlogSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlogSwitchChange = (name: string, checked: boolean) => {
    setBlogSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleBlogSelectChange = (name: string, value: string) => {
    setBlogSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleUserSwitchChange = (name: string, checked: boolean) => {
    setUserSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleAdvancedChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAdvancedSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleAdvancedSwitchChange = (name: string, checked: boolean) => {
    setAdvancedSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEmailSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleEmailSelectChange = (name: string, value: string) => {
    setEmailSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleBackupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBackupSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleBackupSwitchChange = (name: string, checked: boolean) => {
    setBackupSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleBackupSelectChange = (name: string, value: string) => {
    setBackupSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setThemeSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleThemeSwitchChange = (name: string, checked: boolean) => {
    setThemeSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleThemeSelectChange = (name: string, value: string) => {
    setThemeSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSaveSuccess(false)
    setSaveError(false)

    try {
      // 실제 구현에서는 여기에 API 호출 코드가 들어갑니다.
      console.log("Saving settings:", {
        generalSettings,
        blogSettings,
        userSettings,
        advancedSettings,
        emailSettings,
        backupSettings,
        themeSettings,
      })

      // 모의 업데이트 처리 (실제 구현에서는 API 호출로 대체)
      const updatedSettings = {
        ...settings,
        general: generalSettings,
        blog: blogSettings,
        advanced: advancedSettings,
        email: emailSettings,
        backup: backupSettings,
        theme: themeSettings,
        user: {
          username: userSettings.username,
          email: userSettings.email,
          twoFactorAuth: userSettings.twoFactorAuth,
          emailNotifications: userSettings.emailNotifications,
        },
      }

      // 설정 업데이트
      mutate(updatedSettings, false)

      // 성공적으로 저장되었다고 가정하고 2초 후 제출 상태 초기화
      setTimeout(() => {
        setIsSubmitting(false)
        setSaveSuccess(true)
        // 비밀번호 필드 초기화
        setUserSettings((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }))

        // 성공 메시지 5초 후 사라짐
        setTimeout(() => {
          setSaveSuccess(false)
        }, 5000)
      }, 2000)
    } catch (error) {
      console.error("Error saving settings:", error)
      setIsSubmitting(false)
      setSaveError(true)

      // 에러 메시지 5초 후 사라짐
      setTimeout(() => {
        setSaveError(false)
      }, 5000)
    }
  }

  const handleClearCache = () => {
    // 실제 구현에서는 여기에 캐시 초기화 API 호출 코드가 들어갑니다.
    console.log("Clearing cache")

    // 성공 메시지 표시
    setSaveSuccess(true)
    setTimeout(() => {
      setSaveSuccess(false)
    }, 5000)
  }

  const handleTestEmail = () => {
    // 실제 구현에서는 여기에 테스트 이메일 전송 API 호출 코드가 들어갑니다.
    console.log("Sending test email to:", emailSettings.testEmail)

    // 성공 메시지 표시
    setSaveSuccess(true)
    setTimeout(() => {
      setSaveSuccess(false)
    }, 5000)
  }

  const handleBackupNow = () => {
    // 실제 구현에서는 여기에 백업 API 호출 코드가 들어갑니다.
    console.log("Starting backup...")

    // 성공 메시지 표시
    setSaveSuccess(true)
    setTimeout(() => {
      setSaveSuccess(false)
    }, 5000)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-light">설정</h1>
          <p className="text-muted-foreground">웹사이트 및 관리자 계정 설정을 관리하세요.</p>
        </div>

        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">일반</TabsTrigger>
            <TabsTrigger value="blog">블로그</TabsTrigger>
            <TabsTrigger value="user">사용자</TabsTrigger>
            <TabsTrigger value="advanced">고급</TabsTrigger>
            <TabsTrigger value="email">이메일</TabsTrigger>
            <TabsTrigger value="backup">백업</TabsTrigger>
            <TabsTrigger value="theme">테마</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>일반 설정</CardTitle>
                <CardDescription>웹사이트의 기본 정보를 설정합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-24 w-full" />
                </div>
                <Separator />
                <Skeleton className="h-6 w-40" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-24" />
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-light">설정</h1>
          <p className="text-muted-foreground">웹사이트 및 관리자 계정 설정을 관리하세요.</p>
        </div>
        <Button type="button" className="bg-point hover:bg-point/90" disabled={isSubmitting} onClick={handleSubmit}>
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? "저장 중..." : "모든 설정 저장"}
        </Button>
      </div>

      {saveSuccess && (
        <Alert className="bg-green-500/10 text-green-500 border-green-500/50">
          <Check className="h-4 w-4" />
          <AlertTitle>성공</AlertTitle>
          <AlertDescription>설정이 성공적으로 저장되었습니다.</AlertDescription>
        </Alert>
      )}

      {saveError && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>오류</AlertTitle>
          <AlertDescription>설정을 저장하는 중 오류가 발생했습니다. 다시 시도해주세요.</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="general">일반</TabsTrigger>
          <TabsTrigger value="blog">블로그</TabsTrigger>
          <TabsTrigger value="user">사용자</TabsTrigger>
          <TabsTrigger value="email">이메일</TabsTrigger>
          <TabsTrigger value="theme">테마</TabsTrigger>
          <TabsTrigger value="backup">백업</TabsTrigger>
          <TabsTrigger value="advanced">고급</TabsTrigger>
        </TabsList>

        {/* 일반 설정 */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>일반 설정</CardTitle>
              <CardDescription>웹사이트의 기본 정보를 설정합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteName">사이트 이름</Label>
                <Input id="siteName" name="siteName" value={generalSettings.siteName} onChange={handleGeneralChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">사이트 설명</Label>
                <Textarea
                  id="siteDescription"
                  name="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={handleGeneralChange}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteUrl">사이트 URL</Label>
                <Input
                  id="siteUrl"
                  name="siteUrl"
                  value={generalSettings.siteUrl}
                  onChange={handleGeneralChange}
                  placeholder="https://example.com"
                />
              </div>

              <Separator />
              <h3 className="text-lg font-medium">연락처 정보</h3>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">이메일</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={generalSettings.contactEmail}
                  onChange={handleGeneralChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">전화번호</Label>
                <Input
                  id="contactPhone"
                  name="contactPhone"
                  value={generalSettings.contactPhone}
                  onChange={handleGeneralChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactAddress">주소</Label>
                <Input
                  id="contactAddress"
                  name="contactAddress"
                  value={generalSettings.contactAddress}
                  onChange={handleGeneralChange}
                />
              </div>

              <Separator />
              <h3 className="text-lg font-medium">사이트 아이덴티티</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="logo">로고</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="logo"
                      name="logo"
                      value={generalSettings.logo}
                      onChange={handleGeneralChange}
                      placeholder="/images/logo.png"
                    />
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      업로드
                    </Button>
                  </div>
                  {generalSettings.logo && (
                    <div className="mt-2 p-4 border rounded-md flex items-center justify-center bg-muted">
                      <img
                        src={generalSettings.logo || "/placeholder.svg?height=40&width=120&text=로고"}
                        alt="로고 미리보기"
                        className="max-h-10"
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="favicon">파비콘</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="favicon"
                      name="favicon"
                      value={generalSettings.favicon}
                      onChange={handleGeneralChange}
                      placeholder="/favicon.ico"
                    />
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      업로드
                    </Button>
                  </div>
                  {generalSettings.favicon && (
                    <div className="mt-2 p-4 border rounded-md flex items-center justify-center bg-muted">
                      <img
                        src={generalSettings.favicon || "/placeholder.svg?height=32&width=32&text=파비콘"}
                        alt="파비콘 미리보기"
                        className="h-8 w-8"
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="button"
                className="bg-point hover:bg-point/90"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "저장 중..." : "저장"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 블로그 설정 */}
        <TabsContent value="blog">
          <Card>
            <CardHeader>
              <CardTitle>블로그 설정</CardTitle>
              <CardDescription>블로그 관련 설정을 관리합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="postsPerPage">페이지당 포스트 수</Label>
                  <Input
                    id="postsPerPage"
                    name="postsPerPage"
                    type="number"
                    min="1"
                    max="50"
                    value={blogSettings.postsPerPage}
                    onChange={handleBlogChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerptLength">요약 길이 (글자 수)</Label>
                  <Input
                    id="excerptLength"
                    name="excerptLength"
                    type="number"
                    min="50"
                    max="500"
                    value={blogSettings.excerptLength}
                    onChange={handleBlogChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultCategory">기본 카테고리</Label>
                <Select
                  value={blogSettings.defaultCategory}
                  onValueChange={(value) => handleBlogSelectChange("defaultCategory", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="기본 카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AI">AI</SelectItem>
                    <SelectItem value="마케팅">마케팅</SelectItem>
                    <SelectItem value="디자인">디자인</SelectItem>
                    <SelectItem value="개발">개발</SelectItem>
                    <SelectItem value="콘텐츠">콘텐츠</SelectItem>
                    <SelectItem value="운영">운영</SelectItem>
                    <SelectItem value="데이터">데이터</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />
              <h3 className="text-lg font-medium">표시 설정</h3>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showAuthor">작성자 표시</Label>
                  <p className="text-sm text-muted-foreground">블로그 포스트에 작성자 정보를 표시합니다.</p>
                </div>
                <Switch
                  id="showAuthor"
                  checked={blogSettings.showAuthor}
                  onCheckedChange={(checked) => handleBlogSwitchChange("showAuthor", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showDate">날짜 표시</Label>
                  <p className="text-sm text-muted-foreground">블로그 포스트에 작성 날짜를 표시합니다.</p>
                </div>
                <Switch
                  id="showDate"
                  checked={blogSettings.showDate}
                  onCheckedChange={(checked) => handleBlogSwitchChange("showDate", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showShareButtons">공유 버튼 표시</Label>
                  <p className="text-sm text-muted-foreground">블로그 포스트에 소셜 미디어 공유 버튼을 표시합니다.</p>
                </div>
                <Switch
                  id="showShareButtons"
                  checked={blogSettings.showShareButtons}
                  onCheckedChange={(checked) => handleBlogSwitchChange("showShareButtons", checked)}
                />
              </div>

              <Separator />
              <h3 className="text-lg font-medium">댓글 설정</h3>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allowComments">댓글 허용</Label>
                  <p className="text-sm text-muted-foreground">블로그 포스트에 댓글을 허용합니다.</p>
                </div>
                <Switch
                  id="allowComments"
                  checked={blogSettings.allowComments}
                  onCheckedChange={(checked) => handleBlogSwitchChange("allowComments", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="moderateComments">댓글 검토</Label>
                  <p className="text-sm text-muted-foreground">댓글을 게시하기 전에 검토합니다.</p>
                </div>
                <Switch
                  id="moderateComments"
                  checked={blogSettings.moderateComments}
                  onCheckedChange={(checked) => handleBlogSwitchChange("moderateComments", checked)}
                  disabled={!blogSettings.allowComments}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="button"
                className="bg-point hover:bg-point/90"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "저장 중..." : "저장"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 사용자 설정 */}
        <TabsContent value="user">
          <Card>
            <CardHeader>
              <CardTitle>사용자 설정</CardTitle>
              <CardDescription>관리자 계정 정보를 관리합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">사용자 이름</Label>
                <Input id="username" name="username" value={userSettings.username} onChange={handleUserChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input id="email" name="email" type="email" value={userSettings.email} onChange={handleUserChange} />
              </div>

              <Separator />
              <h3 className="text-lg font-medium">보안 설정</h3>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="twoFactorAuth">2단계 인증</Label>
                  <p className="text-sm text-muted-foreground">로그인 시 2단계 인증을 사용합니다.</p>
                </div>
                <Switch
                  id="twoFactorAuth"
                  checked={userSettings.twoFactorAuth}
                  onCheckedChange={(checked) => handleUserSwitchChange("twoFactorAuth", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">이메일 알림</Label>
                  <p className="text-sm text-muted-foreground">중요한 알림을 이메일로 받습니다.</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={userSettings.emailNotifications}
                  onCheckedChange={(checked) => handleUserSwitchChange("emailNotifications", checked)}
                />
              </div>

              <Separator />
              <h3 className="text-lg font-medium">비밀번호 변경</h3>

              <div className="space-y-2">
                <Label htmlFor="currentPassword">현재 비밀번호</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={userSettings.currentPassword}
                  onChange={handleUserChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">새 비밀번호</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={userSettings.newPassword}
                  onChange={handleUserChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={userSettings.confirmPassword}
                  onChange={handleUserChange}
                />
                {userSettings.newPassword &&
                  userSettings.confirmPassword &&
                  userSettings.newPassword !== userSettings.confirmPassword && (
                    <p className="text-sm text-red-500">비밀번호가 일치하지 않습니다.</p>
                  )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="button"
                className="bg-point hover:bg-point/90"
                disabled={
                  isSubmitting ||
                  (userSettings.newPassword !== "" && userSettings.newPassword !== userSettings.confirmPassword)
                }
                onClick={handleSubmit}
              >
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "저장 중..." : "저장"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 이메일 설정 */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>이메일 설정</CardTitle>
              <CardDescription>이메일 발송 설정을 관리합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP 호스트</Label>
                  <Input
                    id="smtpHost"
                    name="smtpHost"
                    value={emailSettings.smtpHost}
                    onChange={handleEmailChange}
                    placeholder="smtp.example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP 포트</Label>
                  <Input
                    id="smtpPort"
                    name="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={handleEmailChange}
                    placeholder="587"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP 사용자 이름</Label>
                  <Input
                    id="smtpUsername"
                    name="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={handleEmailChange}
                    placeholder="username@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP 비밀번호</Label>
                  <Input
                    id="smtpPassword"
                    name="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={handleEmailChange}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtpEncryption">암호화 방식</Label>
                <Select
                  value={emailSettings.smtpEncryption}
                  onValueChange={(value) => handleEmailSelectChange("smtpEncryption", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="암호화 방식 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tls">TLS</SelectItem>
                    <SelectItem value="ssl">SSL</SelectItem>
                    <SelectItem value="none">없음</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />
              <h3 className="text-lg font-medium">발신자 정보</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">발신자 이메일</Label>
                  <Input
                    id="fromEmail"
                    name="fromEmail"
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={handleEmailChange}
                    placeholder="noreply@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromName">발신자 이름</Label>
                  <Input
                    id="fromName"
                    name="fromName"
                    value={emailSettings.fromName}
                    onChange={handleEmailChange}
                    placeholder="GVine PRO"
                  />
                </div>
              </div>

              <Separator />
              <h3 className="text-lg font-medium">테스트 이메일</h3>

              <div className="flex items-end gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="testEmail">테스트 이메일 주소</Label>
                  <Input
                    id="testEmail"
                    name="testEmail"
                    type="email"
                    value={emailSettings.testEmail}
                    onChange={handleEmailChange}
                    placeholder="test@example.com"
                  />
                </div>
                <Button type="button" variant="outline" onClick={handleTestEmail} disabled={!emailSettings.testEmail}>
                  <Mail className="mr-2 h-4 w-4" />
                  테스트 이메일 보내기
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="button"
                className="bg-point hover:bg-point/90"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "저장 중..." : "저장"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 테마 설정 */}
        <TabsContent value="theme">
          <Card>
            <CardHeader>
              <CardTitle>테마 설정</CardTitle>
              <CardDescription>웹사이트의 디자인 및 테마를 설정합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="customTheme">커스텀 테마 사용</Label>
                  <p className="text-sm text-muted-foreground">기본 테마 대신 커스텀 테마를 사용합니다.</p>
                </div>
                <Switch
                  id="customTheme"
                  checked={themeSettings.customTheme}
                  onCheckedChange={(checked) => handleThemeSwitchChange("customTheme", checked)}
                />
              </div>

              <Separator />
              <h3 className="text-lg font-medium">색상</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">주 색상</Label>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: themeSettings.primaryColor }}
                    ></div>
                    <Input
                      id="primaryColor"
                      name="primaryColor"
                      type="text"
                      value={themeSettings.primaryColor}
                      onChange={handleThemeChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">보조 색상</Label>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: themeSettings.secondaryColor }}
                    ></div>
                    <Input
                      id="secondaryColor"
                      name="secondaryColor"
                      type="text"
                      value={themeSettings.secondaryColor}
                      onChange={handleThemeChange}
                    />
                  </div>
                </div>
              </div>

              <Separator />
              <h3 className="text-lg font-medium">폰트</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fontPrimary">기본 폰트</Label>
                  <Select
                    value={themeSettings.fontPrimary}
                    onValueChange={(value) => handleThemeSelectChange("fontPrimary", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="기본 폰트 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pretendard">Pretendard</SelectItem>
                      <SelectItem value="Noto Sans KR">Noto Sans KR</SelectItem>
                      <SelectItem value="Spoqa Han Sans Neo">Spoqa Han Sans Neo</SelectItem>
                      <SelectItem value="Nanum Gothic">Nanum Gothic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fontSecondary">보조 폰트</Label>
                  <Select
                    value={themeSettings.fontSecondary}
                    onValueChange={(value) => handleThemeSelectChange("fontSecondary", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="보조 폰트 선택 (선택사항)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">없음</SelectItem>
                      <SelectItem value="Pretendard">Pretendard</SelectItem>
                      <SelectItem value="Noto Sans KR">Noto Sans KR</SelectItem>
                      <SelectItem value="Spoqa Han Sans Neo">Spoqa Han Sans Neo</SelectItem>
                      <SelectItem value="Nanum Gothic">Nanum Gothic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />
              <h3 className="text-lg font-medium">UI 스타일</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="borderRadius">테두리 둥글기</Label>
                  <Input
                    id="borderRadius"
                    name="borderRadius"
                    value={themeSettings.borderRadius}
                    onChange={handleThemeChange}
                    placeholder="1rem"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buttonStyle">버튼 스타일</Label>
                  <Select
                    value={themeSettings.buttonStyle}
                    onValueChange={(value) => handleThemeSelectChange("buttonStyle", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="버튼 스타일 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rounded">둥근 모서리</SelectItem>
                      <SelectItem value="square">각진 모서리</SelectItem>
                      <SelectItem value="pill">알약형</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="darkMode">다크 모드</Label>
                <Select
                  value={themeSettings.darkMode}
                  onValueChange={(value) => handleThemeSelectChange("darkMode", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="다크 모드 설정" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">항상 라이트 모드</SelectItem>
                    <SelectItem value="dark">항상 다크 모드</SelectItem>
                    <SelectItem value="system">시스템 설정에 따름</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />
              <h3 className="text-lg font-medium">테마 미리보기</h3>

              <div className="p-6 border rounded-lg bg-secondary/20">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <div
                      className="h-10 rounded-lg flex items-center justify-center px-4 text-white"
                      style={{
                        backgroundColor: themeSettings.primaryColor,
                        borderRadius:
                          themeSettings.buttonStyle === "pill"
                            ? "9999px"
                            : themeSettings.buttonStyle === "square"
                              ? "0.25rem"
                              : themeSettings.borderRadius,
                      }}
                    >
                      기본 버튼
                    </div>
                    <div
                      className="h-10 rounded-lg flex items-center justify-center px-4 border"
                      style={{
                        borderRadius:
                          themeSettings.buttonStyle === "pill"
                            ? "9999px"
                            : themeSettings.buttonStyle === "square"
                              ? "0.25rem"
                              : themeSettings.borderRadius,
                      }}
                    >
                      보조 버튼
                    </div>
                  </div>
                  <div
                    className="p-4 rounded-lg border"
                    style={{
                      borderRadius: themeSettings.borderRadius,
                      fontFamily: themeSettings.fontPrimary,
                    }}
                  >
                    <h4 className="text-lg font-medium mb-2">카드 제목</h4>
                    <p className="text-sm text-muted-foreground">
                      이것은 선택한 테마 설정이 적용된 카드 컴포넌트의 미리보기입니다.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: themeSettings.primaryColor }}></div>
                    <span style={{ fontFamily: themeSettings.fontPrimary }}>주 색상</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: themeSettings.secondaryColor }}
                    ></div>
                    <span style={{ fontFamily: themeSettings.fontPrimary }}>보조 색상</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="button"
                className="bg-point hover:bg-point/90"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "저장 중..." : "저장"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 백업 설정 */}
        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>백업 설정</CardTitle>
              <CardDescription>데이터 백업 및 복원 설정을 관리합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoBackup">자동 백업</Label>
                  <p className="text-sm text-muted-foreground">설정한 주기에 따라 자동으로 백업합니다.</p>
                </div>
                <Switch
                  id="autoBackup"
                  checked={backupSettings.autoBackup}
                  onCheckedChange={(checked) => handleBackupSwitchChange("autoBackup", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backupFrequency">백업 주기</Label>
                <Select
                  value={backupSettings.backupFrequency}
                  onValueChange={(value) => handleBackupSelectChange("backupFrequency", value)}
                  disabled={!backupSettings.autoBackup}
                >
                  <SelectTrigger>
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
                <Label htmlFor="backupRetention">백업 보관 기간 (일)</Label>
                <Input
                  id="backupRetention"
                  name="backupRetention"
                  type="number"
                  min="1"
                  max="365"
                  value={backupSettings.backupRetention}
                  onChange={handleBackupChange}
                  disabled={!backupSettings.autoBackup}
                />
              </div>

              <Separator />
              <h3 className="text-lg font-medium">백업 위치</h3>

              <div className="space-y-2">
                <Label htmlFor="backupLocation">백업 저장 위치</Label>
                <Select
                  value={backupSettings.backupLocation}
                  onValueChange={(value) => handleBackupSelectChange("backupLocation", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="백업 위치 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">로컬 서버</SelectItem>
                    <SelectItem value="cloud">클라우드 스토리지</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {backupSettings.backupLocation === "cloud" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="cloudProvider">클라우드 제공업체</Label>
                    <Select
                      value={backupSettings.cloudProvider}
                      onValueChange={(value) => handleBackupSelectChange("cloudProvider", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="클라우드 제공업체 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aws">Amazon S3</SelectItem>
                        <SelectItem value="gcp">Google Cloud Storage</SelectItem>
                        <SelectItem value="azure">Azure Blob Storage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cloudApiKey">API 키</Label>
                    <Input
                      id="cloudApiKey"
                      name="cloudApiKey"
                      type="password"
                      value={backupSettings.cloudApiKey}
                      onChange={handleBackupChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cloudBucket">버킷 이름</Label>
                    <Input
                      id="cloudBucket"
                      name="cloudBucket"
                      value={backupSettings.cloudBucket}
                      onChange={handleBackupChange}
                    />
                  </div>
                </>
              )}

              <Separator />
              <h3 className="text-lg font-medium">백업 관리</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>수동 백업</Label>
                  <Button variant="outline" className="w-full" onClick={handleBackupNow}>
                    <Database className="mr-2 h-4 w-4" />
                    지금 백업하기
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>백업 복원</Label>
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    백업 파일에서 복원
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>백업 다운로드</Label>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  최신 백업 다운로드
                </Button>
              </div>

              <Separator />
              <h3 className="text-lg font-medium">백업 기록</h3>

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="px-4 py-2 text-left">날짜</th>
                      <th className="px-4 py-2 text-left">크기</th>
                      <th className="px-4 py-2 text-left">상태</th>
                      <th className="px-4 py-2 text-right">작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-2">2023-08-20 03:15</td>
                      <td className="px-4 py-2">24.5 MB</td>
                      <td className="px-4 py-2">
                        <Badge className="bg-green-500">성공</Badge>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">2023-08-19 03:15</td>
                      <td className="px-4 py-2">24.2 MB</td>
                      <td className="px-4 py-2">
                        <Badge className="bg-green-500">성공</Badge>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">2023-08-18 03:15</td>
                      <td className="px-4 py-2">23.8 MB</td>
                      <td className="px-4 py-2">
                        <Badge className="bg-green-500">성공</Badge>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="button"
                className="bg-point hover:bg-point/90"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "저장 중..." : "저장"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 고급 설정 */}
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>고급 설정</CardTitle>
              <CardDescription>시스템 및 성능 관련 고급 설정을 관리합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="bg-yellow-500/10 text-yellow-500 border-yellow-500/50">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>주의</AlertTitle>
                <AlertDescription>
                  고급 설정은 시스템 성능과 안정성에 영향을 줄 수 있습니다. 변경 시 주의하세요.
                </AlertDescription>
              </Alert>

              <Accordion type="single" collapsible>
                <AccordionItem value="cache">
                  <AccordionTrigger>캐시 설정</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enableCache">캐시 활성화</Label>
                        <p className="text-sm text-muted-foreground">
                          페이지 로딩 속도를 향상시키기 위해 캐시를 사용합니다.
                        </p>
                      </div>
                      <Switch
                        id="enableCache"
                        checked={advancedSettings.enableCache}
                        onCheckedChange={(checked) => handleAdvancedSwitchChange("enableCache", checked)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cacheLifetime">캐시 수명 (초)</Label>
                      <Input
                        id="cacheLifetime"
                        name="cacheLifetime"
                        type="number"
                        min="60"
                        max="86400"
                        value={advancedSettings.cacheLifetime}
                        onChange={handleAdvancedChange}
                        disabled={!advancedSettings.enableCache}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" onClick={handleClearCache}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        캐시 초기화
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="system">
                  <AccordionTrigger>시스템 모드</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="debugMode">디버그 모드</Label>
                        <p className="text-sm text-muted-foreground">개발자를 위한 디버그 정보를 표시합니다.</p>
                      </div>
                      <Switch
                        id="debugMode"
                        checked={advancedSettings.debugMode}
                        onCheckedChange={(checked) => handleAdvancedSwitchChange("debugMode", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="maintenanceMode">유지보수 모드</Label>
                        <p className="text-sm text-muted-foreground">사이트를 유지보수 모드로 전환합니다.</p>
                      </div>
                      <Switch
                        id="maintenanceMode"
                        checked={advancedSettings.maintenanceMode}
                        onCheckedChange={(checked) => handleAdvancedSwitchChange("maintenanceMode", checked)}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="analytics">
                  <AccordionTrigger>분석 및 통합</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="analyticsId">Google Analytics ID</Label>
                      <Input
                        id="analyticsId"
                        name="analyticsId"
                        value={advancedSettings.analyticsId}
                        onChange={handleAdvancedChange}
                        placeholder="UA-XXXXXXXXX-X 또는 G-XXXXXXXXXX"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="seo">
                  <AccordionTrigger>SEO 설정</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sitemapEnabled">사이트맵 활성화</Label>
                        <p className="text-sm text-muted-foreground">자동으로 사이트맵을 생성합니다.</p>
                      </div>
                      <Switch
                        id="sitemapEnabled"
                        checked={advancedSettings.sitemapEnabled}
                        onCheckedChange={(checked) => handleAdvancedSwitchChange("sitemapEnabled", checked)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="robotsTxt">robots.txt</Label>
                      <Textarea
                        id="robotsTxt"
                        name="robotsTxt"
                        value={advancedSettings.robotsTxt}
                        onChange={handleAdvancedChange}
                        rows={5}
                        placeholder="User-agent: *
Allow: /
Disallow: /admin/"
                        className="font-mono text-sm"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="custom-code">
                  <AccordionTrigger>사용자 정의 코드</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="customCss">사용자 정의 CSS</Label>
                      <Textarea
                        id="customCss"
                        name="customCss"
                        value={advancedSettings.customCss}
                        onChange={handleAdvancedChange}
                        rows={5}
                        placeholder="/* 사용자 정의 CSS 코드 */"
                        className="font-mono text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customJs">사용자 정의 JavaScript</Label>
                      <Textarea
                        id="customJs"
                        name="customJs"
                        value={advancedSettings.customJs}
                        onChange={handleAdvancedChange}
                        rows={5}
                        placeholder="// 사용자 정의 JavaScript 코드"
                        className="font-mono text-sm"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Separator />
              <h3 className="text-lg font-medium">시스템 관리</h3>

              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">캐시 초기화</h4>
                    <p className="text-xs text-muted-foreground">모든 캐시 데이터를 초기화합니다.</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleClearCache}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    초기화
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">데이터베이스 백업</h4>
                    <p className="text-xs text-muted-foreground">현재 데이터베이스 상태를 백업합니다.</p>
                  </div>
                  <Button variant="outline" size="sm">
                    백업
                  </Button>
                </div>

                <AlertDialog>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-red-500">데이터 초기화</h4>
                      <p className="text-xs text-muted-foreground">모든 데이터를 초기 상태로 되돌립니다.</p>
                    </div>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        초기화
                      </Button>
                    </AlertDialogTrigger>
                  </div>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>데이터 초기화</AlertDialogTitle>
                      <AlertDialogDescription>
                        정말로 모든 데이터를 초기화하시겠습니까? 이 작업은 되돌릴 수 없으며, 모든 포스트, 구독 신청,
                        문의 내용 등이 삭제됩니다.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>취소</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-500 hover:bg-red-600">초기화</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="button"
                className="bg-point hover:bg-point/90"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "저장 중..." : "저장"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

