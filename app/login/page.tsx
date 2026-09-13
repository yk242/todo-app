'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.push('/');
        router.refresh();
      }
    });

    // コンポーネントが破棄される時にリスナーを解除（メモリリーク防止）
    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase.auth]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold">ログイン / 新規登録</h2>

        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          theme="default"
          localization={{
            variables: {
              sign_in: {
                email_label: 'メールアドレス',
                password_label: 'パスワード',
                button_label: 'ログイン',
                loading_button_label: 'ログイン中...',
                email_input_placeholder: 'あなたのメールアドレス',
                password_input_placeholder: 'パスワード',
                link_text: 'すでにアカウントをお持ちの方はこちら',
              },
              sign_up: {
                email_label: 'メールアドレス',
                password_label: 'パスワード',
                button_label: '新規登録',
                loading_button_label: '登録中...',
                email_input_placeholder: 'あなたのメールアドレス',
                password_input_placeholder: 'パスワード',
                link_text: 'アカウントをお持ちでない方はこちら',
              },
            },
          }}
        />
      </div>
    </div>
  );
}
