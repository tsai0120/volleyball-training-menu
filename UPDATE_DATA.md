# 🔧 如何更新数据（让所有设备同步）

## 📍 数据文件位置

**主要数据文件**：`lib/data.ts`

这个文件包含：
- 训练菜单（`trainingDays`）
- 出席人员（`attendanceData`）
- 日历事件（`calendarEvents`）

## 🖼️ 添加图片的步骤

### 方法一：使用 Public 文件夹（推荐）

1. **将图片放到**：`public/images/training/` 文件夹

2. **在 `lib/data.ts` 中添加图片路径**：

找到要添加图片的训练项目，例如：
```typescript
{
  id: 'p1-1',
  title: '全場接嗆死',
  duration: 20,
  category: 'practice',
  requirements: '20顆*2趟',
  rounds: 2,
  description: '舉球順便練舉',
  startTime: '12:40',
  imageUrl: '/images/training/quan-chang-jie-qiang-si.jpg', // 添加这行
}
```

3. **保存文件并推送**：
```bash
git add public/images/training/your-image.jpg
git add lib/data.ts
git commit -m "Add training image for 全場接嗆死"
git push
```

4. **等待 Vercel 自动部署**（约 1-2 分钟）

5. **所有设备刷新页面即可看到图片！**

---

## 👥 更新出席人员

1. **打开** `lib/data.ts`

2. **找到** `attendanceData` 数组（约第 357 行）

3. **添加或修改**：
```typescript
export const attendanceData: Attendance[] = [
  // 现有人员...
  { grade: '大一', name: '新成員', days: [true, true, true] }, // 新增
]
```

4. **保存并推送**：
```bash
git add lib/data.ts
git commit -m "Add new member"
git push
```

---

## 📝 更新训练菜单

1. **打开** `lib/data.ts`

2. **找到对应的训练项目**（按日期和类别查找）

3. **修改内容**，例如：
```typescript
{
  id: 'p1-1',
  title: '全場接嗆死',
  duration: 25, // 修改时间
  category: 'practice',
  requirements: '20顆*3趟', // 修改要求
  // ...
}
```

4. **保存并推送**：
```bash
git add lib/data.ts
git commit -m "Update training item"
git push
```

---

## 🔄 完整工作流程

```bash
# 1. 修改数据文件
# 编辑 lib/data.ts

# 2. 添加图片（如果有）
# 将图片放到 public/images/training/

# 3. 提交更改
git add .
git commit -m "Update data and images"

# 4. 推送到 GitHub
git push

# 5. Vercel 自动部署（约 1-2 分钟）

# 6. 所有设备刷新页面即可看到更新！
```

---

## ⚠️ 重要提示

1. **所有设备共享的数据**：必须修改 `lib/data.ts` 并推送代码
2. **图片文件**：必须放到 `public/images/` 并推送
3. **localStorage 的数据**：只存在当前设备，不会同步
4. **每次修改后都要**：`git add` → `git commit` → `git push`

---

## 🎯 快速参考

| 要修改的内容 | 文件位置 | 操作 |
|------------|---------|------|
| 训练菜单 | `lib/data.ts` → `trainingDays` | 编辑 → push |
| 出席人员 | `lib/data.ts` → `attendanceData` | 编辑 → push |
| 训练图片 | `public/images/training/` | 放图片 → 在 data.ts 引用 → push |
| 日历事件 | `lib/data.ts` → `calendarEvents` | 编辑 → push |

---

## 💡 提示

- 图片文件名建议使用英文，避免中文文件名问题
- 图片大小建议 < 500KB，太大可能影响加载速度
- 每次推送后，等待 Vercel 部署完成（约 1-2 分钟）
- 可以在 Vercel Dashboard 查看部署状态

