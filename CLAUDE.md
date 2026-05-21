# 青岛万翔辉日文官网 · Claude 项目指南

> 本文档是 Claude 在本目录工作的「宪法 + 导航」。新建会话进入后，请先读完本文件，再根据需要去查 `plan.md` / `design.md` / `knowledge base/`。

---

## 1. 项目概况

| 项 | 内容 |
| --- | --- |
| 项目代号 | WXH-JP-WEB-2026 |
| 项目本质 | **面向日本市场的 B2B 箱包 OEM 工厂官网** |
| 主语言 | 日文（ja） — 辅助：英文（en）/ 中文（zh） |
| 主目标 | 询盘获取 + 品牌信任建设（**非 DTC，不挂购物车**） |
| 公司 | 青岛万翔辉（中国山东 + 缅甸仰光 Better Bags Myanmar 双引擎工厂） |
| 当前阶段 | **规划完成、尚未开始编码**（仅有规划文档与规则库） |
| 计划上线 | 2026 Q4（4 期 / 6 个月，详见 `plan.md` §15） |

---

## 2. 核心参考文档（开始任何工作前必读）

| 文档 | 内容 | 何时查 |
| --- | --- | --- |
| `plan.md` | 完整实施蓝图（18 节，含目标 / 用户画像 / 站点结构 / 多语言 / SEO / 表单 / 技术栈 / 部署 / 法务 / 排期） | 写任何业务功能前 |
| `design.md` | 设计系统（Design Tokens / 组件库 / 页面布局 / 摄影 / 动效 / A11y） | 写 UI 时必查 Token |
| `knowledge base/01-06` | 业务知识库（公司概况 / 工厂硬件 / 产品线 / 供应链 / 打样流程 / 商务条款） | 写文案 / FAQ / 案例时 |
| `rules/` | 通用编码规则（8 份：coding-style / testing / security / git-workflow / patterns / performance / hooks / agents） | 编码细节有疑问时 |
| `commands/` | 15 个自定义命令 | 见下方 §10 |
| `subagents/` | 9 个子代理 | 见下方 §11 |
| `skills/` | 9 个 skill | 复用最佳实践 |

> **重要**：本 CLAUDE.md 只做导航，不复制上述文档内容。需要细节请直接打开对应文件。

---

## 3. 技术栈（锁定 · 方案 A）

来自 `plan.md` §10.1，首选 Headless 现代化方案：

```
Next.js 14+（App Router） + React 19 + TypeScript 5（strict）
Tailwind CSS 3.4（同步 design.md Tokens）
next-intl                     # 多语言（ja/en/zh）
next-seo                      # SEO 元信息
React Hook Form + Zod         # 表单 + 校验
Vitest + fast-check           # 单测 + property-based
Playwright                    # E2E
framer-motion                 # 动效（克制使用，≤400ms）
sharp                         # 图片优化（WebP/AVIF）
Resend                        # 邮件
@vercel/og                    # 动态 OG 图生成
@tanstack/react-query         # 数据请求
```

| 项 | 选型 |
| --- | --- |
| CMS | Sanity 或 Strapi（待客户确认 → `XXX-CMS`） |
| 部署 | Vercel Tokyo edge / Cloudflare Pages（日本节点优先） |
| 防爬 | reCAPTCHA v3（不打断 UX） |
| CRM | HubSpot / Pipedrive / Notion（待定 → `XXX-CRM`） |
| 监控 | Vercel Analytics + Sentry + GA4 + GTM + Microsoft Clarity |

**禁止**：未经讨论替换以上任何技术。需要新增依赖时先说明理由。

---

## 4. 关键规则（强约束）

### 4.1 代码组织

- **多小文件 > 少大文件**：高内聚、低耦合
- 单文件 **200-400 行典型，硬上限 800 行**
- 超过 400 行立即抽工具 / 拆组件
- 按 **功能 / 领域** 组织，**不按类型**

### 4.2 代码风格

- **不可变性 NEVER mutate**：永远 spread 出新对象 / 数组

  ```typescript
  // 错
  user.name = 'New'
  items.push(newItem)

  // 对
  const updatedUser = { ...user, name: 'New' }
  const updatedItems = [...items, newItem]
  ```

