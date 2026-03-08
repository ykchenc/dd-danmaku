/**
 * 弹幕设置 Tab
 * 从 ede.js 迁移，占位实现，待阶段 5 事件整合后补全
 */

import { getById } from '../components/common.js';
import { embyButton, embySlider } from '../components/index.js';
import { eleIds } from '../../config/ele-ids.js';
import { lsKeys, lsGetItem } from '../../config/api.js';
import { classes, styles, iconKeys } from '../../config/icons.js';
import { lsSetItem } from '../../core/storage.js';

/**
 * 构建弹幕设置 Tab
 * @param {string} containerId
 */
export function buildDanmakuSetting(containerId) {
    const container = getById(containerId);
    if (!container) return;

    const template = `
        <div style="display: flex; justify-content: center;">
            <div>
                <div id="${eleIds.danmakuSwitchDiv}" style="margin-bottom: 0.2em;">
                    <label class="${classes.embyLabel}">${lsKeys.switch.name} </label>
                </div>
                <div style="${styles.embySlider}">
                    <label class="${classes.embyLabel}" style="width: 5em;">${lsKeys.filterLevel.name}: </label>
                    <div id="${eleIds.filterLevelDiv}" style="width: 15.5em; text-align: center;"></div>
                    <label style="${styles.embySliderLabel}"></label>
                </div>
                <div id="${eleIds.settingsCtrl}" style="margin: 0.6em 0;"></div>
            </div>
        </div>
    `;
    container.innerHTML = template.trim();

    getById(eleIds.danmakuSwitchDiv, container).prepend(
        embyButton(
            {
                id: eleIds.danmakuSwitch,
                label: '弹幕开关',
                iconKey: lsGetItem(lsKeys.switch.id) ? iconKeys.switch_on : iconKeys.switch_off,
                style: (lsGetItem(lsKeys.switch.id) ? 'color:#52b54b;' : '') + 'font-size:1.5em;padding:0;',
            },
            () => {
                const flag = !lsGetItem(lsKeys.switch.id);
                lsSetItem(lsKeys.switch.id, flag);
                if (window.ede?.danmaku) {
                    flag ? window.ede.danmaku.show() : window.ede.danmaku.hide();
                }
            }
        )
    );

    getById(eleIds.filterLevelDiv, container).append(
        embySlider({ lsKey: lsKeys.filterLevel }, (val, opts) => {
            if (opts.labelEle) opts.labelEle.innerText = val;
            lsSetItem(lsKeys.filterLevel.id, parseFloat(val));
        })
    );
}
