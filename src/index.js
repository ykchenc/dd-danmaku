/**
 * EDE 模块化入口（占位）
 * 阶段 0-4 占位，已引入 config、core、utils、match、danmaku、bangumi、ui
 */
import { check_interval, LOAD_TYPE } from './config/constants.js';
import { eleIds } from './config/ele-ids.js';
import { lsLocalKeys } from './config/ls-local-keys.js';
import { lsKeys, lsGetItem } from './config/api.js';
import { EDE, AppLogAspect, destroyAllInterval } from './core/index.js';
import { objectEntries, getById, getByClass, waitForElement, fetchJson, OS } from './utils/index.js';
import { lsSetItem, lsBatchSet } from './core/storage.js';
import { searchEpisodes, fetchSearchEpisodes } from './match/index.js';
import { createDanmaku, danmakuFilter, danmakuParser, toastByDanmaku } from './danmaku/index.js';
import { getEpisodeBangumiRel, putBangumiEpStatus, renderBangumiCharacters, fetchBangumiApiGetMe } from './bangumi/index.js';
import {
    embyButton,
    embyImg,
    embyImgButton,
    embyTabs,
    embySlider,
} from './ui/components/index.js';
import { createDialog, embyDialog, closeEmbyDialog, embyAlert, embyToast } from './ui/index.js';

(async function () {
    'use strict';
    window.ede = new EDE();
    console.log('[EDE] modular placeholder', {
        check_interval,
        LOAD_TYPE,
        eleIds: Object.keys(eleIds).length,
        lsKeys: Object.keys(lsKeys).length,
        lsLocalKeys: Object.keys(lsLocalKeys).length,
        EDE: !!window.ede,
        match: { searchEpisodes, fetchSearchEpisodes },
        danmaku: { createDanmaku, danmakuFilter, danmakuParser, toastByDanmaku },
        bangumi: { getEpisodeBangumiRel, putBangumiEpStatus, renderBangumiCharacters, fetchBangumiApiGetMe },
        ui: { embyButton, embyImg, embyImgButton, embyTabs, embySlider, createDialog, embyDialog, closeEmbyDialog, embyAlert, embyToast },
    });
})();
