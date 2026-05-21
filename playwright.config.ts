import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3300',
    trace: 'on-first-retry'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 13'] } }
  ],
  webServer: {
    // 用 build + start（避开被 hook 拦截的 dev server）
    command: 'npm run build && npx next start -p 3300',
    url: 'http://localhost:3300',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000
  }
})
