# react-query (tanstack query の使い方)

fetch や axios でただデータフェッチだけを行う時代は終わったらしい.

### React + TypeScript + Vite

```sh
npm create vite@latest react-query
```

### package install

```sh
npm i @tanstack/react-query
```

### 初期設定

`lib/react-query/QueryProvider.tsx` に下記のように設定します。

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

interface QueryProviderType {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const QueryProvider = ({ children }: QueryProviderType) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
```

context API と同様にこのデータはプロジェクト全体でシェアされるので、プロジェクト全体をこの`QueryProvider`で囲みます

ということで、`main.tsx`

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import QueryProvider from './lib/react-query/QueryProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </React.StrictMode>,
);
```

## 使用例

今回は、react-query に完全フォーカスするので、
API は、[jsonplaceholder](https://jsonplaceholder.typicode.com/todos)を使っていきます。

[query](https://tanstack.com/query/latest/docs/framework/react/overview#enough-talk-show-me-some-code-already)

### query

GET request は query を使って書きます。
status とか loading とか自動でできるので、どんだけ便利かはすぐに理解できます。

`lib/react-query/query.ts` に書いていきます。

```tsx
import { useQuery } from '@tanstack/react-query';

export const useGetTodos = () => {
  return useQuery({
    // queryKey この値をキーとして、
    // データが更新された場合、ほかも更新が行われる
    queryKey: ['todo'],
    // queryFn fetch処理 axios でももちろん大丈夫
    queryFn: () => {
      fetch('https://jsonplaceholder.typicode.com/todos');
    },
  });
};
```

後は、`useGetTodos`を使って、data やステータスを表示する

```tsx
import { useGetTodos } from './lib/react-query/query';

function App() {
  const {
    data: todos,
    isPending: isTodosLoading,
    isError: isTodosError,
  } = useGetTodos();

  return (
    <>
      {isTodosLoading && !todos ? (
        <h1>now loading</h1>
      ) : (
        <div>
          {todos.map((todo) => (
            <div key={todo.id}>
              <h1>ID: {todo.id}</h1>
              <p>{todo.title}</p>
            </div>
          ))}
        </div>
        // <div>{JSON.stringify(todos)}</div>
      )}
    </>
  );
}

export default App;
```

### mutation
