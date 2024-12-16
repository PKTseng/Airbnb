在 Next.js 中，`[id]` 這種方括號命名的資料夾是「動態路由」（Dynamic Routes）的特殊語法：

1. **動態路由的概念**
- `[id]` 資料夾代表一個動態的網址參數
- 當使用者訪問不同的 ID 時，會使用同一個頁面模板，但顯示不同的內容

2. **實際例子**
- 假設你的網站路徑是 `/tours`
- 當你加入 `[id]` 資料夾後，你可以訪問：
  - `/tours/1`
  - `/tours/2`
  - `/tours/any-id`
- 所有這些 URL 都會使用同一個 page.tsx，但 `params.id` 會是不同的值

3. **你的程式碼解析**
```typescript
function page({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className='text-4xl'>ID : {params.id}</h1>
    </div>
  )
}
```
- `params.id` 會自動獲取 URL 中的 ID 值
- 如果訪問 `/tours/123`，頁面會顯示 "ID : 123"
- 如果訪問 `/tours/abc`，頁面會顯示 "ID : abc"

這個功能特別適合用於：
- 產品詳情頁
- 用戶個人頁面
- 部落格文章頁面
- 任何需要根據 ID 或其他參數顯示不同內容的頁面

需要我解釋更多關於如何使用動態路由的細節嗎？