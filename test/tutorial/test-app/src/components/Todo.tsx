type TodoProps = {
  todo: {
    id: number;
    task: string;
    completed: boolean;
  };
};

const Todo = ({ todo }: TodoProps) => {
  const h1 = <h1>{todo.task}</h1>;
  const test = todo.completed ? <small>{h1}</small> : h1;
  return <div data-testid={`todo-${todo.id}`}>{test}</div>;
};

export default Todo;
