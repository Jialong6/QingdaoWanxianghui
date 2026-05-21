import { test, expect } from '@playwright/test'

/**
 * 询盘转化路径 E2E（plan.md §9 路径 L3）
 * Hero → 询盘表 → 提交 → 成功页
 */
test.describe('询盘流程（ja）', () => {
  test('Hero CTA 跳转到询盘表', async ({ page }) => {
    await page.goto('/ja')
    // Hero 主 CTA「お問い合わせ」
    await page.getByRole('link', { name: 'お問い合わせ' }).first().click()
    await expect(page).toHaveURL(/\/contact\/inquiry/)
    await expect(page.getByRole('heading', { name: 'お問い合わせ' })).toBeVisible()
  })

  test('空提交显示校验错误', async ({ page }) => {
    await page.goto('/ja/contact/inquiry')
    await page.getByRole('button', { name: '送信する' }).click()
    // 至少出现一个校验错误（role=alert）
    await expect(page.getByRole('alert').first()).toBeVisible()
    await expect(page).toHaveURL(/\/contact\/inquiry$/)
  })

  test('填全 + 同意 + 提交 → 成功页', async ({ page }) => {
    await page.goto('/ja/contact/inquiry')

    await page.getByLabel(/御社名/).fill('株式会社サンプル商事')
    await page.getByLabel(/ご担当者名/).fill('山田 太郎')
    await page.getByLabel(/メールアドレス/).fill('taro@example.com')
    // 品类 checkbox（避开 Footer 同名链接，用 role 精确定位）
    await page.getByRole('checkbox', { name: 'リュック' }).check()
    await page.getByLabel(/プライバシーポリシーに同意します/).check()

    await page.getByRole('button', { name: '送信する' }).click()

    await expect(page).toHaveURL(/\/contact\/inquiry\/thanks/)
    await expect(
      page.getByRole('heading', { name: 'お問い合わせありがとうございます' })
    ).toBeVisible()
  })
})
