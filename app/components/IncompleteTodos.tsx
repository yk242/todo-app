import { TodoItem } from '@/app/components/TodoItem';
import { Button } from '@/app/components/ui/button';
import type { TodoType } from '@/app/types/todo';

type IncompleteTodosProps = {
  todos: TodoType[];
  onClickComplete: (id: string) => void;
  onClickDelete: (id: string) => void;
};

export const IncompleteTodos = (props: IncompleteTodosProps) => {
  const { todos, onClickComplete, onClickDelete } = props;

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
        <span className="rounded-md bg-blue-100 px-2 py-1 text-xs text-blue-700">未完了</span>
        タスク一覧
      </h2>
      <ul className="space-y-3">
        {todos.map(({ id, text }) => (
          <TodoItem key={id} todo={text}>
            <Button size="sm" onClick={() => onClickComplete(id)}>
              完了
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onClickDelete(id)}>
              削除
            </Button>
          </TodoItem>
        ))}
      </ul>
    </div>
  );
};
