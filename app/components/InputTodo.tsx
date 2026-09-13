import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

type InputTodoProps = {
  todoText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  disabled: boolean;
};

export const InputTodo = (props: InputTodoProps) => {
  const { todoText, onChange, onClick, disabled } = props;

  return (
    <div className="flex items-center gap-3 rounded-xl border bg-white p-4 shadow-sm">
      <Input
        disabled={disabled}
        placeholder="新しいTODOを入力..."
        value={todoText}
        onChange={onChange}
        className="flex-1" // 入力欄を可能な限り広げる
      />
      <Button disabled={disabled} onClick={onClick} className="px-6 font-bold">
        追加
      </Button>
    </div>
  );
};
