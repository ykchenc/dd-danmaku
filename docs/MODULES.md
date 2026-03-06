# ede.js 功能模块文档

> 基于 ede.js v1.47 · 总行数 ~5073 行

本文档完整记录脚本的全部功能模块，并规划不同精简版本的模块取舍。

---

## 一、全部功能模块

### 核心模块（CORE）

基本弹幕播放必需，所有版本均保留。

| # | 模块 | 行范围 | 关键函数 | 说明 |
|---|------|--------|----------|------|
| C01 | 主入口与生命周期 | 15–21, 5050–5072 | IIFE, `onViewShow`, `beforeDestroy`, `refreshEventListener` | IIFE 入口，`viewshow` 触发初始化，`viewbeforehide` 触发清理 |
| C02 | 用户配置与常量 | 17–509 | `corsProxy`, `dandanplayApi`, `lsKeys`, `eleIds`, `classes`, `styles` | 配置项定义、API 端点、元素 ID、Emby 样式类 |
| C03 | 弹幕引擎加载 | 514–534 | `Danmaku` 内嵌库, `Emby.importModule` | 内嵌 Danmaku 库（canvas/dom），或网络路径加载 |
| C04 | EDE 状态对象 | 569–600 | `EDE` 构造函数 | 保存弹幕实例、缓存、集信息、搜索选项等运行时状态 |
| C05 | 播放事件监听 | 658–708 | `initListener`, `onPlaybackStart`, `onPlaybackStop`, `onVideoOsdShow`, `onVideoOsdHide` | 绑定播放开始/停止、OSD 显示/隐藏事件 |
| C06 | UI 初始化 | 710–752 | `initUI` | 等待 Emby 播放控件就绪，注入弹幕开关和设置按钮 |
| C07 | Emby 媒体信息获取 | 754–1074 | `getEmbyItemInfo`, `fatchEmbyItemInfo`, `getMapByEmbyItemInfo` | 获取当前播放项元数据（剧集/电影名、季、集、TMDB ID） |
| C08 | 弹弹play API 集成 | 34–56, 763–810 | `fetchSearchEpisodes`, `fetchComment`, `fetchJson` | `/search/episodes` 搜索、`/comment` 获取弹幕 |
| C09 | 集数搜索与匹配 | 1076–1151 | `lsSeasonSearchEpisodes`, `searchEpisodes`, `autoFailback` | 季缓存查找、API 搜索、标题匹配、多重回退策略 |
| C10 | 集数信息解析 | 1694–1825 | `getEpisodeInfo` | 通过前后集推断、缓存或搜索 API 解析集数信息 |
| C11 | 弹幕创建与渲染 | 1877–1956 | `createDanmaku` | 解析评论、应用过滤、创建 Danmaku 实例、绑定视频事件 |
| C12 | 加载管线 | 2011–2139 | `loadDanmaku`, `loadOnlineDanmaku` | 编排完整加载流程：集数解析→评论获取→缓存→创建弹幕 |
| C13 | 弹幕解析与样式 | 2363–2438 | `danmakuParser`, `getCommentStyle` | 将原始评论转为 Danmaku 格式（模式、时间、样式） |
| C14 | 基础过滤系统 | 2142–2310 | `danmakuFilter`, `danmakuTypeFilter`, `danmakuSourceFilter`, `danmakuDensityLevelFilter`, `danmakuKeywordsFilter` | 类型/来源/密度/关键词过滤 |
| C15 | 设置弹窗与 Tab 导航 | 2469–2522 | `createDialog`, `afterEmbyDialogCreated` | 打开 Emby 风格弹窗，构建 Tab 菜单 |
| C16 | 弹幕设置 Tab | 2524–2660 | `buildDanmakuSetting` | 弹幕开关、过滤强度、显示区域、大小、透明度、速度、轴偏秒 |
| C17 | 手动匹配 Tab（基础） | 2837–2960 | `buildSearchEpisode` | 输入影视名搜索、选择动画/集数、加载弹幕 |
| C18 | 手动匹配操作 | 4040–4224 | `doDanmakuSearchEpisode`, `doDanmakuAnimeSelect`, `doDanmakuSwitchEpisode` | 搜索、选择、加载、写入季缓存 |
| C19 | 过滤与滑块事件处理 | 4256–4320 | `doDanmakuTypeFilterSelect`, `onSliderChange`, `onSliderChangeLabel` | 过滤操作和滑块值变更处理 |
| C20 | Emby UI 组件库 | 4349–4710 | `embyInput`, `embyButton`, `embyTabs`, `embySelect`, `embyCheckbox`, `embySlider`, `embyDialog` 等 | DOM 辅助函数和 Emby 风格 UI 原语 |
| C21 | LocalStorage 管理 | 4712–4789 | `lsGetItem`, `lsSetItem`, `lsBatchSet`, `settingsReset` | 配置持久化、批量操作、旧版兼容 |
| C22 | 工具函数 | 4791–4830 | `destroyAllInterval`, `waitForElement` | 定时器清理、元素轮询 |
| C23 | H5 视频适配器 | 4956–5024 | `initH5VideoAdapter`, `videoTimeUpdateInterval` | 原生播放器无 DOM video 时创建虚拟 video 同步状态 |

