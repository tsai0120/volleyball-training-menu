# 系排寒訓菜單網頁

一個專為排球隊寒訓設計的網頁應用，包含訓練菜單、出席管理和管理員功能。

## 功能特色

### 一般使用者功能
1. **訓練時間場地（日曆視圖）**
   - 以日曆方式呈現訓練時間和場地
   - 點擊日期可查看當天出席狀況和訓練菜單

2. **寒訓三天菜單（時間軸視圖）**
   - 時間軸形式呈現（12:00-18:00）
   - 分為熱身/練球/體能三個區塊
   - 每個項目以卡片呈現，點擊可查看詳細說明
   - 包含：標題、所需時間、分組、要求、分組名單、圖示說明

3. **寒訓三天出席人員**
   - 顯示所有出席人員（系級/姓名）
   - 按系級分組顯示
   - 統計每日出席人數和出席率

### 管理員功能
1. **編輯卡片內容**
   - 可編輯所有項目資訊
   - 修改標題、時間、分組、要求等

2. **拖移卡片**
   - 支援拖放重新排序項目

3. **新增自定義卡片**
   - 可新增：休息、吃飯、場佈、場復等自定義項目

4. **自動分組功能**
   - 根據卡片分組要求，自動將當天出席人員進行分組

5. **上傳圖檔**
   - 可為各個卡片上傳圖示說明

## 技術棧

- **Next.js 14** - React 框架
- **TypeScript** - 類型安全
- **Tailwind CSS** - 樣式設計
- **React DnD** - 拖放功能
- **date-fns** - 日期處理
- **Lucide React** - 圖標庫

## 安裝與運行

### 1. 安裝依賴

```bash
npm install
```

### 2. 開發模式運行

```bash
npm run dev
```

打開瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

### 3. 建置生產版本

```bash
npm run build
npm start
```

## 部署到 Vercel

### 方法一：透過 Vercel CLI（推薦）

1. **安裝 Vercel CLI**

```bash
npm i -g vercel
```

2. **登入 Vercel**

```bash
vercel login
```

3. **部署專案**

在專案根目錄執行：

```bash
vercel
```

按照提示完成部署：
- 是否要連結到現有專案？選擇 `N`（新建專案）
- 專案名稱：輸入你的專案名稱（例如：volleyball-training-menu）
- 目錄：直接按 Enter（使用當前目錄）
- 是否要覆蓋設定？選擇 `N`

4. **生產環境部署**

```bash
vercel --prod
```

### 方法二：透過 GitHub（推薦給團隊協作）

1. **建立 GitHub Repository**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用戶名/你的專案名.git
git push -u origin main
```

2. **在 Vercel 連結 GitHub**

- 前往 [vercel.com](https://vercel.com)
- 點擊 "New Project"
- 選擇 "Import Git Repository"
- 選擇你的 GitHub repository
- Vercel 會自動偵測 Next.js 專案並設定

3. **自動部署**

之後每次 push 到 main 分支，Vercel 會自動部署。

### 方法三：透過 Vercel 網頁介面

1. 前往 [vercel.com](https://vercel.com)
2. 點擊 "New Project"
3. 選擇 "Upload" 或連結 Git Repository
4. 上傳專案或選擇 repository
5. Vercel 會自動偵測並設定 Next.js
6. 點擊 "Deploy"

## 專案結構

```
寒訓菜單/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 主頁面
│   └── globals.css        # 全局樣式
├── components/            # React 組件
│   ├── Navigation.tsx     # 導航欄
│   ├── CalendarView.tsx   # 日曆視圖
│   ├── TimelineView.tsx   # 時間軸視圖
│   ├── AttendanceView.tsx # 出席視圖
│   ├── TrainingCard.tsx   # 訓練卡片
│   ├── AdminPanel.tsx     # 管理員面板
│   └── AdminTimelineView.tsx # 管理員時間軸視圖
├── contexts/              # React Context
│   └── AdminContext.tsx   # 管理員狀態管理
├── lib/                   # 工具函數和數據
│   └── data.ts            # 訓練數據
├── types/                 # TypeScript 類型定義
│   └── index.ts
├── public/                # 靜態資源
├── package.json
├── tsconfig.json
├── next.config.js
└── tailwind.config.js
```

## 使用說明

### 一般模式

1. 點擊頂部導航的「一般模式」按鈕（預設）
2. 在三個分頁間切換查看：
   - 訓練時間場地
   - 寒訓三天菜單
   - 寒訓三天出席人員

### 管理員模式

1. 點擊頂部導航的「一般模式」按鈕切換為「管理員模式」
2. 進入「寒訓三天菜單」分頁
3. 可進行以下操作：
   - **編輯項目**：點擊項目卡片的編輯按鈕
   - **拖移項目**：拖動項目卡片重新排序
   - **新增項目**：點擊「新增項目」按鈕
   - **新增自定義項目**：點擊「休息/吃飯/場佈/場復」按鈕
   - **自動分組**：在編輯面板中，設定分組人數後點擊「自動分組」
   - **上傳圖片**：在編輯面板中點擊「上傳圖片」

## 注意事項

- 目前圖片上傳使用 base64 編碼儲存在本地，生產環境建議使用雲端儲存（如 Vercel Blob、Cloudinary 等）
- 數據目前儲存在前端，如需持久化可整合資料庫（如 Supabase、Firebase 等）
- 管理員模式目前沒有權限控制，實際使用時建議加入身份驗證

## 授權

MIT License

