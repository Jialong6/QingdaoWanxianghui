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

| Milestone | 状态 |
| --- | --- |
| M0 项目脚手架 | 进行中 |
| M1 Design Tokens & 基础设施 | 启动 |
| M2-M8 | 见 [开发路线图](/Users/lijialong/.claude/plans/claude-md-temporal-cosmos.md) |