### 可选模块（OPTIONAL）

可按需裁剪，编号 O01–O24。

| # | 模块 | 行范围 | 关键函数 | 说明 | 性能影响 |
|---|------|--------|----------|------|----------|
| O01 | SparkMD5 文件哈希 | 541–567 | `SparkMD5.ArrayBuffer` | 对流媒体文件头尾计算 MD5 hash | 中 |
| O02 | 哈希匹配与智能匹配 | 1152–1692 | `calculateFileHash`, `tryMatchByHash`, `selectBestMatch`, `calculateStringSimilarity` | 文件 hash → `/match` API，字符串相似度评分 | 中 |
| O03 | AppLogAspect 日志拦截 | 561–632 | `AppLogAspect.init`, `AppLogAspect.on`, `AppLogAspect.format` | 拦截 `console.log/warn/error` 记录到内存数组 | 低–中 |
| O04 | 弹幕通知 Toast | 2440–2467 | `toastByDanmaku` | 通过弹幕形式发送系统通知 | 低 |
| O05 | 自动过滤（阈值） | ~2180–2220 | `danmakuAutoFilter`, `danmakuAutoFilterCancel` | 弹幕数超阈值自动调整过滤级别 | 低 |
| O06 | 相似弹幕合并 | 2310–2361 | `danmakuMergeSimilar`, `similarityPercentage` | 基于 Levenshtein 距离合并相似弹幕 | **高（O(n²)）** |
| O07 | 配置导入/导出 | 2662–2691 | `buildSettingsBackup`, `getSettingsJson` | JSON 格式配置备份与恢复 | 低 |
| O08 | 字体定制 | 2693–2835 | `buildFontStyleSetting`, `buildFontFamilySetting`, `loadLocalFont`, `changeFontStylePreview` | 字体粗细/斜体/字体族、`queryLocalFonts`、实时预览 | 低–中 |
| O09 | 附加弹幕 URL | 2960–3030 | `buildExtCommentDiv`, `onEnterExtComment`, `addExtComments` | 通过第三方 URL 加载额外弹幕源 | 低 |
| O10 | 自定义 API 地址 | 318–358, 3030–3096, 3560–3582 | `customeUrl`, `buildCustomApiDiv`, `buildCustomUrlSetting` | 自定义弹弹play API 前缀、CORS 代理等 | 低 |
| O11 | 服务端插件 XML 弹幕 | 1827–1875 | `getCommentsByPluginApi`, `refreshPluginXml` | 从 Emby 插件 API 获取服务端 XML 弹幕 | 低 |
| O12 | 弹幕信息 Tab | 3098–3157 | `buildCurrentDanmakuInfo`, `buildDanmuListDiv` | 海报、匹配信息、弹幕列表（多种模式） | 中 |
| O13 | Bangumi 角色卡片 | 3158–3242, 812–927 | `renderBangumiCharacters`, `getEpisodeBangumiRel` | Bangumi 角色图片卡片渲染 | **中–高** |
| O14 | Bangumi 集成 | 57–68, 812–927, 3510–3558 | `putBangumiEpStatus`, `fetchBangumiApiGetMe`, `buildBangumiSetting` | 播放结束自动标记 Bangumi 观看状态 | 中 |
| O15 | 高级设置 Tab（完整） | 3244–3582 | `buildProSetting`, `buildDanmakuFilterSetting`, `buildExtSetting`, `buildOsdSetting`, `buildPlaySetting` | 屏蔽类型/来源/关键词、简繁转换、引擎、OSD、定时、Bangumi、自定义 URL | 中 |
| O16 | OSD 弹幕高能进度条 | 1958–2009 | `buildProgressBarChart`, `drawLineChart` | 进度条上方 Canvas 弹幕密度折线图 | **中** |
| O17 | OSD 播放信息标题 | 3968–3992 | `appendvideoOsdDanmakuInfo` | 视频 OSD 右下角显示弹幕匹配信息 | 低 |
| O18 | OSD 头部时钟 | 4894–4930 | `addHeaderClock`, `removeHeaderClock` | 播放界面头部显示实时时钟 | 低 |
| O19 | 定时退出/返回主页 | 207–218, 3483–3508 | `timeoutCallbackTypeOpts`, `buildPlaySetting` | 设定时间后自动退出播放或返回主页 | 低 |
| O20 | 关于 Tab | 3584–3932 | `buildAbout`, `buildConsoleLog`, `buildDebugCheckbox`, `buildDebugButton`, `buildOpenSourceLicense` | 控制台日志查看器、调试选项、开源许可 | 低 |
| O21 | 控制台日志查看器 | 3618–3645, 4322–4347 | `buildConsoleLog`, `doConsoleLogChange` | 日志 textarea 展示、eval 输入 | 低 |
| O22 | 调试功能集 | 3647–3923 | `buildDebugCheckbox`, `buildDebugButton`, `generateRandomDanmu` | 容器边界、反转弹幕、随机颜色、大量弹幕测试等 | 低 |
| O23 | 内嵌网页 Tab (iframe) | 3935–3966 | `buildIframe` | 隐藏 Tab，嵌入 iframe 显示外部页面 | 中 |
| O24 | 快速调试 & 彩蛋 | 3994–4020, 4832–4848 | `toggleSettingBtn2Header`, `quickDebug`, `addEasterEggListener` | 长按用户按钮启用调试模式 | 低 |
| O25 | NoisyX 特殊 CSS 修复 | 4876–4892 | `initCss` | 修复 Emby 小秘版 Toast 显示 | 低 |

