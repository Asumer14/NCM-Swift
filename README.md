# NCM Swift - 高效的 NCM 格式转换工具

NCM Swift 是一个现代、高效且注重隐私的网页工具，旨在帮助您轻松地将网易云音乐的私有 NCM（`.ncm`）格式文件转换为通用的 MP3 或 FLAC 格式。所有转换过程均在您的浏览器中完成，无需上传任何文件到云端服务器，确保您的数据安全。

## ✨ 功能特性

- **🚀 纯浏览器端转换**: 所有文件处理都在本地进行，不消耗服务器资源，完美保护用户隐私。
- **⚡️ 高性能处理**: 利用 Web Worker 进行多线程处理，即使同时转换大量文件，也能保持界面流畅不卡顿。
- **🏷️ 完整的元数据支持**: 自动读取 NCM 文件中包含的元数据（如歌曲名、艺术家、专辑、封面图片），并将其完整地写入转换后的文件中。
- **✍️ 自定义文件名**: 用户可以根据 `[artist]`, `[title]`, `[album]` 等标签自定义输出文件的命名格式。
- **📦 批量操作**: 支持一次性拖拽或选择多个文件进行批量转换。
- **🧩 ZIP 打包下载**: 可以将所有转换完成的文件一键打包为 ZIP 压缩包下载，并支持自定义压缩包名称。
- **🎨 现代化界面**: 基于 Next.js 和 Tailwind CSS 构建，拥有简洁、美观的用户界面，并支持明暗两种主题模式。

## 🚀 如何使用

1.  **访问网站**: 在浏览器中打开 [NCM Swift](https://ncmswift.xyz)。
2.  **上传文件**: 将一个或多个 `.ncm` 文件拖拽到上传区域，或点击上传框选择文件。
3.  **自动转换**: 文件上传后将立即开始转换，您可以在文件列表中看到每个文件的实时状态和进度。
4.  **自定义命名 (可选)**: 在"文件名模板"输入框中，根据您的偏好设置文件命名规则。
5.  **命名压缩包 (可选)**: 在"压缩包名称"输入框中，为即将下载的 ZIP 文件指定一个名称。
6.  **下载文件**:
    -   点击文件列表中每个文件右侧的下载按钮，可单独下载该文件。
    -   点击页面下方的"打包下载"按钮，可将所有转换成功的文件打包为一个 ZIP 文件下载。

## 🛠️ 技术栈

- **前端框架**: [Next.js](https://nextjs.org/), [React](https://react.dev/)
- **UI 库**: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/), [Framer Motion](https://www.framer.com/motion/)
- **核心转换逻辑**:
  - **Web Worker**: 用于后台处理，防止 UI 阻塞。
  - **crypto-js**: 处理 NCM 文件加密。
  - **music-metadata-browser**: 读取音乐文件元数据。
  - **browser-id3-writer**: 写入 MP3 的 ID3 tags。
  - **metaflac-js**: 写入 FLAC 的元数据。
  - **jszip**: 用于生成 ZIP 压缩包。
- **语言**: [TypeScript](https://www.typescriptlang.org/)

## 本地开发

如果您想在本地运行或参与贡献，请遵循以下步骤：

1.  **克隆仓库**
    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2.  **安装依赖**
    ```bash
    npm install
    ```

3.  **启动开发服务器**
    ```bash
    npm run dev
    ```

4.  **访问应用**
    在浏览器中打开 `http://localhost:3000`。

## 🤝 贡献

欢迎任何形式的贡献！如果您有好的想法或发现了 Bug，请随时提交 Pull Request 或创建 Issue。

1.  Fork 本项目
2.  创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3.  提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4.  推送到分支 (`git push origin feature/AmazingFeature`)
5.  打开一个 Pull Request

## 📄 许可

本项目为一个个人项目，仅供学习和技术交流使用。

---

_Triggering a new deployment._
