# 青岛万翔辉 官方网站 · 设计系统（design.md）

> 本文档定义视觉语言、Design Tokens、组件库、页面布局规范、摄影/视频规范、动效规范，是与 `plan.md`（实施计划）配套的设计基准。
>
> **未确定项**统一以 `XXX` 占位，待客户最终选定后填入。
>
> 参考底盘：
> - 同目录《日本箱包工厂网站设计研究_20网站深度拆解.md》
> - `plan.md` 中已定义的功能 / 页面结构

---

## 目录

- [0. 设计哲学与原则](#0-设计哲学与原则)
- [1. Design Tokens（设计令牌）](#1-design-tokens设计令牌)
  - [1.1 色彩](#11-色彩)
  - [1.2 字体](#12-字体)
  - [1.3 字号 / 行高 / 字距](#13-字号--行高--字距)
  - [1.4 间距系统（Spacing Scale）](#14-间距系统spacing-scale)
  - [1.5 圆角 / 阴影 / 边框](#15-圆角--阴影--边框)
  - [1.6 响应式断点](#16-响应式断点)
  - [1.7 动效令牌](#17-动效令牌)
  - [1.8 Z-index 层级](#18-z-index-层级)
- [2. 全局元素](#2-全局元素)
  - [2.1 Header](#21-header)
  - [2.2 Footer](#22-footer)
  - [2.3 Breadcrumb](#23-breadcrumb)
  - [2.4 Notice Bar](#24-notice-bar)
  - [2.5 Floating Quick Contact](#25-floating-quick-contact)
- [3. 基础组件库](#3-基础组件库)
- [4. 业务组件库](#4-业务组件库)
- [5. 页面布局规范](#5-页面布局规范)
- [6. 摄影 / 图像规范](#6-摄影--图像规范)
- [7. 图标系统](#7-图标系统)
- [8. 插画 / 信息图规范](#8-插画--信息图规范)
- [9. 动画 / 微交互规范](#9-动画--微交互规范)
- [10. 可访问性（A11Y）](#10-可访问性a11y)
- [11. 暗色模式（可选）](#11-暗色模式可选)
- [12. PDF カタログ 设计规范](#12-pdf-カタログ-设计规范)
- [13. 邮件模板设计规范](#13-邮件模板设计规范)
- [14. 设计交付与版本管理](#14-设计交付与版本管理)

---

## 0. 设计哲学与原则

### 0.1 总纲：「制造业的克制美」

万翔辉网站的设计**不是要"漂亮"，而是要"让日本采购方在 3 秒内觉得这家工厂可信、专业、易合作"**。从日本工厂网站研究中提炼的 5 条总纲：

| # | 原则 | 反面教材 |
| --- | --- | --- |
| 1 | **信息密度高于装饰密度**（"写了多少正经事" > "好看了多少") | 全屏视频背景 + 大字号 slogan 无内容 |
| 2 | **留白比中国工业站多 30-50%**（让眼睛喘气) | 模块紧贴、信息满屏、字号过大 |
| 3 | **配色克制**（白/灰/深灰文字 + 1 强调色） | 红黄蓝配大金大紫 |
| 4 | **每个模块都有"英文小帽 + 日文大标题"双标题** | 只有日文标题、或只有 banner 图 |
| 5 | **不卖货，卖信任**（CTA 是"询盘 / 资料 / 见学"而不是"立即购买"） | 把 B2B 当 DTC 做 |

### 0.2 11 条设计 Do / Don't

| ✅ Do | ❌ Don't |
| --- | --- |
| 大量使用工厂实拍（手、机器、面料、缝线） | 用图库素材（stock photo） |
| 文字主导，图片辅助 | 大图主导，文字配角 |
| 1-2 套字体（日文 Sans + 英文 Sans + 偶有衬线点缀） | 5 种以上字体混用 |
| 1 个主色 + 1 个强调色 + 中性灰阶 | 多种鲜艳色平铺 |
| 静态为主，动效作点缀（≤ 400ms） | 全站滚动视差 + 飞入飞出 |
| 网格规整、模块对齐严格 | 自由布局 |
| 标题 = 英文小写小帽 + 日文大字 | 全大写英文巨字 |
| 圆角小（4-8px） / 平面化 | 圆角过大 / 拟物化 |
| 全站统一比例图（3:2 / 4:5 / 16:9 不混用） | 随机比例 |
| 移动端独立设计断点 | "等比缩放" |
| 颜色 + 字号 + 间距全部走 Token | 每个页面随手定值 |

---

## 1. Design Tokens（设计令牌）

> 所有令牌使用 CSS 变量 + Tailwind 配置同步管理。
> 使用 **HSL + 数字阶梯** 命名规范，方便扩展。

### 1.1 色彩

#### 1.1.1 主色板（推荐 B + C 混合 — 现代+亲和路线）

> 待客户最终选定 → XXX-最终配色板编号

```css
/* 主色 - 现代藏蓝（参考研究文档配色板 B） */
--color-primary-50:  hsl(212, 30%, 96%);  /* #F0F4F8 */
--color-primary-100: hsl(212, 30%, 90%);  /* #DCE5EC */
--color-primary-200: hsl(212, 30%, 80%);  /* #B8CBD8 */
--color-primary-300: hsl(212, 30%, 65%);  /* #8AAABE */
--color-primary-400: hsl(212, 30%, 50%);  /* #5C88A2 */
--color-primary-500: hsl(212, 50%, 35%);  /* #2C5F8D */  ← 主色
--color-primary-600: hsl(212, 55%, 28%);  /* #224D75 */
--color-primary-700: hsl(212, 60%, 22%);  /* #1A3B5B */
--color-primary-800: hsl(212, 65%, 16%);  /* #122941 */
--color-primary-900: hsl(212, 70%, 10%);  /* #0A1828 */

/* 中性灰阶 - 用于文字与背景 */
--color-neutral-0:   #FFFFFF;
--color-neutral-50:  #FAFAF7;  ← 米白背景（参考研究文档 A 工房系）
--color-neutral-100: #F2F2EE;
--color-neutral-200: #E0E0DA;
--color-neutral-300: #C2C2BC;
--color-neutral-400: #9A9A93;
--color-neutral-500: #6B6B66;
--color-neutral-600: #4A4A45;
--color-neutral-700: #2D2D2A;  ← 正文文字
--color-neutral-800: #1A1A18;
--color-neutral-900: #0F0F0E;  ← 标题文字

/* 强调色 - 暖橙（亲和系，参考 C 路线） */
--color-accent-50:  #FFF6EC;
--color-accent-100: #FFE3C2;
--color-accent-500: #F4A04E;  ← 强调色（CTA / 重点高亮）
--color-accent-600: #E08B36;
--color-accent-700: #B86B1F;

/* 功能色 */
--color-success: #2D8A5C;   /* 表单成功提示 */
--color-warning: #D4A93D;   /* 注意提示 */
--color-error:   #C0443C;   /* 表单错误 */
--color-info:    #4A7CA8;   /* 信息提示 */

/* 工房色 - 用于工艺/特写区块，营造"老铺"质感 */
--color-craft-paper:   #F5EFE3;  /* 米黄纸感 */
--color-craft-leather: #8B6F47;  /* 革棕 */
--color-craft-thread:  #D2B68C;  /* 棉线 */
--color-craft-ink:     #1F1B16;  /* 墨 */
```

#### 1.1.2 配色规则

| 场景 | 颜色组合 |
| --- | --- |
| 标题文字 | `neutral-900` |
| 正文文字 | `neutral-700` |
| 次级文字 / 副标题 | `neutral-500` |
| 链接 | `primary-500` / hover: `primary-700` |
| 主 CTA 按钮 | bg `primary-500` / hover `primary-600` / text `neutral-0` |
| 次 CTA 按钮 | bg transparent / border `primary-500` / text `primary-500` |
| 重点 CTA（询盘表 / Hero） | bg `accent-500` / hover `accent-600` / text `neutral-900` |
| 卡片背景 | `neutral-0` 或 `neutral-50` |
| 分隔线 | `neutral-200` 1px |
| 错误状态 | `error` |
| 工艺特写区块 | bg `craft-paper` / text `craft-ink` |

#### 1.1.3 对比度要求（WCAG AA）

- 正文与背景对比度 ≥ 4.5:1
- 标题与背景对比度 ≥ 3:1
- 链接与背景对比度 ≥ 4.5:1

实测：
- `neutral-700` on `neutral-0`：13.5:1 ✅
- `neutral-700` on `neutral-50`：12.8:1 ✅
- `neutral-0` on `primary-500`：6.9:1 ✅
- `neutral-900` on `accent-500`：8.2:1 ✅

### 1.2 字体

#### 1.2.1 字体栈

```css
/* 日文 - 主语言 */
--font-jp-sans: "Noto Sans JP", "Hiragino Sans", "Yu Gothic UI",
                "Meiryo UI", "Hiragino Kaku Gothic ProN",
                "ヒラギノ角ゴ ProN W3", system-ui, sans-serif;

--font-jp-serif: "Noto Serif JP", "YuMincho", "Yu Mincho",
                 "Hiragino Mincho ProN", "ヒラギノ明朝 ProN", serif;

/* 英文 - 副语言 + 小帽标题 */
--font-en-sans: "Inter", "Helvetica Neue", "Helvetica",
                "Arial", system-ui, sans-serif;

--font-en-serif: "Source Serif Pro", "Georgia", serif;  /* 仅特殊场景 */

/* 中文 - 仅 zh 版 */
--font-zh-sans: "PingFang SC", "Microsoft YaHei UI",
                "微软雅黑", system-ui, sans-serif;

/* 数字 - tabular-nums 用于数据展示 */
--font-mono: "JetBrains Mono", "Source Code Pro", monospace;
```

字重权重（仅使用 4 档）：
- 400 Regular（正文）
- 500 Medium（次级标题、按钮）
- 600 SemiBold（强调）
- 700 Bold（大标题）

> 不使用 300 Light / 900 Black，避免日文字符在小字号下"骨感"失真。

#### 1.2.2 字体使用规则

| 场景 | 字体 | 字重 |
| --- | --- | --- |
| H1 大标题（日文） | `font-jp-sans` | 700 |
| H2-H4 标题（日文） | `font-jp-sans` | 600 |
| 工艺特写区块大标题 | `font-jp-serif` ← 明朝点缀 | 700 |
| 正文（日文） | `font-jp-sans` | 400 |
| 引用 / quote | `font-jp-serif` | 400 italic |
| 英文小帽（CONCEPT / WORKS …） | `font-en-sans` | 500 |
| 英文标题 | `font-en-sans` | 600 |
| 数字 / 数据展示 | `font-en-sans` (tabular-nums) | 600 |
| 代码（罕用） | `font-mono` | 400 |

### 1.3 字号 / 行高 / 字距

#### 1.3.1 字号阶梯（移动端基准 16px）

| Token | 移动 | 桌面 | 用途 |
| --- | --- | --- | --- |
| `text-2xs` | 11px | 12px | 英文小帽、tag |
| `text-xs` | 12px | 13px | meta、breadcrumb |
| `text-sm` | 13px | 14px | 次级文字、说明 |
| `text-base` | 15px | 16px | 正文 |
| `text-lg` | 17px | 18px | 引文、强调正文 |
| `text-xl` | 19px | 20px | H4 |
| `text-2xl` | 22px | 24px | H3 |
| `text-3xl` | 26px | 30px | H2 |
| `text-4xl` | 30px | 36px | H1 默认 |
| `text-5xl` | 36px | 48px | Hero H1 |
| `text-6xl` | 44px | 64px | Hero 大屏 H1 |
| `text-display` | 56px | 80px | 数字大字（Stats Bar） |

#### 1.3.2 行高

| 场景 | line-height |
| --- | --- |
| 日文正文 | 1.8 |
| 日文小段说明 | 1.7 |
| 标题（H1-H3） | 1.4 |
| 英文小帽 | 1.2 |
| 数字（Stats） | 1.0 |
| 引文 | 1.75 |

#### 1.3.3 字距（letter-spacing）

| 场景 | letter-spacing |
| --- | --- |
| 日文正文 | 0.05em |
| 日文标题 | 0.02em |
| 英文正文 | 0 |
| 英文小帽（全大写） | 0.2em |
| 英文标题 | -0.01em（紧排） |
| 数字 | 0 |

#### 1.3.4 行长（measure）

- 日文正文最大 **22-28 个字符宽**（max-width 约 640px）
- 英文正文最大 **65-75 字符**（max-width 约 720px）
- 超出后强制换行 / 分栏

### 1.4 间距系统（Spacing Scale）

基于 4px 网格，8 阶：

| Token | px |
| --- | --- |
| `space-0` | 0 |
| `space-0.5` | 2 |
| `space-1` | 4 |
| `space-2` | 8 |
| `space-3` | 12 |
| `space-4` | 16 |
| `space-5` | 20 |
| `space-6` | 24 |
| `space-8` | 32 |
| `space-10` | 40 |
| `space-12` | 48 |
| `space-16` | 64 |
| `space-20` | 80 |
| `space-24` | 96 |
| `space-32` | 128 |
| `space-40` | 160 |

#### 间距使用规则

| 场景 | 间距 |
| --- | --- |
| 按钮内边距 | py-3 px-6 |
| 卡片内边距 | p-6 ~ p-8 |
| 段落间 | mt-4 |
| H 标题 + 下方段落 | mt-2 ~ mt-3 |
| 模块内组件间距 | space-y-8 |
| 模块（section）之间 | py-16 (移动) / py-24 (桌面) |
| 大区段间（hero 与下方） | py-20 (移动) / py-32 (桌面) |
| 容器内边距 | px-4 (移动) / px-8 (中) / px-12 (大) |

### 1.5 圆角 / 阴影 / 边框

#### 圆角

| Token | px | 用途 |
| --- | --- | --- |
| `rounded-none` | 0 | 工业感分隔 |
| `rounded-sm` | 2 | tag、徽章 |
| `rounded` | 4 | 按钮、输入框 |
| `rounded-md` | 6 | 卡片 |
| `rounded-lg` | 8 | 大卡片、modal |
| `rounded-xl` | 12 | 图片容器 |
| `rounded-2xl` | 16 | 重点展示卡 |
| `rounded-full` | 9999 | 圆点、头像 |

> **避免**使用 `rounded-3xl` 及以上的极大圆角，工业感会丧失。

#### 阴影

```css
--shadow-xs:  0 1px 2px hsla(212, 30%, 20%, 0.04);
--shadow-sm:  0 2px 4px hsla(212, 30%, 20%, 0.06);
--shadow:     0 4px 12px hsla(212, 30%, 20%, 0.08);
--shadow-md:  0 8px 24px hsla(212, 30%, 20%, 0.10);
--shadow-lg:  0 16px 40px hsla(212, 30%, 20%, 0.12);
--shadow-xl:  0 24px 64px hsla(212, 30%, 20%, 0.14);

/* 内阴影 - 用于焦点 / 输入框 */
--shadow-inset: inset 0 1px 2px hsla(212, 30%, 20%, 0.06);
--shadow-focus: 0 0 0 3px hsla(212, 50%, 35%, 0.20); /* 焦点环 */
```

使用规则：
- 默认卡片 `shadow-sm`
- Hover 卡片 `shadow-md`
- Modal `shadow-xl`
- 不堆叠 3 层以上阴影

#### 边框

| Token | 用途 |
| --- | --- |
| `border-px (1px) neutral-200` | 卡片默认 |
| `border-px neutral-300` | 表单默认 |
| `border-2 primary-500` | 表单 focus / 选中 tab |
| `border-px neutral-100` | 分隔线 |

### 1.6 响应式断点

| 断点 | px | 描述 |
| --- | --- | --- |
| `xs` | < 375 | 旧手机 |
| `sm` | ≥ 375 | 标准手机 |
| `md` | ≥ 768 | 平板 / 横屏手机 |
| `lg` | ≥ 1024 | 小笔记本 / 大平板 |
| `xl` | ≥ 1280 | 桌面 |
| `2xl` | ≥ 1440 | 大桌面 |
| `3xl` | ≥ 1920 | 4K / 大屏（仅展示） |

容器最大宽度：

| 容器 | max-width |
| --- | --- |
| `container-sm` | 640 |
| `container-md` | 768 |
| `container-lg` | 1024 |
| `container-xl` | 1200（**默认页面容器**） |
| `container-2xl` | 1440（特殊大屏 hero） |
| `container-prose` | 720（文章阅读宽度） |
| `container-narrow` | 880（窄文阅读） |

### 1.7 动效令牌

```css
/* Easing */
--ease-in-out:  cubic-bezier(0.4, 0, 0.2, 1);   /* 默认 */
--ease-out:     cubic-bezier(0, 0, 0.2, 1);      /* 进入 */
--ease-in:      cubic-bezier(0.4, 0, 1, 1);      /* 离开 */
--ease-emphasized: cubic-bezier(0.2, 0, 0, 1);   /* 强调 */

/* Duration */
--duration-instant: 50ms;   /* 即时反馈 */
--duration-fast:    150ms;  /* hover / focus */
--duration-base:    250ms;  /* 默认 */
--duration-slow:    400ms;  /* 卡片入场 */
--duration-slower:  600ms;  /* hero 渐显 */
```

> 严禁出现 > 800ms 的常规动效。

### 1.8 Z-index 层级

```css
--z-base:        0;
--z-dropdown:    10;
--z-sticky:      20;
--z-fixed:       30;
--z-modal-bg:    40;
--z-modal:       50;
--z-toast:       60;
--z-tooltip:     70;
```

---

## 2. 全局元素

### 2.1 Header

#### 视觉规范

- 高度：72px（PC） / 56px（移动）
- 背景：`neutral-0`，底部 1px `neutral-100` 分隔线
- 滚动时：可选 background `rgba(255,255,255,0.92) + backdrop-blur(8px)`（参考 Ohba / NAGATANI）
- Logo：左侧，h-8（移动）/ h-10（PC）
- 主导航：居中或右对齐（7 项 + 语言切换 + CTA）

#### 布局

```
┌──────────────────────────────────────────────────────────┐
│ [Logo]    [当社の強み][OEM の流れ][工場と設備][制作事例][会社案内][コラム]   [JP|EN|ZH]  [お問い合わせ]│
└──────────────────────────────────────────────────────────┘
```

#### 移动端

- 折叠为 hamburger 菜单
- Drawer 从右侧滑入 80% 宽度
- 顶部固定 logo + 关闭按钮 + 主导航纵向列出 + 语言切换 + 大 CTA 按钮

#### Hover / Active 状态

- 导航项 hover：text 颜色 `primary-500` + 底部 2px 下划线（slide-in）
- 当前页：text 颜色 `primary-500` + 底部 2px 实线
- CTA 按钮 hover：bg 加深 + 微微抬升（translateY(-1px)）

### 2.2 Footer

#### 视觉规范

- 背景：`primary-900` 深蓝
- 文字：`neutral-100`（标题） / `neutral-300`（次级）
- 上下内边距：py-16
- 顶部 1px `primary-700` 分隔线（与上方区段过渡）

#### 布局（5 栏 / 移动端折叠）

```
┌─────────────────────────────────────────────────────────┐
│ COMPANY        SERVICES      PRODUCTS     RESOURCES    SOCIAL │
│ Logo           OEM の流れ     リュック       カタログ DL    Instagram │
│ 会社概要       品質と検品     トート         お問い合わせ   LinkedIn │
│ 代表挨拶       工場と設備     ビジネス       工場見学      WeChat   │
│ 沿革           納期管理       学生用                        Newsletter │
│ 採用情報                                                          │
├─────────────────────────────────────────────────────────┤
│ 青島本社：XXX  山東工場：山东日照市莒县洛河镇  緬甸工場：Yangon NGWE PIN LAI │
├─────────────────────────────────────────────────────────┤
│ © 2026 青島万翔輝 All Rights Reserved.    プライバシー  利用規約  サイトマップ │
└─────────────────────────────────────────────────────────┘
```

### 2.3 Breadcrumb

- 位于 page hero 之下、内容区之前
- 字号 `text-xs`，颜色 `neutral-500`
- 分隔符 `›`（U+203A），不用 `>` 或 `/`
- 当前页不可点击

```
ホーム  ›  会社案内  ›  代表挨拶
```

### 2.4 Notice Bar

仅在特殊期间使用（春节假期 / 出展通知 / 防伪声明）。

- 位置：Header 之上
- 高度：40px
- 背景：`primary-100` 浅蓝 或 `accent-100` 暖橙（视主题严肃度）
- 文字：`text-sm` + 居中
- 右侧关闭按钮（小 X，可记忆 cookie 7 天）

### 2.5 Floating Quick Contact

- 位置：右下角，距离边缘 24px
- PC：圆角矩形 80×80px，icon + 「相談」文字
- 移动：圆形 56×56px，icon 居中
- 点击展开：Email / 电话 / WhatsApp / LINE 四联（XXX-LINE 是否做？）
- 滚动 > 300px 时显现，向上滚动时隐藏

---

## 3. 基础组件库

### 3.1 Button

#### 变体

| 变体 | 用途 |
| --- | --- |
| `primary` | 主 CTA |
| `secondary` | 次 CTA（线性） |
| `accent` | 重点 CTA（强转化） |
| `ghost` | 弱 CTA（次要） |
| `link` | 文字链按钮 |
| `danger` | 删除 / 警告（罕用） |

#### 尺寸

| 尺寸 | 高度 | padding | 字号 |
| --- | --- | --- | --- |
| `xs` | 28px | py-1 px-3 | text-xs |
| `sm` | 36px | py-2 px-4 | text-sm |
| `md` | 44px | py-3 px-6 | text-base |  ← 默认
| `lg` | 52px | py-4 px-8 | text-lg |
| `xl` | 60px | py-5 px-10 | text-xl |

#### 状态

- Default
- Hover：bg 加深 / -1px translateY
- Active：bg 更深 / 0 translateY
- Focus：`shadow-focus`（3px 蓝色焦点环）
- Disabled：opacity 0.4 + cursor-not-allowed
- Loading：左侧 spinner + 文字保留

#### 视觉细节

- 圆角 `rounded`（4px）
- 边框 primary 变体无边框、secondary 有 1.5px 边框
- 文字字重 500
- 内含图标时图标 16/18/20px，与文字间距 8px
- 高级 CTA 可加右箭头 `→`（隔 12px）

### 3.2 Input / Textarea

```
┌─────────────────────────────────────┐
│ ラベル *                              │
│ ┌───────────────────────────────┐    │
│ │ プレースホルダー                  │    │
│ └───────────────────────────────┘    │
│ ヘルプテキスト                        │
└─────────────────────────────────────┘
```

- 高度 44px（默认）
- 内边距 px-3 py-2.5
- 边框 1px `neutral-300`
- 圆角 `rounded`
- Focus：边框 2px `primary-500` + `shadow-focus`
- Error：边框 `error`
- Disabled：bg `neutral-50` / cursor-not-allowed
- 标签：text-sm + neutral-700 + medium
- 必填星号：`error` 色 *

### 3.3 Select / Dropdown

- 同 Input 外观
- 右侧 `↓` 图标（neutral-400）
- 展开使用 `<select>` 原生或自定义 listbox
- 自定义版：max-height 320px + 滚动 + hover bg `neutral-50`

### 3.4 Checkbox / Radio

- 大小：18px × 18px
- 选中：bg `primary-500` + 白色 ✓
- Focus：`shadow-focus`
- 与标签间距 8px

### 3.5 Tag / Badge

- 高度 24px / px-2.5 py-0.5 / rounded
- 字号 text-xs / 字重 500
- 配色变体：
  - `default`：bg `neutral-100` + text `neutral-700`
  - `primary`：bg `primary-50` + text `primary-700`
  - `accent`：bg `accent-50` + text `accent-700`
  - `success` / `warning` / `error` 同色逻辑

### 3.6 Card

#### 默认卡

- bg `neutral-0`
- 边框 1px `neutral-200`
- 圆角 `rounded-md`
- 阴影 `shadow-sm`
- 内边距 p-6 (移动) / p-8 (桌面)
- Hover：阴影 → `shadow-md` + -2px translateY（仅 hover 卡）

#### 案例卡（特化）

```
┌────────────────────────────────┐
│ ┌─────────────────────────┐ │
│ │   案例主图（4:3 比例）       │ │
│ └─────────────────────────┘ │
│  [Tag] [Tag] [Tag]          │
│  案例标题（行 1-2）             │
│  meta：业种 / 数量 / 工厂         │
└────────────────────────────────┘
```

### 3.7 Modal

- 背景遮罩：`rgba(15, 15, 14, 0.6)` + `backdrop-blur(4px)`
- 内容容器 max-width 600px / 卡片样式 + `shadow-xl`
- 顶部标题 + 关闭按钮（右上 X）
- 进入动画：fade + scale 0.96→1（300ms）

### 3.8 Toast

- 右上角浮动
- 4 种状态：success / info / warning / error
- 自动消失 4s（hover 暂停）
- 滑入 + 滑出动画

### 3.9 Accordion（FAQ 折叠）

- 单条：`<details>` 元素优化
- 标题：左对齐 + 右侧 `+/-` 图标（旋转 45° 切换）
- 展开内容：padding pt-3，灰色文字
- 分隔线 1px `neutral-200` 在条目之间

### 3.10 Tabs

- 横向 tab 头：底部 2px 边框作 active 指示
- 切换动画：内容区 fade（150ms）
- 移动端：可横滚 + snap 对齐

---

## 4. 业务组件库

> 业务组件 = 项目专用的复合组件，复用率 ≥ 3 次的固定模式。

### 4.1 SectionHeader（双标题）

**几乎每个区段顶部都用这个**（参考 まるふく / 足立 / 豊岡鞄）：

```
─── ENGLISH LABEL ───
日文大标题
（可选）副标题说明文字
```

属性：
- `label`：英文小帽
- `title`：日文大标题
- `subtitle?`：可选副标题
- `align?`：left / center / right
- `accent?`：是否显示标题左侧 8px 强调条（accent-500）

视觉：
- label：text-2xs + uppercase + tracking-[0.2em] + neutral-500 + 前后破折号 (─── XXX ───)
- title：text-3xl ~ text-4xl + bold + neutral-900
- subtitle：text-base + neutral-600 + margin-top-3

### 4.2 Hero

**Variant 1：首页 Hero（双工厂概念）**

```
┌────────────────────────────────────────────────────────┐
│ [大图：缝纫线穿过面料的特写 / 工人手部特写]                       │
│                                                          │
│  どこまでも、現場であること。                                  │
│  中国と緬甸から、日本品質のバッグを。                            │
│                                                          │
│  [カタログ DL] [お問い合わせ →]                              │
└────────────────────────────────────────────────────────┘
```

- 高度：70vh (移动) / 85vh (桌面) / max 800px
- 大图：右半 60% / 左半文字 40%（PC）；移动整版图 + 文字覆盖
- 文字层：与图保持 8:1 对比度（必要时加深色蒙层）
- 2 CTA 并排，第一个 primary，第二个 secondary

**Variant 2：内页 Hero**

- 高度 320px (移动) / 480px (桌面)
- 顶部 Breadcrumb
- 中央：英文小帽 + 日文大标题 + 1 句副标题
- 背景：单张大图 + 60% 不透明深色遮罩 / 或纯色背景

### 4.3 StatsBar（数据陈列条）

```
┌────────────────────────────────────────────────────────┐
│   20+        2         約 470 名      3 ヶ月            │
│   創業年    生產拠点    縫製スタッフ    標準納期            │
└────────────────────────────────────────────────────────┘
```

- 4 列网格（移动 2×2）
- 大数字 `text-display` + 单位小字
- 标签 `text-sm` + neutral-500
- 分隔：列之间 1px `neutral-200` 虚线（PC）

### 4.4 StrengthBlock（5 大强项卡）

5 张并排卡（PC）/ 纵向堆叠（移动），每张：

```
┌─────────────────────┐
│ [Icon 48×48]       │
│                     │
│ 強項タイトル          │
│ ──                  │
│ 説明文（80-120 字）  │
│                     │
│ 詳しく見る →         │
└─────────────────────┘
```

- 卡片 hover：边框 `primary-500` + 阴影 `shadow-md` + icon 微微旋转 4°
- icon 风格：线性、1.5px stroke，accent 或 primary 色

### 4.5 ProblemSolutionBlock（お困りごと解決）

左右两栏对照：

```
┌──────────────────────────┬──────────────────────────┐
│ お悩み                     │ 私たちの応え                │
│ ───────                  │ ───────                  │
│ • 中国工場と意思疎通が…       │ → 日本語ネイティブの担当者…    │
│ • 急な発注に対応してくれない    │ → 国内工場で 30 日対応…       │
│ • 小ロットだと断られる        │ → 100 個から打合せ可能…       │
│ • 価格が不透明              │ → 起 MOQ と納期を公開…        │
│ • 工場の中が見えない          │ → 動画・遠隔参観・現地見学…    │
└──────────────────────────┴──────────────────────────┘
```

- 左栏：bg `neutral-50` + 烦恼图标 + 灰色字
- 右栏：bg `neutral-0` + 解决图标 + 黑色字
- 中间用 → 箭头连接（PC） / 上下排列（移动）

### 4.6 StepFlow（OEM 流程图）

7 步横向流程：

```
[01]─→[02]─→[03]─→[04]─→[05]─→[06]─→[07]
問合せ ヒア  見積  サン  PP   量産  出荷
       リング       プル   確認
```

- 每步：圆形数字 + 标题 + 时长 + hover 弹出"客户准备"详情
- 步数大数字字重 700 + accent 色
- 移动端：纵向时间轴（左侧编号 + 右侧详情）

### 4.7 CaseCard / CaseGrid

见 §3.6 案例卡定义。CaseGrid 是 12 张卡的 grid：
- PC：3 列
- 平板：2 列
- 移动：1 列
- 间距 gap-6 / gap-8

### 4.8 FactoryCard

工厂介绍卡（3 张）：

```
┌──────────────────────────────────────┐
│ [大图 16:9：工厂外观或车间]                │
│                                      │
│ 青島打样中心 | 山東日照 | 緬甸仰光           │
│ 地址 / 面積 / 人数                       │
│ 得意領域：打样 / 急单 / 大货长单             │
│                                      │
│ 詳しく見る →                            │
└──────────────────────────────────────┘
```

### 4.9 EquipmentList（设备清单）

```
┌────────────────────────────────────────┐
│ 設備リスト                                │
│ ────────                              │
│ ✓ 平車        120 台                    │
│ ✓ 電腦車       22 台                    │
│ ✓ 高車         60 台（緬甸工場）           │
│ ✓ 雙針車       12 台（緬甸工場）           │
│ ✓ X線檢針機     合計 3 台                  │
│ ✓ 裁断機       10 台                    │
│ ✓ 自動分條/卷料機 各 1 台                  │
│ ...                                    │
└────────────────────────────────────────┘
```

- 使用 `font-mono` 数字对齐
- 每行 hover：bg `neutral-50`

### 4.10 TimelineGantt（交期甘特图）

横向时间条 + 阶段块：

```
[━━ 物料生產 (2W) ━━][━ 入庫検品 (1W) ━][━━ 海運+通関 (2W) ━━]
                                              [━━━━ 緬甸量産 (12W) ━━━━]
                                                                  [出荷]
```

- 阶段块用不同饱和度的 primary 色
- 关键节点用 accent 色圆点
- hover 显示该阶段详情

### 4.11 FAQAccordion

复用 §3.9。

### 4.12 TestimonialQuote（客户证言）

```
┌────────────────────────────────────────┐
│         "                                │
│   〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇             │
│   〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇             │
│                                          │
│   ─ 日本上場 EC 業 様 / 7 年取引            │
└────────────────────────────────────────┘
```

- 大引号字符 `"` 装饰
- 字体 `font-jp-serif` italic
- 不挂客户名 / Logo（除非授权）

### 4.13 MediaCoverageLogos

媒体 / 客户授权 Logo 横排 grayscale，hover 复原色。

### 4.14 CtaBlock（页底转化）

```
┌────────────────────────────────────────┐
│         まずは、お話を聞かせてください。           │
│                                          │
│ ┌──────────┐  ┌──────────┐  ┌──────────┐│
│ │ お問い合わせ│  │ カタログ DL│  │ 工場見学  ││
│ └──────────┘  └──────────┘  └──────────┘│
└────────────────────────────────────────┘
```

3 个并列等宽 CTA + 上方一句号召。

### 4.15 NumberCallout（大数字强调）

```
3
ヶ月
─────
標準大量生産納期
```

- 巨大数字 `text-display`
- 单位贴在右上
- 短分隔线
- 1 行说明文字

### 4.16 MaterialSpec（产品规格表）

表格化 spec 块：

```
┌────────────┬──────────────────────────────┐
│ 本体素材     │ 1000D コーデュラ ナイロン（撥水）  │
│ 裏地       │ 210D ポリエステル タフタ           │
│ 金具       │ YKK 樹脂ファスナー                 │
│ 縫製       │ 2 重 / 3 重縫い                  │
│ 重量       │ 約 980g                         │
│ 容量       │ 約 22 L                         │
│ サイズ      │ W30 × H45 × D15 cm              │
└────────────┴──────────────────────────────┘
```

- 表头列 width 30% / 内容列 70%
- 行间 1px `neutral-200` 横线
- 数字使用 `font-mono` 对齐

### 4.17 PDFDownloadBlock

```
┌────────────────────────────────────────┐
│ [图标 PDF 文档]    カタログ 2026 をダウンロード  │
│                    （30 ページ / 約 8 MB）    │
│                    [入力フォーム]              │
└────────────────────────────────────────┘
```

- 边框带 1px primary
- 表单字段最少（仅会社名 + 邮箱）
- 提交后切换为成功状态 + 邮件已发送提示

### 4.18 InlineVideo

- 16:9 比例容器
- 默认显示静帧 + 中央播放按钮（白色圆 + 三角）
- 点击后嵌入 YouTube / 自托管 video
- 工厂参观短视频可用 `autoPlay muted loop playsInline` 静默循环

### 4.19 Map

- 用 Google Maps Embed 或 静态地图图
- 中国青岛 / 山东日照 / 缅甸仰光 三点连线版（首页）
- 各拠点详情页用单点 + 周边
- 颜色统一为 primary 调和的灰色调

### 4.20 LanguageSwitcher

- 顶导航右侧：`JP | EN | ZH` 横排
- 当前语言加粗 + `primary-500`
- 切换时保留同 URL 对应语言版

---

## 5. 页面布局规范

### 5.1 网格系统

- 12 列网格
- gutter 24px（PC） / 16px（移动）
- 边距 px-4（移动） / px-8（中） / px-12（大）
- 容器最大宽度 `container-xl`（1200px）

### 5.2 首页布局

```
┌─────────────────────────────────────────┐
│ Header                                  │
├─────────────────────────────────────────┤
│ Hero（70vh-85vh）                       │
├─────────────────────────────────────────┤
│ StatsBar（py-12）                       │
├─────────────────────────────────────────┤
│ SectionHeader + StrengthBlock (5 卡)    │
├─────────────────────────────────────────┤
│ SectionHeader + ProblemSolutionBlock    │
├─────────────────────────────────────────┤
│ SectionHeader + CaseGrid (12 案例缩略)   │
├─────────────────────────────────────────┤
│ SectionHeader + StepFlow                │
├─────────────────────────────────────────┤
│ FactoryCard ×3 + 视频 loop              │
├─────────────────────────────────────────┤
│ MediaCoverageLogos + TestimonialQuote   │
├─────────────────────────────────────────┤
│ CtaBlock (3 联)                         │
├─────────────────────────────────────────┤
│ Footer                                  │
└─────────────────────────────────────────┘
```

### 5.3 内页通用布局

```
┌─────────────────────────────────────────┐
│ Header                                  │
├─────────────────────────────────────────┤
│ Page Hero (320-480px)                   │
├─────────────────────────────────────────┤
│ Breadcrumb                              │
├─────────────────────────────────────────┤
│ Content（视页面而定）                     │
├─────────────────────────────────────────┤
│ Related (3 个相关链接)                    │
├─────────────────────────────────────────┤
│ CtaBlock                                │
├─────────────────────────────────────────┤
│ Footer                                  │
└─────────────────────────────────────────┘
```

### 5.4 工厂详情页布局示例（/factory/myanmar）

```
1. Hero（工厂大图 + 标题「Better Bags Myanmar 緬甸仰光工場」）
2. 数字 4 联：370 名 / 420 台平車 / 60 台高車 / 2 台 X 線検針機
3. 概要段落
4. 設備リスト（EquipmentList 组件）
5. 動画（InlineVideo 90 秒介绍）
6. 物流 + 排産フロー（TimelineGantt）
7. 見学申込ブロック
8. 関連事例（CaseGrid 3-6 个缅甸生产案例）
9. CtaBlock
```

### 5.5 案例详情页布局

```
1. Hero（案例主图 16:9 大图）
2. Breadcrumb
3. 元数据条（业种 / 数量 / 期间 / 工厂 / 主要素材 tag 行）
4. SectionHeader + プロジェクト概要（300-500 字）
5. ハイライト 3-5 项（icon + 文字）
6. ギャラリー（6-12 张实拍图，可灯箱放大）
7. MaterialSpec 表
8. 関連事例（3 个）
9. CtaBlock：「似たプロジェクトのご相談はこちら」
```

### 5.6 博客 / コラム文章页布局

```
1. Hero（小，仅标题 + 日期 + 分类 tag）
2. Breadcrumb
3. 主体文章（max-width 720px 居中）
   - 大标题 H1
   - 第一段落（lead）字号略大、neutral-600
   - 章节 H2 / H3 加锚点
   - 段落、列表、引用、图片、代码块
4. 目录（PC：右侧粘性 / 移动：顶部折叠）
5. 文末作者 + 发布日 + tag
6. 関連記事 3 个
7. CtaBlock 双联（询盘 + 资料）
```

### 5.7 询盘表布局

```
┌──────────────────────────────────────┐
│ 左栏（PC）：     │  右栏：              │
│ Form Title       │  必要時間：3-5 分     │
│ 説明文           │  24h 內回复承诺       │
│ Field 1          │  プライバシー保護声明  │
│ Field 2          │  代表的な依頼例       │
│ ...              │  電話番号             │
│ [Submit] →      │                     │
└──────────────────────────────────────┘
```

移动端：单栏，说明放在顶部、表单在下。

---

## 6. 摄影 / 图像规范

### 6.1 总纲：用工厂自身证明工厂

- **0 stock photo**（图库素材会被日本买手一眼识破）
- 全部素材均为自有拍摄
- 拍摄风格：纪实 + 工艺感，**避免摆拍商业感**

### 6.2 摄影 brief（XXX-需统一发给摄影团队）

#### 6.2.1 光线
- 自然光优先（窗光、北面散射光）
- 棚拍仅用于：代表挨拶肖像 / 极少数产品摄影
- **避免硬阴影、避免色温过冷**（色温目标 4500-5500K）

#### 6.2.2 构图
- 主体居中或三分点
- 留白 30-40%（让画面"喘气"）
- 偏好 35mm / 50mm 焦段（贴近人眼）
- 工艺/手部特写用 85mm 或 100mm macro

#### 6.2.3 后期
- **不过度调色**（避免日系滤镜模板套用）
- 保留材质本色
- 阴影提亮但保留暗部细节
- 锐化适度
- 统一基调：白平衡略暖（参考工房色板 `craft-paper`）

### 6.3 必拍清单（XXX-待补拍）

| 类别 | 张数 | 要求 |
| --- | --- | --- |
| 工厂车间环境 | 各 30+ | 青岛打样、山东日照、缅甸仰光 |
| 设备特写 | 20+ | 平车、双针车、高车、X 线、自动裁断 |
| 工艺特写 | 30+ | 缝线、面料、纸样、五金、烫印 |
| QC 工作中 | 10+ | 不打扰场景纪实 |
| 装配 / 工序 | 20+ | 流水线 6-8 工序 |
| 出货场景 | 5+ | 包装 / 集装箱 / 海运 |
| 代表肖像 | 各 5 张 | 棚拍 + 工厂现场 |
| 产品摄影 | 12 套 × 6-12 张 | 多角度 + 细节 + 场景 |

### 6.4 比例规范

| 用途 | 比例 |
| --- | --- |
| Hero 大图（PC） | 16:9 或 21:9 |
| Hero 大图（移动） | 4:5 或 3:4 |
| 案例主图 | 4:3 |
| 案例画廊 | 1:1 或 4:5 |
| 产品白底 | 4:5 |
| 工厂广角 | 16:9 |
| 设备特写 | 1:1 |

> **全站不混用随机比例**。每个用途固定一个比例，统一裁切。

### 6.5 文件命名

```
{category}_{subject}_{number}_{aspect}.{ext}
例：
factory_myanmar_sewing_001_16x9.webp
product_riukku_navy_front_4x5.webp
quality_xray_machine_001_1x1.webp
craft_stitch_closeup_003_1x1.webp
```

### 6.6 输出格式

| 用途 | 格式 | 多尺寸 |
| --- | --- | --- |
| Hero | AVIF + WebP fallback | 1920 / 1440 / 1024 / 768 / 375 |
| 内容图 | WebP | 1200 / 800 / 400 |
| 缩略图 | WebP | 400 / 200 |
| OG 分享图 | JPG | 1200×630 固定 |

---

## 7. 图标系统

### 7.1 风格

- 线性 1.5px / 圆角端点
- 24×24px / 32×32px / 48×48px 三档
- 主色 `primary-500` 或 `accent-500`
- **不混用面性图标**

### 7.2 推荐图标库

- **Lucide React**（首选 — 风格统一、易扩展）
- **Tabler Icons**
- **Phosphor Icons**（线性变体）

不用 Font Awesome（风格偏老） / Material（过 Google 化）。

### 7.3 自定义图标

以下需自绘制：
- 工厂图标（中国 / 缅甸 双拠点）
- X 线检针机
- 缝纫机（区分平车 / 高车 / 双针）
- 面料 swatch
- 工艺章

### 7.4 LOGO 与 favicon

- LOGO 需提供：横版 SVG / 纵版 SVG / 单色 SVG / 反白 SVG / 1024 PNG / 512 PNG
- Favicon：32 / 16 / Apple-touch 180 / SVG
- LOGO 最小尺寸：横版 80px 宽，纵版 60px 高（再小不清晰）
- LOGO 周围保留 = LOGO 高度 ½ 的安全空间

---

## 8. 插画 / 信息图规范

### 8.1 插画

- 仅在"流程图 / 工艺剖视图 / 地图"等信息图场景使用
- 风格：极简线性 + 单色 + 工程图感
- **不用卡通拟人化插画**

### 8.2 信息图清单

| 信息图 | 用途 |
| --- | --- |
| OEM 7 步流程图 | /oem-flow + 首页 |
| 双工厂使用场景对照表 | /strength + /factory |
| 物料供应链时间轴 | /lead-time |
| 二段检品流程图 | /quality |
| 产品构造剖视图 | 案例详情页 |
| 海运路线地图 | /lead-time + /factory/myanmar |
| 中国 + 缅甸双拠点地图 | 首页 + Footer |

### 8.3 制图工具

- Figma（首选）
- Illustrator / Affinity Designer（次选）
- 最终交付 SVG 优先 / PNG fallback

---

## 9. 动画 / 微交互规范

### 9.1 全站动画原则

- **静态为主、动效为辅**
- 动效作"提示"而不是"表演"
- 时长 ≤ 400ms（特殊 hero 渐显 ≤ 600ms）
- 缓动以 `ease-out` / `ease-in-out` 为主
- 禁用 spring 弹性过强动效

### 9.2 滚动入场

- 元素出现在视口时：`fade-in` + `slide-up 12px` + 350ms ease-out
- 列表交错：每个元素延迟 50ms
- **仅首次入场，向上回滚不再重复**

### 9.3 Hover 微交互

| 元素 | 交互 |
| --- | --- |
| 按钮 | bg 加深 + `-1px translateY` |
| 卡片 | 阴影加深 + `-2px translateY` |
| 链接 | 颜色变化 + 下划线滑入 |
| 导航项 | 颜色变化 + 底部 2px 下划线 slide-in |
| 图片缩略图 | scale 1.02 (300ms ease-out) |

### 9.4 Page Transition

- 默认：fade 200ms
- 不用 page-flip / slide 等强动效

### 9.5 Loading 状态

- Skeleton screens（骨架屏）优于 spinner
- 颜色 `neutral-100` / `neutral-200` 交替
- 长操作（> 2s）显示进度条

### 9.6 Reduced Motion 支持

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. 可访问性（A11Y）

### 10.1 WCAG 2.1 AA 目标

| 项 | 要求 |
| --- | --- |
| 颜色对比 | 见 §1.1.3 |
| 键盘导航 | 全部交互元素可 Tab + Enter |
| Focus 可见 | `shadow-focus` 3px 蓝色环 |
| ARIA 标签 | 图标按钮必有 aria-label |
| 表单 | 每个字段都有 `<label>` 关联 |
| 标题层级 | 严格 H1 > H2 > H3，不跳级 |
| 图片 alt | 全部装饰性图标使用 `alt=""` ，内容图必有 alt |
| 语义化 HTML | `<nav>` `<main>` `<article>` `<aside>` 等 |
| 跳转链接 | "Skip to main content" 隐藏链接（Tab 第一可见） |
| 表单错误 | aria-invalid + aria-describedby 关联错误信息 |

### 10.2 多语言可访问性

- `<html lang="ja">` / `lang="en"` / `lang="zh"` 正确设置
- 不同语言的字体落雷处理（中日韩字符在英文字体下的 fallback）

---

## 11. 暗色模式（可选）

> **第 1 期不做**。日本 B2B 用户暗色模式访问比例极低，且工厂照片在暗色下质感受损。

如未来要做：
- `--color-neutral-0` ↔ `--color-neutral-900` 翻转
- 主色饱和度降低 10%
- 阴影替换为反光 / 边框
- 用户偏好检测 + 手动切换

---

## 12. PDF カタログ 设计规范

> PDF 是 B2B 商社采购的"硬通货"。第 1 期就要做。

### 12.1 尺寸与版面

- A4（210×297mm） 纵向
- 出血 3mm
- 边距：天 25mm / 地 25mm / 左 20mm / 右 20mm
- 装订侧（如打印）多 5mm

### 12.2 页面构成（30 页示例）

| 页 | 内容 |
| --- | --- |
| 1 | 封面（Logo + slogan + 大图） |
| 2 | 目次 |
| 3-4 | 会社概要（公司介绍 + 数字 4 联） |
| 5-6 | 沿革（年表） |
| 7-8 | 5 つの強み |
| 9-10 | 双工厂介绍（青岛 + 山东 + 缅甸） |
| 11-12 | 設備リスト + 工艺照 |
| 13-14 | 品質と検品体制 |
| 15-16 | OEM 流程 7 step |
| 17-18 | 納期と供給管理 |
| 19-20 | 制作事例 1（脱敏） |
| 21-22 | 制作事例 2 |
| 23-24 | 制作事例 3 |
| 25 | 素材ライブラリ（合作面料 / 五金 logo） |
| 26 | 商務条件（FOB / T/T / L/C） |
| 27 | よくある質問（精选 8 条） |
| 28 | アクセス + 地図 |
| 29 | お問い合わせ |
| 30 | 封底 |

### 12.3 视觉同步

- 与网站使用同一 Design Tokens
- 字体：日文 Noto Sans JP / Noto Serif JP
- 主色 + 强调色一致
- 摄影风格统一

### 12.4 交付物

- 高清 PDF（≤ 8MB，用于邮件附件）
- 印刷 PDF（含出血 + 印刷标志）
- 可编辑源文件（InDesign / Figma）

---

## 13. 邮件模板设计规范

### 13.1 模板列表（5 封 EDM）

见 plan.md §9.3。

### 13.2 视觉规范

- 宽度 600px 居中
- 字体：仅 web-safe（不依赖加载字体）：
  - 日文：`'Hiragino Sans', 'Yu Gothic UI', sans-serif`
  - 英文：`Helvetica, Arial, sans-serif`
- 主色 + 强调色与网站一致
- 段落字号 14-16px / 行高 1.7
- 标题 18-22px
- 按钮：bg `primary-500` + 白字 + 圆角 4px + 上下内边距 12px / 左右 24px
- 图片：1 张 banner（600×200） + 1-2 张内容图
- 全部图片有 alt
- 不用背景图 + 不用 web font

### 13.3 邮件代码规范

- table-based 布局（兼容 Outlook）
- 行内 style（不依赖 `<style>` 块）
- 必含纯文本版（plain text fallback）
- 测试工具：Litmus / Email on Acid

### 13.4 邮件签名

```
─────────────────────────
青島万翔輝 株式会社
XXX-担当者名 / 営業
✉ XXX-mail@example.com
☎ XXX-phone
🌐 XXX-domain
─────────────────────────
```

---

## 14. 设计交付与版本管理

### 14.1 设计工具

- **Figma**（首选）
- 文件结构：
  ```
  Wanxianghui Design System (Figma)
  ├── 🎨 Tokens (色 / 字 / 间距)
  ├── 🧱 Components (按本文档 §3-4)
  ├── 📄 Pages
  │   ├── 01_Homepage
  │   ├── 02_Strength
  │   ├── 03_OEM Flow
  │   ├── 04_Factory
  │   ├── 05_Works
  │   ├── 06_About
  │   ├── 07_News
  │   ├── 08_Contact
  │   └── ...
  ├── 📱 Mobile Variants
  ├── 🖼️ Asset Library (icons / illustrations / photos)
  └── 📐 Prototypes
  ```

### 14.2 设计 → 开发 交付

- Figma Dev Mode 开启
- Tailwind preset 与 Figma Tokens 同步（通过 Figma Tokens 插件 / Figma Variables）
- 设计师在 Figma 标注 + Tailwind class 提示
- 每个组件附 props 文档

### 14.3 版本管理

- 命名：`v{major}.{minor}.{patch}`
- v1.0 = 上线版本
- v1.1+ = 上线后小迭代
- v2.0 = 大改版（如年度 refresh）
- Figma 用 Version History + Branch 管理

### 14.4 Design QA Checklist（上线前）

- [ ] 所有页面在 5 种主流分辨率下截图（375 / 768 / 1024 / 1280 / 1440）
- [ ] 所有页面在 3 种语言（日 / 英 / 中）下截图
- [ ] 字体回退测试（关闭 Web Font 时是否仍可读）
- [ ] 对比度 Lighthouse / Stark 插件全过
- [ ] 键盘 Tab 顺序合理
- [ ] 移动端横屏 / 竖屏测试
- [ ] iOS Safari / Android Chrome / Edge / Firefox 测试
- [ ] 暗色模式（如启用）测试
- [ ] 打印样式测试（PDF 友好）

---

> **文档版本**：v1.0 — 2026-05-17
> **下次更新**：客户确认 XXX 项后立即 v1.1
> **关联文档**：`plan.md`、《日本箱包工厂网站设计研究_20网站深度拆解.md》