---

## 二、版本规划

### 完整版（Full）

包含全部 C01–C23 + O01–O25 模块，即当前 `ede.js` 原版。

适用于：PC 浏览器、高配客户端。

### 精简版 v1（Lite-v1）

**目标**：面向低配 Android 9 电视，移除高性能开销和非必要模块，保留核心弹幕播放与基础设置。

**移除模块**（8 个）：

| 移除编号 | 模块 | 移除原因 |
|----------|------|----------|
| O06 | 相似弹幕合并 | O(n²) 字符串比较，弹幕量大时极度卡顿 |
| O13 | Bangumi 角色卡片 | 大量图片加载，内存和渲染压力 |
| O16 | OSD 弹幕高能进度条 | Canvas 持续重绘，GPU 开销 |
| O12 | 弹幕信息 Tab（弹幕列表） | 数千条弹幕渲染到 DOM，操作密集 |
| O01 | SparkMD5 文件哈希 | 网络请求 + MD5 计算，初始加载延迟 |
| O02 | 哈希匹配与智能匹配 | 依赖 O01，额外网络 + CPU 开销 |
| O03 | AppLogAspect 日志拦截 | 持续拦截 console 输出，内存持续增长 |
| O08 | 字体定制 | `queryLocalFonts` 扫描 + 预览渲染开销 |

**保留模块**：

| 类型 | 模块编号 |
|------|----------|
| 全部核心 | C01–C23 |
| 保留可选 | O04（Toast）、O05（自动过滤）、O07（配置导入导出）、O09（附加弹幕 URL）、O10（自定义 API）、O11（插件 XML）、O14（Bangumi 集成，不含角色卡片）、O15（高级设置，去除已移除项的 UI）、O17（OSD 标题）、O18（OSD 时钟）、O19（定时退出）、O20（关于 Tab，去除日志查看器）、O21–O22（简化调试）、O23（iframe）、O24（快速调试）、O25（CSS 修复） |

### 精简版 v2（Lite-v2）— 待规划

**目标**：极致精简，仅保留弹幕播放核心功能 + Bangumi 集成，适用于极低配设备。

在 v1 基础上进一步移除：

