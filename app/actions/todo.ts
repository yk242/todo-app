'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

import { logger } from '@/lib/logger';
import { todoRepository } from '@/lib/repositories/todo';
import { createClient } from '@/lib/supabase/server';

async function getTraceId() {
  const headersList = await headers();
  return headersList.get('x-trace-id') || crypto.randomUUID();
}

async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('認証されていません');
  return user.id;
}

export async function getTodosByUserId(userId: string) {
  const traceId = await getTraceId();
  try {
    return await todoRepository.findManyByUserId(userId);
  } catch (error) {
    logger.error({ traceId, err: error }, 'addTodo: DB検索時にエラーが発生しました');
    throw new Error('Todoの取得に失敗しました');
  }
}

export async function addTodo(text: string) {
  const traceId = await getTraceId();
  logger.info({ traceId }, 'addTodo: 処理を開始します');
  if (text.trim() === '') {
    logger.warn({ traceId, status: 400 }, 'addTodo: バリデーションエラー（テキスト空）');
    throw new Error('テキストを入力してください');
  }

  try {
    const userId = await requireAuth();
    await todoRepository.create(text, userId);
    revalidatePath('/');
    logger.info({ traceId, status: 201 }, 'addTodo: Todoの作成に成功しました');
  } catch (error) {
    logger.error({ traceId, err: error }, 'addTodo: DB保存中にエラーが発生しました');
    throw new Error('Todoの作成に失敗しました');
  }
}

export async function toggleTodoStatus(id: string, isCompleted: boolean) {
  const traceId = await getTraceId();
  logger.info({ traceId }, 'toggleTodoStatus: 処理を開始します');
  try {
    const userId = await requireAuth();
    await todoRepository.updateStatus(id, isCompleted, userId);
    revalidatePath('/');
    logger.info({ traceId, status: 204 }, 'toggleTodoStatus: Todoのステータス更新に成功しました');
  } catch (error) {
    logger.error({ traceId, err: error }, 'toggleTodoStatus: DB保存中にエラーが発生しました');
    throw new Error('Todoのステータス更新に失敗しました');
  }
}

export async function deleteTodo(id: string) {
  const traceId = await getTraceId();
  logger.info({ traceId }, 'deleteTodo: 処理を開始します');

  try {
    const userId = await requireAuth();
    await todoRepository.deleteById(id, userId);
    revalidatePath('/');
    logger.info({ traceId, status: 204 }, 'deleteTodo: Todoの削除に成功しました');
  } catch (error) {
    logger.error({ traceId, err: error }, 'deleteTodo: DB保存中にエラーが発生しました');
    throw new Error('Todoの削除に失敗しました');
  }
}
