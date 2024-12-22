```typescript
// 從檔案讀取使用者資料的函數
const fetchUser = async () => {
  // 使用 readFile 讀取 user.json 檔案，並指定編碼為 utf-8
  const result = await readFile('user.json', { encoding: 'utf-8' })
  // 如果有讀到資料（result 存在），就把 JSON 字串轉換成 JavaScript 物件
  // 如果沒有資料，就回傳空陣列 []
  const user = result ? JSON.parse(result) : []

  return user
}

// 儲存使用者資料的函數
export const saveUser = async (user: User) => {
  // 首先呼叫 fetchUser 取得目前所有使用者資料
  const users = await fetchUser()
  // 將新的使用者資料加入陣列中
  users.push(user)
  // 將整個陣列轉換成 JSON 字串，然後寫入 user.json 檔案
  await writeFile('user.json', JSON.stringify(users))
}
```

讓我用實際例子說明：

假設現在 user.json 檔案內容如下：

```json
[
  {
    "id": "1703232323232",
    "firstName": "小明",
    "lastName": "王"
  }
]
```

當我們要新增一個使用者"小華李"時：

1. `saveUser` 函數會先呼叫 `fetchUser`
2. `fetchUser` 讀取檔案，得到目前的使用者列表
3. `saveUser` 將新使用者加入陣列
4. 最後寫入檔案，變成：

```json
[
  {
    "id": "1703232323232",
    "firstName": "小明",
    "lastName": "王"
  },
  {
    "id": "1703232345678",
    "firstName": "小華",
    "lastName": "李"
  }
]
```

重要的幾個概念：

1. `async/await`：因為讀寫檔案需要時間，所以使用非同步操作
2. `JSON.parse()`：將 JSON 字串轉換成 JavaScript 物件
3. `JSON.stringify()`：將 JavaScript 物件轉換成 JSON 字串
4. `readFile/writeFile`：Node.js 的檔案讀寫函數

## 這樣的設計讓我們可以：

- 永久保存使用者資料（存在檔案中）
- 保持所有使用者資料的列表
- 方便新增新的使用者

一定要轉成字串的原因：

1. **檔案儲存的基本原理**：

   - 電腦的檔案系統只能儲存字串（文字）或二進位數據
   - 不能直接儲存 JavaScript 物件、陣列等複雜的資料結構
   - JavaScript 的物件和陣列在記憶體中的格式，無法直接寫入檔案

2. **為什麼使用 JSON 格式**：

   ```typescript
   // 假設我們有這樣的資料
   const users = [
     { id: '1', firstName: '小明', lastName: '王' },
     { id: '2', firstName: '小華', lastName: '李' },
   ]

   // 轉換成 JSON 字串後會變成：
   // '[{"id":"1","firstName":"小明","lastName":"王"},{"id":"2","firstName":"小華","lastName":"李"}]'
   const jsonString = JSON.stringify(users)
   ```

3. **好處**：

   - JSON 格式是一種標準化的資料格式
   - 容易閱讀和編輯
   - 可以在不同的程式語言之間互相轉換
   - 當需要讀取時，可以輕易地通過 `JSON.parse()` 轉回 JavaScript 物件

4. **如果不轉換成字串會發生什麼**：

   ```typescript
   // 錯誤示範
   const users = [{ id: '1', firstName: '小明', lastName: '王' }]

   // ❌ 這樣會失敗，因為 writeFile 不知道如何處理 JavaScript 物件
   await writeFile('user.json', users)

   // ✅ 正確做法
   await writeFile('user.json', JSON.stringify(users))
   ```

想像成這樣：你要把一本書的內容透過傳真機傳給別人，你必須把書的內容轉換成可以傳真的格式（平面的文字和圖像）。同樣地，要把 JavaScript 物件存到檔案中，必須先把它轉換成檔案系統能夠理解的格式（字串）。

為什麼要回傳空陣列而不是空字串或空物件的原因：

1. **程式碼結構的一致性**：

```typescript
const users = await fetchUser() // 這個 users 被設計用來儲存多個使用者
users.push(user) // 我們需要使用 push 方法來新增使用者
```

- 如果返回空字串 `""`：

```typescript
const users = ''
users.push(user) // ❌ 錯誤！字串沒有 push 方法
```

- 如果返回空物件 `{}`：

```typescript
const users = {}
users.push(user) // ❌ 錯誤！物件沒有 push 方法
```

- 使用空陣列 `[]`：

```typescript
const users = []
users.push(user) // ✅ 正確！陣列有 push 方法
```

2. **資料結構的邏輯性**：

- 我們在儲存多個使用者資料，邏輯上應該使用陣列
- user.json 的結構應該是：

```json
[
  { "id": "1", "firstName": "小明", "lastName": "王" },
  { "id": "2", "firstName": "小華", "lastName": "李" }
]
```

- 即使目前沒有使用者，保持一致的資料結構也很重要
- 空陣列 `[]` 代表「目前沒有使用者，但準備好可以加入使用者」

3. **避免錯誤處理**：

- 如果返回空字串或空物件，後續的程式碼都需要額外的檢查和轉換
- 使用空陣列可以直接使用陣列的方法（push、map、filter 等）
- 不需要寫額外的判斷式來處理不同的資料類型

所以，使用空陣列是最合適的選擇，因為它：

- 維持了資料結構的一致性
- 符合程式的邏輯需求
- 減少了錯誤處理的複雜度
- 讓程式碼更容易維護和擴展

## 加上 `Promise<User[]>` 是在定義函數的返回型別的好處：

1. **型別安全性**：

```typescript
// 沒有定義返回型別時
const fetchUser = async () => {
  // TypeScript 只知道這個函數會返回一個 Promise
  // 但不知道 Promise 解析後會是什麼型別
}

// 定義返回型別後
const fetchUser = async (): Promise<User[]> => {
  // TypeScript 現在知道這個函數會返回一個 Promise
  // 且 Promise 解析後會是 User[] (使用者陣列)
}
```

2. **更好的開發體驗**：

```typescript
// 使用這個函數時
const users = await fetchUser()
users.map((user) => {
  // 因為有定義返回型別，TypeScript 知道 user 物件有什麼屬性
  console.log(user.firstName) // ✅ TypeScript 知道有 firstName 屬性
  console.log(user.age) // ❌ TypeScript 會提示錯誤，因為 User 介面中沒有 age 屬性
})
```

3. **錯誤預防**：

```typescript
const fetchUser = async (): Promise<User[]> => {
  const result = await readFile('user.json', { encoding: 'utf-8' })
  const user = result ? JSON.parse(result) : {} // ❌ TypeScript 會提示錯誤
  // 因為我們承諾返回 User[]，但這裡可能返回一個物件
  return user
}
```

4. **程式碼文件化**：

- 其他開發者可以直接看到這個函數預期返回什麼型別的資料
- 不需要查看實作細節就知道如何使用這個函數

5. **IDE 支援**：

```typescript
const users = await fetchUser()
users.  // IDE 會自動提示陣列的所有可用方法
users[0].  // IDE 會自動提示 User 物件的所有屬性
```

簡單來說，加上 `Promise<User[]>` 的主要差別是：

- 提供更好的型別檢查
- 改善開發體驗
- 預防可能的錯誤
- 提供更清晰的程式碼文件
- 獲得更好的 IDE 支援

這不會影響程式的實際執行，但會讓開發過程更安全、更有效率。
