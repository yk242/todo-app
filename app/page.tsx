import { redirect } from 'next/navigation';

import { getTodosByUserId } from '@/app/actions/todo';
import { LogoutButton } from '@/app/components/LogoutButton';
import { Todo } from '@/app/components/Todo';
import { createClient } from '@/lib/supabase/server';

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const allTodos = await getTodosByUserId(user.id);

  const incompleteTodos = allTodos.filter((todo) => !todo.isCompleted);
  const completeTodos = allTodos.filter((todo) => todo.isCompleted);
  return (
    <main className="mx-auto max-w-2xl p-8">
      <div className="mb-8 flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold">マイ Todoリスト</h1>
          <p className="mt-1 text-sm text-gray-600">ログイン中: {user.email}</p>
        </div>
        <LogoutButton />
      </div>

      <Todo incompleteTodos={incompleteTodos} completeTodos={completeTodos} />
    </main>
  );
}
