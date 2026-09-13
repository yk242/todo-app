import { TodoItem } from '@/app/components/TodoItem';
import { Button } from '@/app/components/ui/button';
import type { TodoType } from '@/app/types/todo';

type CompleteTodosProps = {
  todos: TodoType[];
  onClickBack: (id: string) => void;
};

export const CompleteTodos = (props: CompleteTodosProps) => {
  const { todos, onClickBack } = props;
  return (
    <div className="rounded-xl border bg-slate-50 p-5 shadow-inner">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-600">
        <span className="rounded-md bg-slate-200 px-2 py-1 text-xs text-slate-700">完了済</span>
        タスク一覧
      </h2>
      <ul className="space-y-3">
        {todos.map(({ id, text }) => (
          <TodoItem key={id} todo={text} isCompleted={true}>
            <Button size="sm" variant="secondary" onClick={() => onClickBack(id)}>
              戻す
            </Button>
          </TodoItem>
        ))}
      </ul>
    </div>
  );
};
