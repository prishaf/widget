"use client"

import { useState, useEffect } from "react"
import {
  Accessibility,
  X,
  RotateCcw,
  Eye,
  Link,
  Type,
  Pause,
  ImageOff,
  MousePointer,
  Info,
  List,
  Plus,
  Minus,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface AccessibilitySettings {
  contrast: boolean
  highlightLinks: boolean
  biggerText: number
  textSpacing: number
  pauseAnimations: boolean
  hideImages: boolean
  dyslexiaFont: boolean
  largeCursor: boolean
  showTooltips: boolean
  pageStructure: boolean
}

const defaultSettings: AccessibilitySettings = {
  contrast: false,
  highlightLinks: false,
  biggerText: 100,
  textSpacing: 100,
  pauseAnimations: false,
  hideImages: false,
  dyslexiaFont: false,
  largeCursor: false,
  showTooltips: false,
  pageStructure: false,
}

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings)
  const [visualOpen, setVisualOpen] = useState(true)
  const [behaviorOpen, setBehaviorOpen] = useState(false)
  const [interfaceOpen, setInterfaceOpen] = useState(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("accessibility-settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  // Save settings to localStorage and apply changes
  useEffect(() => {
    localStorage.setItem("accessibility-settings", JSON.stringify(settings))
    applyAccessibilityChanges(settings)
  }, [settings])

  const applyAccessibilityChanges = (settings: AccessibilitySettings) => {
    const root = document.documentElement

    // Contrast
    if (settings.contrast) {
      root.style.filter = "contrast(120%)"
    } else {
      root.style.filter = ""
    }

    // Highlight Links
    const linkStyle = document.getElementById("accessibility-link-style")
    if (settings.highlightLinks) {
      if (!linkStyle) {
        const style = document.createElement("style")
        style.id = "accessibility-link-style"
        style.textContent =
          "a { border-bottom: 2px solid #3b82f6 !important; background-color: rgba(59, 130, 246, 0.1) !important; }"
        document.head.appendChild(style)
      }
    } else {
      if (linkStyle) {
        linkStyle.remove()
      }
    }

    // Text Size
    root.style.fontSize = `${settings.biggerText}%`

    // Text Spacing
    if (settings.textSpacing !== 100) {
      root.style.letterSpacing = `${(settings.textSpacing - 100) * 0.02}em`
      root.style.lineHeight = `${1.4 + (settings.textSpacing - 100) * 0.01}`
    } else {
      root.style.letterSpacing = ""
      root.style.lineHeight = ""
    }

    // Pause Animations
    const animationStyle = document.getElementById("accessibility-animation-style")
    if (settings.pauseAnimations) {
      if (!animationStyle) {
        const style = document.createElement("style")
        style.id = "accessibility-animation-style"
        style.textContent = `
      /* Stop all animations and transitions except for the accessibility widget */
      *:not([data-accessibility-widget]):not([data-accessibility-widget] *) {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        animation-iteration-count: 1 !important;
        animation-fill-mode: forwards !important;
        animation-play-state: paused !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        transform: none !important;
      }
      
      /* Specifically target Tailwind animation classes but exclude accessibility widget */
      .animate-spin:not([data-accessibility-widget]):not([data-accessibility-widget] *) {
        animation: none !important;
        transform: rotate(0deg) !important;
      }
      
      .animate-bounce:not([data-accessibility-widget]):not([data-accessibility-widget] *),
      .animate-bounce-slow:not([data-accessibility-widget]):not([data-accessibility-widget] *) {
        animation: none !important;
        transform: translateY(0) !important;
      }
      
      .animate-pulse:not([data-accessibility-widget]):not([data-accessibility-widget] *) {
        animation: none !important;
        opacity: 1 !important;
      }
      
      .animate-ping:not([data-accessibility-widget]):not([data-accessibility-widget] *) {
        animation: none !important;
        transform: scale(1) !important;
        opacity: 1 !important;
      }
      
      .animate-gradient:not([data-accessibility-widget]):not([data-accessibility-widget] *) {
        animation: none !important;
        background-position: 0% 50% !important;
      }
      
      .animate-slide-right:not([data-accessibility-widget]):not([data-accessibility-widget] *) {
        animation: none !important;
        transform: translateX(0) !important;
      }
      
      .animate-fade-in:not([data-accessibility-widget]):not([data-accessibility-widget] *),
      .animate-slide-up:not([data-accessibility-widget]):not([data-accessibility-widget] *) {
        animation: none !important;
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      
      /* Override any keyframe animations */
      @keyframes spin { 
        from, to { transform: rotate(0deg) !important; } 
      }
      @keyframes bounce { 
        0%, 100% { transform: translateY(0) !important; } 
        50% { transform: translateY(0) !important; }
      }
      @keyframes pulse { 
        0%, 100% { opacity: 1 !important; } 
        50% { opacity: 1 !important; }
      }
      @keyframes ping { 
        0%, 100% { transform: scale(1) !important; opacity: 1 !important; } 
        75% { transform: scale(1) !important; opacity: 1 !important; }
      }
      @keyframes gradient {
        0%, 50%, 100% { background-position: 0% 50% !important; }
      }
      @keyframes bounce-slow {
        0%, 100% { transform: translateY(0) !important; }
        50% { transform: translateY(0) !important; }
      }
      @keyframes slide-right {
        0%, 100% { transform: translateX(0) !important; }
      }
      @keyframes fade-in {
        from, to { opacity: 1 !important; transform: translateY(0) !important; }
      }
      @keyframes slide-up {
        from, to { opacity: 1 !important; transform: translateY(0) !important; }
      }
    `
        document.head.appendChild(style)
      }
    } else {
      if (animationStyle) {
        animationStyle.remove()
      }
    }

    // Hide Images
    const imageStyle = document.getElementById("accessibility-image-style")
    if (settings.hideImages) {
      if (!imageStyle) {
        const style = document.createElement("style")
        style.id = "accessibility-image-style"
        style.textContent = "img { visibility: hidden !important; }"
        document.head.appendChild(style)
      }
    } else {
      if (imageStyle) {
        imageStyle.remove()
      }
    }

    // Dyslexia Font - Using a fallback approach with web-safe fonts
    const dyslexiaFontStyle = document.getElementById("accessibility-dyslexia-font-style")

    if (settings.dyslexiaFont) {
      if (!dyslexiaFontStyle) {
        // First try to load OpenDyslexic from Google Fonts
        const link = document.createElement("link")
        link.rel = "preconnect"
        link.href = "https://fonts.googleapis.com"
        document.head.appendChild(link)

        const link2 = document.createElement("link")
        link2.rel = "preconnect"
        link2.href = "https://fonts.gstatic.com"
        link2.crossOrigin = "anonymous"
        document.head.appendChild(link2)

        // Load a dyslexia-friendly font from Google Fonts as fallback
        const fontLink = document.createElement("link")
        fontLink.href = "https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap"
        fontLink.rel = "stylesheet"
        document.head.appendChild(fontLink)

        const style = document.createElement("style")
        style.id = "accessibility-dyslexia-font-style"
        style.textContent = `
      /* Apply dyslexia-friendly font with fallbacks */
      *, *::before, *::after {
        font-family: "Lexend", "Comic Sans MS", "Trebuchet MS", Verdana, sans-serif !important;
      }
      
      /* Ensure it applies to all text elements */
      body, p, h1, h2, h3, h4, h5, h6, span, div, a, button, input, textarea, select, label, li, td, th {
        font-family: "Lexend", "Comic Sans MS", "Trebuchet MS", Verdana, sans-serif !important;
      }
      
      /* Additional dyslexia-friendly styling */
      * {
        letter-spacing: 0.12em !important;
        word-spacing: 0.16em !important;
        line-height: 1.5 !important;
      }
      
      /* Make text slightly bolder for better readability */
      body, p, span, div, a, li, td {
        font-weight: 500 !important;
      }
    `
        document.head.appendChild(style)
      }
    } else {
      if (dyslexiaFontStyle) {
        dyslexiaFontStyle.remove()
      }
      // Remove the font links when disabled
      const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]')
      fontLinks.forEach((link) => {
        if (link.getAttribute("href")?.includes("Lexend")) {
          link.remove()
        }
      })
      const preconnectLinks = document.querySelectorAll('link[href*="fonts.g"]')
      preconnectLinks.forEach((link) => link.remove())
    }

    // Large Cursor
    const cursorStyle = document.getElementById("accessibility-cursor-style")
    if (settings.largeCursor) {
      if (!cursorStyle) {
        const style = document.createElement("style")
        style.id = "accessibility-cursor-style"
        style.textContent = `
      * { 
        cursor: url("data:image/svg+xml;charset=utf8,%3Csvg fill='%23000' height='48' viewBox='0 0 24 24' width='48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.64,21.97C13.14,22.21 12.54,22 12.31,21.5L10.13,16.76L7.62,18.78C7.45,18.92 7.24,19 7,19A1,1 0 0,1 6,18V3A1,1 0 0,1 7,2C7.24,2 7.47,2.09 7.64,2.23L7.65,2.22L19.14,11.86C19.57,12.22 19.62,12.85 19.27,13.27C19.12,13.45 18.91,13.57 18.7,13.61L15.54,14.23L17.74,18.96C18,19.46 17.76,20.05 17.26,20.28L13.64,21.97Z'/%3E%3C/svg%3E") 12 4, auto !important; 
      }
      a, button, [role="button"], input, select, textarea {
        cursor: url("data:image/svg+xml;charset=utf8,%3Csvg fill='%23000' height='48' viewBox='0 0 24 24' width='48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.64,21.97C13.14,22.21 12.54,22 12.31,21.5L10.13,16.76L7.62,18.78C7.45,18.92 7.24,19 7,19A1,1 0 0,1 6,18V3A1,1 0 0,1 7,2C7.24,2 7.47,2.09 7.64,2.23L7.65,2.22L19.14,11.86C19.57,12.22 19.62,12.85 19.27,13.27C19.12,13.45 18.91,13.57 18.7,13.61L15.54,14.23L17.74,18.96C18,19.46 17.76,20.05 17.26,20.28L13.64,21.97Z'/%3E%3C/svg%3E") 12 4, pointer !important;
      }
    `
        document.head.appendChild(style)
      }
    } else {
      if (cursorStyle) {
        cursorStyle.remove()
      }
    }

    // Show Tooltips
    const tooltipStyle = document.getElementById("accessibility-tooltip-style")
    if (settings.showTooltips) {
      if (!tooltipStyle) {
        const style = document.createElement("style")
        style.id = "accessibility-tooltip-style"
        style.textContent = `
          [title]:hover::after,
          [aria-label]:hover::after {
            content: attr(title) attr(aria-label);
            position: absolute;
            background: #333;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 1000;
            margin-top: 20px;
          }
        `
        document.head.appendChild(style)
      }
    } else {
      if (tooltipStyle) {
        tooltipStyle.remove()
      }
    }

    // Page Structure
    const structureStyle = document.getElementById("accessibility-structure-style")
    if (settings.pageStructure) {
      if (!structureStyle) {
        const style = document.createElement("style")
        style.id = "accessibility-structure-style"
        style.textContent = `
          h1, h2, h3, h4, h5, h6 {
            outline: 2px solid #3b82f6 !important;
            outline-offset: 2px !important;
            position: relative !important;
          }
          h1::before { content: "H1"; }
          h2::before { content: "H2"; }
          h3::before { content: "H3"; }
          h4::before { content: "H4"; }
          h5::before { content: "H5"; }
          h6::before { content: "H6"; }
          h1::before, h2::before, h3::before, h4::before, h5::before, h6::before {
            position: absolute;
            top: -20px;
            left: 0;
            background: #3b82f6;
            color: white;
            padding: 2px 6px;
            font-size: 10px;
            border-radius: 2px;
          }
        `
        document.head.appendChild(style)
      }
    } else {
      if (structureStyle) {
        structureStyle.remove()
      }
    }
  }

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
  }

  const toggleWidget = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={toggleWidget}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50"
        size="icon"
        aria-label="Open accessibility menu"
        data-accessibility-widget
      >
        <Accessibility className="h-6 w-6 text-white" />
      </Button>

      {/* Accessibility Panel */}
      {isOpen && (
        <Card
          className="fixed bottom-24 right-6 w-80 max-h-[80vh] overflow-y-auto shadow-xl z-50 bg-white"
          data-accessibility-widget
        >
          <CardHeader className="bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Accessibility menu</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetSettings}
                  className="h-8 w-8 text-white hover:bg-blue-700"
                  aria-label="Reset settings"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleWidget}
                  className="h-8 w-8 text-white hover:bg-blue-700"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 space-y-4">
            {/* Visual Adjustments */}
            <Collapsible open={visualOpen} onOpenChange={setVisualOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span className="font-medium">Visual Adjustments</span>
                </div>
                {visualOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 mt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center gap-2 p-3 border rounded-lg">
                    <Eye className="h-6 w-6 text-gray-600" />
                    <span className="text-sm font-medium">Contrast+</span>
                    <Switch
                      checked={settings.contrast}
                      onCheckedChange={(checked) => updateSetting("contrast", checked)}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-2 p-3 border rounded-lg">
                    <Link className="h-6 w-6 text-gray-600" />
                    <span className="text-sm font-medium">Highlight Links</span>
                    <Switch
                      checked={settings.highlightLinks}
                      onCheckedChange={(checked) => updateSetting("highlightLinks", checked)}
                    />
                  </div>
                </div>

                {/* Text Size Control */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Type className="h-4 w-4" />
                      <span className="font-medium">Text Size</span>
                    </div>
                    <span className="text-sm text-gray-500">{settings.biggerText}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => updateSetting("biggerText", Math.max(50, settings.biggerText - 10))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Slider
                      value={[settings.biggerText]}
                      onValueChange={([value]) => updateSetting("biggerText", value)}
                      min={50}
                      max={200}
                      step={10}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => updateSetting("biggerText", Math.min(200, settings.biggerText + 10))}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Text Spacing Control */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Type className="h-4 w-4" />
                      <span className="font-medium">Text Spacing</span>
                    </div>
                    <span className="text-sm text-gray-500">{settings.textSpacing}%</span>
                  </div>
                  <Slider
                    value={[settings.textSpacing]}
                    onValueChange={([value]) => updateSetting("textSpacing", value)}
                    min={50}
                    max={200}
                    step={10}
                    className="w-full"
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Behavior Controls */}
            <Collapsible open={behaviorOpen} onOpenChange={setBehaviorOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <Pause className="h-4 w-4" />
                  <span className="font-medium">Behavior Controls</span>
                </div>
                {behaviorOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 mt-2">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Pause className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">Pause Animations</span>
                    </div>
                    <Switch
                      checked={settings.pauseAnimations}
                      onCheckedChange={(checked) => updateSetting("pauseAnimations", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <ImageOff className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">Hide Images</span>
                    </div>
                    <Switch
                      checked={settings.hideImages}
                      onCheckedChange={(checked) => updateSetting("hideImages", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Type className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">Dyslexia-Friendly Font</span>
                    </div>
                    <Switch
                      checked={settings.dyslexiaFont}
                      onCheckedChange={(checked) => updateSetting("dyslexiaFont", checked)}
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Interface Tools */}
            <Collapsible open={interfaceOpen} onOpenChange={setInterfaceOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <MousePointer className="h-4 w-4" />
                  <span className="font-medium">Interface Tools</span>
                </div>
                {interfaceOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 mt-2">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <MousePointer className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">Large Cursor</span>
                    </div>
                    <Switch
                      checked={settings.largeCursor}
                      onCheckedChange={(checked) => updateSetting("largeCursor", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">Show Tooltips</span>
                    </div>
                    <Switch
                      checked={settings.showTooltips}
                      onCheckedChange={(checked) => updateSetting("showTooltips", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <List className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">Page Structure</span>
                    </div>
                    <Switch
                      checked={settings.pageStructure}
                      onCheckedChange={(checked) => updateSetting("pageStructure", checked)}
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Accessibility Statement */}
            <Button
              variant="outline"
              className="w-full justify-start gap-2 bg-transparent"
              onClick={() => window.open("/accessibility-statement", "_blank")}
            >
              <Info className="h-4 w-4" />
              Accessibility Statement
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  )
}
