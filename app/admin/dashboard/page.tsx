"use client"

import { useState, useEffect } from "react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WidgetGallery, type WidgetType } from "@/components/admin/widget-gallery"
import { VisitorsChart } from "@/components/admin/dashboard-widgets/visitors-chart"
import { PageViewsWidget } from "@/components/admin/dashboard-widgets/page-views-widget"
import { TrafficSourcesWidget } from "@/components/admin/dashboard-widgets/traffic-sources-widget"
import { RecentPostsWidget } from "@/components/admin/dashboard-widgets/recent-posts-widget"
import { SystemStatusWidget } from "@/components/admin/dashboard-widgets/system-status-widget"
import { QuickActionsWidget } from "@/components/admin/dashboard-widgets/quick-actions-widget"
import { ClockWidget } from "@/components/admin/dashboard-widgets/clock-widget"
import { Plus, Save, Undo } from "lucide-react"

// 위젯 컴포넌트 매핑
const widgetComponents: Record<string, any> = {
  VisitorsChart,
  PageViewsWidget,
  TrafficSourcesWidget,
  RecentPostsWidget,
  SystemStatusWidget,
  QuickActionsWidget,
  ClockWidget,
}

// 드래그 앤 드롭을 위한 아이템 타입
const ItemTypes = {
  WIDGET: "widget",
}

// 드래그 가능한 위젯 래퍼 컴포넌트
const DraggableWidget = ({ id, index, moveWidget, children }: any) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.WIDGET,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: ItemTypes.WIDGET,
    hover(item: any) {
      if (item.index !== index) {
        moveWidget(item.index, index)
        item.index = index
      }
    },
  })

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="transition-opacity duration-200"
    >
      {children}
    </div>
  )
}

// 대시보드 페이지 컴포넌트
export default function DashboardPage() {
  // 위젯 상태 관리
  const [widgets, setWidgets] = useState<
    Array<{
      id: string
      component: string
      size: "sm" | "md" | "lg" | "xl"
    }>
  >([])

  // 로컬 스토리지에서 위젯 설정 불러오기
  useEffect(() => {
    const savedWidgets = localStorage.getItem("dashboard-widgets")
    if (savedWidgets) {
      try {
        setWidgets(JSON.parse(savedWidgets))
      } catch (error) {
        console.error("Failed to parse saved widgets:", error)
      }
    } else {
      // 기본 위젯 설정
      setWidgets([
        { id: "visitors-chart", component: "VisitorsChart", size: "md" },
        { id: "page-views", component: "PageViewsWidget", size: "md" },
        { id: "traffic-sources", component: "TrafficSourcesWidget", size: "md" },
        { id: "recent-posts", component: "RecentPostsWidget", size: "md" },
        { id: "system-status", component: "SystemStatusWidget", size: "md" },
        { id: "quick-actions", component: "QuickActionsWidget", size: "md" },
        { id: "clock", component: "ClockWidget", size: "sm" },
      ])
    }
  }, [])

  // 위젯 설정 저장
  const saveWidgetSettings = () => {
    localStorage.setItem("dashboard-widgets", JSON.stringify(widgets))
  }

  // 위젯 추가
  const addWidget = (widget: WidgetType) => {
    const newWidget = {
      id: `${widget.id}-${Date.now()}`,
      component: widget.component,
      size: widget.size,
    }
    setWidgets([...widgets, newWidget])
  }

  // 위젯 제거
  const removeWidget = (id: string) => {
    setWidgets(widgets.filter((widget) => widget.id !== id))
  }

  // 위젯 크기 변경
  const resizeWidget = (id: string, size: "sm" | "md" | "lg" | "xl") => {
    setWidgets(widgets.map((widget) => (widget.id === id ? { ...widget, size } : widget)))
  }

  // 위젯 순서 변경
  const moveWidget = (fromIndex: number, toIndex: number) => {
    const updatedWidgets = [...widgets]
    const [movedWidget] = updatedWidgets.splice(fromIndex, 1)
    updatedWidgets.splice(toIndex, 0, movedWidget)
    setWidgets(updatedWidgets)
  }

  // 위젯 설정 초기화
  const resetWidgetSettings = () => {
    localStorage.removeItem("dashboard-widgets")
    setWidgets([
      { id: "visitors-chart", component: "VisitorsChart", size: "md" },
      { id: "page-views", component: "PageViewsWidget", size: "md" },
      { id: "traffic-sources", component: "TrafficSourcesWidget", size: "md" },
      { id: "recent-posts", component: "RecentPostsWidget", size: "md" },
      { id: "system-status", component: "SystemStatusWidget", size: "md" },
      { id: "quick-actions", component: "QuickActionsWidget", size: "md" },
      { id: "clock", component: "ClockWidget", size: "sm" },
    ])
  }

  // 위젯 그리드 클래스 계산
  const getWidgetGridClass = (size: "sm" | "md" | "lg" | "xl") => {
    switch (size) {
      case "sm":
        return "col-span-1"
      case "md":
        return "col-span-1 md:col-span-2"
      case "lg":
        return "col-span-1 md:col-span-3"
      case "xl":
        return "col-span-1 md:col-span-4"
      default:
        return "col-span-1 md:col-span-2"
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-light">대시보드</h1>
            <p className="text-muted-foreground">GVine PRO 관리자 대시보드에 오신 것을 환영합니다.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={resetWidgetSettings} className="bg-point text-white hover:bg-point/90">
              <Undo className="mr-2 h-4 w-4" />
              초기화
            </Button>
            <Button variant="outline" onClick={saveWidgetSettings} className="bg-point text-white hover:bg-point/90">
              <Save className="mr-2 h-4 w-4" />
              저장
            </Button>
            <WidgetGallery onAddWidget={addWidget} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {widgets.map((widget, index) => {
            const WidgetComponent = widgetComponents[widget.component]
            if (!WidgetComponent) return null

            return (
              <DraggableWidget key={widget.id} id={widget.id} index={index} moveWidget={moveWidget}>
                <div className={getWidgetGridClass(widget.size)}>
                  <WidgetComponent id={widget.id} onRemove={removeWidget} onResize={resizeWidget} size={widget.size} />
                </div>
              </DraggableWidget>
            )
          })}
        </div>

        {widgets.length === 0 && (
          <Card className="border-border/40 bg-background/80 backdrop-blur-md hover:border-point/30 transition-all duration-300 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-muted p-3 mb-4">
                <Plus className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">위젯 추가하기</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                대시보드에 위젯을 추가하여 중요한 정보를 한눈에 확인하세요.
              </p>
              <WidgetGallery onAddWidget={addWidget} />
            </CardContent>
          </Card>
        )}
      </div>
    </DndProvider>
  )
}

