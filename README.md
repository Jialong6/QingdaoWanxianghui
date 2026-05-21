# 青岛万翔辉 · 日文官网（WXH-JP-WEB-2026）

面向日本市场的 B2B 箱包 OEM 工厂官网。

> Claude 进入本项目前请先阅读 [`CLAUDE.md`](./CLAUDE.md)（项目宪法 + 导航）。

---

## 技术栈

- **Next.js 14**（App Router） + **React 18** + **TypeScript 5**（strict）
- **Tailwind CSS 3.4**（同步 `design.md` §1 Design Tokens）
- **next-intl**（多语言：ja 默认 / en / zh）
- **React Hook Form + Zod**（表单 + 校验）
- **Vitest + fast-check + Playwright**（测试）

完整技术决策详见 [`CLAUDE.md`](./CLAUDE.md) §3。

---

## 快速开始

```bash
# 1. 安装依赖（Node ≥ 18.17）
npm install

# 2. 启动开发服务器
npm run dev
# 访问 http://localhost:3000      → 日文（默认）
# 访问 http://localhost:3000/en   → 英文
# 访问 http://localhost:3000/zh   → 中文

# 3. 跑测试
npm test                  # 单测
npm run test:coverage     # 覆盖率（门槛 80%）
npm run test:e2e          # Playwright E2E

# 4. 构建
npm run build
npm start
```

---

## 项目文档

| 文档 | 内容 |
| --- | --- |
| [`CLAUDE.md`](./CLAUDE.md) | Claude 项目指南（必读） |
| [`plan.md`](./plan.md) | 完整实施蓝图（18 节） |
| [`design.md`](./design.md) | 设计系统与 Tokens（14 节） |
| [`knowledge base/`](./knowledge%20base/) | 业务知识库（公司 / 工厂 / 产品 / 供应链 / 打样 / 商务） |
| [`rules/`](./rules/) | 通用编码规则 |
| [`commands/`](./commands/) | 自定义命令 |
| [`subagents/`](./subagents/) | 子代理 |
| [`skills/`](./skills/) | 复用技能 |

---

## 目录结构

详见 [`CLAUDE.md`](./CLAUDE.md) §5。核心约定：

- `app/[locale]/` — i18n 路由（ja 默认无前缀，en/zh 带前缀）
- `components/{layout,sections,ui}/` — 按职责分层
- `lib/` — 工具层（tokens / navigation / i18n / metadata 等）
- `hooks/` — 复用的 React hooks
- `messages/{ja,en,zh}.json` — i18n 文案
- `tests/{unit,integration,properties,e2e}/` — 测试

---

## 关键纪律（来自 CLAUDE.md）

- **TDD 强制**：所有新功能 RED → GREEN → REFACTOR，覆盖率 ≥ 80%
- **不可变性**：NEVER mutate，永远 spread 新对象
- **不写 emoji**（除非用户明确要求）
- **不留 console.log**（生产代码）
- **Zod 校验所有用户输入**
- **日文文案不可机翻**：标 `// TODO: native 校对`
- **遵守日式 B2B 调性铁律 10 条**：详见 [`CLAUDE.md`](./CLAUDE.md) §4.5

---

## 当前进度

Phase 1 MVP 已完成（M0–M8）。

| Milestone | 内容 | 状态 |
| --- | --- | --- |
| M0 | 项目脚手架 | ✅ |
| M1 | Design Tokens & 基础设施 | ✅ |
| M2 | 基础 UI 组件库（12） | ✅ |
| M3 | Layout（Navbar/Footer/全局壳） | ✅ |
| M4 | 首页 9 屏 | ✅ |
| M5 / M5.5 | 询盘表单 + 文件上传 + E2E | ✅ |
| M6 / M6.5 | 内容展示页 + 三表单子页 | ✅ |
| M7 / M7.5 | SEO 核心 + 占位页 + IP 地理 + 动态 OG | ✅ |
| M8 | MVP 软上线准备（分析 / E2E / CI / 部署） | ✅ |

> 详细路线图见 [开发路线图](/Users/lijialong/.claude/plans/claude-md-temporal-cosmos.md)。

---

## 上线 checklist（软上线前）

**环境变量（部署平台配置，参考 `.env.example`）**
- [ ] `NEXT_PUBLIC_SITE_URL` = 真实主域名（影响 canonical / sitemap / OG）
- [ ] `RESEND_API_KEY` + `INQUIRY_NOTIFY_EMAIL`（不配则邮件降级为日志）
- [ ] `RECAPTCHA_SECRET_KEY` + `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`（不配则跳过校验）
- [ ] `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_GTM_ID`（不配则不加载；配后仍需访客同意）

**质量门（CI 已自动跑：`.github/workflows/ci.yml`）**
- [ ] `npm run lint` / `npm run type-check` 0 错
- [ ] `npm test`（覆盖率 ≥ 80%）
- [ ] `npm run build` 通过
- [ ] `npm run test:e2e`（本地，需 `npx playwright install chromium`）

**合规与隐私**
- [ ] 同意横幅文案 native 校对 + 法务确认（APPI 表述）— 当前文案标 TODO
- [ ] `/privacy`、`/terms` 律师审稿（XXX）

**性能（待客户实拍图）**
- [ ] 替换 placeholder 实拍图后，移除 `next.config.mjs` 的 `images.unoptimized`
- [ ] Lighthouse 移动端 ≥ 90 / Core Web Vitals 三项全绿

**部署**
- [ ] Vercel 项目绑定域名（`vercel.json` 已设东京节点 `hnd1`）
- [ ] HTTPS + 安全头（`next.config.mjs` `headers()` 已配 HSTS 等）
