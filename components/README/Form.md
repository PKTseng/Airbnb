讓我詳細說明這兩個從 'react-dom' 引入的 hooks：

`useFormStatus`:

- 主要用於獲取表單當前提交的狀態
- 只能在 `<form>` 內部使用
- 回傳一個物件，包含：
  - `pending`: boolean - 表示表單是否正在提交
  - `action`: string | null - 正在提交的表單 action
  - `data`: FormData | null - 提交的表單數據
  - `method`: 'get' | 'post' | null - 提交方法

基本使用例子：

```jsx
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type='submit' disabled={pending}>
      {pending ? '提交中...' : '提交'}
    </button>
  )
}

function Form() {
  return (
    <form action='/api/submit'>
      <input name='name' />
      <SubmitButton />
    </form>
  )
}
```

`useFormState`:

- 用於管理表單的狀態和處理提交後的響應
- 需要提供一個 action function 和初始狀態
- 回傳一個陣列：[當前狀態, 提交處理函數]
- 可以追蹤每次提交後的狀態變化

基本使用例子：

```jsx
// 服務器 action
async function formAction(prevState, formData) {
  const name = formData.get('name')

  // 處理提交邏輯
  return `Hello, ${name}!`
}

function Form() {
  const [state, dispatch] = useFormState(formAction, null)

  return (
    <form action={dispatch}>
      <input name='name' />
      <SubmitButton />
      {state && <p>{state}</p>}
    </form>
  )
}
```

主要區別：

1. `useFormStatus` 專注於提供表單提交過程中的狀態（是否正在提交）
2. `useFormState` 則是管理表單提交後的狀態和響應處理
3. 這兩個 hooks 常常會搭配使用：
   - `useFormState` 管理整體表單狀態
   - `useFormStatus` 處理提交過程中的 UI 狀態（如 loading）

如果您正在開發表單功能，這兩個 hooks 的組合可以幫助您建立更好的用戶體驗：

- 使用 `useFormState` 來處理表單數據和響應
- 使用 `useFormStatus` 來優化提交過程中的 UI 反饋

## 重點記憶

1. **useFormStatus**

- 想像是一個「狀態指示燈」
- 主要功能：告訴你「現在表單在做什麼」
- 最常用：`const { pending } = useFormStatus()`
- 用途：控制 loading 狀態、disabled 按鈕

1. **useFormState**

- 想像是一個「資料管理員」
- 主要功能：處理表單提交後的資料和結果
- 基本格式：`const [state, dispatch] = useFormState(action, 初始值)`
- 用途：管理表單提交後的回應和狀態更新

簡單比喻：

- useFormStatus 就像交通號誌（紅燈：等待中，綠燈：可以提交）
- useFormState 就像一個收發室（負責處理表單送出後的所有事情）

兩者搭配使用：

```jsx
function Form() {
  // 管理表單資料和結果
  const [state, dispatch] = useFormState(action, null)

  return (
    <form action={dispatch}>
      <input />
      <SubmitButton /> {/* 這裡面用 useFormStatus 控制狀態 */}
    </form>
  )
}
```

## 一個完整且實用的例子，理解這兩個 hooks 如何一起使用：

```jsx
'use client'
import { useFormState, useFormStatus } from 'react-dom'

// 1. 首先定義一個處理表單的 action
async function loginAction(prevState, formData) {
  // 模擬 API 請求
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const username = formData.get('username')
  const password = formData.get('password')

  // 檢查登入邏輯
  if (username === 'admin' && password === '123456') {
    return { success: true, message: '登入成功！' }
  } else {
    return { success: false, message: '帳號或密碼錯誤' }
  }
}

// 2. 製作提交按鈕組件，使用 useFormStatus
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type='submit' disabled={pending} className={`btn ${pending ? 'bg-gray-400' : 'bg-blue-500'}`}>
      {pending ? '登入中...' : '登入'}
    </button>
  )
}

// 3. 主要表單組件
function LoginForm() {
  // 使用 useFormState 管理表單狀態
  const [state, dispatch] = useFormState(loginAction, {
    success: false,
    message: '',
  })

  return (
    <form action={dispatch} className='space-y-4'>
      {/* 表單輸入欄位 */}
      <div>
        <input name='username' type='text' placeholder='用戶名' required />
      </div>

      <div>
        <input name='password' type='password' placeholder='密碼' required />
      </div>

      {/* 顯示提交後的訊息 */}
      {state.message && <div className={state.success ? 'text-green-500' : 'text-red-500'}>{state.message}</div>}

      {/* 使用包含 useFormStatus 的提交按鈕 */}
      <SubmitButton />
    </form>
  )
}

export default LoginForm
```

讓我解釋這個例子的重點：

1. **useFormState 的角色**：

   - 初始化表單狀態：`{ success: false, message: '' }`
   - 提供 `dispatch` 函數給 form 的 action 屬性
   - 通過 `state` 存取登入結果和訊息

2. **useFormStatus 的角色**：

   - 在 SubmitButton 組件中追蹤提交狀態
   - 根據 `pending` 狀態顯示不同的按鈕文字
   - 在提交中時禁用按鈕

3. **兩者如何協同工作**：
   - useFormState 負責整體表單邏輯和資料處理
   - useFormStatus 負責提交過程中的 UI 狀態
   - 當用戶點擊提交時：
     1. useFormStatus 的 pending 變為 true
     2. 按鈕顯示「登入中...」
     3. loginAction 執行完成後
     4. useFormState 更新狀態
     5. 顯示成功或錯誤訊息

使用情境：

```jsx
// 在頁面中使用
function Page() {
  return (
    <div>
      <h1>登入</h1>
      <LoginForm />
    </div>
  )
}
```

這樣設計的好處：

1. 表單狀態管理清晰
2. 提供良好的使用者體驗（loading 狀態）
3. 錯誤處理完整
4. 代碼結構清晰，易於維護
