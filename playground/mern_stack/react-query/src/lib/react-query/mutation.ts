import { useMutation } from '@tanstack/react-query';

export const useAddTodoMutation = () => {
  return useMutation({
    mutationFn: (newTodo: {
      userId: number;
      id: number;
      title: string;
      body: string;
    }) =>
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newTodo),
      }).then((res) => res.json()),
  });
};
