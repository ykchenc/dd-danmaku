/**
 * 自定义 URL 配置（从 localStorage 应用用户设置）
 */

import { lsGetItem, lsKeys } from './api.js';
import { eleIds } from './ele-ids.js';
import { openSourceLicense } from './api.js';
import * as userConfig from '../user-config.js';

export const customeUrl = {
    init: () => {
        const danmakuUrl = lsGetItem(lsKeys.customeDanmakuUrl.id);
        if (danmakuUrl && userConfig.setRequireDanmakuPath) {
            userConfig.setRequireDanmakuPath(danmakuUrl);
        }
        const corsUrl = lsGetItem(lsKeys.customeCorsProxyUrl.id);
        if (corsUrl && userConfig.setCorsProxy) {
            userConfig.setCorsProxy(corsUrl);
        }
    },
};
