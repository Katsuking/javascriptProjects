import { useQuery } from '@tanstack/react-query';

export const useGetTodos = () => {
  return useQuery({
    // queryKey この値をキーとして、
    // データが更新された場合、ほかも更新が行われる
    queryKey: ['post'],
    // queryFn fetch処理 axios でももちろん大丈夫
    // 戻り値には、データやエラー等すべてを持つ
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
        res.json(),
      ),
  });
};
