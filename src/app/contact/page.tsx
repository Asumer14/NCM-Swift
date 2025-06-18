"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Mail, MessageSquare, CheckCircle, Github } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">联系我们</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            有任何问题、建议或合作意向？我们很乐意与您交流。
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <Card className="border-0 shadow-lg bg-white dark:bg-slate-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <MessageSquare className="h-6 w-6" />
                发送消息
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <Alert className="border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-700">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />
                  <AlertTitle className="text-green-800 dark:text-green-300">发送成功！</AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-400">
                    感谢您的消息！我们会在48小时内回复您。
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">姓名 *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="请输入您的姓名"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">邮箱 *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="请输入您的邮箱"
                      />
                    </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">消息内容 *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      placeholder="请详细描述您的问题或建议..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-900 hover:bg-slate-700 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200"
                    size="lg"
                  >
                    {isSubmitting ? "发送中..." : "立即发送"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="border-0 shadow-lg bg-white dark:bg-slate-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Github className="h-6 w-6" />
                  开源社区
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400">
                  这是一个开源项目，我们欢迎任何形式的贡献。如果您发现了Bug或有功能建议，请通过GitHub提交Issue或Pull Request。
                </p>
                <Button asChild variant="outline">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        访问 GitHub
                    </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white dark:bg-slate-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Mail className="h-6 w-6" />
                  联系邮箱
                </CardTitle>
              </CardHeader>
              <CardContent>
                 <p className="text-slate-600 dark:text-slate-400">
                    对于其他问题，您也可以通过邮件联系。
                 </p>
                 <a href="mailto:mysumer123@gmail.com" className="font-medium text-slate-800 dark:text-slate-200 hover:underline">
                    mysumer123@gmail.com
                 </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 