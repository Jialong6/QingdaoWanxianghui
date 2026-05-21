import { test, expect, type Page } from '@playwright/test'

/**
 * catalog / visit / sample 三表单 E2E
 * - catalog：空提交校验 + 填全提交 → 通用成功页（最简、最稳的完整链路）
 * - visit / sample：空提交校验阻断（必填多选/字段较多，完整链路由单测覆盖）
 * 预置 consent=denied，避免同意横幅遮挡点击。
 */
async function dismissConsent(page: Page) {
  await page.addInitScript(() => {
    window.localStorage.setItem('consent:analytics', 'denied')
  })
}

test.describe('catalog 表单', () => {
  test.beforeEach(async ({ page }) => {
    await dismissConsent(page)
  })

  test('空提交显示校验错误', async ({ page }) => {
    await page.goto('/ja/contact/catalog')
    await page.getByRole('button', { name: '送信する' }).click()
    await expect(page.getByRole('alert').first()).toBeVisible()
    await expect(page).toHaveURL(/\/contact\/catalog$/)
  })

  test('填全 + 同意 + 提交 → 通用成功页', async ({ page }) => {
    await page.goto('/ja/contact/catalog')
    await page.getByLabel(/御社名/).fill('株式会社サンプル商事')
    await page.getByLabel(/ご担当者名/).fill('山田 太郎')
    await page.getByLabel(/メールアドレス/).fill('taro@example.com')
    await page.getByLabel(/プライバシーポリシーに同意します/).check()
    await page.getByRole('button', { name: '送信する' }).click()
    await expect(page).toHaveURL(/\/contact\/thanks/)
    await expect(
      page.getByRole('heading', { name: 'お問い合わせありがとうございます' })
    ).toBeVisible()
  })
})

test.describe('visit / sample 表单空提交校验', () => {
  test.beforeEach(async ({ page }) => {
    await dismissConsent(page)
  })

  test('visit 空提交被阻断', async ({ page }) => {
    await page.goto('/ja/contact/visit')
    await page.getByRole('button', { name: '送信する' }).click()
    await expect(page.getByRole('alert').first()).toBeVisible()
    await expect(page).toHaveURL(/\/contact\/visit$/)
  })

  test('sample 空提交被阻断', async ({ page }) => {
    await page.goto('/ja/contact/sample')
    await page.getByRole('button', { name: '送信する' }).click()
    await expect(page.getByRole('alert').first()).toBeVisible()
    await expect(page).toHaveURL(/\/contact\/sample$/)
  })
})
