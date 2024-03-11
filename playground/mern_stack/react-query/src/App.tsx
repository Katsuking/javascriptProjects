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