| 移除编号 | 模块 | 移除原因 |
|----------|------|----------|
| O09 | 附加弹幕 URL | 非核心功能 |
| O10 | 自定义 API 地址 | 非核心功能 |
| O11 | 服务端插件 XML 弹幕 | 非核心功能 |
| O15 | 高级设置 Tab | 非核心功能（过滤 UI 合并到弹幕设置 Tab） |
| O17 | OSD 播放信息标题 | 非核心功能 |
| O18 | OSD 头部时钟 | 非核心功能 |
| O19 | 定时退出 | 非核心功能 |
| O20 | 关于 Tab | 非核心功能 |
| O21 | 控制台日志查看器 | 非核心功能 |
| O22 | 调试功能集 | 非核心功能 |
| O23 | 内嵌网页 Tab | 非核心功能 |
| O24 | 快速调试 & 彩蛋 | 非核心功能 |
| O25 | NoisyX CSS 修复 | 非核心功能 |

**保留模块**：C01–C23 + O04（Toast）+ O05（自动过滤）+ O07（配置导入导出）+ O14（Bangumi 集成）

### 精简版 v3（Lite-v3）— 待规划

**目标**：在 Lite-v2 基础上去除 Emby UI 组件库依赖，使用原生 DOM 元素替代，最大程度减少 Emby 自定义元素的初始化开销与模块加载。

在 v2 基础上进一步移除：

| 移除编号 | 模块 | 移除原因 |
|----------|------|----------|
| C20 | Emby UI 组件库 | 去除 `emby-slider`/`emby-button`/`emby-select`/`emby-checkbox` 等自定义元素，改用原生 `<input>`/`<button>`/`<select>` 等，消除 Emby 自定义元素注册回调和 `require()` 异步模块加载开销 |

**改造影响**：

C20 被以下模块依赖，去除后需要对应改造：

| 受影响模块 | 改造方式 |
|------------|----------|
| C06 UI 初始化 | 按钮改用原生 `<button>` |
| C15 设置弹窗与 Tab 导航 | `embyDialog` → 自建轻量弹窗，`embyTabs` → 原生 Tab 切换 |
| C16 弹幕设置 Tab | `embySlider` → 原生 `<input type="range">`，`embyButton` → 原生 `<button>` |
| C17 手动匹配 Tab | `embyInput`/`embySelect`/`embyButton` → 原生元素 |
| C18 手动匹配操作 | 适配原生元素事件 |
| C19 过滤与滑块事件处理 | 适配原生滑块 `input`/`change` 事件 |
| O04 弹幕通知 Toast | `embyToast` → 自建轻量 Toast 或直接弹幕通知 |
| O07 配置导入/导出 | `embyButton`/`embyTextarea` → 原生元素 |
| O14 Bangumi 集成 | `embyInput`/`embyButton` → 原生元素 |

**保留模块**：C01–C19, C21–C23 + O04（Toast，改造）+ O05（自动过滤）+ O07（配置导入导出，改造）+ O14（Bangumi 集成，改造）

> **注意**：Lite-v3 需要对 UI 层做较大改造，是工作量最大的版本。去除 Emby UI 后将失去 Emby 原生视觉风格（如滑块拇指样式、按钮涟漪动效、焦点高亮等），换取更快的弹窗打开速度和更低的内存占用。

### 版本对照总表

