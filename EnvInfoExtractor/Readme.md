# EnvInfoExtractor Chrome Extension

## 简介

`EnvInfoExtractor` 是一个 Google Chrome 插件，旨在一键获取当前测试环境的相关信息，包括环境网址、账号信息和当前步骤链接。并且，用户可以轻松复制这些信息到剪贴板。

## 功能

- 自动提取当前浏览器页面的环境 URL。
- 从 `localStorage` 获取当前用户的账号信息（`user_id`, `username`, `login_username`）。
- 显示并格式化信息，方便用户查看。
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

### 复制信息

点击 **Copy Link** 按钮，复制的信息格式：

```
环境：https://example.com
账号：admin (user_id=1), 姓名：Integration
步骤：https://example.com/current-step
```

## License

MIT License. See [LICENSE](./LICENSE) for more details.
