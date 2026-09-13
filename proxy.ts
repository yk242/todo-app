import { NextResponse, type NextRequest } from 'next/server';

import { createServerClient } from '@supabase/ssr';

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/cron')) {
    return NextResponse.next();
  }
  // リクエストヘッダーを複製し、新しい traceId を付与する
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-trace-id', crypto.randomUUID());

  // ヘッダーを付与した状態で次の処理（APIや画面）へ渡す
  let response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // リクエストのCookieを更新
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));

          // レスポンスを再生成し、traceIdのヘッダーを維持しつつCookieをセット
          response = NextResponse.next({
            request: { headers: requestHeaders },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // これを呼ぶことで、有効期限切れのセッションが自動的にリフレッシュされます
  await supabase.auth.getUser();

  return response;
}
