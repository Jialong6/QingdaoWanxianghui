import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    css: false,
    include: [
      'tests/**/*.test.{ts,tsx}',
      'lib/**/*.test.{ts,tsx}',
      'components/**/*.test.{ts,tsx}',
      'app/**/*.test.{ts,tsx}'
    ],
    exclude: ['node_modules', '.next', 'tests/e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80
      },
      exclude: [
        'node_modules',
        '.next',
        '**/*.config.{ts,mjs,js}',
        'tests/setup.ts',
        'tests/e2e/**',
        '**/*.d.ts',
        // 服务端渲染入口：靠 build + E2E + 浏览器验证，不计入单测覆盖门槛
        // （与 M6/M7「server component 不强写渲染测试」一致）
        'app/**/layout.tsx',
        'app/**/page.tsx',
        'app/robots.ts',
        'app/api/og/route.tsx'
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(dirname, '.')
    }
  }
})
