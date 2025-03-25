本仓库包含了一些为团队开发的 Chrome 插件工具。

<span style="color:red;">欢迎大家提出更多创意或反馈bug。</span>



## 安装
1. 下载插件文件。
2. 打开 Chrome 浏览器，进入 `chrome://extensions/` 页面。
3. 打开右上角的 "开发者模式"。
4. 点击 "加载已解压的扩展程序"，选择下载的插件文件夹。
5. 安装完成后，你会看到插件图标出现在浏览器工具栏。

## 示例
![Sample GIF](/HowToAddChromeExtension.gif)


# EnvInfoExtractor Chrome Extension

## 简介

`EnvInfoExtractor` 是一个 Google Chrome 插件，旨在一键获取当前测试环境的相关信息，包括环境网址、账号信息和当前步骤链接。并且，用户可以轻松复制这些信息到剪贴板。

## 功能

- 自动提取当前浏览器页面的环境 URL，显示并格式化信息，方便用户查看。

- 提供“一键复制”功能，将相关信息复制到剪贴板。

## 使用说明

1. 安装插件后，点击浏览器工具栏的插件图标。
2. 插件会自动获取当前页面的 URL 以及本地存储中的用户信息。
3. 显示的信息包括：
   - **环境**：当前页面所在的测试环境 URL。
   - **账号**：当前登录用户的用户名、ID 和姓名。
   - **步骤**：当前页面的 URL。
4. 点击 **Copy Link** 按钮，将提取的信息复制到剪贴板。

## 示例
![Sample GIF](/EnvInfoExtractor.gif)

## License

MIT License. See [LICENSE](./LICENSE) for more details.
