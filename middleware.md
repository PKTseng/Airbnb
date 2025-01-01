# Next.js Middleware 完整筆記

## 一、超簡單生活化理解

想像你去百貨公司：

- Middleware = 警衛
- 警衛檢查 = 程式檢查
- 帶客人去大廳 = 重新導向到首頁

## 二、專業術語解釋

Middleware 是：

- 在請求到達頁面前先進行檢查或處理
- 可以修改回應或重新導向使用者
- 像網站的守門員，先做檢查

## 三、基本設置（重要！）

1. 必要條件：

```javascript
// 1. 在專案根目錄建立 middleware.ts
// 2. 函數名稱必須是 middleware（官方規定）
export function middleware(request) {
  return Response.json({ msg: 'hello there' })
}
```

2. 重要規則：

- 檔案名稱：`middleware.ts` 或 `middleware.js`
- 函數名稱：必須是 `middleware`
- 檔案位置：放在專案根目錄或 `/src` 資料夾
- 預設行為：會檢查所有路由

## 四、Config 設定（選擇性功能）

```javascript
// 限制警衛只看管特定區域
export const config = {
  matcher: [
    '/about/:path*', // about 開頭的所有路徑
    '/tours/:path*', // tours 開頭的所有路徑
  ],
}
```

## 五、實際例子

```javascript
import { NextResponse } from 'next/server'

// 警衛的工作內容
export function middleware(request) {
  // 把訪客帶到首頁
  return NextResponse.redirect(new URL('/', request.url))

  // 或是回傳訊息
  // return Response.json({ msg: 'hello' });
}

// 設定警衛負責的區域
export const config = {
  matcher: ['/about/:path*', '/tours/:path*'],
}
```

## 六、主要功能用途

基本功能：

- 路由保護（檢查登入）
- 網址重新導向
- 請求驗證
- 添加自定義 headers
- 處理 cookies 或 session

常見使用時機：

- 需要在頁面載入前檢查時
- 需要統一處理某些路徑時
- 需要驗證使用者身份時
- 需要修改請求或回應時

## 七、重要提醒（必看！！）

基本觀念：

- 要有警衛 = 一定要有 middleware.ts
- 沒有警衛 = 沒有 middleware.ts
- 警衛名字不能改 = middleware 函數名不能改
- 要告訴警衛顧哪裡 = 用 config 設定路徑

## 八、懶人包速查

如果要：

- 需要檢查？→ 加入 middleware.ts
- 所有頁面都要檢查？→ 不用設定 config
- 特定頁面要檢查？→ 設定 config 的 matcher
- 修改回應內容？→ 在 middleware 函數內撰寫邏輯

## 九、開發建議

1. 建議使用 config：

   - 可以提高效能
   - 只在需要的路徑執行檢查
   - 程式碼更容易維護

2. 常見使用情境：

   - 會員系統的登入檢查
   - 管理後台的權限驗證
   - 特定頁面的訪問控制
   - API 的請求驗證

## 補充 :

3. **function 名稱**：

- 是的，一定要用 `middleware` 這個名稱
- 這是 Next.js 的規定，不能改成其他名字
- 如果改名字（例如 `guard`），Next.js 就無法識別這個函數

1. **config 設定**：

- `config` 是選擇性的，不是必須的
- 如果沒有設定 `config`：
  - middleware 會對所有路徑生效
  - 相當於警衛會檢查所有樓層
- 如果設定 `config`：
  - 可以指定只在特定路徑執行檢查
  - 相當於告訴警衛只要看管特定樓層

這些都是 Next.js 官方的規定：

```javascript
// 必須用這個名稱
export function middleware(request) {
  // 你的檢查邏輯
}

// 這個是選擇性的
export const config = {
  matcher: ['/about/:path*'], // 選擇性設定要檢查的路徑
}
```

簡單來說：

- function 名稱必須是 `middleware`（官方規定）
- `config` 設定是選擇性的（看你需求）
