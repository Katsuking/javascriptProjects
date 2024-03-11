import { useAddTodoMutation } from './lib/react-query/mutation';
import { useGetTodos } from './lib/react-query/query';

function App() {
  const {
    data: todos,
    isPending: isTodosLoading,
    isError: isTodosError,
  } = useGetTodos();

  if (isTodosError) <div>there was an error</div>;

  const {
    mutate: addTodo,
    isPending: isAddTodoPending,
    isSuccess: isAddTodoSuccess,
  } = useAddTodoMutation();

  return (
    <>
      <button
        onClick={() => {
          addTodo({
            userId: 3000,
            id: 13414,
            title: 'title 2',
            body: 'hello world',
          });
        }}
      >
        add todo
      </button>
      {isAddTodoPending && <p>Data is being added...</p>}
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
