import type { PropsWithChildren } from 'react';

type TodoItemProps = {
  todo: string;
  isCompleted?: boolean;
};

export const TodoItem = (props: PropsWithChildren<TodoItemProps>) => {
  const { todo, isCompleted, children } = props;

  return (
    <li className="flex items-center justify-between rounded-lg border bg-white p-3 shadow-sm transition-all hover:shadow-md">
      <span
        className={`mr-4 truncate font-medium ${
          isCompleted ? 'text-slate-400 line-through' : 'text-slate-700'
        }`}
      >
        {todo}
      </span>
      <div className="flex shrink-0 items-center gap-2">{children}</div>
    </li>
  );
};
