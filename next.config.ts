import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Server Actions等の組み込みアクセスログを無効化。
  // 独自のロガー(Pino)との二重出力を防ぎ、ターミナルをスッキリ保つための設定。
  logging: {
    incomingRequests: false,
  },
};

export default nextConfig;