- **不写 emoji**（除非用户明确要求）
- **不留 console.log**（生产代码，hook 会扫描）
- **所有用户输入用 Zod 校验**（客户端 + 服务端双校验）
- **TypeScript strict mode** 全开

### 4.3 TDD（强制 · 第一天就执行）

- **RED → GREEN → REFACTOR** 工作流
- **覆盖率门槛 80%**（branch / function / line / statement）
- **关键逻辑用 property-based**（fast-check）：表单校验 / i18n 切换 / 导航滚动 / 响应式断点
- **测试先写、实现后写**，没例外

  ```typescript
  // 例：表单字段任意长度都应给出明确错误或通过
  test('Property: 邮箱字段在任何输入下都返回布尔判断', () => {
    fc.assert(fc.property(fc.string(), (input) => {
      const result = ContactSchema.safeParse({ email: input })
      expect(typeof result.success).toBe('boolean')
    }), { numRuns: 100 })
  })
  ```

### 4.4 安全

- **密钥走环境变量**，不硬编码
- 文件上传双校验：大小（≤10MB）/ 类型（白名单 .pdf .jpg .png .ai .psd）/ 内容
- CSRF + API 速率限制（Vercel Middleware）
- 错误信息**不泄露**栈 / 路径 / 密钥
- 反 XSS / SQL 注入（框架默认 + 手动核查）

### 4.5 日式 B2B 调性铁律（10 条 · 本项目独有）

> 这是本项目区别于普通网站的核心。来源：`design.md` §0、`plan.md` §6.2 §13.3。任何输出（代码 / 文案 / 设计建议）必须默认遵守。

1. **不卖货，卖信任**：CTA 用「お問い合わせ／カタログDL／工場見学／サンプル依頼」，**禁用** "立即购买 / Buy Now / 加入购物车"
2. **不用翻译腔**：日文文案**机翻不可直接上线**，必须经 native 校对。Claude 输出日文时如不确定，标注「需 native 复核」
3. **不用绝对化表达**：禁「世界一」「No.1」「最高」「業界トップ」等（违反景品表示法）。用具体数字 + 来源（如 "2003 年創業" "縫製スタッフ約 470 名"）
4. **案例匿名化**：**未授权不展示客户名字 / Logo**，用「業種＋規模＋年数」描述（如「某海外ライセンスブランド様」）
5. **配色克制**：禁红金大花纹、禁多种鲜艳色平铺。严格按 `design.md` §1.1 的主色 / 中性灰 / 强调色三阶
6. **每个模块用「英文小帽 + 日文大标题」双标题**（参见 `design.md` §0.1 第 4 条）
7. **信息密度 > 装饰密度**：禁全屏视频背景 + 大字 slogan 无内容
8. **留白比中国工业站多 30-50%**：模块间距宁大勿小
9. **默认语言绝不可为中文**：日 IP → `/`（ja），中 IP → `/zh/`（但顶部 banner 提示「日本語でご覧になりたい場合はこちら」），其他 → `/en/`
10. **hreflang 三语必设**：每页 `<head>` 添加 ja / en / zh / x-default

---

## 5. 目录结构（规划 · 参考 `plan.md` §10.3）

