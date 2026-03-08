/**
 * EDE 模块化入口（占位）
 * 阶段 0-2 占位文件，已引入 config、core、utils
 */
import { check_interval, LOAD_TYPE } from './config/constants.js';
import { eleIds } from './config/ele-ids.js';
import { lsLocalKeys } from './config/ls-local-keys.js';
import { lsKeys, lsGetItem } from './config/api.js';
import { EDE, AppLogAspect, destroyAllInterval } from './core/index.js';
import { objectEntries, getById, getByClass, waitForElement, fetchJson, OS } from './utils/index.js';
import { lsSetItem, lsBatchSet } from './core/storage.js';

(async function () {
    'use strict';
    // 初始化全局 ede 实例
    window.ede = new EDE();
    console.log('[EDE] modular placeholder', {
        check_interval,
        LOAD_TYPE,
        eleIds: Object.keys(eleIds).length,
        lsKeys: Object.keys(lsKeys).length,
        lsLocalKeys: Object.keys(lsLocalKeys).length,
        EDE: !!window.ede,
        utils: { objectEntries, getById, getByClass, waitForElement, fetchJson, OS },
        storage: { lsSetItem, lsBatchSet },
        core: { AppLogAspect, destroyAllInterval },
    });
})();
