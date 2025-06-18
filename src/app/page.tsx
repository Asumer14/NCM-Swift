"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, ShieldCheck, FileMusic } from "lucide-react"
import Link from "next/link"
import { motion, Variants } from "framer-motion"

export default function HomePage() {
  const FADE_IN_ANIMATION_VARIANTS: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-white dark:bg-black">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="relative flex items-center justify-center min-h-screen pt-24 pb-12 text-center"
      >
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-black dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)]"></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#c9dcfc,transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,#1e293b,transparent)] -z-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div variants={FADE_IN_ANIMATION_VARIANTS} className="inline-flex items-center px-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 mb-6">
            <Zap className="h-4 w-4 mr-2 text-purple-500" />
            <span>极速、安全、无损</span>
          </motion.div>
          <motion.h1
            variants={FADE_IN_ANIMATION_VARIANTS}
            className="text-5xl lg:text-7xl font-bold tracking-tight bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent"
          >
            新一代 NCM 音乐解锁工具
          </motion.h1>
          <motion.p
            variants={FADE_IN_ANIMATION_VARIANTS}
            className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            在您的浏览器中直接、快速地转换 NCM 文件，无需上传，确保您的数据绝对安全。
          </motion.p>
          <motion.div
            variants={FADE_IN_ANIMATION_VARIANTS}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-slate-900 hover:bg-slate-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group dark:bg-white dark:text-black dark:hover:bg-slate-200"
            >
              <Link href="/convert">
                立即开始
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 transition-all duration-300"
            >
              <Link href="https://github.com/Asumer14/NCM-Swift" target="_blank">
                查看源码
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">为现代用户打造</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              我们关注每一个细节，旨在提供无与伦比的转换体验。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "极致性能",
                description: "采用WASM和多线程技术，秒级完成格式转换，充分利用您的设备性能。",
              },
              {
                icon: ShieldCheck,
                title: "隐私至上",
                description: "所有操作均在本地浏览器完成，您的文件和数据无需上传，保障隐私安全。",
              },
              {
                icon: FileMusic,
                title: "元数据 & 封面",
                description: "完整保留音乐的封面、标题、艺术家等元数据信息，确保信息不丢失。",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={FADE_IN_ANIMATION_VARIANTS}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 mb-6">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
       <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            准备好体验无缝的音乐转换了吗？
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-8">
            立即开始，释放您音乐的全部潜力。完全免费，无任何限制。
          </p>
          <Button
            asChild
            size="lg"
            className="bg-slate-900 hover:bg-slate-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group dark:bg-white dark:text-black dark:hover:bg-slate-200"
          >
            <Link href="/convert">
              免费开始转换
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
