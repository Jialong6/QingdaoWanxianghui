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
    // 移动端视口回归。用 chromium 引擎的移动设备（Pixel 5），
    // 避免 WebKit 在部分本地/CI 环境不可用；如需真 Safari 引擎可改回 iPhone 设备。
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } }
  ],
  webServer: {
    // 用 build + start（避开被 hook 拦截的 dev server）
    command: 'npm run build && npx next start -p 3300',
    url: 'http://localhost:3300',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000
  }
})
