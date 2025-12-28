# Vercel 部署與 CI/CD 完整指南

## 📋 前置準備

### 1. 安裝 Vercel CLI

```bash
npm i -g vercel
```

### 2. 登入 Vercel

```bash
vercel login
```

## 🚀 第一次部署

### 方法一：透過 Vercel CLI（推薦）

1. **在專案根目錄執行**

```bash
vercel
```

2. **按照提示完成設定**
   - 是否要連結到現有專案？選擇 `N`（新建專案）
   - 專案名稱：輸入你的專案名稱（例如：volleyball-training-menu）
   - 目錄：直接按 Enter（使用當前目錄）
   - 是否要覆蓋設定？選擇 `N`

3. **生產環境部署**

```bash
vercel --prod
```

完成後會獲得一個類似 `https://your-project.vercel.app` 的網址。

### 方法二：透過 GitHub（推薦用於 CI/CD）

## 🔄 設置 CI/CD（GitHub Actions）

### 步驟 1：建立 GitHub Repository

```bash
# 如果還沒有初始化 git
git init
git add .
git commit -m "Initial commit"
git branch -M main

# 在 GitHub 建立新 repository，然後：
git remote add origin https://github.com/你的用戶名/你的專案名.git
git push -u origin main
```

### 步驟 2：獲取 Vercel Token 和 Project ID

1. **獲取 Vercel Token**
   - 前往 [Vercel Dashboard](https://vercel.com/account/tokens)
   - 點擊 "Create Token"
   - 輸入名稱（例如：GitHub Actions）
   - 複製生成的 Token

2. **獲取 Project ID 和 Org ID**
   - 在專案根目錄執行：
   ```bash
   vercel link
   ```
   - 這會創建 `.vercel/project.json` 文件
   - 或者：
   ```bash
   vercel inspect
   ```
   - 查看輸出中的 `Project ID` 和 `Org ID`

### 步驟 3：設置 GitHub Secrets

1. 前往你的 GitHub Repository
2. 點擊 **Settings** → **Secrets and variables** → **Actions**
3. 點擊 **New repository secret**，添加以下三個 secrets：

   - **VERCEL_TOKEN**: 你的 Vercel Token
   - **VERCEL_ORG_ID**: 你的 Vercel Organization ID
   - **VERCEL_PROJECT_ID**: 你的 Vercel Project ID

### 步驟 4：推送代碼觸發部署

```bash
git add .
git commit -m "Add CI/CD workflow"
git push
```

推送後，GitHub Actions 會自動：
1. 檢查代碼
2. 安裝依賴
3. 運行 linter
4. 構建專案
5. 部署到 Vercel

你可以在 GitHub Repository 的 **Actions** 標籤頁查看部署進度。

## 📱 在手機上測試

### 方法 1：直接訪問 Vercel 網址

1. 部署完成後，你會獲得一個網址，例如：
   ```
   https://volleyball-training-menu.vercel.app
   ```

2. 在手機瀏覽器中直接輸入這個網址即可訪問

### 方法 2：使用 QR Code

1. 在電腦上打開 Vercel Dashboard
2. 找到你的專案
3. 點擊專案網址旁邊的分享圖標
4. 生成 QR Code
5. 用手機掃描 QR Code

### 方法 3：分享連結

直接將 Vercel 網址分享給隊員，他們可以在手機上打開。

## 🔍 查看部署狀態

### 在 Vercel Dashboard

1. 前往 [vercel.com/dashboard](https://vercel.com/dashboard)
2. 點擊你的專案
3. 查看 **Deployments** 標籤頁
4. 可以看到所有部署記錄和狀態

### 在 GitHub Actions

1. 前往你的 GitHub Repository
2. 點擊 **Actions** 標籤頁
3. 查看最新的 workflow run
4. 點擊查看詳細日誌

## 🎯 自動部署流程

設置完成後，每次你：

1. **推送代碼到 main 分支**
   ```bash
   git add .
   git commit -m "Update features"
   git push
   ```
   → 自動觸發部署到生產環境

2. **建立 Pull Request**
   → 自動部署到預覽環境（preview deployment）

3. **合併 Pull Request**
   → 自動部署到生產環境

## 📝 環境變數（如果需要）

如果未來需要環境變數：

1. 在 Vercel Dashboard 中：
   - 進入專案 → **Settings** → **Environment Variables**
   - 添加變數（例如：`NEXT_PUBLIC_API_URL`）

2. 在 GitHub Secrets 中：
   - 添加相同的變數到 Secrets
   - 在 workflow 中使用 `${{ secrets.VARIABLE_NAME }}`

## 🐛 常見問題

### Q: 部署失敗怎麼辦？

A: 
1. 檢查 GitHub Actions 日誌
2. 確認所有 Secrets 都已正確設置
3. 檢查 `package.json` 中的 scripts 是否正確
4. 確認 Node.js 版本兼容

### Q: 如何回滾到之前的版本？

A:
1. 在 Vercel Dashboard 中
2. 進入 **Deployments** 標籤頁
3. 找到之前的部署
4. 點擊右側的 "..." 選單
5. 選擇 "Promote to Production"

### Q: 如何查看部署日誌？

A:
1. 在 Vercel Dashboard 中
2. 點擊特定的部署
3. 查看 **Build Logs** 和 **Function Logs**

### Q: 手機上顯示異常？

A:
1. 檢查是否使用了響應式設計（Tailwind CSS 的 responsive classes）
2. 清除手機瀏覽器緩存
3. 檢查 Vercel 部署是否成功
4. 使用手機的開發者工具檢查錯誤

## 🎉 完成！

現在你的專案已經設置好 CI/CD，每次推送代碼都會自動部署到 Vercel，你可以在手機上通過 `.vercel.app` 網址訪問和測試！

**預設帳號密碼**：
- 帳號：`admin`
- 密碼：`admin123`

