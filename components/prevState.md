## 重要的概念：

1. 關於 `prevState: any` 的問題：

`createUser` 的 `prevState` 參數是因為 `useFormState` 的機制需要。這個參數會收到上一次表單提交後的狀態。我們不一定要用 `any`，實際上使用 `any` 不是最佳實踐。我們可以根據實際狀況定義更具體的型別：

```typescript
// 可以定義一個介面來描述可能的狀態
interface FormState {
  success?: boolean
  message?: string
  error?: string
}

// 然後這樣定義 createUser
export const createUser = async (prevState: FormState | null, formData: FormData) => {
  // ...
}
```

常見的型別定義方式有：

- `null | YourType`：如果初始狀態是 null
- `undefined | YourType`：如果初始狀態是 undefined
- 特定的介面/型別：描述實際的狀態結構
- `never`：如果這個函數不會使用到 prevState

2. 關於 `useFormState` 的執行機制：

```typescript
const [message, formAction] = useFormState(createUser, null)
```

這行程式碼的運作方式是：

1. `useFormState` 是 React 的 Hook，用於處理表單狀態
2. 它接收兩個參數：
   - 第一個參數是狀態更新函數（這裡是 `createUser`）
   - 第二個參數是初始狀態（這裡是 `null`）
3. 它返回一個陣列，包含：
   - `message`：目前的表單狀態
   - `formAction`：用於更新表單的函數

當表單提交時：

1. `formAction` 會被調用
2. 它會執行 `createUser` 函數
3. `createUser` 的返回值會成為新的 `message` 值
4. 如果再次提交，前一次的 `message` 會作為 `prevState` 傳入

範例：

```typescript
// 更完整的實作方式
interface FormState {
  success?: boolean
  message?: string
}

export const createUser = async (prevState: FormState | null, formData: FormData): Promise<FormState> => {
  try {
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string

    const newUser = { firstName, lastName, id: Date.now().toString() }
    await saveUser(newUser)

    return {
      success: true,
      message: '使用者建立成功！',
    }
  } catch (error) {
    return {
      success: false,
      message: '建立失敗：' + (error as Error).message,
    }
  }
}
```

這樣你就可以在元件中顯示操作結果：

```tsx
function FormPage() {
  const [state, formAction] = useFormState(createUser, null)

  return (
    <form action={formAction}>
      {/* 表單欄位 */}
      {state?.message && <p className={state.success ? 'text-green-500' : 'text-red-500'}>{state.message}</p>}
    </form>
  )
}
```

這種方式可以讓你更好地處理表單的狀態管理和錯誤處理，同時保持型別安全。

## 在使用 `useFormState` 時，`prevState` 參數**不能省略**。這是因為：

1. **Server Action 的簽名要求**：

```typescript
// 這是必需的簽名格式
;(prevState: State, formData: FormData) => Promise<State>
```

如果你嘗試省略 `prevState`：

```typescript
// ❌ 這樣會報錯
export const createUser = async (formData: FormData) => {
  // ...
}

// ✅ 正確的寫法
export const createUser = async (prevState: State, formData: FormData) => {
  // ...
}
```

2. **即使你不使用 `prevState`，也必須將它作為第一個參數**：

```typescript
// 如果你不需要使用 prevState，可以用底線表示未使用的參數
export const createUser = async (_prevState: State, formData: FormData) => {
  // ...
}
```

3. **錯誤範例**：

```typescript
// ❌ 這樣會導致 TypeScript 錯誤
const [state, formAction] = useFormState((formData: FormData) => {
  // ...
}, null)
```

這是因為 `useFormState` 的型別定義要求 action function 必須接受兩個參數。這是 React 的設計決定，主要是為了確保狀態管理的一致性和可預測性。

所以總結來說：即使你不打算使用 `prevState`，你也必須在函數定義中包含它作為第一個參數。這是 React Server Actions 和 `useFormState` 的規範要求。