| 模块 | Full | Lite-v1 | Lite-v2 | Lite-v3 |
|------|:----:|:-------:|:-------:|:-------:|
| **C01** 主入口与生命周期 | ✅ | ✅ | ✅ | ✅ |
| **C02** 用户配置与常量 | ✅ | ✅ | ✅ | ✅ |
| **C03** 弹幕引擎加载 | ✅ | ✅ | ✅ | ✅ |
| **C04** EDE 状态对象 | ✅ | ✅ | ✅ | ✅ |
| **C05** 播放事件监听 | ✅ | ✅ | ✅ | ✅ |
| **C06** UI 初始化 | ✅ | ✅ | ✅ | ✅ |
| **C07** Emby 媒体信息获取 | ✅ | ✅ | ✅ | ✅ |
| **C08** 弹弹play API 集成 | ✅ | ✅ | ✅ | ✅ |
| **C09** 集数搜索与匹配 | ✅ | ✅ | ✅ | ✅ |
| **C10** 集数信息解析 | ✅ | ✅ | ✅ | ✅ |
| **C11** 弹幕创建与渲染 | ✅ | ✅ | ✅ | ✅ |
| **C12** 加载管线 | ✅ | ✅ | ✅ | ✅ |
| **C13** 弹幕解析与样式 | ✅ | ✅ | ✅ | ✅ |
| **C14** 基础过滤系统 | ✅ | ✅ | ✅ | ✅ |
| **C15** 设置弹窗与 Tab 导航 | ✅ | ✅ | ✅ | ✅° |
| **C16** 弹幕设置 Tab | ✅ | ✅ | ✅ | ✅° |
| **C17** 手动匹配 Tab（基础） | ✅ | ✅ | ✅ | ✅° |
| **C18** 手动匹配操作 | ✅ | ✅ | ✅ | ✅° |
| **C19** 过滤与滑块事件处理 | ✅ | ✅ | ✅ | ✅° |
| **C20** Emby UI 组件库 | ✅ | ✅ | ✅ | ❌ |
| **C21** LocalStorage 管理 | ✅ | ✅ | ✅ | ✅ |
| **C22** 工具函数 | ✅ | ✅ | ✅ | ✅ |
| **C23** H5 视频适配器 | ✅ | ✅ | ✅ | ✅ |
| **O01** SparkMD5 文件哈希 | ✅ | ❌ | ❌ | ❌ |
| **O02** 哈希匹配与智能匹配 | ✅ | ❌ | ❌ | ❌ |
| **O03** AppLogAspect 日志拦截 | ✅ | ❌ | ❌ | ❌ |
| **O04** 弹幕通知 Toast | ✅ | ✅ | ✅ | ✅° |
| **O05** 自动过滤（阈值） | ✅ | ✅ | ✅ | ✅ |
| **O06** 相似弹幕合并 | ✅ | ❌ | ❌ | ❌ |
| **O07** 配置导入/导出 | ✅ | ✅ | ✅ | ✅° |
| **O08** 字体定制 | ✅ | ❌ | ❌ | ❌ |
| **O09** 附加弹幕 URL | ✅ | ✅ | ❌ | ❌ |
| **O10** 自定义 API 地址 | ✅ | ✅ | ❌ | ❌ |
| **O11** 服务端插件 XML 弹幕 | ✅ | ✅ | ❌ | ❌ |
| **O12** 弹幕信息 Tab（弹幕列表） | ✅ | ❌ | ❌ | ❌ |
| **O13** Bangumi 角色卡片 | ✅ | ❌ | ❌ | ❌ |
| **O14** Bangumi 集成 | ✅ | ✅ | ✅ | ✅° |
| **O15** 高级设置 Tab | ✅ | ✅* | ❌ | ❌ |
| **O16** OSD 弹幕高能进度条 | ✅ | ❌ | ❌ | ❌ |
| **O17** OSD 播放信息标题 | ✅ | ✅ | ❌ | ❌ |
| **O18** OSD 头部时钟 | ✅ | ✅ | ❌ | ❌ |
| **O19** 定时退出/返回主页 | ✅ | ✅ | ❌ | ❌ |
| **O20** 关于 Tab | ✅ | ✅* | ❌ | ❌ |
| **O21** 控制台日志查看器 | ✅ | ✅* | ❌ | ❌ |
| **O22** 调试功能集 | ✅ | ✅* | ❌ | ❌ |
| **O23** 内嵌网页 Tab (iframe) | ✅ | ✅ | ❌ | ❌ |
| **O24** 快速调试 & 彩蛋 | ✅ | ✅ | ❌ | ❌ |
| **O25** NoisyX CSS 修复 | ✅ | ✅ | ❌ | ❌ |

> `✅*` = 保留但去除已移除子模块的相关 UI（如高级设置中去除相似合并 UI、关于 Tab 中去除日志查看器 UI 等）
>
> `✅°` = 保留功能但改造实现（去除 Emby UI 依赖，改用原生 DOM 元素）

---

## 三、构建说明

各版本构建产物规划：

| 版本 | 源文件 | 构建产物 |
|------|--------|----------|
| Full（完整版） | `ede.js` | `dist/ede.android9.js`, `dist/ede.android7.js` |
| Lite-v1 | `ede.lite-v1.js`（待创建） | `dist/ede.lite-v1.android9.js` |
| Lite-v2 | `ede.lite-v2.js`（待创建） | `dist/ede.lite-v2.android9.js` |
| Lite-v3 | `ede.lite-v3.js`（待创建） | `dist/ede.lite-v3.android9.js` |
