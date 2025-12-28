# Vercel 部署指南

## 快速部署步驟

### 方法一：使用 Vercel CLI（最簡單）

1. **安裝依賴**
```bash
npm install
```

2. **安裝 Vercel CLI**
```bash
npm i -g vercel
```

3. **登入 Vercel**
```bash
vercel login
```

4. **部署**
```bash
vercel
```

5. **生產環境部署**
```bash
vercel --prod
```

完成！你的網站會有一個類似 `https://your-project.vercel.app` 的網址。

---

### 方法二：透過 GitHub（推薦）

1. **建立 GitHub Repository**
   - 前往 [github.com](https://github.com) 建立新 repository
   - 複製 repository URL

2. **上傳程式碼到 GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用戶名/你的專案名.git
git push -u origin main
```

3. **在 Vercel 連結專案**
   - 前往 [vercel.com](https://vercel.com)
   - 點擊 "Add New..." → "Project"
   - 選擇 "Import Git Repository"
   - 選擇你的 GitHub repository
   - 點擊 "Import"

4. **自動設定**
   - Vercel 會自動偵測 Next.js 專案
   - 確認設定（通常不需要修改）
   - 點擊 "Deploy"

5. **完成！**
   - 部署完成後會自動獲得一個網址
   - 之後每次 push 到 main 分支都會自動重新部署

---

### 方法三：直接上傳（不推薦，但最簡單）

1. **打包專案**
```bash
npm run build
```

2. **前往 Vercel**
   - 前往 [vercel.com](https://vercel.com)
   - 點擊 "Add New..." → "Project"
   - 選擇 "Upload"
   - 上傳整個專案資料夾

3. **等待部署完成**

---

## 部署後設定

### 自訂網域（選用）

1. 在 Vercel 專案設定中選擇 "Domains"
2. 輸入你的網域名稱
3. 按照指示設定 DNS 記錄

### 環境變數（目前不需要）

這個專案目前不需要環境變數，但如果未來需要：
1. 在 Vercel 專案設定中選擇 "Environment Variables"
2. 新增需要的變數
3. 重新部署

---

## 常見問題

### Q: 部署後圖片無法顯示？
A: 目前圖片使用 base64 編碼，如果圖片太大可能會影響效能。建議未來整合雲端儲存服務。

### Q: 如何更新內容？
A: 
- 如果使用 GitHub：修改後 push 到 main 分支，Vercel 會自動部署
- 如果使用 CLI：修改後執行 `vercel --prod`

### Q: 如何查看部署日誌？
A: 在 Vercel Dashboard 的 "Deployments" 頁面可以查看所有部署記錄和日誌。

---

## 下一步

部署完成後，你可以：
1. 分享網址給隊員
2. 在管理員模式下編輯菜單
3. 上傳訓練項目的圖示說明
4. 使用自動分組功能

祝你使用愉快！🏐