```
万翔辉日文官网/
├── app/
│   ├── [locale]/                  # ja（默认）/ en / zh
│   │   ├── page.tsx               # ホーム
│   │   ├── strength/              # 当社の強み
│   │   ├── oem-flow/              # OEM の流れ
│   │   ├── factory/               # 工場と設備
│   │   │   ├── qingdao/
│   │   │   ├── shandong/
│   │   │   └── myanmar/
│   │   ├── works/                 # 制作事例
│   │   ├── quality/               # 品質と検品体制
│   │   ├── lead-time/             # 納期
│   │   ├── commercial/            # 商務条件
│   │   ├── sampling/              # サンプリング
│   │   ├── about/                 # 会社案内
│   │   ├── news/                  # お知らせ・コラム
│   │   ├── faq/                   # よくある質問
│   │   ├── contact/               # 4 个入口子页
│   │   └── layout.tsx
│   ├── api/                       # 询盘 / 上传 / 邮件路由
│   ├── globals.css
│   ├── sitemap.ts                 # SEO sitemap
│   └── robots.ts
├── components/
│   ├── layout/                    # Navbar / Footer / Breadcrumb
│   ├── sections/                  # HeroBanner / Strengths / FactoryShowcase / ContactForm ...
│   └── ui/                        # Button / Accordion / OptimizedImage ...
├── lib/
│   ├── validations.ts             # Zod schemas
│   ├── metadata.ts                # SEO metadata 生成器
│   ├── i18n.ts                    # next-intl 配置
│   └── content/                   # CMS 接入
├── locales/
│   ├── ja.json                    # 主语言
│   ├── en.json
│   └── zh.json
├── public/                        # 静态资源（工厂照片 / PDF カタログ）
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/                       # Playwright
│   └── properties/                # fast-check
├── commands/                      # 自定义命令（已有）
├── subagents/                     # 子代理（已有）
├── skills/                        # 复用 skill（已有）
├── rules/                         # 编码规则（已有）
├── hooks/                         # React hooks + hook 配置（已有）
├── knowledge base/                # 业务知识库（已有）
├── plan.md                        # 实施蓝图（已有）
├── design.md                      # 设计系统（已有）
└── CLAUDE.md                      # 本文件
```

---

## 6. 多语言策略（`plan.md` §6）

| 语言 | 优先级 | URL | 范围 |
| --- | --- | --- | --- |
| 日文（ja） | P0 主语言 | `/`（默认） | **全部页面** |
| 英文（en） | P1 海外辅助 | `/en/` | 全部页面（简化版可接受） |
| 中文（zh） | P2 国内辅助 | `/zh/` | **仅** 主页 / 关于 / 联系 |

**翻译流程**：
1. 中文原稿（项目方 + 文案）
2. 中→日 行业译者翻译
3. 日本 native 校对（不可省）
4. 行业老客户 review 1-2 轮

**机翻禁忌**：Claude 不得擅自把中文文案直接翻译成日文上线。生成日文时如不确定，必须标注「需 native 复核」并在 PR 中明示。

---

## 7. SEO 必备（`plan.md` §8.2）

- [ ] 全站 HTTPS + HSTS
- [ ] Schema.org：`Organization` / `LocalBusiness` / `Article` / `FAQPage` / `BreadcrumbList`
- [ ] **hreflang** 正确设置（ja / en / zh / x-default）
- [ ] `robots.txt` + `sitemap.xml`
- [ ] 每页 Title ≤ 60 字符 / Description ≤ 160 字符 / 唯一 H1
- [ ] OGP（Open Graph）+ Twitter Card
- [ ] 图片 lazy load + WebP / AVIF + 明确尺寸
- [ ] Core Web Vitals 三项全绿
- [ ] Lighthouse 移动端 ≥ 90（上线 +6M 目标 ≥ 95）

**核心关键词**（写文案 / metadata 时优先覆盖，详见 `plan.md` §8.1）：
- `バッグ OEM` / `リュック OEM` / `バッグ 工場` / `OEM 工場`
- 长尾：`バッグ OEM 中国` / `リュック OEM 海外` / `バッグ OEM 緬甸` / `バッグ OEM 小ロット` / `日本品質 中国工場` / `通勤リュック OEM`

---

## 8. 表单与转化路径（`plan.md` §9）

**5 级转化漏斗**（从浅到深）：

| 层 | 动作 | 字段 | 后续 |
| --- | --- | --- | --- |
| L1 | 看博客文章 | — | 像素追踪 |
| L2 | カタログ DL | 邮箱 + 公司 + 业种 | 5 封 EDM 培育流 |
| L3 | お問い合わせ | 完整询盘字段（12 项） | 销售 24h 内日文回复 |
| L4 | サンプル依頼 | 完整 + 设计稿 | 销售 + 打样室 |
| L5 | 工場見学申込 | 完整 + 时间 + 候补 3 选 | 销售 + 接待 |

