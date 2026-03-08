/**
 * 手动匹配 Tab
 * 从 ede.js 迁移，占位实现，待阶段 5 事件整合后补全
 */

import { getById } from '../components/common.js';
import { embyInput, embyButton } from '../components/index.js';
import { eleIds } from '../../config/ele-ids.js';
import { classes } from '../../config/icons.js';
import { iconKeys } from '../../config/icons.js';

/**
 * 构建手动匹配 Tab
 * @param {string} containerId
 */
export function buildSearchEpisode(containerId) {
    const container = getById(containerId);
    if (!container) return;

    const template = `
        <div>
            <div>
                <label class="${classes.embyLabel}">标题: </label>
                <div id="${eleIds.danmakuSearchNameDiv}" style="display: flex;"></div>
            </div>
        </div>
    `;
    container.innerHTML = template.trim();

    const searchNameDiv = getById(eleIds.danmakuSearchNameDiv, container);
    searchNameDiv.append(
        embyInput({
            id: eleIds.danmakuSearchName,
            value: window.ede?.searchDanmakuOpts?.animeName || '',
            type: 'search',
        })
    );
    searchNameDiv.append(embyButton({ label: '搜索', iconKey: iconKeys.search }, () => {}));
}
