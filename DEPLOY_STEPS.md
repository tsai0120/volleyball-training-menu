# 🚀 部署步骤（已推送代码到 GitHub）

## ✅ 已完成
- [x] 代码已推送到 GitHub: https://github.com/tsai0120/volleyball-training-menu.git

## 📝 现在执行以下步骤

### 方法一：通过 Vercel Dashboard（最简单，推荐）

1. **前往 Vercel**
   - 打开 https://vercel.com
   - 登录你的账号

2. **导入项目**
   - 点击 **"Add New..."** → **"Project"**
   - 选择 **"Import Git Repository"**
   - 找到 `tsai0120/volleyball-training-menu`
   - 点击 **"Import"**

3. **配置项目**
   - Framework Preset: **Next.js**（应该自动检测）
   - Root Directory: `./`（默认）
   - Build Command: `npm run build`（默认）
   - Output Directory: `.next`（默认）
   - Install Command: `npm install`（默认）

4. **部署**
   - 点击 **"Deploy"**
   - 等待部署完成（约 1-2 分钟）

5. **完成！**
   - 部署完成后会获得一个 `.vercel.app` 网址
   - 例如：`https://volleyball-training-menu.vercel.app`

---

### 方法二：通过 Vercel CLI

```bash
# 1. 清理旧的链接（如果之前有）
rm -rf .vercel

# 2. 重新部署
vercel

# 按照提示：
# - Set up and deploy? Yes
# - Which scope? 选择你的账号
# - Link to existing project? No（创建新项目）
# - Project name: volleyball-training-menu
# - Directory: ./
# - Override settings? No

# 3. 生产环境部署
vercel --prod
```

---

## 📱 在手机上测试

部署完成后：
1. 复制 Vercel 给你的网址（例如：`https://volleyball-training-menu.vercel.app`）
2. 在手机浏览器中打开
3. 测试所有功能

---

## 🔄 自动部署（CI/CD）

现在代码已经在 GitHub 上了，你可以：

### 选项 A：使用 Vercel 的自动部署（最简单）

当你通过 Vercel Dashboard 导入 GitHub 项目时，Vercel 会自动：
- 监听 GitHub 的 push 事件
- 自动重新部署

**无需额外设置！**

### 选项 B：使用 GitHub Actions（如果需要更多控制）

1. **获取 Vercel Token**
   - 前往 https://vercel.com/account/tokens
   - 创建 Token 并复制

2. **设置 GitHub Secrets**
   - 前往 https://github.com/tsai0120/volleyball-training-menu/settings/secrets/actions
   - 添加 `VERCEL_TOKEN`

3. **第一次部署获取 Project ID**
   ```bash
   vercel link
   ```

4. **添加 Project ID 到 GitHub Secrets**
   - 打开 `.vercel/project.json`
   - 复制 `projectId`
   - 添加到 GitHub Secrets 作为 `VERCEL_PROJECT_ID`

---

## 🎯 完成后的工作流程

之后每次更新代码：

```bash
git add .
git commit -m "Update features"
git push
```

Vercel 会自动重新部署！🎉

---

## 💡 提示

- **预览部署**：每次 push 到其他分支，Vercel 会创建预览部署
- **生产部署**：只有 push 到 `main` 分支才会部署到生产环境
- **查看部署**：在 Vercel Dashboard 可以查看所有部署记录

