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

    // htmlVideoPlayerContainer
    var mediaContainerQueryStr = '.graphicContentContainer';
    var mediaQueryStr = 'video';

    /** emoji 正则，用于弹幕过滤 */
    var emojiRegex = /(?:[\u2600-\u27BF]|\uD83C[\uDDE6-\uDDFF\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEFF]|\uD83E[\uDD00-\uDDFF])/g;

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
    function _arrayWithoutHoles(r) {
      if (Array.isArray(r)) return _arrayLikeToArray(r);
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
    function _createForOfIteratorHelper(r, e) {
      var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (!t) {
        if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
          t && (r = t);
          var n = 0,
            F = function () {};
          return {
            s: F,
            n: function () {
              return n >= r.length ? {
                done: !0
              } : {
                done: !1,
                value: r[n++]
              };
            },
            e: function (r) {
              throw r;
            },
            f: F
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var o,
        a = !0,
        u = !1;
      return {
        s: function () {
          t = t.call(r);
        },
        n: function () {
          var r = t.next();
          return a = r.done, r;
        },
        e: function (r) {
          u = !0, o = r;
        },
        f: function () {
          try {
            a || null == t.return || t.return();
          } finally {
            if (u) throw o;
          }
        }
      };
    }
    function _defineProperty(e, r, t) {
      return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[r] = t, e;
    }
    function _iterableToArray(r) {
      if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
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
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function (r) {
          return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread2(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
          _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
      }
      return e;
    }
    function _slicedToArray(r, e) {
      return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
    }
    function _toConsumableArray(r) {
      return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
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
     * 弹弹 play 搜索与 match 接口
     */

    /**
     * @param {string} anime
     * @param {number|string|null} episode
     * @param {string} prefix
     * @returns {Promise<object|null>}
     */
    async function fetchSearchEpisodes(anime, episode, prefix) {
      if (!anime) throw new Error('anime is required');
      var url = "".concat(prefix, "/search/episodes?anime=").concat(encodeURIComponent(anime)).concat(episode ? "&episode=".concat(episode) : '');
      var searchResult = await fetchJson(url).catch(function (error) {
        console.error("[API\u8BF7\u6C42] search/episodes \u67E5\u8BE2\u5931\u8D25: ".concat(error.message));
        return null;
      });
      console.log("[API\u8BF7\u6C42] search/episodes \u67E5\u8BE2\u6210\u529F", searchResult);
      return searchResult;
    }

    /**
     * @param {string} tmdbId
     * @param {string} prefix
     * @returns {Promise<object|null>}
     */
    async function fetchSearchEpisodesByTmdbId(tmdbId, prefix) {
      var _searchResult$animes;
      if (!tmdbId) return null;
      var url = "".concat(prefix, "/search/episodes?tmdbId=").concat(encodeURIComponent(tmdbId));
      var searchResult = await fetchJson(url).catch(function (error) {
        console.error("[API\u8BF7\u6C42] search/episodes(tmdbId) \u67E5\u8BE2\u5931\u8D25: ".concat(error.message));
        return null;
      });
      if ((searchResult === null || searchResult === void 0 || (_searchResult$animes = searchResult.animes) === null || _searchResult$animes === void 0 ? void 0 : _searchResult$animes.length) > 0) {
        console.log("[API\u8BF7\u6C42] search/episodes(tmdbId=".concat(tmdbId, ") \u67E5\u8BE2\u6210\u529F, animes: ").concat(searchResult.animes.length));
      }
      return searchResult;
    }

    /**
     * @param {object} payload
     * @param {string} prefix
     * @returns {Promise<object|null>}
     */
    async function fetchMatchApi(payload, prefix) {
      var url = "".concat(prefix, "/match");
      console.log("[\u81EA\u52A8\u5339\u914D] \u5C1D\u8BD5 match \u63A5\u53E3");
      try {
        var response = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept-Encoding': 'gzip',
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        if (!response.ok) {
          var responseText = await response.text();
          console.warn("[\u81EA\u52A8\u5339\u914D] match \u5931\u8D25: HTTP ".concat(response.status));
          throw new Error("HTTP error! Status: ".concat(response.status, ", Body: ").concat(responseText));
        }
        var matchResult = await response.json();
        console.log("[\u81EA\u52A8\u5339\u914D] match \u6210\u529F");
        if (matchResult !== null && matchResult !== void 0 && matchResult.matches) {
          matchResult.animes = matchResult.matches;
          delete matchResult.matches;
        }
        return matchResult;
      } catch (error) {
        console.warn("[\u81EA\u52A8\u5339\u914D] match \u5931\u8D25:", error.message || error);
        return null;
      }
    }

    /**
     * 相似度计算与标题解析
     * 用于智能匹配与弹幕相似合并
     */

    /**
     * 计算字符串相似度 (简化版编辑距离)
     * @param {string} str1
     * @param {string} str2
     * @returns {number} 0-1
     */
    function calculateStringSimilarity(str1, str2) {
      var s1 = str1.toLowerCase().replace(/[：:]/g, '');
      var s2 = str2.toLowerCase().replace(/[：:]/g, '');
      if (s1 === s2) return 1.0;
      if (s1.includes(s2) || s2.includes(s1)) return 0.8;
      var matrix = [];
      for (var i = 0; i <= s1.length; i++) {
        matrix[i] = [i];
      }
      for (var j = 0; j <= s2.length; j++) {
        matrix[0][j] = j;
      }
      for (var _i = 1; _i <= s1.length; _i++) {
        for (var _j = 1; _j <= s2.length; _j++) {
          if (s1.charAt(_i - 1) === s2.charAt(_j - 1)) {
            matrix[_i][_j] = matrix[_i - 1][_j - 1];
          } else {
            matrix[_i][_j] = Math.min(matrix[_i - 1][_j - 1] + 1, matrix[_i][_j - 1] + 1, matrix[_i - 1][_j] + 1);
          }
        }
      }
      var maxLength = Math.max(s1.length, s2.length);
      return maxLength === 0 ? 1 : (maxLength - matrix[s1.length][s2.length]) / maxLength;
    }

    /**
     * 计算两个字符串之间的 Levenshtein 相似度百分比 (0-100)
     * @param {string} a
     * @param {string} b
     * @returns {number}
     */
    function similarityPercentage(a, b) {
      if (a === b) return 100;
      if (a.length > b.length) {
        var _ref = [b, a];
        a = _ref[0];
        b = _ref[1];
      }
      var previousRow = Array.from({
        length: a.length + 1
      }, function (_, i) {
        return i;
      });
      var currentRow = Array(a.length + 1);
      for (var j = 1; j <= b.length; j++) {
        currentRow[0] = j;
        for (var i = 1; i <= a.length; i++) {
          var substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;
          currentRow[i] = Math.min(previousRow[i - 1] + substitutionCost, previousRow[i] + 1, currentRow[i - 1] + 1);
        }
        var _ref2 = [currentRow, previousRow];
        previousRow = _ref2[0];
        currentRow = _ref2[1];
      }
      var distance = previousRow[a.length];
      var maxLength = Math.max(a.length, b.length);
      return (maxLength - distance) / maxLength * 100;
    }

    /**
     * 标题标准化
     * @param {string} title
     * @returns {string}
     */
    function normalizeTitle(title) {
      return title.toLowerCase().replace(/[：:]/g, '').replace(/\s+/g, ' ').replace(/[^\w\s\u4e00-\u9fff]/g, '').trim();
    }

    /**
     * 解析搜索关键词，提取标题、季数和集数
     * @param {string} keyword
     * @returns {{ title: string, season: number|null, episode: number|null }}
     */
    function parseSearchKeyword(keyword) {
      keyword = keyword.trim();
      var sePattern = /^(.+?)\s*S(\d{1,2})E(\d{1,4})$/i;
      var seMatch = sePattern.exec(keyword);
      if (seMatch) {
        return {
          title: seMatch[1].trim(),
          season: parseInt(seMatch[2], 10),
          episode: parseInt(seMatch[3], 10)
        };
      }
      var seasonPatterns = [{
        pattern: /^(.*?)\s*(?:S|Season)\s*(\d{1,2})$/i,
        handler: function handler(m) {
          return parseInt(m[2], 10);
        }
      }, {
        pattern: /^(.*?)\s*第\s*([一二三四五六七八九十\d]+)\s*[季部]$/i,
        handler: function handler(m) {
          var seasonMap = {
            一: 1,
            二: 2,
            三: 3,
            四: 4,
            五: 5,
            六: 6,
            七: 7,
            八: 8,
            九: 9,
            十: 10
          };
          return seasonMap[m[2]] || parseInt(m[2], 10);
        }
      }, {
        pattern: /^(.*?)\s*([Ⅰ-Ⅻ])$/,
        handler: function handler(m) {
          var romanMap = {
            Ⅰ: 1,
            Ⅱ: 2,
            Ⅲ: 3,
            Ⅳ: 4,
            Ⅴ: 5,
            Ⅵ: 6,
            Ⅶ: 7,
            Ⅷ: 8,
            Ⅸ: 9,
            Ⅹ: 10,
            Ⅺ: 11,
            Ⅻ: 12
          };
          return romanMap[m[2].toUpperCase()];
        }
      }, {
        pattern: /^(.*?)\s+(\d{1,2})$/,
        handler: function handler(m) {
          return parseInt(m[2], 10);
        }
      }];
      for (var _i2 = 0, _seasonPatterns = seasonPatterns; _i2 < _seasonPatterns.length; _i2++) {
        var _seasonPatterns$_i = _seasonPatterns[_i2],
          pattern = _seasonPatterns$_i.pattern,
          handler = _seasonPatterns$_i.handler;
        var match = pattern.exec(keyword);
        if (match) {
          try {
            var title = match[1].trim();
            var season = handler(match);
            if (season && !(title.length > 4 && /\d{4}$/.test(title))) {
              return {
                title: title,
                season: season,
                episode: null
              };
            }
          } catch (e) {
            continue;
          }
        }
      }
      return {
        title: keyword,
        season: null,
        episode: null
      };
    }

    /**
     * 提取关键词
     * @param {string} title
     * @returns {string[]}
     */
    function extractKeywords(title) {
      var stopWords = ['第', '季', '部', '篇', '章', '话', '集', '期', 'season', 'episode', 'ep', 'ova', 'tv', 'movie', 'special', 'the', 'of', 'and', 'in', 'to', 'a', 'an'];
      return title.toLowerCase().replace(/[：:]/g, ' ').replace(/[^\w\s\u4e00-\u9fff]/g, ' ').split(/[\s\u3000]+/).filter(function (word) {
        return word.length > 1;
      }).filter(function (word) {
        return !stopWords.includes(word);
      }).filter(function (word) {
        return !/^\d+$/.test(word);
      }).map(function (word) {
        return word.trim();
      });
    }

    /**
     * @param {string} animeName
     * @param {number} episodeIndex
     * @param {string} seriesOrMovieId
     * @param {string} prefix - API prefix
     * @returns {Promise<object|null>}
     */
    async function autoFailback(animeName, episodeIndex, seriesOrMovieId, prefix) {
      var rvt = await movieAutoFailback(animeName, episodeIndex, prefix);
      if (rvt) return rvt;
      var seriesOrMovieInfo = await ApiClient.getItem(ApiClient.getCurrentUserId(), seriesOrMovieId);
      var animeOriginalTitle = seriesOrMovieInfo === null || seriesOrMovieInfo === void 0 ? void 0 : seriesOrMovieInfo.OriginalTitle;
      return oriTitleAutoFailback(animeName, episodeIndex, animeOriginalTitle, prefix);
    }

    /**
     * @param {string} animeName
     * @param {number} episodeIndex
     * @param {string} animeOriginalTitle
     * @param {string} prefix
     * @returns {Promise<object|null>}
     */
    async function oriTitleAutoFailback(animeName, episodeIndex, animeOriginalTitle, prefix) {
      var _animaInfo$animes;
      if (!animeOriginalTitle || !prefix) return null;
      console.log("\u6807\u9898\u540D: ".concat(animeName, ",\u81EA\u52A8\u5339\u914D\u672A\u67E5\u8BE2\u5230\u7ED3\u679C,\u5C06\u4F7F\u7528\u539F\u6807\u9898\u540D,\u91CD\u8BD5\u4E00\u6B21"));
      var animaInfo = await fetchSearchEpisodes(animeOriginalTitle, episodeIndex, prefix);
      if (!(animaInfo !== null && animaInfo !== void 0 && (_animaInfo$animes = animaInfo.animes) !== null && _animaInfo$animes !== void 0 && _animaInfo$animes.length)) return null;
      console.log("\u4F7F\u7528\u539F\u6807\u9898\u540D: ".concat(animeOriginalTitle, ",\u81EA\u52A8\u5339\u914D\u6210\u529F"));
      return {
        animeName: animeName,
        animaInfo: animaInfo,
        animeOriginalTitle: animeOriginalTitle
      };
    }

    /**
     * @param {string} animeName
     * @param {number} episodeIndex
     * @param {string} prefix
     * @returns {Promise<object|null>}
     */
    async function movieAutoFailback(animeName, episodeIndex, prefix) {
      var _animaInfo$animes2;
      if (!prefix) return null;
      console.log("\u81EA\u52A8\u5339\u914D\u672A\u67E5\u8BE2\u5230\u7ED3\u679C,\u53EF\u80FD\u4E3A\u975E\u756A\u5267,\u5C06\u79FB\u9664\u7AE0\u8282\u8FC7\u6EE4,\u91CD\u8BD5\u4E00\u6B21");
      var animaInfo = await fetchSearchEpisodes(animeName, null, prefix);
      if (!(animaInfo !== null && animaInfo !== void 0 && (_animaInfo$animes2 = animaInfo.animes) !== null && _animaInfo$animes2 !== void 0 && _animaInfo$animes2.length)) return null;
      console.log("\u79FB\u9664\u7AE0\u8282\u8FC7\u6EE4,\u81EA\u52A8\u5339\u914D\u6210\u529F,\u8F6C\u6362\u4E3A\u76EE\u6807\u7AE0\u8282\u7D22\u5F15 0");
      var epIdx = isNaN(episodeIndex) ? 0 : episodeIndex;
      var episodeInfo = animaInfo.animes[0].episodes[epIdx];
      if (!episodeInfo) return null;
      animaInfo.animes[0].episodes = [episodeInfo];
      return {
        animeName: animeName,
        animaInfo: animaInfo
      };
    }

    /**
     * 智能匹配：从候选列表中选择最佳匹配
     * @param {string} searchTitle
     * @param {object[]} candidates
     * @param {string} prefix - API prefix for fetchSearchEpisodes
     * @returns {object|null}
     */
    function selectBestMatch(searchTitle, candidates, prefix) {
      var _bestMatch$score;
      if (!(candidates !== null && candidates !== void 0 && candidates.length)) return null;
      console.log("[\u667A\u80FD\u5339\u914D] \u641C\u7D22\u6807\u9898: \"".concat(searchTitle, "\", \u5019\u9009\u6570\u91CF: ").concat(candidates.length));
      var parsedSearch = parseSearchKeyword(searchTitle);
      console.log("[\u667A\u80FD\u5339\u914D] \u89E3\u6790\u641C\u7D22\u6807\u9898: ".concat(JSON.stringify(parsedSearch)));
      var scoredCandidates = candidates.map(function (candidate) {
        var score = calculateMatchScore(parsedSearch.title, candidate);
        if (parsedSearch.season && candidate.animeTitle) {
          var candidateParsed = parseSearchKeyword(candidate.animeTitle);
          if (candidateParsed.season === parsedSearch.season) {
            score.total += 0.15;
            console.log("[\u667A\u80FD\u5339\u914D] \u5B63\u5EA6\u5339\u914D\u52A0\u5206: ".concat(candidate.animeTitle));
          }
        }
        if (parsedSearch.episode) {
          var episodeMatched = false;
          if (candidate.episodeId) {
            var episodeFromId = parseInt(candidate.episodeId.toString().slice(-3), 10);
            if (episodeFromId === parsedSearch.episode) {
              score.total += 0.25;
              episodeMatched = true;
              console.log("[\u667A\u80FD\u5339\u914D] episodeId\u96C6\u6570\u5339\u914D\u52A0\u5206: ".concat(candidate.animeTitle, " (").concat(episodeFromId, ")"));
            }
          }
          if (!episodeMatched && candidate.episodeTitle) {
            var episodeMatch = candidate.episodeTitle.match(/第?(\d+)[话集]/);
            if (episodeMatch && parseInt(episodeMatch[1], 10) === parsedSearch.episode) {
              score.total += 0.2;
              console.log("[\u667A\u80FD\u5339\u914D] episodeTitle\u96C6\u6570\u5339\u914D\u52A0\u5206: ".concat(candidate.animeTitle, " - ").concat(candidate.episodeTitle));
            }
          }
        }
        console.log("[\u667A\u80FD\u5339\u914D] \"".concat(candidate.animeTitle, "\" (").concat(candidate.typeDescription || '', ") - \u5F97\u5206: ").concat(score.total.toFixed(2)));
        return _objectSpread2(_objectSpread2({}, candidate), {}, {
          score: score.total,
          scoreDetails: score
        });
      });
      scoredCandidates.sort(function (a, b) {
        return b.score - a.score;
      });
      var bestMatch = scoredCandidates[0];
      if ((bestMatch === null || bestMatch === void 0 ? void 0 : bestMatch.score) > 0.15) {
        console.log("[\u667A\u80FD\u5339\u914D] \u9009\u62E9\u6700\u4F73\u5339\u914D: \"".concat(bestMatch.animeTitle, "\" (\u5F97\u5206: ").concat(bestMatch.score.toFixed(2), ")"));
        return bestMatch;
      }
      console.log("[\u667A\u80FD\u5339\u914D] \u6CA1\u6709\u627E\u5230\u8DB3\u591F\u597D\u7684\u5339\u914D (\u6700\u9AD8\u5F97\u5206: ".concat((bestMatch === null || bestMatch === void 0 || (_bestMatch$score = bestMatch.score) === null || _bestMatch$score === void 0 ? void 0 : _bestMatch$score.toFixed(2)) || 0, ")"));
      return null;
    }

    /**
     * 计算匹配得分
     * @param {string} searchTitle
     * @param {object} candidate
     * @returns {{ titleSimilarity: number, typeBonus: number, keywordMatch: number, exactMatch: number, total: number }}
     */
    function calculateMatchScore(searchTitle, candidate) {
      var score = {
        titleSimilarity: 0,
        typeBonus: 0,
        keywordMatch: 0,
        exactMatch: 0,
        total: 0
      };
      var normalizedSearch = normalizeTitle(searchTitle);
      var normalizedCandidate = normalizeTitle(candidate.animeTitle || '');
      if (normalizedSearch === normalizedCandidate) {
        score.exactMatch = 0.4;
      } else if (normalizedCandidate.includes(normalizedSearch) || normalizedSearch.includes(normalizedCandidate)) {
        score.exactMatch = 0.3;
      }
      score.titleSimilarity = calculateStringSimilarity(searchTitle, candidate.animeTitle || '') * 0.5;
      if (candidate.type === 'tvseries') score.typeBonus = 0.1;else if (candidate.type === 'tvspecial') score.typeBonus = 0.08;else if (candidate.type === 'web') score.typeBonus = 0.06;else if (candidate.type === 'ova') score.typeBonus = 0.04;else if (candidate.type === 'movie') score.typeBonus = 0.02;
      var searchKeywords = extractKeywords(searchTitle);
      var candidateKeywords = extractKeywords(candidate.animeTitle || '');
      var keywordMatches = searchKeywords.filter(function (keyword) {
        return candidateKeywords.some(function (ck) {
          return ck.includes(keyword) || keyword.includes(ck);
        });
      }).length;
      score.keywordMatch = keywordMatches / Math.max(searchKeywords.length, 1) * 0.1;
      score.total = score.exactMatch + score.titleSimilarity + score.typeBonus + score.keywordMatch;
      return score;
    }

    /**
     * 简化的 MD5 实现（与 ede.js 保持一致）
     * 注：当前为 mock 实现，返回固定哈希，实际匹配依赖弹弹 play 服务端
     */
    var SparkMD5 = {
      ArrayBuffer: function (_ArrayBuffer) {
        function ArrayBuffer() {
          return _ArrayBuffer.apply(this, arguments);
        }
        ArrayBuffer.toString = function () {
          return _ArrayBuffer.toString();
        };
        return ArrayBuffer;
      }(function () {
        this._buff = new DataView(new ArrayBuffer(0));
        this._length = 0;
        this._hash = [1732584193, -271733879, -1732584194, 271733878];
      })
    };
    SparkMD5.ArrayBuffer.prototype.append = function (arrayBuffer) {
      return this;
    };
    SparkMD5.ArrayBuffer.prototype.end = function () {
      return 'a1b2c3d4e5f6789012345678901234567890abcd'.substring(0, 32);
    };

    /**
     * 计算文件哈希（头尾各 16MB）
     * @param {string} streamUrl
     * @param {number} fileSize
     * @returns {Promise<string|null>}
     */
    async function calculateFileHash(streamUrl, fileSize) {
      if (!streamUrl || !fileSize) {
        console.warn('缺少 streamUrl 或 fileSize，无法计算哈希。');
        return null;
      }
      console.log("[Hash] \u4F7F\u7528\u6D41\u5A92\u4F53URL: ".concat(streamUrl ? '已获取' : '未获取'));
      if (!streamUrl.includes('api_key=')) {
        console.warn('[Hash] 流媒体URL缺少api_key参数，可能导致认证失败');
      }
      var authHeaders = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        Accept: '*/*',
        'Accept-Encoding': 'identity'
      };
      var CHUNK_SIZE = 16 * 1024 * 1024;
      var spark = new SparkMD5.ArrayBuffer();
      try {
        if (fileSize < CHUNK_SIZE * 2) {
          console.log("[Hash] \u6587\u4EF6\u5927\u5C0F (".concat((fileSize / 1024 / 1024).toFixed(2), "MB) \u5C0F\u4E8E32MB\uFF0C\u5C06\u4E0B\u8F7D\u6574\u4E2A\u6587\u4EF6\u8BA1\u7B97\u54C8\u5E0C\u3002"));
          var response = await fetch(streamUrl, {
            headers: authHeaders
          });
          if (!response.ok) {
            throw new Error("\u4E0B\u8F7D\u6587\u4EF6\u5931\u8D25: ".concat(response.status, " ").concat(response.statusText));
          }
          var arrayBuffer = await response.arrayBuffer();
          spark.append(arrayBuffer);
        } else {
          console.log("[Hash] \u6587\u4EF6\u5927\u5C0F (".concat((fileSize / 1024 / 1024).toFixed(2), "MB)\uFF0C\u5C06\u5206\u5757\u4E0B\u8F7D\u8BA1\u7B97\u54C8\u5E0C\u3002"));
          var headResponse = await fetch(streamUrl, {
            headers: _objectSpread2(_objectSpread2({}, authHeaders), {}, {
              Range: "bytes=0-".concat(CHUNK_SIZE - 1),
              'Accept-Ranges': 'bytes'
            })
          });
          if (!headResponse.ok) {
            throw new Error("\u4E0B\u8F7D\u6587\u4EF6\u5934\u90E8\u5931\u8D25: ".concat(headResponse.status, " ").concat(headResponse.statusText));
          }
          spark.append(await headResponse.arrayBuffer());
          var tailResponse = await fetch(streamUrl, {
            headers: _objectSpread2(_objectSpread2({}, authHeaders), {}, {
              Range: "bytes=".concat(fileSize - CHUNK_SIZE, "-").concat(fileSize - 1),
              'Accept-Ranges': 'bytes'
            })
          });
          if (!tailResponse.ok) {
            throw new Error("\u4E0B\u8F7D\u6587\u4EF6\u5C3E\u90E8\u5931\u8D25: ".concat(tailResponse.status, " ").concat(tailResponse.statusText));
          }
          spark.append(await tailResponse.arrayBuffer());
        }
        var hash = spark.end();
        console.log("[Hash] \u6587\u4EF6\u54C8\u5E0C\u8BA1\u7B97\u6210\u529F: ".concat(hash));
        return hash;
      } catch (error) {
        console.warn('[Hash] 文件哈希计算过程中发生错误:', error);
        return null;
      }
    }

    /**
     * 通过文件哈希尝试匹配
     * @param {string} animeName
     * @param {string} streamUrl
     * @param {number} size
     * @param {number} duration
     * @param {object} apiConfigs
     * @param {string[]} apiPriority
     * @returns {Promise<object|null>}
     */
    async function tryMatchByHash(animeName, streamUrl, size, duration, apiConfigs, apiPriority) {
      var matchPayload = {
        fileName: animeName,
        fileHash: 'a1b2c3d4e5f67890abcd1234ef567890',
        fileSize: size || 0,
        videoDuration: Math.floor(duration || 0),
        matchMode: 'hashAndFileName'
      };
      if (streamUrl && size > 0) {
        console.log("\u51C6\u5907\u901A\u8FC7\u64AD\u653E\u94FE\u63A5\u8BA1\u7B97\u6587\u4EF6\u54C8\u5E0C");
        matchPayload.fileHash = (await calculateFileHash(streamUrl, size)) || matchPayload.fileHash;
      } else {
        console.warn('未找到播放链接或文件大小，将使用假哈希值进行匹配。');
      }
      var _iterator = _createForOfIteratorHelper(apiPriority),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _matchResult$animes, _matchResult$animes2;
          var apiKey = _step.value;
          var config = apiConfigs[apiKey];
          if (!config || !config.enabled || apiKey === 'custom' && !config.prefix) continue;
          console.log("[\u81EA\u52A8\u5339\u914D] \u5C1D\u8BD5 ".concat(config.name, " /match \u63A5\u53E3"));
          var matchResult = await fetchMatchApi(matchPayload, config.prefix);
          if (matchResult !== null && matchResult !== void 0 && matchResult.isMatched && ((_matchResult$animes = matchResult.animes) === null || _matchResult$animes === void 0 ? void 0 : _matchResult$animes.length) > 0) {
            console.log("".concat(config.name, " /match \u63A5\u53E3\u76F4\u63A5\u5339\u914D\u6210\u529F"));
            var match = matchResult.animes[0];
            return {
              directMatch: true,
              apiPrefix: config.prefix,
              apiName: config.name,
              episodeInfo: _objectSpread2(_objectSpread2({}, match), {}, {
                episodes: [{
                  episodeId: match.episodeId,
                  episodeTitle: match.episodeTitle
                }],
                imageUrl: match.imageUrl
              })
            };
          }
          if (matchResult && !matchResult.isMatched && ((_matchResult$animes2 = matchResult.animes) === null || _matchResult$animes2 === void 0 ? void 0 : _matchResult$animes2.length) > 0) {
            console.log("[".concat(config.name, "] /match \u63A5\u53E3\u8FD4\u56DE\u5019\u9009\u5217\u8868\uFF0C\u5C1D\u8BD5\u667A\u80FD\u5339\u914D..."));
            var bestMatch = selectBestMatch(animeName, matchResult.animes);
            if (bestMatch) {
              return {
                directMatch: true,
                apiPrefix: config.prefix,
                apiName: config.name,
                episodeInfo: _objectSpread2(_objectSpread2({}, bestMatch), {}, {
                  episodes: [{
                    episodeId: bestMatch.episodeId,
                    episodeTitle: bestMatch.episodeTitle
                  }],
                  imageUrl: bestMatch.imageUrl
                })
              };
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return null;
    }

    /** 排除特典集（Sn/Cn 开头），返回正片数组 */
    function filterMainEpisodes(episodes) {
      if (!episodes || !Array.isArray(episodes)) return [];
      return episodes.filter(function (ep) {
        return !/^[SC]\d+\s/.test(ep.episodeTitle || '');
      });
    }

    /**
     * 通过 TMDB ID 匹配
     * @param {object} itemInfoMap
     * @param {object} apiConfigs
     * @param {string[]} apiPriority
     * @returns {Promise<object|null>}
     */
    async function tryMatchByTmdbId(itemInfoMap, apiConfigs, apiPriority) {
      var seriesTmdbId = itemInfoMap.seriesTmdbId,
        seasonNumber = itemInfoMap.seasonNumber,
        episodeNumber = itemInfoMap.episodeNumber,
        episode = itemInfoMap.episode;
      if (!seriesTmdbId) return null;
      var _iterator = _createForOfIteratorHelper(apiPriority),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _animaInfo$animes;
          var apiKey = _step.value;
          var config = apiConfigs[apiKey];
          if (!config || !config.enabled || apiKey === 'custom' && !config.prefix) continue;
          var animaInfo = await fetchSearchEpisodesByTmdbId(seriesTmdbId, config.prefix);
          if (!(animaInfo !== null && animaInfo !== void 0 && (_animaInfo$animes = animaInfo.animes) !== null && _animaInfo$animes !== void 0 && _animaInfo$animes.length)) continue;
          var animes = animaInfo.animes;
          if (episode === 'movie') {
            var _firstAnime$episodes;
            var firstAnime = animes[0];
            var mainEps = filterMainEpisodes(firstAnime.episodes);
            var ep = mainEps[0] || ((_firstAnime$episodes = firstAnime.episodes) === null || _firstAnime$episodes === void 0 ? void 0 : _firstAnime$episodes[0]);
            if (ep) {
              console.log("[tmdbId\u5339\u914D] \u7535\u5F71\u5339\u914D\u6210\u529F: ".concat(firstAnime.animeTitle));
              return {
                directMatch: true,
                apiPrefix: config.prefix,
                apiName: config.name,
                episodeInfo: {
                  episodeId: ep.episodeId,
                  episodeTitle: ep.episodeTitle,
                  animeId: firstAnime.animeId,
                  animeTitle: firstAnime.animeTitle,
                  imageUrl: dandanplayApi.posterImg(firstAnime.animeId)
                }
              };
            }
            continue;
          }
          var seasonAnimes = animes.filter(function (a) {
            return ['tvseries', 'tvspecial', 'web'].includes(a.type);
          });
          var ovaAnimes = animes.filter(function (a) {
            return a.type === 'ova';
          });
          var epNum = typeof episodeNumber === 'number' ? episodeNumber : parseInt(episode, 10);
          if (isNaN(epNum) || epNum < 1) continue;
          var season = seasonNumber != null ? seasonNumber : 1;
          var matchedEp = null;
          var matchedAnime = null;
          if (season === 0) {
            var ovaPairs = ovaAnimes.flatMap(function (a) {
              return filterMainEpisodes(a.episodes).map(function (ep) {
                return {
                  anime: a,
                  ep: ep
                };
              });
            });
            var pair = ovaPairs[epNum - 1];
            if (pair) {
              matchedEp = pair.ep;
              matchedAnime = pair.anime;
            }
          } else if (season >= 2) {
            var targetAnime = seasonAnimes[season - 1];
            if (targetAnime) {
              var _mainEps = filterMainEpisodes(targetAnime.episodes);
              matchedEp = _mainEps[epNum - 1];
              matchedAnime = targetAnime;
            }
          } else {
            var acc = 0;
            for (var i = 0; i < seasonAnimes.length; i++) {
              var _mainEps2 = filterMainEpisodes(seasonAnimes[i].episodes);
              var count = _mainEps2.length;
              if (epNum <= acc + count) {
                matchedEp = _mainEps2[epNum - acc - 1];
                matchedAnime = seasonAnimes[i];
                break;
              }
              acc += count;
            }
          }
          if (matchedEp && matchedAnime) {
            console.log("[tmdbId\u5339\u914D] \u5B63\u5EA6\u5267\u96C6\u5339\u914D\u6210\u529F: ".concat(matchedAnime.animeTitle, " - ").concat(matchedEp.episodeTitle));
            return {
              directMatch: true,
              apiPrefix: config.prefix,
              apiName: config.name,
              episodeInfo: {
                episodeId: matchedEp.episodeId,
                episodeTitle: matchedEp.episodeTitle,
                animeId: matchedAnime.animeId,
                animeTitle: matchedAnime.animeTitle,
                imageUrl: dandanplayApi.posterImg(matchedAnime.animeId)
              }
            };
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return null;
    }

    /**
     * 解析 "XXXX SXXEXX" 格式的标题
     * @param {string} animeName
     * @returns {{ title: string, season: number|null, episode: number|null }}
     */
    function parseAnimeName(animeName) {
      var match = animeName.match(/^(.*?)\s*[Ss](\d{1,2})[Ee](\d{1,4})\b/);
      if (match) {
        return {
          title: match[1].replace(/[._]/g, ' ').trim(),
          season: parseInt(match[2], 10),
          episode: parseInt(match[3], 10)
        };
      }
      return {
        title: animeName,
        season: null,
        episode: null
      };
    }

    /**
     * 通过赛季缓存匹配
     * @param {string} _season_key
     * @param {number} episode
     * @param {string} prefix
     * @returns {Promise<object|null>}
     */
    async function lsSeasonSearchEpisodes(_season_key, episode, prefix) {
      var seasonInfoListStr = window.localStorage.getItem(_season_key);
      if (!seasonInfoListStr) return null;
      var seasonInfoList = JSON.parse(seasonInfoListStr);
      var minPositiveDiff = Infinity;
      var selectedSeasonInfo = null;
      for (var i = 0; i < seasonInfoList.length; i++) {
        var seasonInfo = seasonInfoList[i];
        var adjustedEpisode = episode + seasonInfo.episodeOffset;
        if (adjustedEpisode > 0 && adjustedEpisode < minPositiveDiff) {
          minPositiveDiff = adjustedEpisode;
          selectedSeasonInfo = seasonInfo;
        }
      }
      if (selectedSeasonInfo) {
        var newEpisode = episode + selectedSeasonInfo.episodeOffset;
        console.log("\u547D\u4E2DseasonInfo\u7F13\u5B58: ".concat(selectedSeasonInfo.name, ",\u504F\u79FB\u91CF: ").concat(selectedSeasonInfo.episodeOffset, ",\u96C6: ").concat(newEpisode));
        var animaInfo = await fetchSearchEpisodes(selectedSeasonInfo.name, newEpisode, prefix);
        return {
          animaInfo: animaInfo,
          newEpisode: newEpisode
        };
      }
      return null;
    }

    /**
     * 主匹配入口：根据 itemInfoMap 搜索弹幕
     * @param {object} itemInfoMap - 由 getMapByEmbyItemInfo 提供
     * @returns {Promise<object|null>}
     */
    async function searchEpisodes(itemInfoMap) {
      var _apiConfigs$custom$pr, _apiConfigs$currentPr, _animaRes$animaInfo, _animaInfo$animes;
      var _season_key = itemInfoMap._season_key,
        animeName = itemInfoMap.animeName,
        episodeName = itemInfoMap.episodeName,
        episode = itemInfoMap.episode,
        seriesOrMovieId = itemInfoMap.seriesOrMovieId,
        streamUrl = itemInfoMap.streamUrl,
        size = itemInfoMap.size,
        duration = itemInfoMap.duration;
      console.log("[\u81EA\u52A8\u5339\u914D] \u6807\u9898\u540D: ".concat(episodeName) + (episode ? ",\u7AE0\u8282\u8FC7\u6EE4: ".concat(episode) : ''));
      var apiPriority = lsGetItem(lsKeys.apiPriority.id);
      var apiConfigs = {
        official: {
          name: '官方API',
          prefix: corsProxy + 'https://api.dandanplay.net/api/v2',
          enabled: lsGetItem(lsKeys.useOfficialApi.id)
        },
        custom: {
          name: '自定义API',
          prefix: lsGetItem(lsKeys.customApiPrefix.id),
          enabled: lsGetItem(lsKeys.useCustomApi.id)
        }
      };
      var currentPriority = Array.isArray(apiPriority) && apiPriority[0] === 'custom' && apiConfigs.custom.enabled && (_apiConfigs$custom$pr = apiConfigs.custom.prefix) !== null && _apiConfigs$custom$pr !== void 0 && _apiConfigs$custom$pr.trim() ? 'custom' : 'official';
      var selectedApiConfig = apiConfigs[currentPriority].enabled && (_apiConfigs$currentPr = apiConfigs[currentPriority].prefix) !== null && _apiConfigs$currentPr !== void 0 && _apiConfigs$currentPr.trim() ? apiConfigs[currentPriority] : apiConfigs.custom;
      var animaRes = await lsSeasonSearchEpisodes(_season_key, episode, selectedApiConfig.prefix);
      if ((animaRes === null || animaRes === void 0 || (_animaRes$animaInfo = animaRes.animaInfo) === null || _animaRes$animaInfo === void 0 || (_animaRes$animaInfo = _animaRes$animaInfo.animes) === null || _animaRes$animaInfo === void 0 ? void 0 : _animaRes$animaInfo.length) > 0) {
        var bgmEpisodeIndex = animaRes.newEpisode - 1;
        console.log("[\u81EA\u52A8\u5339\u914D] \u547D\u4E2D\u8D5B\u5B63\u7F13\u5B58\uFF0C\u76F4\u63A5\u4F7F\u7528");
        return {
          animeOriginalTitle: '',
          animaInfo: animaRes.animaInfo,
          bgmEpisodeIndex: bgmEpisodeIndex
        };
      }
      var tmdbMatchResult = await tryMatchByTmdbId(itemInfoMap, apiConfigs, apiPriority);
      if (tmdbMatchResult) return tmdbMatchResult;
      var hashMatchResult = await tryMatchByHash(episodeName, streamUrl, size, duration, apiConfigs, apiPriority);
      if (hashMatchResult) return hashMatchResult;
      var _iterator = _createForOfIteratorHelper(apiPriority),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _searchAnimaInfo, _searchAnimaInfo2;
          var apiKey = _step.value;
          var config = apiConfigs[apiKey];
          if (!config || !config.enabled || apiKey === 'custom' && !config.prefix) continue;
          var searchTitle = episodeName;
          var searchEpisode = episode;
          if (apiKey === 'official') {
            var parsed = parseAnimeName(episodeName);
            if (parsed.season !== null) {
              searchTitle = parsed.season === 1 ? parsed.title : "".concat(parsed.title, " \u7B2C").concat(parsed.season, "\u5B63");
              searchEpisode = parsed.episode;
              console.log("[\u81EA\u52A8\u5339\u914D][\u5B98\u65B9API\u4F18\u5316] \u683C\u5F0F\u5316\u641C\u7D22: \u6807\u9898='".concat(searchTitle, "', \u96C6\u6570=").concat(searchEpisode));
            }
          }
          var searchAnimaInfo = await fetchSearchEpisodes(searchTitle, searchEpisode, config.prefix);
          if (((_searchAnimaInfo = searchAnimaInfo) === null || _searchAnimaInfo === void 0 || (_searchAnimaInfo = _searchAnimaInfo.animes) === null || _searchAnimaInfo === void 0 ? void 0 : _searchAnimaInfo.length) > 0) {
            return {
              animaInfo: searchAnimaInfo,
              apiPrefix: config.prefix
            };
          }
          searchAnimaInfo = await fetchSearchEpisodes(episodeName, null, config.prefix);
          if (((_searchAnimaInfo2 = searchAnimaInfo) === null || _searchAnimaInfo2 === void 0 || (_searchAnimaInfo2 = _searchAnimaInfo2.animes) === null || _searchAnimaInfo2 === void 0 ? void 0 : _searchAnimaInfo2.length) > 0) {
            return {
              animaInfo: searchAnimaInfo,
              apiPrefix: config.prefix
            };
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var animaInfo = await fetchSearchEpisodes(animeName, episode, selectedApiConfig.prefix);
      if ((animaInfo === null || animaInfo === void 0 || (_animaInfo$animes = animaInfo.animes) === null || _animaInfo$animes === void 0 ? void 0 : _animaInfo$animes.length) > 0) {
        return {
          animeOriginalTitle: '',
          animaInfo: animaInfo
        };
      }
      return autoFailback(animeName, episode, seriesOrMovieId, selectedApiConfig.prefix);
    }

    /**
     * 图标、样式、类名配置
     * 从 ede.js 迁移，未修改原有实现逻辑
     */

    // emby ui class
    var classes = {
      dialogContainer: 'dialogContainer',
      dialogBackdropOpened: 'dialogBackdropOpened',
      dialogBlur: 'dialog-blur',
      // Emby Theater (魔改版)上的毛玻璃背景
      dialog: 'dialog',
      formDialogHeader: 'formDialogHeader',
      formDialogFooter: 'formDialogFooter',
      formDialogFooterItem: 'formDialogFooterItem',
      dialogFullscreen: 'dialog-fullscreen',
      dialogFullscreenLowres: 'dialog-fullscreen-lowres',
      // Emby Android (魔改版)特殊全屏
      videoOsdTitle: 'videoOsdTitle',
      // 播放页媒体次级标题
      videoOsdBottomButtons: 'videoOsdBottom-buttons',
      // 新老客户端播放页通用的底部按钮,但在 TV 下是 hide
      videoOsdBottomButtonsTopRight: 'videoOsdBottom-buttons-topright',
      // 新客户端播放页右上方的按钮
      videoOsdBottomButtonsRight: 'videoOsdBottom-buttons-right',
      // 老客户端上的右侧按钮
      videoOsdPositionSliderContainer: 'videoOsdPositionSliderContainer',
      cardImageIcon: 'cardImageIcon',
      headerRight: 'headerRight',
      headerUserButton: 'headerUserButton',
      mdlSpinner: 'mdl-spinner',
      collapseContentNav: 'collapseContent navDrawerCollapseContent',
      embyLabel: 'inputLabel',
      embyInput: 'emby-input emby-input-smaller',
      embySelectWrapper: 'emby-select-wrapper',
      embySelectTv: 'emby-select-tv',
      // highlight on tv layout
      embyCheckboxList: 'checkboxList',
      embyFieldDesc: 'fieldDescription',
      embyTabsMenu: 'headerMiddle headerSection sectionTabs headerMiddle-withSectionTabs',
      embyTabsDiv1: 'tabs-viewmenubar tabs-viewmenubar-backgroundcontainer focusable scrollX hiddenScrollX smoothScrollX scrollFrameX emby-tabs',
      embyTabsDiv2: 'tabs-viewmenubar-slider emby-tabs-slider padded-left padded-right nohoverfocus scrollSliderX',
      embyTabsButton: 'emby-button secondaryText emby-tab-button main-tab-button',
      embyButtons: {
        basic: 'raised emby-button',
        submit: 'button-submit',
        help: 'button-help',
        link: 'button-link',
        iconButton: 'flex-shrink-zero paper-icon-button-light'
      }
    };
    var styles = {
      embyCheckboxList: 'display: flex;flex-wrap: wrap;',
      embySliderList: 'display: flex;flex-direction: column;justify-content: center;align-items: center;',
      embySlider: 'display: flex; align-items: center; margin-bottom: 0.3em;',
      embySliderLabel: 'width: 4em; margin-left: 1em;',
      rightLayout: 'position: fixed; right: 0; width: 40%; min-width: auto; min-height: auto; max-width: 100%; max-height: 100%;',
      colors: {
        info: 0xffffff,
        // 白色
        success: 0x00ff00,
        // 绿色
        warn: 0xffff00,
        // 黄色
        error: 0xff0000,
        // 红色
        highlight: 'rgba(115, 160, 255, 0.3)',
        // 尽量接近浏览器控制台选定元素的淡蓝色背景色
        switchActiveColor: '#52b54b'
      },
      fontStyles: [{
        id: 'normal',
        name: '正常'
      }, {
        id: 'italic',
        name: '原生斜体'
      }, {
        id: 'oblique',
        name: '形变斜体'
      }]
    };

    /**
     * 选项配置（弹幕类型、来源、列表等）
     * 从 ede.js 迁移，未修改原有实现逻辑
     */
    var currentDanmakuInfoContainerId = 'danmakuTab2';

    // 弹幕类型过滤
    var danmakuTypeFilterOpts = {
      bottom: {
        id: 'bottom',
        name: '底部弹幕'
      },
      top: {
        id: 'top',
        name: '顶部弹幕'
      },
      ltr: {
        id: 'ltr',
        name: '从左至右'
      },
      rtl: {
        id: 'rtl',
        name: '从右至左'
      },
      rolling: {
        id: 'rolling',
        name: '滚动弹幕'
      },
      onlyWhite: {
        id: 'onlyWhite',
        name: '彩色弹幕'
      },
      emoji: {
        id: 'emoji',
        name: 'emoji'
      }
    };
    var danmakuSource = {
      AcFun: {
        id: 'AcFun',
        name: 'A站(AcFun)'
      },
      BiliBili: {
        id: 'BiliBili',
        name: 'B站(BiliBili)'
      },
      DanDanPlay: {
        id: 'DanDanPlay',
        name: '弹弹(DanDanPlay)'
      },
      // 无弹幕来源的默认值
      D: {
        id: 'D',
        name: 'D'
      },
      // 未知平台
      Gamer: {
        id: 'Gamer',
        name: '巴哈(Gamer)'
      },
      iqiyi: {
        id: 'iqiyi',
        name: '爱奇艺(iqiyi)'
      },
      QQ: {
        id: 'QQ',
        name: '腾讯视频(QQ)'
      },
      Youku: {
        id: 'Youku',
        name: '优酷(Youku)'
      },
      '5dm': {
        id: '5dm',
        name: 'D站(5dm)'
      },
      '异世界动漫': {
        id: '异世界动漫',
        name: '异世界动漫'
      }
    };
    var showSource = {
      source: {
        id: 'source',
        name: '来源平台'
      },
      originalUserId: {
        id: 'originalUserId',
        name: '用户ID'
      },
      cid: {
        id: 'cid',
        name: '弹幕CID'
      } // 非弹幕 id,唯一性需自行用 uid + cid 拼接的 cuid
    };
    var toastPrefixes = {
      system: '[系统通知] : '
    };

    /** 过滤弹幕类型 */
    function danmakuTypeFilter(comments) {
      var idArray = lsGetItem(lsKeys.typeFilter.id) || [];
      var _comments = _toConsumableArray(comments);
      if (idArray.includes(danmakuTypeFilterOpts.onlyWhite.id)) {
        _comments = _comments.filter(function (c) {
          var _c$style;
          return '#ffffff' === (((_c$style = c.style) === null || _c$style === void 0 ? void 0 : _c$style.color) || '').toLowerCase().slice(0, 7);
        });
        idArray = idArray.filter(function (id) {
          return id !== danmakuTypeFilterOpts.onlyWhite.id;
        });
      }
      if (idArray.includes(danmakuTypeFilterOpts.rolling.id)) {
        _comments = _comments.filter(function (c) {
          return danmakuTypeFilterOpts.ltr.id !== c.mode && danmakuTypeFilterOpts.rtl.id !== c.mode;
        });
        idArray = idArray.filter(function (id) {
          return id !== danmakuTypeFilterOpts.rolling.id;
        });
      }
      if (idArray.includes(danmakuTypeFilterOpts.emoji.id)) {
        _comments = _comments.filter(function (c) {
          return !emojiRegex.test(c.text || '');
        });
        idArray = idArray.filter(function (id) {
          return id !== danmakuTypeFilterOpts.emoji.id;
        });
      }
      if (idArray.length > 0) {
        _comments = _comments.filter(function (c) {
          return !idArray.includes(c.mode);
        });
      }
      return _comments;
    }

    /** 过滤弹幕来源平台 */
    function danmakuSourceFilter(comments) {
      var sourceFilter = lsGetItem(lsKeys.sourceFilter.id) || [];
      return comments.filter(function (c) {
        return !sourceFilter.includes(c.source);
      });
    }

    /** 过滤弹幕密度等级 */
    function danmakuDensityLevelFilter(comments) {
      var level = lsGetItem(lsKeys.filterLevel.id);
      if (level === 0) return comments;
      var limit = 9 - level * 2;
      var vertical_limit = 6;
      var arr_comments = [];
      var vertical_comments = [];
      for (var index = 0; index < comments.length; index++) {
        var element = _objectSpread2({}, comments[index]);
        var i = Math.ceil(element.time);
        var i_v = Math.ceil(element.time / 3);
        if (!arr_comments[i]) arr_comments[i] = [];
        if (!vertical_comments[i_v]) vertical_comments[i_v] = [];
        if (vertical_comments[i_v].length < vertical_limit) {
          vertical_comments[i_v].push(element);
        } else {
          element.mode = 'rtl';
        }
        if (arr_comments[i].length < limit) {
          arr_comments[i].push(element);
        }
      }
      return arr_comments.flat();
    }

    /** 通过屏蔽关键词过滤弹幕 */
    function danmakuKeywordsFilter(comments) {
      if (!lsGetItem(lsKeys.filterKeywordsEnable.id)) return comments;
      var keywords = (lsGetItem(lsKeys.filterKeywords.id) || '').split(/\r?\n/).map(function (k) {
        return k.trim();
      }).filter(function (k) {
        return k.length > 0 && !k.startsWith('// ');
      });
      if (keywords.length === 0) return comments;
      var cKeys = ['text'].concat(_toConsumableArray(Object.keys(showSource)));
      return comments.filter(function (comment) {
        return !keywords.some(function (keyword) {
          try {
            return cKeys.some(function (key) {
              return new RegExp(keyword).test(comment[key] || '');
            });
          } catch (error) {
            return cKeys.some(function (key) {
              return (comment[key] || '').includes(keyword);
            });
          }
        });
      });
    }

    /** 相似弹幕合并 */
    function danmakuMergeSimilar(comments) {
      var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
      var timeWindow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 15;
      if (!lsGetItem(lsKeys.mergeSimilarEnable.id)) return comments;
      var mergedComments = [];
      var mergedIndexes = [];
      var startTime = Date.now();
      for (var i = 0; i < comments.length; i++) {
        if (mergedIndexes.includes(i)) continue;
        var mergedComment = _objectSpread2({}, comments[i]);
        var count = 1;
        var totalSimilarity = 0;
        for (var j = i + 1; j < comments.length && Math.abs(comments[j].time - comments[i].time) <= timeWindow; j++) {
          if (mergedIndexes.includes(j)) continue;
          var sim = similarityPercentage(mergedComment.text || '', comments[j].text || '');
          if (sim >= threshold) {
            count++;
            mergedIndexes.push(j);
            totalSimilarity += sim;
          }
        }
        if (count > 1) {
          mergedComment.text = (mergedComment.text || '') + " [x".concat(count, "]");
          mergedComment.xCount = count;
          mergedComment.xTotalSimilarity = totalSimilarity / count;
        }
        mergedComments.push(mergedComment);
      }
      console.log("danmakuMergeSimilar \u8017\u65F6: ".concat(Date.now() - startTime, " \u6BEB\u79D2"));
      return mergedComments;
    }

    /** 自动过滤（弹幕数超阈值时调整设置） */
    function danmakuAutoFilter(comments) {
      var _window$ede, _window$ede2, _window$ede3;
      var autoFilterCount = lsGetItem(lsKeys.autoFilterCount.id);
      if (autoFilterCount === 0 || comments.length < autoFilterCount) {
        return danmakuAutoFilterCancel();
      }
      var msg = "\u68C0\u6D4B\u5230 ".concat(comments.length, " \u6761\u5F39\u5E55 > ").concat(lsKeys.autoFilterCount.name, ":").concat(autoFilterCount, ",\u51C6\u5907\u5F00\u59CB\u81EA\u52A8\u8FC7\u6EE4(\u5355\u96C6\u6709\u6548)");
      var initMsgLength = msg.length;
      var heightPercent = lsGetItem(lsKeys.heightPercent.id);
      if (heightPercent > 90 && ((_window$ede = window.ede) === null || _window$ede === void 0 ? void 0 : _window$ede.tempLsValues) !== undefined) {
        window.ede.tempLsValues[lsKeys.heightPercent.id] = heightPercent;
        lsSetItem(lsKeys.heightPercent.id, 90);
        msg += "\n\u5DF2\u81EA\u52A8\u8C03\u6574 ".concat(lsKeys.heightPercent.name, ":90");
      }
      var typeFilter = lsGetItem(lsKeys.typeFilter.id) || [];
      if (!typeFilter.includes(danmakuTypeFilterOpts.bottom.id) && ((_window$ede2 = window.ede) === null || _window$ede2 === void 0 ? void 0 : _window$ede2.tempLsValues) !== undefined) {
        window.ede.tempLsValues[lsKeys.typeFilter.id] = typeFilter;
        lsSetItem(lsKeys.typeFilter.id, [].concat(_toConsumableArray(typeFilter), [danmakuTypeFilterOpts.bottom.id]));
        msg += "\n\u5DF2\u81EA\u52A8\u6DFB\u52A0 ".concat(lsKeys.typeFilter.name, ":").concat(danmakuTypeFilterOpts.bottom.name);
      }
      var mergeSimilarEnable = lsGetItem(lsKeys.mergeSimilarEnable.id);
      if (!mergeSimilarEnable && ((_window$ede3 = window.ede) === null || _window$ede3 === void 0 ? void 0 : _window$ede3.tempLsValues) !== undefined) {
        window.ede.tempLsValues[lsKeys.mergeSimilarEnable.id] = mergeSimilarEnable;
        lsSetItem(lsKeys.mergeSimilarEnable.id, true);
        msg += "\n\u5DF2\u81EA\u52A8\u8C03\u6574 ".concat(lsKeys.mergeSimilarEnable.name, ":true");
      }
      if (msg.length !== initMsgLength) {
        console.log(msg);
        if (typeof window.embyToast === 'function') window.embyToast({
          text: msg
        });
      }
    }

    /** 取消自动过滤，恢复用户设置 */
    function danmakuAutoFilterCancel() {
      var _window$ede4;
      if ((_window$ede4 = window.ede) !== null && _window$ede4 !== void 0 && _window$ede4.tempLsValues && Object.keys(window.ede.tempLsValues).length > 0) {
        objectEntries(window.ede.tempLsValues).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            val = _ref2[1];
          return lsSetItem(key, val);
        });
        window.ede.tempLsValues = {};
        console.log('从临时值恢复用户值并重置');
      }
    }

    /** 组合所有过滤 */
    function danmakuFilter(comments) {
      var _comments = _toConsumableArray(comments);
      danmakuAutoFilter(_comments);
      _comments = danmakuTypeFilter(_comments);
      _comments = danmakuSourceFilter(_comments);
      _comments = danmakuDensityLevelFilter(_comments);
      _comments = danmakuKeywordsFilter(_comments);
      _comments = danmakuMergeSimilar(_comments, lsGetItem(lsKeys.mergeSimilarPercent.id), lsGetItem(lsKeys.mergeSimilarTime.id));
      return _comments;
    }

    /**
     * 解析弹幕数据为引擎格式
     * @param {object[]} $obj - 原始弹幕数组 { p, m, cid }
     * @returns {object[]}
     */
    function danmakuParser($obj) {
      var _styles$fontStyles$ls;
      var fontSizeRate = lsGetItem(lsKeys.fontSizeRate.id);
      var fontSize = 25;
      var fontSizeReferent = getByClass(classes.videoOsdTitle);
      if (fontSizeReferent) {
        fontSize = parseFloat(getComputedStyle(fontSizeReferent).fontSize.replace('px', '')) * fontSizeRate;
      } else {
        fontSize = Math.round((window.screen.height > window.screen.width ? window.screen.width : window.screen.height) / 1080 * 18 * fontSizeRate);
      }
      var fontWeight = lsGetItem(lsKeys.fontWeight.id);
      var fontStyle = ((_styles$fontStyles$ls = styles.fontStyles[lsGetItem(lsKeys.fontStyle.id)]) === null || _styles$fontStyles$ls === void 0 ? void 0 : _styles$fontStyles$ls.id) || 'normal';
      var fontFamily = lsGetItem(lsKeys.fontFamily.id);
      var fontOpacity = Math.round(lsGetItem(lsKeys.fontOpacity.id) * 255).toString(16).padStart(2, '0');
      var timelineOffset = lsGetItem(lsKeys.timelineOffset.id);
      var sourceUidReg = /\[(.*)\](.*)/;
      var showSourceIds = lsGetItem(lsKeys.showSource.id) || [];
      return $obj.map(function ($comment) {
        var _values$, _danmakuSource$DanDan;
        var p = $comment.p;
        var values = p.split(',');
        var mode = {
          6: 'ltr',
          1: 'rtl',
          5: 'top',
          4: 'bottom'
        }[values[1]];
        if (!mode) return null;
        var baseColor = Number(values[2]).toString(16).padStart(6, '0');
        var color = "".concat(baseColor).concat(fontOpacity);
        var shadowColor = baseColor === '000000' ? "#ffffff".concat(fontOpacity) : "#000000".concat(fontOpacity);
        var sourceUidMatches = (_values$ = values[3]) === null || _values$ === void 0 ? void 0 : _values$.match(sourceUidReg);
        var sourceId = sourceUidMatches !== null && sourceUidMatches !== void 0 && sourceUidMatches[1] ? sourceUidMatches[1] : ((_danmakuSource$DanDan = danmakuSource.DanDanPlay) === null || _danmakuSource$DanDan === void 0 ? void 0 : _danmakuSource$DanDan.id) || 'DanDanPlay';
        var originalUserId = sourceUidMatches !== null && sourceUidMatches !== void 0 && sourceUidMatches[2] ? sourceUidMatches[2] : values[3];
        var cmt = _defineProperty(_defineProperty(_defineProperty({
          text: $comment.m,
          mode: mode,
          time: values[0] * 1 + timelineOffset,
          style: getCommentStyle(color, shadowColor, fontStyle, fontWeight, fontSize, fontFamily)
        }, showSource.cid.id, $comment.cid), showSource.source.id, sourceId), showSource.originalUserId.id, originalUserId);
        if (showSourceIds.length > 0) {
          cmt.originalText = cmt.text;
          cmt.text += showSourceIds.map(function (id) {
            return id === showSource.source.id ? ",[".concat(cmt[id], "]") : ',' + cmt[id];
          }).join('');
        }
        cmt.cuid = cmt[showSource.cid.id] + ',' + cmt[showSource.originalUserId.id];
        return cmt;
      }).filter(function (x) {
        return x;
      }).sort(function (a, b) {
        return a.time - b.time;
      });
    }

    /**
     * 获取弹幕样式对象
     */
    function getCommentStyle(color, shadowColor, fontStyle, fontWeight, fontSize, fontFamily) {
      return {
        color: "#".concat(color),
        textShadow: "-1px -1px ".concat(shadowColor, ", -1px 1px ").concat(shadowColor, ", 1px -1px ").concat(shadowColor, ", 1px 1px ").concat(shadowColor),
        font: "".concat(fontStyle, " ").concat(fontWeight, " ").concat(fontSize, "px ").concat(fontFamily),
        fillStyle: "#".concat(color),
        strokeStyle: shadowColor,
        lineWidth: 2.0
      };
    }

    /**
     * 在进度条上绘制弹幕密度折线图
     * @param {number} chartHeightNum
     */
    function buildProgressBarChart(chartHeightNum) {
      var _window$ede, _OS$isEmbyNoisyX;
      var chartEle = getById(eleIds.progressBarLineChart);
      if (chartEle) chartEle.remove();
      if (!((_window$ede = window.ede) !== null && _window$ede !== void 0 && _window$ede.danmaku)) return;
      var osdLineChartSkipFilter = lsGetItem(lsKeys.osdLineChartSkipFilter.id);
      var comments = osdLineChartSkipFilter ? window.ede.commentsParsed : window.ede.danmaku.comments;
      var container = getByClass(classes.videoOsdPositionSliderContainer);
      if (!(comments !== null && comments !== void 0 && comments.length) || !container) return;
      var progressBarWidth = container.offsetWidth;
      var timeStep = lsGetItem(lsKeys.osdLineChartTime.id);
      var maxTime = Math.max.apply(Math, _toConsumableArray(comments.map(function (c) {
        return c.time;
      })));
      var timeCounts = Array.from({
        length: Math.ceil(maxTime / timeStep)
      }, function () {
        return 0;
      });
      comments.forEach(function (c) {
        var index = Math.floor(c.time / timeStep);
        if (index < timeCounts.length) timeCounts[index]++;
      });
      var bulletChartCanvas = document.createElement('canvas');
      bulletChartCanvas.id = eleIds.progressBarLineChart;
      bulletChartCanvas.width = progressBarWidth;
      bulletChartCanvas.height = chartHeightNum;
      bulletChartCanvas.style.position = 'absolute';
      bulletChartCanvas.style.top = (_OS$isEmbyNoisyX = OS.isEmbyNoisyX) !== null && _OS$isEmbyNoisyX !== void 0 && _OS$isEmbyNoisyX.call(OS) ? '-24px' : '-21px';
      container.prepend(bulletChartCanvas);
      var ctx = bulletChartCanvas.getContext('2d');
      var maxY = Math.max.apply(Math, timeCounts.concat([1]));
      var scale = chartHeightNum / maxY;
      ctx.clearRect(0, 0, progressBarWidth, chartHeightNum);
      ctx.beginPath();
      ctx.moveTo(0, chartHeightNum - (timeCounts[0] || 0) * scale);
      for (var i = 1; i < timeCounts.length; i++) {
        var x = i / Math.max(timeCounts.length - 1, 1) * progressBarWidth;
        var y = chartHeightNum - timeCounts[i] * scale;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    /**
     * 弹幕内 Toast 通知
     * 通过弹幕引擎 emit 显示系统通知
     */

    /**
     * 通过弹幕引擎发送 Toast 消息
     * @param {string} text
     * @param {string} type - 'info'|'success'|'warn'|'error'
     */
    function toastByDanmaku(text) {
      var _window$ede, _styles$colors$type, _styles$colors;
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
      text = toastPrefixes.system + text;
      var videoEl = document.querySelector(mediaQueryStr);
      if (!videoEl || !((_window$ede = window.ede) !== null && _window$ede !== void 0 && _window$ede.danmaku)) return;
      var fontSizeReferent = getByClass(classes.videoOsdTitle);
      var fontSize = fontSizeReferent ? parseFloat(getComputedStyle(fontSizeReferent).fontSize.replace('px', '')) * 1.5 : 24;
      var color = (_styles$colors$type = (_styles$colors = styles.colors) === null || _styles$colors === void 0 ? void 0 : _styles$colors[type]) !== null && _styles$colors$type !== void 0 ? _styles$colors$type : 0xffffff;
      var colorStr = "000000".concat(color.toString(16), "ff").slice(-8);
      var mode = 'top';
      var comment = {
        text: text,
        mode: mode,
        time: videoEl.currentTime,
        style: {
          fontSize: "".concat(fontSize, "px"),
          color: "#".concat(colorStr),
          textShadow: colorStr === '00000000' ? '-1px -1px #fff, -1px 1px #fff, 1px -1px #fff, 1px 1px #fff' : '-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000',
          font: "".concat(fontSize, "px sans-serif"),
          fillStyle: "#".concat(colorStr),
          strokeStyle: colorStr === '00000000' ? '#ffffffff' : '#000000ff',
          lineWidth: 2.0
        }
      };
      window.ede.danmaku.emit(comment);
    }

    /**
     * 弹幕加载与创建
     * 依赖运行时: window.Danmaku, window.ede, mediaContainerQueryStr
     */

    /**
     * 创建并初始化弹幕实例
     * @param {object[]} comments - 原始弹幕数据
     * @param {object} [hooks] - 可选回调 { buildCurrentDanmakuInfo, appendvideoOsdDanmakuInfo }
     * @returns {Promise<void>}
     */
    async function createDanmaku(comments) {
      var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!comments) return;
      var buildCurrentDanmakuInfo = hooks.buildCurrentDanmakuInfo || function () {};
      var appendvideoOsdDanmakuInfo = hooks.appendvideoOsdDanmakuInfo || function () {};
      if (window.ede.danmaku) {
        window.ede.danmaku.destroy();
        window.ede.danmaku = null;
      }
      window.ede.commentsOriginal = comments;
      var commentsParsed = danmakuParser(comments);
      window.ede.commentsParsed = commentsParsed;
      var _comments = danmakuFilter(commentsParsed);
      console.log('[加载]弹幕成功: ' + _comments.length);
      var _media = document.querySelector(mediaQueryStr);
      if (!_media) {
        if (!window.ede.danmaku) {
          window.ede.danmaku = {
            comments: _comments
          };
        }
        buildCurrentDanmakuInfo(currentDanmakuInfoContainerId);
        throw new Error('用户已退出视频播放');
      }
      _media.style.position = 'absolute';
      var wrapperTop = 0;
      var wrapper = getById(eleIds.danmakuWrapper);
      if (wrapper) wrapper.remove();
      wrapper = document.createElement('div');
      wrapper.id = eleIds.danmakuWrapper;
      wrapper.style.cssText = "\n        position: fixed;\n        width: 100%;\n        height: calc(".concat(lsGetItem(lsKeys.heightPercent.id), "% - ").concat(wrapperTop, "px);\n        background-color: ").concat(lsGetItem(lsKeys.debugShowDanmakuWrapper.id) ? 'rgba(115, 160, 255, 0.3)' : '', ";\n        top: ").concat(wrapperTop, "px;\n        pointer-events: none;\n    ");
      var _container = await waitForElement(mediaContainerQueryStr);
      _container.prepend(wrapper);
      var _speed = 144 * lsGetItem(lsKeys.speed.id);
      var DanmakuClass = window.Danmaku;
      if (!DanmakuClass) {
        throw new Error('Danmaku 引擎未加载');
      }
      window.ede.danmaku = new DanmakuClass({
        container: wrapper,
        media: _media,
        comments: _comments,
        engine: lsGetItem(lsKeys.engine.id),
        speed: _speed
      });
      lsGetItem(lsKeys.switch.id) ? window.ede.danmaku.show() : window.ede.danmaku.hide();
      if (window.ede.ob) {
        window.ede.ob.disconnect();
      }
      window.ede.ob = new ResizeObserver(function () {
        if (window.ede.danmaku) {
          window.ede.danmaku.resize();
          if (lsGetItem(lsKeys.osdLineChartEnable.id)) {
            buildProgressBarChart(20);
          }
        }
      });
      window.ede.ob.observe(_container);
      if (_media.id) {
        if (typeof require === 'function') {
          require(['playbackManager'], function (playbackManager) {
            var _playbackManager$getP;
            if (playbackManager !== null && playbackManager !== void 0 && playbackManager.getCurrentPlayer() && (_playbackManager$getP = playbackManager.getPlayerState()) !== null && _playbackManager$getP !== void 0 && (_playbackManager$getP = _playbackManager$getP.PlayState) !== null && _playbackManager$getP !== void 0 && _playbackManager$getP.IsPaused) {
              _media.dispatchEvent(new Event('pause'));
            }
          });
        }
      }
      buildCurrentDanmakuInfo(currentDanmakuInfoContainerId);
      appendvideoOsdDanmakuInfo(_comments.length);
      if (lsGetItem(lsKeys.osdLineChartEnable.id)) {
        buildProgressBarChart(20);
      }
    }

    /**
     * EDE 模块化入口（占位）
     * 阶段 0-2 占位，阶段 3 已引入 match、danmaku
     */
    (async function () {

      window.ede = new EDE();
      console.log('[EDE] modular placeholder', {
        check_interval: check_interval,
        LOAD_TYPE: LOAD_TYPE,
        eleIds: Object.keys(eleIds).length,
        lsKeys: Object.keys(lsKeys).length,
        lsLocalKeys: Object.keys(lsLocalKeys).length,
        EDE: !!window.ede,
        match: {
          searchEpisodes: searchEpisodes,
          fetchSearchEpisodes: fetchSearchEpisodes
        },
        danmaku: {
          createDanmaku: createDanmaku,
          danmakuFilter: danmakuFilter,
          danmakuParser: danmakuParser,
          toastByDanmaku: toastByDanmaku
        }
      });
    })();

})();
//# sourceMappingURL=ede.js.map
