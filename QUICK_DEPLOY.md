# 🚀 快速部署到 Vercel（5分鐘完成）

## 方法一：最簡單的方式（推薦新手）

### 1. 安裝 Vercel CLI

```bash
npm i -g vercel
```

### 2. 登入 Vercel

```bash
vercel login
```

### 3. 部署

```bash
# 在專案根目錄執行
vercel

# 按照提示完成設定後，執行生產環境部署
vercel --prod
```

完成！你會獲得一個 `https://你的專案名.vercel.app` 的網址。

---

## 方法二：透過 GitHub（推薦用於 CI/CD）

### 步驟 1：上傳到 GitHub

```bash
# 如果還沒有 git
git init
git add .
git commit -m "Initial commit"
git branch -M main

# 在 GitHub 建立新 repository，然後：
git remote add origin https://github.com/你的用戶名/你的專案名.git
git push -u origin main
```

### 步驟 2：在 Vercel 連結 GitHub

1. 前往 [vercel.com](https://vercel.com)
2. 點擊 **"Add New..."** → **"Project"**
3. 選擇 **"Import Git Repository"**
4. 選擇你的 GitHub repository
5. 點擊 **"Import"**

### 步驟 3：自動部署

Vercel 會自動：
- 偵測 Next.js 專案
- 自動設定
- 開始部署

完成後，每次你 `git push` 到 main 分支，Vercel 會自動重新部署！

---

## 方法三：設置完整的 CI/CD（進階）

### 1. 獲取 Vercel Token

1. 前往 [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. 點擊 **"Create Token"**
3. 輸入名稱（例如：GitHub Actions）
4. **複製 Token**（只會顯示一次！）

### 2. 設置 GitHub Secrets

1. 前往你的 GitHub Repository
2. 點擊 **Settings** → **Secrets and variables** → **Actions**
3. 點擊 **"New repository secret"**
4. 添加：
   - **Name**: `VERCEL_TOKEN`
   - **Value**: 你剛才複製的 Token
5. 點擊 **"Add secret"**

### 3. 第一次部署（獲取 Project ID）

在專案根目錄執行：

```bash
vercel link
```

這會創建 `.vercel/project.json` 文件，裡面有 Project ID。

### 4. 添加 Project ID 到 GitHub Secrets

1. 打開 `.vercel/project.json`
2. 複製 `projectId`
3. 在 GitHub Secrets 中添加：
   - **Name**: `VERCEL_PROJECT_ID`
   - **Value**: 你的 projectId

### 5. 推送代碼

```bash
git add .
git commit -m "Add CI/CD"
git push
```

GitHub Actions 會自動部署！

---

## 📱 在手機上測試

### 1. 獲取 Vercel 網址

部署完成後，你會看到類似這樣的網址：
```
https://volleyball-training-menu.vercel.app
```

### 2. 在手機瀏覽器打開

直接在手機瀏覽器輸入這個網址即可！

### 3. 分享給隊員

將網址分享給隊員，他們可以在手機上直接訪問。

---

## ✅ 檢查清單

- [ ] 安裝 Vercel CLI
- [ ] 登入 Vercel
- [ ] 部署專案
- [ ] 獲得 `.vercel.app` 網址
- [ ] 在手機上測試
- [ ] （可選）設置 GitHub Actions CI/CD

---

## 🎯 完成後

你的專案現在可以：
- ✅ 透過 `.vercel.app` 網址訪問
- ✅ 在手機上測試
- ✅ 自動部署（如果設置了 CI/CD）
- ✅ 分享給隊員使用

**管理員登入**：
- 帳號：`admin`
- 密碼：`admin123`

---

## 💡 小貼士

1. **預覽部署**：每次 push 到其他分支，Vercel 會創建預覽部署
2. **自訂網域**：可以在 Vercel Dashboard 中設置自己的網域
3. **環境變數**：在 Vercel Dashboard → Settings → Environment Variables 中設置

祝你使用愉快！🏐

