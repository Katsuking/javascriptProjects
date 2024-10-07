import { render, screen, cleanup } from '@testing-library/react';
import Todo from '../Todo';

afterEach(() => {
  cleanup();
});

test('should render Todo component', () => {
  const todo = { id: 2, task: 'go to school', completed: false };
  render(<Todo todo={todo} />);

  // component からテストに使う要素をとってくる
  const todoElem = screen.getByTestId('todo-2');
  expect(todoElem).toBeInTheDocument();
  // 表示内容の確認
  expect(todoElem).toHaveTextContent('go to school');
  expect(todoElem).toHaveTextContent('Hi');
});
