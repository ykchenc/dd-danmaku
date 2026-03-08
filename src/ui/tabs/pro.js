/**
 * 高级设置 Tab
 * 从 ede.js 迁移，占位实现，待阶段 5 事件整合后补全
 */

import { getById } from '../components/common.js';
import { eleIds } from '../../config/ele-ids.js';
import { classes } from '../../config/icons.js';

/**
 * 构建高级设置 Tab
 * @param {string} containerId
 */
export function buildProSetting(containerId) {
    const container = getById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div style="height: 30em;">
            <div is="emby-collapse" title="弹幕屏蔽" data-expanded="true">
                <div class="${classes.collapseContentNav}">
                    <div id="${eleIds.danmakuTypeFilterDiv}"></div>
                </div>
            </div>
        </div>
    `;
}
