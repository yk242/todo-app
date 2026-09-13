'use client';
import { useState } from 'react';

import { addTodo, deleteTodo, toggleTodoStatus } from '@/app/actions/todo';
import { CompleteTodos } from '@/app/components/CompleteTodos';
import { IncompleteTodos } from '@/app/components/IncompleteTodos';
import { InputTodo } from '@/app/components/InputTodo';
import type { TodoType } from '@/app/types/todo';

type TodoProps = {
  incompleteTodos: TodoType[];
  completeTodos: TodoType[];
};

export const Todo = ({ incompleteTodos, completeTodos }: TodoProps) => {
  const [todoText, setTodoText] = useState<string>('');

  const onChangeTodoText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTodoText(event.target.value);

  const onClickAdd = async () => {
    if (todoText === '') return;
    await addTodo(todoText);
    setTodoText('');
  };

  const onClickDelete = async (id: string) => {
    await deleteTodo(id);
  };

  const onClickComplete = async (id: string) => {
    await toggleTodoStatus(id, true);
  };

  const onClickBack = async (id: string) => {
    await toggleTodoStatus(id, false);
  };

  const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5;

  return (
    <div className="mx-auto mt-10 max-w-xl space-y-8 p-6">
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={isMaxLimitIncompleteTodos}
      />

      {isMaxLimitIncompleteTodos && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-center font-bold text-red-500">
          登録出来るTODOは5個までです。消化してください。
        </p>
      )}

      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />

      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </div>
  );
};
