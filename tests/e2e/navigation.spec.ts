import { test, expect, type Page } from '@playwright/test'

/**
 * 主导航 + 语言切换 E2E（桌面）
 * - 移动端导航是 hamburger（MobileMenu），交互不同 → 本 spec 仅桌面跑
 * - 预置 consent=denied，避免同意横幅遮挡点击
 * - 桌面 LanguageSwitcher 用短标签（JP/EN/ZH）
 */
async function dismissConsent(page: Page) {
  await page.addInitScript(() => {
    window.localStorage.setItem('consent:analytics', 'denied')
  })
}

test.beforeEach(async ({ page, isMobile }) => {
  test.skip(!!isMobile, '桌面导航专用（移动端为 hamburger 菜单）')
  await dismissConsent(page)
})

test.describe('主导航（ja）', () => {
  test('点击「当社の強み」导航到 /strength', async ({ page }) => {
    await page.goto('/ja')
    await page.getByRole('link', { name: '当社の強み' }).first().click()
    await expect(page).toHaveURL(/\/strength$/)
  })

  test('点击「OEM の流れ」导航到 /oem-flow', async ({ page }) => {
    await page.goto('/ja')
    await page.getByRole('link', { name: 'OEM の流れ' }).first().click()
    await expect(page).toHaveURL(/\/oem-flow$/)
  })
})

test.describe('语言切换', () => {
  test('ja → en 保留首页路径', async ({ page }) => {
    await page.goto('/ja')
    await page.getByRole('link', { name: 'EN', exact: true }).click()
    await expect(page).toHaveURL(/\/en$/)
  })

  test('en → zh 切换', async ({ page }) => {
    await page.goto('/en')
    await page.getByRole('link', { name: 'ZH', exact: true }).click()
    await expect(page).toHaveURL(/\/zh$/)
  })
})