**表单技术约束**：
- React Hook Form + Zod 客户端 / 服务端双校验
- 文件上传：≤ 10MB / ≤ 5 文件 / 仅 `.pdf .jpg .png .ai .psd`
- reCAPTCHA v3（不打断 UX）
- 提交后：日文成功页 + 24h 回复承诺 + 自动邮件
- 落库：CRM + 销售邮箱 + 内部通知（Slack/钉钉/飞书）

**Zod schema 示例**（写表单时复用模式）：

```typescript
import { z } from 'zod'

export const InquirySchema = z.object({
  companyName: z.string().min(1, '御社名を入力してください'),
  contactName: z.string().min(1, 'ご担当者名を入力してください'),
  email: z.string().email('正しいメールアドレスを入力してください'),
  phone: z.string().optional(),
  language: z.enum(['ja', 'zh', 'en']),
  productCategory: z.array(z.enum(['backpack', 'tote', 'business', 'student', 'other'])),
  quantity: z.string().optional(),
  desiredLeadTime: z.string().optional(),
  message: z.string().max(500, '500 字以内でお願いします'),
  privacyAgreed: z.literal(true, { errorMap: () => ({ message: '同意が必要です' }) })
})
```

---

## 9. 性能与可访问性

### 9.1 性能目标（`plan.md` §12.1）

- 首屏 JS bundle **≤ 200 KB**（gzip）
- LCP ≤ 2.5s / INP ≤ 100ms / CLS ≤ 0.1
- 全站图片 WebP / AVIF + lazy load
- CSS tree-shaking（Tailwind 默认）
- 不引入阻塞脚本（JSON-LD 除外）

### 9.2 可访问性（WCAG AA）

- 正文与背景对比度 **≥ 4.5:1**（design.md §1.1.3 已实测达标）
- 键盘导航完全支持（Tab / Shift+Tab / Enter / Esc）
- 屏幕阅读器友好（ARIA label / 语义 HTML / `lang="ja"` 标注）
- 焦点指示可见
- 表单 label 正确关联
- 跳过导航链接（Skip to main content）

---

## 10. 自定义命令（`commands/`）

| 命令 | 用途 |
| --- | --- |
| `/plan` | 实施前先建计划（复杂功能 / 重构必跑） |
| `/tdd` | TDD 流程（**所有新功能必走**） |
| `/code-review` | 代码审查（提交前必跑） |
| `/security-review` | 安全审查（合并前必跑） |
| `/build-fix` | 修构建错误 |
| `/e2e` | Playwright E2E |
| `/test-coverage` | 覆盖率报告 |
| `/checkpoint` | 验证全部测试通过 |
| `/verify` | 端到端验证 |
| `/refactor-clean` | 死代码 / 复用清理 |
| `/update-docs` | 更新文档 |
| `/update-codemaps` | 更新代码地图 |
| `/orchestrate` | 多代理协调 |
| `/eval` | 评估 |
| `/learn` | 学习 |
| `/setup-pm` | 项目管理初始化 |

---

## 11. 子代理（`subagents/`）

| 代理 | 用途 | 触发场景 |
| --- | --- | --- |
| `planner` | 实施计划 | 复杂功能、重构 |
| `architect` | 系统设计 | 架构决策 |
| `tdd-guide` | TDD 引导 | 新功能 / Bug fix（**主动用**） |
| `code-reviewer` | 代码审查 | 写完代码立即用 |
| `security-reviewer` | 安全审查 | 提交前 |
| `build-error-resolver` | 修构建 | 构建失败 |
| `e2e-runner` | E2E 测试 | 关键流程 |
| `refactor-cleaner` | 死代码清理 | 维护期 |
| `doc-updater` | 文档更新 | 改完功能 |

**主动触发原则**（来自 `rules/agents.md`）：
- 复杂功能 → `planner`
- 写完代码 → `code-reviewer`
- 新功能 / Bug → `tdd-guide`
- 架构决策 → `architect`

并行使用：多个独立任务时一次性启多个子代理。

---

## 12. Git 工作流（`rules/git-workflow.md`）

