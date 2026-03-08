(function () {
    'use strict';

    /**
     * 常量配置
     * 从 ede.js 迁移，未修改原有实现逻辑
     */

    var check_interval = 200;
    var LOAD_TYPE = {
      CHECK: 'check',
      INIT: 'init',
      REFRESH: 'refresh',
      RELOAD: 'reload',
      // 优先走缓存,其余类型走接口
      SEARCH: 'search'
    };

    /**
     * DOM 元素 ID 集合
     * 从 ede.js 迁移，未修改原有实现逻辑
     */

    var eleIds = {
      danmakuSwitchBtn: 'danmakuSwitchBtn',
      danmakuCtr: 'danmakuCtr',
      danmakuWrapper: 'danmakuWrapper',
      h5VideoAdapter: 'h5VideoAdapter',
      dialogContainer: 'dialogContainer',
      danmakuSwitchDiv: 'danmakuSwitchDiv',
      danmakuSwitch: 'danmakuSwitch',
      filterLevelDiv: 'filterLevelDiv',
      danmakuSearchNameDiv: 'danmakuSearchNameDiv',
      danmakuSearchName: 'danmakuSearchName',
      danmakuEpisodeFlag: 'danmakuEpisodeFlag',
      danmakuAnimeDiv: 'danmakuAnimeDiv',
      danmakuSwitchEpisode: 'danmakuSwitchEpisode',
      danmakuEpisodeNumDiv: 'danmakuEpisodeNumDiv',
      danmakuEpisodeLoad: 'danmakuEpisodeLoad',
      danmakuRemark: 'danmakuRemark',
      danmakuAnimeSelect: 'danmakuAnimeSelect',
      danmakuEpisodeNumSelect: 'danmakuEpisodeNumSelect',
      searchImgDiv: 'searchImgDiv',
      searchImg: 'searchImg',
      searchApiSource: 'searchApiSource',
      apiCheckboxListDiv: 'apiCheckboxListDiv',
      apiPriorityDiv: 'apiPriorityDiv',
      customApiPrefixInputDiv: 'customApiPrefixInputDiv',
      clearLocalMatchCacheBtn: 'clearLocalMatchCacheBtn',
      extCommentSearchDiv: 'extCommentSearchDiv',
      extUrlsDiv: 'extUrlsDiv',
      currentMatchedDiv: 'currentMatchedDiv',
      filteringDanmaku: 'filteringDanmaku',
      danmakuTypeFilterDiv: 'danmakuTypeFilterDiv',
      danmakuTypeFilterSelectName: 'danmakuTypeFilterSelectName',
      danmakuSourceFilterDiv: 'danmakuSourceFilterDiv',
      danmakuSourceFilterSelectName: 'danmakuSourceFilterSelectName',
      danmakuShowSourceDiv: 'danmakuShowSourceDiv',
      danmakuShowSourceSelectName: 'danmakuShowSourceSelectName',
      danmakuAutoFilterCountDiv: 'danmakuAutoFilterCountDiv',
      danmakuFilterProDiv: 'danmakuFilterProDiv',
      mergeSimilarPercentDiv: 'mergeSimilarPercentDiv',
      mergeSimilarTimeDiv: 'mergeSimilarTimeDiv',
      posterImgDiv: 'posterImgDiv',
      danmuListDiv: 'danmuListDiv',
      danmuListText: 'danmakuListText',
      extInfoCtrlDiv: 'extInfoCtrlDiv',
      extInfoDiv: 'extInfoDiv',
      characterImgHeihtDiv: 'characterImgHeihtDiv',
      characterImgHeihtLabel: 'characterImgHeihtLabel',
      charactersDiv: 'charactersDiv',
      filterKeywordsDiv: 'filterKeywordsDiv',
      danmakuChConverDiv: 'danmakuChConverDiv',
      danmakuEngineDiv: 'danmakuEngineDiv',
      heightPercentDiv: 'heightPercentDiv',
      danmakuSizeDiv: 'danmakuSizeDiv',
      danmakuOpacityDiv: 'danmakuOpacityDiv',
      danmakuSpeedDiv: 'danmakuSpeedDiv',
      danmakuFontWeightDiv: 'danmakuFontWeightDiv',
      danmakuFontStyleDiv: 'danmakuFontStyleDiv',
      timelineOffsetDiv: 'timelineOffsetDiv',
      fontFamilyCtrl: 'fontFamilyCtrl',
      fontFamilyDiv: 'fontFamilyDiv',
      fontFamilyLabel: 'fontFamilyLabel',
      fontFamilySelect: 'fontFamilySelect',
      fontFamilyInput: 'fontFamilyInput',
      fontStylePreview: 'fontStylePreview',
      settingsCtrl: 'settingsCtrl',
      settingsText: 'settingsText',
      settingsImportBtn: 'settingsImportBtn',
      settingReloadBtn: 'settingReloadBtn',
      filterKeywordsEnableId: 'filterKeywordsEnableId',
      filterKeywordsId: 'filterKeywordsId',
      timeoutCallbackDiv: 'timeoutCallbackDiv',
      timeoutCallbackLabel: 'timeoutCallbackLabel',
      timeoutCallbackTypeDiv: 'timeoutCallbackTypeDiv',
      timeoutCallbackUnitDiv: 'timeoutCallbackUnitDiv',
      bangumiEnableLabel: 'bangumiEnableLabel',
      bangumiSettingsDiv: 'bangumiSettingsDiv',
      bangumiTokenInput: 'bangumiTokenInput',
      bangumiTokenInputDiv: 'bangumiTokenInputDiv',
      bangumiTokenLabel: 'bangumiTokenInputLabel',
      bangumiTokenLinkDiv: 'bangumiTokenLinkDiv',
      bangumiPostPercentDiv: 'bangumiPostPercentDiv',
      customeUrlsDiv: 'customeUrlsDiv',
      customeCorsProxyDiv: 'customeCorsProxyDiv',
      customeDanmakuDiv: 'customeDanmakuDiv',
      customeGetCommentDiv: 'customeGetCommentDiv',
      customeGetExtcommentDiv: 'customeGetExtcommentDiv',
      customePosterImgDiv: 'customePosterImgDiv',
      consoleLogCtrl: 'consoleLogCtrl',
      consoleLogInfo: 'consoleLogInfo',
      consoleLogText: 'consoleLogText',
      consoleLogTextInput: 'consoleLogTextInput',
      consoleLogCountLabel: 'consoleLogCountLabel',
      debugCheckbox: 'debugCheckbox',
      debugButton: 'debugButton',
      tabIframe: 'tabIframe',
      tabIframeHeightDiv: 'tabIframeHeightDiv',
      tabIframeHeightLabel: 'tabIframeHeightLabel',
      tabIframeCtrlDiv: 'tabIframeCtrlDiv',
      tabIframeSrcInputDiv: 'tabIframeSrcInputDiv',
      openSourceLicenseDiv: 'openSourceLicenseDiv',
      videoOsdDanmakuTitle: 'videoOsdDanmakuTitle',
      extCheckboxDiv: 'extCheckboxDiv',
      osdCheckboxDiv: 'osdCheckboxDiv',
      osdLineChartDiv: 'osdLineChartDiv',
      osdLineChartTimeDiv: 'osdLineChartTimeDiv',
      danmuPluginDiv: 'danmuPluginDiv',
      danmakuSettingBtnDebug: 'danmakuSettingBtnDebug',
      progressBarLineChart: 'progressBarLineChart'
    };

    /**
     * localStorage 前缀键配置
     * 从 ede.js 迁移，未修改原有实现逻辑
     */

    var lsLocalKeys = {
      animePrefix: '_anime_id_rel_',
      animeSeasonPrefix: '_anime_season_rel_',
      animeEpisodePrefix: '_episode_id_rel_',
      bangumiEpInfoPrefix: '_bangumi_episode_id_rel_',
      bangumiMe: '_bangumi_me',
      apiPrefix: '_api_'
    };

    function _arrayLikeToArray(r, a) {
      (null == a || a > r.length) && (a = r.length);
      for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
      return n;
    }
    function _arrayWithHoles(r) {
      if (Array.isArray(r)) return r;
    }
    function _classCallCheck(a, n) {
      if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(e, r) {
      for (var t = 0; t < r.length; t++) {
        var o = r[t];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
      }
    }
    function _createClass(e, r, t) {
      return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
        writable: !1
      }), e;
    }
    function _iterableToArrayLimit(r, l) {
      var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (null != t) {
        var e,
          n,
          i,
          u,
          a = [],
          f = !0,
          o = !1;
        try {
          if (i = (t = t.call(r)).next, 0 === l) {
            if (Object(t) !== t) return;
            f = !1;
          } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
        } catch (r) {
          o = !0, n = r;
        } finally {
          try {
            if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
          } finally {
            if (o) throw n;
          }
        }
        return a;
      }
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _slicedToArray(r, e) {
      return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
    }
    function _toPrimitive(t, r) {
      if ("object" != typeof t || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == typeof i ? i : i + "";
    }
    function _typeof(o) {
      "@babel/helpers - typeof";

      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
        return typeof o;
      } : function (o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
      }, _typeof(o);
    }
    function _unsupportedIterableToArray(r, a) {
      if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
      }
    }

    /**
     * 用户可配置项
     * 从 ede.js 迁移，未修改原有实现逻辑
     * note01: 部分 AndroidTV 仅支持最高 ES9 (支持 webview 内核版本 60 以上)
     * note02: url 禁止使用相对路径,非 web 环境的根路径为文件路径,非 http
     */

    var requireDanmakuPath = 'https://danmaku.7o7o.cc/danmaku.min.js';
    var corsProxy = 'https://ddplay-api.7o7o.cc/cors/';

    var getApiTl = function getApiTl(fn) {
      if (!fn || typeof fn.toString !== 'function') {
        return '';
      }
      var match = fn.toString().match(/\=>\s*(.*)$/);
      if (!match || !match[1]) {
        return '';
      }
      return match[1].trim().replace(/`/g, '');
    };

    // dandanplayApi 需在 lsKeys 之前定义，getter 运行时才需要 lsGetItem/lsKeys
    var dandanplayApi = {
      get prefix() {
        var custom = lsGetItem(lsKeys.customApiPrefix.id);
        if (custom && custom.length > 0 && !lsGetItem(lsKeys.useOfficialApi.id)) {
          return custom;
        }
        return corsProxy + 'https://api.dandanplay.net/api/v2';
      },
      getSearchEpisodes: function getSearchEpisodes(anime, episode, tmdbId) {
        return "".concat(dandanplayApi.prefix, "/search/episodes?anime=").concat(anime).concat(episode ? "&episode=".concat(episode) : '').concat(tmdbId ? "&tmdbId=".concat(tmdbId) : '');
      },
      getComment: function getComment(episodeId, chConvert) {
        return "".concat(dandanplayApi.prefix, "/comment/").concat(episodeId, "?withRelated=true&chConvert=").concat(chConvert);
      },
      getExtcomment: function getExtcomment(url) {
        return "".concat(dandanplayApi.prefix, "/extcomment?url=").concat(encodeURI(url));
      },
      getBangumi: function getBangumi(animeId) {
        return "".concat(dandanplayApi.prefix, "/bangumi/").concat(animeId);
      },
      posterImg: function posterImg(animeId) {
        return "https://img.dandanplay.net/anime/".concat(animeId, ".jpg");
      }
    };

    // lsKeys 需在 dandanplayApi 之后，因 defaultValue 使用 getApiTl(dandanplayApi.getComment)
    var lsKeys = {
      chConvert: {
        id: 'danmakuChConvert',
        defaultValue: 1,
        name: '简繁转换'
      },
      switch: {
        id: 'danmakuSwitch',
        defaultValue: true,
        name: '弹幕开关'
      },
      filterLevel: {
        id: 'danmakuFilterLevel',
        defaultValue: 0,
        name: '过滤强度',
        min: 0,
        max: 3,
        step: 1
      },
      heightPercent: {
        id: 'danmakuHeightPercent',
        defaultValue: 100,
        name: '显示区域',
        min: 3,
        max: 100,
        step: 1
      },
      fontSizeRate: {
        id: 'danmakuFontSizeRate',
        defaultValue: 1,
        name: '弹幕大小',
        min: 0.1,
        max: 3,
        step: 0.1
      },
      fontOpacity: {
        id: 'danmakuFontOpacity',
        defaultValue: 1,
        name: '透明度',
        min: 0.1,
        max: 1,
        step: 0.1
      },
      speed: {
        id: 'danmakuBaseSpeed',
        defaultValue: 1,
        name: '速度',
        min: 0.1,
        max: 3,
        step: 0.1
      },
      timelineOffset: {
        id: 'danmakuTimelineOffset',
        defaultValue: 0,
        name: '轴偏秒'
      },
      fontWeight: {
        id: 'danmakuFontWeight',
        defaultValue: 400,
        name: '弹幕粗细',
        min: 100,
        max: 1000,
        step: 100
      },
      fontStyle: {
        id: 'danmakuFontStyle',
        defaultValue: 0,
        name: '弹幕斜体',
        min: 0,
        max: 2,
        step: 1
      },
      fontFamily: {
        id: 'danmakuFontFamily',
        defaultValue: 'sans-serif',
        name: '字体'
      },
      danmuList: {
        id: 'danmakuDanmuList',
        defaultValue: 0,
        name: '弹幕列表'
      },
      typeFilter: {
        id: 'danmakuTypeFilter',
        defaultValue: [],
        name: '屏蔽类型'
      },
      sourceFilter: {
        id: 'danmakuSourceFilter',
        defaultValue: [],
        name: '屏蔽来源平台'
      },
      showSource: {
        id: 'danmakuShowSource',
        defaultValue: [],
        name: '显示每条来源'
      },
      autoFilterCount: {
        id: 'danmakuAutoFilterCount',
        defaultValue: 0,
        name: '自动过滤弹幕数阈值',
        min: 0,
        max: 10000,
        step: 500
      },
      mergeSimilarEnable: {
        id: 'danmakuMergeSimilarEnable',
        defaultValue: false,
        name: '合并相似弹幕'
      },
      mergeSimilarPercent: {
        id: 'danmakuMergeSimilarPercent',
        defaultValue: 80,
        name: '相似度百分比',
        min: 20,
        max: 100,
        step: 1
      },
      mergeSimilarTime: {
        id: 'danmakuMergeSimilarTime',
        defaultValue: 10,
        name: '相似度时间窗口秒',
        min: 1,
        max: 60,
        step: 1
      },
      filterKeywords: {
        id: 'danmakuFilterKeywords',
        defaultValue: '',
        name: '屏蔽关键词'
      },
      filterKeywordsEnable: {
        id: 'danmakuFilterKeywordsEnable',
        defaultValue: true,
        name: '屏蔽关键词启用'
      },
      engine: {
        id: 'danmakuEngine',
        defaultValue: 'canvas',
        name: '弹幕引擎'
      },
      osdTitleEnable: {
        id: 'danmakuOsdTitleEnable',
        defaultValue: false,
        name: '播放界面右下角显示弹幕信息'
      },
      osdLineChartEnable: {
        id: 'danmakuOsdLineChartEnable',
        defaultValue: false,
        name: '弹幕高能进度条'
      },
      osdLineChartSkipFilter: {
        id: 'danmakuOsdLineChartSkipFilter',
        defaultValue: false,
        name: '弹幕高能进度条免过滤'
      },
      osdLineChartTime: {
        id: 'danmakuOsdLineChartTime',
        defaultValue: 10,
        name: '弹幕高能进度条颗粒度秒',
        min: 1,
        max: 60,
        step: 1
      },
      osdHeaderClockEnable: {
        id: 'danmakuOsdHeaderClockEnable',
        defaultValue: false,
        name: '播放界面头中显示时钟'
      },
      timeoutCallbackUnit: {
        id: 'danmakuTimeoutCallbackUnit',
        defaultValue: 1,
        name: '定时单位'
      },
      timeoutCallbackValue: {
        id: 'danmakuTimeoutCallbackValue',
        defaultValue: 0,
        name: '定时值'
      },
      bangumiEnable: {
        id: 'danmakuBangumiEnable',
        defaultValue: false,
        name: '启用并填写个人令牌'
      },
      bangumiToken: {
        id: 'danmakuBangumiToken',
        defaultValue: '',
        name: '个人令牌'
      },
      bangumiPostPercent: {
        id: 'danmakuBangumiPostPercent',
        defaultValue: 95,
        name: '时长比',
        min: 1,
        max: 99,
        step: 1
      },
      consoleLogEnable: {
        id: 'danmakuConsoleLogEnable',
        defaultValue: false,
        name: '控制台日志'
      },
      useFetchPluginXml: {
        id: 'danmakuUseFetchPluginXml',
        defaultValue: false,
        name: '加载媒体服务端xml弹幕'
      },
      debugShowDanmakuWrapper: {
        id: 'danmakuDebugShowDanmakuWrapper',
        defaultValue: false,
        name: '弹幕容器边界'
      },
      debugShowDanmakuCtrWrapper: {
        id: 'danmakuDebugShowDanmakuCtrWrapper',
        defaultValue: false,
        name: '按钮容器边界'
      },
      debugReverseDanmu: {
        id: 'danmakuDebugReverseDanmu',
        defaultValue: false,
        name: '反转弹幕方向'
      },
      debugRandomDanmuColor: {
        id: 'danmakuDebugRandomDanmuColor',
        defaultValue: false,
        name: '随机弹幕颜色'
      },
      debugForceDanmuWhite: {
        id: 'danmakuDebugForceDanmuWhite',
        defaultValue: false,
        name: '强制弹幕白色'
      },
      debugTopBottomToScroll: {
        id: 'danmakuDebugTopBottomToScroll',
        defaultValue: false,
        name: '顶底弹幕滚动'
      },
      debugGenerateLarge: {
        id: 'danmakuDebugGenerateLarge',
        defaultValue: false,
        name: '测试大量弹幕'
      },
      debugDialogHyalinize: {
        id: 'danmakuDebugDialogHyalinize',
        defaultValue: false,
        name: '透明弹窗背景'
      },
      debugDialogWindow: {
        id: 'danmakuDebugDialogWindow',
        defaultValue: false,
        name: '弹窗窗口化'
      },
      debugDialogRight: {
        id: 'danmakuDebugDialogRight',
        defaultValue: false,
        name: '弹窗靠右布局'
      },
      debugTabIframeEnable: {
        id: 'danmakuDebugTabIframeEnable',
        defaultValue: false,
        name: '打开内嵌网页'
      },
      debugH5VideoAdapterEnable: {
        id: 'danmakuDebugH5VideoAdapterEnable',
        defaultValue: false,
        name: '查看视频适配器情况'
      },
      debugDanmuAnywhereEnable: {
        id: 'danmakuDebugDanmuAnywhereEnable',
        defaultValue: false,
        name: '在任意处测试弹幕'
      },
      quickDebugOn: {
        id: 'danmakuQuickDebugOn',
        defaultValue: false,
        name: '快速调试'
      },
      customeCorsProxyUrl: {
        id: 'danmakuCustomeCorsProxyUrl',
        defaultValue: corsProxy,
        name: '跨域代理前缀'
      },
      customeDanmakuUrl: {
        id: 'danmakuCustomeDanmakuUrl',
        defaultValue: requireDanmakuPath,
        name: '弹幕引擎依赖'
      },
      customeGetCommentUrl: {
        id: 'danmakuCustomeGetCommentUrl',
        defaultValue: getApiTl(dandanplayApi.getComment),
        name: '获取指定弹幕库的所有弹幕'
      },
      customeGetExtcommentUrl: {
        id: 'danmakuCustomeGetExtcommentUrl',
        defaultValue: getApiTl(dandanplayApi.getExtcomment),
        name: '获取指定第三方url的弹幕'
      },
      customePosterImgUrl: {
        id: 'danmakuCustomePosterImgUrl',
        defaultValue: getApiTl(dandanplayApi.posterImg),
        name: '媒体海报'
      },
      customApiPrefix: {
        id: 'danmakuCustomApiPrefix',
        defaultValue: '',
        name: '自定义弹弹play API地址'
      },
      useOfficialApi: {
        id: 'danmakuUseOfficialApi',
        defaultValue: true,
        name: '使用官方API'
      },
      useCustomApi: {
        id: 'danmakuUseCustomApi',
        defaultValue: false,
        name: '使用自定义API'
      },
      apiPriority: {
        id: 'danmakuApiPriority',
        defaultValue: ['official', 'custom'],
        name: 'API 优先级'
      }
    };
    function lsGetKeyById(id) {
      return Object.keys(lsKeys).find(function (key) {
        return lsKeys[key].id === id;
      });
    }
    function lsGetItem(id) {
      var key = lsGetKeyById(id);
      if (!key) {
        return null;
      }
      var defaultValue = lsKeys[key].defaultValue;
      var item = localStorage.getItem(id);
      if (item === null) {
        return defaultValue;
      }
      if (Array.isArray(defaultValue) || _typeof(defaultValue) === 'object' && defaultValue !== null) {
        return JSON.parse(item);
      }
      if (typeof defaultValue === 'boolean') {
        return item === 'true';
      }
      if (typeof defaultValue === 'number') {
        return parseFloat(item);
      }
      return item;
    }

    var EDE = /*#__PURE__*/_createClass(function EDE() {
      _classCallCheck(this, EDE);
      this.chConvert = lsGetItem(lsKeys.chConvert.id);
      this.danmaku = null;
      this.episode_info = null;
      this.ob = null;
      this.loading = false;
      this.danmuCache = {}; // 只包含 comment 未解析
      this.commentsParsed = []; // 包含 comment 和 extComment 解析后全量
      this.extCommentCache = {}; // 只包含 extComment 未解析
      this.destroyIntervalIds = [];
      this.searchDanmakuOpts = {}; // 手动搜索变量
      this.appLogAspect = null; // 应用日志切面
      this.bangumiInfo = {};
      this.itemId = '';
      this.tempLsValues = {}; // 临时存储的由程序更改后的 ls 值
    });

    /**
     * 控制台日志切面
     * 用于高级设置中的控制台日志展示
     * 从 ede.js 迁移，未修改原有实现逻辑
     */

    var AppLogAspect = /*#__PURE__*/function () {
      function AppLogAspect() {
        _classCallCheck(this, AppLogAspect);
        this.initialized = false;
        this.originalError = console.error;
        this.originalWarn = console.warn;
        this.originalLog = console.log;
        this.originalOnerror = null;
        this.value = '';
        this.listeners = [];
        this.ERROR = {
          text: 'ERROR',
          emoji: '❗️'
        };
        this.WARN = {
          text: 'WARN',
          emoji: '⚠️'
        };
        this.INFO = {
          text: 'INFO',
          emoji: '❕'
        };
      }
      return _createClass(AppLogAspect, [{
        key: "init",
        value: function init() {
          var _this = this;
          if (this.initialized) {
            return this;
          }
          console.error = function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            _this.originalError.apply(console, args);
            _this.value += _this.format(_this.ERROR, args);
            _this.notifyListeners();
          };
          console.warn = function () {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }
            _this.originalWarn.apply(console, args);
            _this.value += _this.format(_this.WARN, args);
            _this.notifyListeners();
          };
          console.log = function () {
            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }
            _this.originalLog.apply(console, args);
            _this.value += _this.format(_this.INFO, args);
            _this.notifyListeners();
          };
          this.originalOnerror = window.onerror;
          window.onerror = function () {
            for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }
            console.error(args);
            if (typeof _this.originalOnerror === 'function') {
              _this.originalOnerror.apply(_this, args);
            }
          };
          this.initialized = true;
          return this;
        }
      }, {
        key: "destroy",
        value: function destroy() {
          var clearValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          if (this.initialized) {
            console.error = this.originalError;
            console.warn = this.originalWarn;
            console.log = this.originalLog;
            window.onerror = this.originalOnerror;
            if (clearValue) {
              this.value = '';
            }
            this.listeners = [];
            this.initialized = false;
          }
          return this;
        }
      }, {
        key: "format",
        value: function format(level, args) {
          var emoji = level.emoji ? "[".concat(level.emoji, "] ") : '';
          return "[".concat(new Date(Date.now()).toLocaleString(), "] [").concat(level.text, "] ").concat(emoji, ": ") + args.map(function (arg) {
            return arg instanceof Error ? arg.message : typeof arg === 'string' ? arg : JSON.stringify(arg);
          }).join(' ') + '\n';
        }
      }, {
        key: "on",
        value: function on(valueChangedCallback) {
          var _this2 = this;
          if (valueChangedCallback.toString().includes('console.log') || valueChangedCallback.toString().includes('console.error')) {
            throw new Error('The callback function must not contain console.log or console.error to avoid infinite loops.');
          }
          this.listeners.push(function () {
            return valueChangedCallback(_this2.value);
          });
        }
      }, {
        key: "notifyListeners",
        value: function notifyListeners() {
          this.listeners.forEach(function (listener) {
            return listener();
          });
        }
      }, {
        key: "clearValue",
        value: function clearValue() {
          this.value = '';
          this.notifyListeners();
        }
      }]);
    }();

    /**
     * 通用工具函数
     * 从 ede.js 迁移，未修改原有实现逻辑
     */

    /**
     * 将对象转为 [key, value] 数组，兼容非对象
     * @param {object} obj
     * @returns {Array<[string, any]>}
     */
    function objectEntries(obj) {
      if (obj && _typeof(obj) === 'object') {
        return Object.keys(obj).map(function (key) {
          return [key, obj[key]];
        });
      }
      return [];
    }

    function lsSetItem(id, value) {
      if (!lsGetKeyById(id)) {
        return;
      }
      var stringValue;
      if (Array.isArray(value)) {
        stringValue = JSON.stringify(value);
      } else if (_typeof(value) === 'object' && value !== null) {
        stringValue = JSON.stringify(value);
      } else {
        stringValue = String(value);
      }
      localStorage.setItem(id, stringValue);
    }
    function lsCheckOld(id, value) {
      return JSON.stringify(lsGetItem(id)) === JSON.stringify(value);
    }
    function lsCheckSet(id, value) {
      if (lsCheckOld(id, value)) {
        return false;
      }
      lsSetItem(id, value);
      return true;
    }

    /**
     * 批量设置缓存
     * @param {object} keyValues - 键值对对象，如 { key1: value1, key2: value2 }
     * @param {boolean} [needCheck=true] - 是否检查后设置
     * @returns {boolean|undefined} - needCheck 为 true 时返回是否有更新
     */
    function lsBatchSet(keyValues) {
      var needCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (needCheck) {
        return objectEntries(keyValues).reduce(function (acc, _ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            id = _ref2[0],
            value = _ref2[1];
          return acc || lsCheckSet(id, value);
        }, false);
      }
      objectEntries(keyValues).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          id = _ref4[0],
          value = _ref4[1];
        return lsSetItem(id, value);
      });
    }

    /**
     * core 模块统一导出
     */

    /**
     * 清理所有由 waitForElement 创建的 interval
     * @param {EDE} ede - EDE 实例
     */
    function destroyAllInterval(ede) {
      if (ede && ede.destroyIntervalIds) {
        ede.destroyIntervalIds.forEach(function (id) {
          return clearInterval(id);
        });
        ede.destroyIntervalIds = [];
      }
    }

    /**
     * DOM 工具函数
     * 从 ede.js 迁移，未修改原有实现逻辑
     */

    /**
     * 按 ID 获取元素
     * @param {string} childId - 元素 ID（不带 #）
     * @param {Document|Element} [parentNode=document] - 父节点
     * @returns {Element|null}
     */
    function getById(childId) {
      var parentNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
      if (!parentNode) {
        return null;
      }
      return parentNode.querySelector("#".concat(childId));
    }

    /**
     * 按类名获取单个元素
     * @param {string} className - 类名（不带点）
     * @param {Document|Element} [parentNode=document] - 父节点
     * @returns {Element|null}
     */
    function getByClass(className) {
      var parentNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
      if (!parentNode) {
        return null;
      }
      return parentNode.querySelector(".".concat(className));
    }

    /**
     * 等待目标元素出现
     * @param {string|object} target - 选择器字符串，或 { element: ele, needParent: true }
     * @param {function} [callback] - 找到后的回调，参数为元素
     * @param {number} [timeout=10000] - 超时毫秒，0 表示不超时
     * @param {number} [interval=check_interval] - 检查间隔
     * @param {number[]} [destroyIntervalIds] - 用于清理的 interval id 数组，可选
     * @returns {Promise<HTMLElement|null>}
     */
    function waitForElement(target, callback) {
      var _target$element;
      var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10000;
      var interval = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : check_interval;
      var destroyIntervalIds = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
      var intervalId = null;
      var timeoutId = null;
      var isSelector = typeof target === 'string';
      var elementMark = isSelector ? target : (_target$element = target.element) === null || _target$element === void 0 ? void 0 : _target$element.tagName;
      var promise = new Promise(function (resolve, reject) {
        function checkElement() {
          var element = null;
          if (isSelector) {
            element = document.querySelector(target);
          } else if (target !== null && target !== void 0 && target.element) {
            if (target.needParent) {
              element = target.element.parentNode;
            } else {
              element = target.element;
            }
          }
          if (element) {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
            if (typeof callback === 'function') {
              callback(element);
            }
            resolve(element);
          }
        }
        intervalId = setInterval(checkElement, interval);
        if (destroyIntervalIds && Array.isArray(destroyIntervalIds)) {
          destroyIntervalIds.push(intervalId);
        }
        if (timeout > 0) {
          timeoutId = setTimeout(function () {
            clearInterval(intervalId);
            reject(new Error("Element [".concat(elementMark, "] not found within ").concat(timeout, "ms")));
          }, timeout);
        }
      });
      return promise;
    }

    /**
     * 网络请求工具
     * 从 ede.js 迁移，未修改原有实现逻辑
     */

    /**
     * 封装 fetch，支持 JSON 请求
     * @param {string} url
     * @param {object} [opts] - { token, headers, body, method }
     * @returns {Promise<object>}
     */
    async function fetchJson(url) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var token = opts.token,
        headers = opts.headers,
        body = opts.body;
      var _opts$method = opts.method,
        method = _opts$method === void 0 ? 'GET' : _opts$method;
      if (method === 'GET' && body) {
        method = 'POST';
      }
      var requestHeaders = {
        'Accept-Encoding': 'gzip',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': navigator.userAgent
      };
      if (token) {
        requestHeaders.Authorization = "Bearer ".concat(token);
      }
      if (headers) {
        Object.assign(requestHeaders, headers);
      }
      var requestBody = body ? JSON.stringify(body) : null;
      var response = await fetch(url, {
        method: method,
        headers: requestHeaders,
        body: requestBody
      });
      if (!response.ok) {
        throw new Error("HTTP error! Status: ".concat(response.status));
      }
      var responseText = await response.text();
      if (responseText.length > 0) {
        try {
          return JSON.parse(responseText);
        } catch (parseError) {
          console.warn('responseText not is JSON:', parseError);
        }
      }
      return {
        success: true
      };
    }

    function safeApiClient() {
      try {
        return typeof window !== 'undefined' && window.ApiClient || null;
      } catch (_unused) {
        return null;
      }
    }
    var OS = {
      isAndroid: function isAndroid() {
        return /android/i.test(navigator.userAgent);
      },
      isIOS: function isIOS() {
        return /iPad|iPhone|iPod/i.test(navigator.userAgent);
      },
      isMacOS: function isMacOS() {
        return /Macintosh|MacIntel/i.test(navigator.userAgent);
      },
      isApple: function isApple() {
        return OS.isMacOS() || OS.isIOS();
      },
      isWindows: function isWindows() {
        return /compatible|Windows/i.test(navigator.userAgent);
      },
      isMobile: function isMobile() {
        return OS.isAndroid() || OS.isIOS();
      },
      isUbuntu: function isUbuntu() {
        return /Ubuntu/i.test(navigator.userAgent);
      },
      isAndroidEmbyNoisyX: function isAndroidEmbyNoisyX() {
        var _api$appVersion;
        var api = safeApiClient();
        return api && OS.isAndroid() && ((_api$appVersion = api.appVersion) === null || _api$appVersion === void 0 ? void 0 : _api$appVersion.call(api).includes('-'));
      },
      isEmbyNoisyX: function isEmbyNoisyX() {
        var _api$appVersion2;
        var api = safeApiClient();
        return api && ((_api$appVersion2 = api.appVersion) === null || _api$appVersion2 === void 0 ? void 0 : _api$appVersion2.call(api).includes('-'));
      },
      isEmbyTheater: function isEmbyTheater() {
        var _api$appName;
        var api = safeApiClient();
        return api && ((_api$appName = api.appName) === null || _api$appName === void 0 ? void 0 : _api$appName.call(api)) === 'Emby Theater';
      },
      isEmbyUWP: function isEmbyUWP() {
        var _api$appName2;
        var api = safeApiClient();
        return api && ((_api$appName2 = api.appName) === null || _api$appName2 === void 0 ? void 0 : _api$appName2.call(api)) === 'Emby Windows';
      },
      isOthers: function isOthers() {
        return objectEntries(OS).filter(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 1),
            key = _ref2[0];
          return key !== 'isOthers';
        }).every(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
            val = _ref4[1];
          return !val();
        });
      }
    };

    /**
     * EDE 模块化入口（占位）
     * 阶段 0-2 占位文件，已引入 config、core、utils
     */
    (async function () {

      // 初始化全局 ede 实例
      window.ede = new EDE();
      console.log('[EDE] modular placeholder', {
        check_interval: check_interval,
        LOAD_TYPE: LOAD_TYPE,
        eleIds: Object.keys(eleIds).length,
        lsKeys: Object.keys(lsKeys).length,
        lsLocalKeys: Object.keys(lsLocalKeys).length,
        EDE: !!window.ede,
        utils: {
          objectEntries: objectEntries,
          getById: getById,
          getByClass: getByClass,
          waitForElement: waitForElement,
          fetchJson: fetchJson,
          OS: OS
        },
        storage: {
          lsSetItem: lsSetItem,
          lsBatchSet: lsBatchSet
        },
        core: {
          AppLogAspect: AppLogAspect,
          destroyAllInterval: destroyAllInterval
        }
      });
    })();

})();
//# sourceMappingURL=ede.js.map
