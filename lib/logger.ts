import pino from 'pino';

const isProd = process.env.APP_ENV === 'production';

export const logger = pino({
  level: isProd ? 'info' : 'debug',

  // ISO8601(ms)
  timestamp: pino.stdTimeFunctions.isoTime,

  // JSON の共通フィールド
  base: {
    env: process.env.APP_ENV,
  },

  // level を大文字に
  formatters: {
    level(label) {
      return { level: label.toUpperCase() };
    },
  },

  // 👇 開発時のみ pino-pretty を有効化
  transport: isProd
    ? undefined
    : {
        target: 'pino-pretty',
        options: {
          colorize: true,
          singleLine: true,
          customColors: {
            info: 'white',
            debug: 'gray',
            warn: 'yellow',
            error: 'red',
          },

          messageFormat: '[{traceId}] status:{status} {msg}',

          ignore: 'env,traceId,status',

          timestampFormat: 'HH:MM:ss.l',
        },
      },
});