- **Conventional commits**：`feat` / `fix` / `refactor` / `docs` / `test` / `chore` / `perf` / `ci`
- 不直接提交到 main，走 PR
- 提交前必跑 `/code-review` 与 `/checkpoint`
- 所有测试通过才合并
- PR 描述包含完整 commit 历史 + test plan

提交格式：

```
feat: 新增询盘表单的 reCAPTCHA v3 校验

- 客户端 token 获取
- 服务端 secret 校验
- 失败回退到人工审核队列
```

---

## 13. 环境变量

`.env.example` 模板（不提交 `.env`）：

```bash
# 邮件
RESEND_API_KEY=re_***

# 防爬
RECAPTCHA_SECRET_KEY=***
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=***

# CMS（二选一，待客户确认）
SANITY_PROJECT_ID=***
SANITY_DATASET=production
SANITY_API_TOKEN=***
# 或：
STRAPI_URL=https://cms.XXX-主域名
STRAPI_API_TOKEN=***

# 站点
NEXT_PUBLIC_SITE_URL=https://XXX-主域名
NEXT_PUBLIC_DEFAULT_LOCALE=ja

# 分析
NEXT_PUBLIC_GA_ID=G-***
NEXT_PUBLIC_GTM_ID=GTM-***
```

---

## 14. 开发工作流（每个功能的标准流程）

```
1. 接到需求
   ↓
2. /plan         ← 用 planner 设计实施步骤
   ↓
3. /tdd          ← 用 tdd-guide 先写测试（RED）
   ↓
4. 按 design.md Tokens 实现（GREEN）
   ↓
5. /code-review  ← 用 code-reviewer 审查
   ↓
6. /security-review（涉及表单 / 文件上传 / 鉴权时）
   ↓
7. /checkpoint   ← 全部测试通过
   ↓
8. Conventional commit + PR
```

---

## 15. `XXX-` 待客户确认清单（编码前必须落锁）

详见 `plan.md` §18。主要包括：

- [ ] 公司中 / 英 / 日全称
- [ ] 主域名注册
- [ ] Logo（横版 / 纵版 / icon）
- [ ] 品牌色最终选定（design.md §1.1 候选 4 套）
- [ ] CMS 选型（Sanity / Strapi）
- [ ] CRM 选型（HubSpot / Pipedrive / Notion）
- [ ] 法务页面（律所 / 顾问）
- [ ] 摄影 / 视频拍摄 brief
- [ ] PDF カタログ 1.0 内容
- [ ] 代表挨拶内容 + 视频
- [ ] 工厂年表（沿革）每个里程碑

Claude 在这些 `XXX` 项未确认前**不得擅自代填**，必须显式提示「待客户确认」。

---

## 16. 重要提醒（每次进入项目都要记得）

- **TDD 不是可选**——所有新功能先写测试
- **不可变性不是建议**——任何 mutation 都会被审查打回
- **日文内容机翻不可直接上线**——必须标 `// TODO: native 校对`
- **B2B 调性铁律 10 条**——任何 UI / 文案输出默认遵守
- **`plan.md` 与 `design.md` 是单一事实源**——有冲突以这两份为准
- **不创建多余 .md 文件**——hooks 会拦截除 `README/CLAUDE/AGENTS/CONTRIBUTING.md` 外的新 md
- **`dev` 必须在 tmux 内跑**——hooks 会拦截裸 `npm run dev`

---

## 17. 快速参考

```bash
# 开发（必须 tmux）
tmux new -s dev "npm run dev"
tmux attach -t dev

# 测试
npm test                 # 跑全部
npm run test:watch       # TDD watch
npm run test:coverage    # 覆盖率
npm run test:e2e         # Playwright

# 质量
npm run lint
npm run type-check
npm run build            # 生产构建

# 命令
/plan         /tdd        /code-review     /checkpoint
/security-review  /e2e    /test-coverage   /build-fix
```

---

**记住**：本项目是要让日本采购方**在 3 秒内觉得这家工厂可信、专业、易合作**。每一行代码、每一段文案都为这个目标服务。
