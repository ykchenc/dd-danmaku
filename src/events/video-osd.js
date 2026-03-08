/**
 * 播放 OSD 显示/隐藏事件
 */

import { getById, getByClass } from '../ui/components/common.js';
import { lsGetItem, lsKeys } from '../config/api.js';
import { buildProgressBarChart } from '../danmaku/chart.js';
import { destroyAllInterval } from '../core/index.js';

export function addHeaderClock() {
    const warpper = getByClass('headerMiddle');
    let headerClockEle = getById('headerClock');
    if (!warpper) return;
    if (headerClockEle) headerClockEle.remove();

    const clockElement = document.createElement('div');
    clockElement.id = 'headerClock';
    warpper.append(clockElement);

    function updateClock() {
        clockElement.textContent = new Date().toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    }
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    if (window.ede?.destroyIntervalIds) {
        window.ede.destroyIntervalIds.push(intervalId);
    }
}

export function removeHeaderClock() {
    const headerClockEle = getById('headerClock');
    if (headerClockEle) headerClockEle.remove();
    destroyAllInterval();
}

export function onVideoOsdShow(e) {
    console.log(e?.type, e);
    if (lsGetItem(lsKeys.osdLineChartEnable.id)) {
        buildProgressBarChart(20);
    }
    if (lsGetItem(lsKeys.osdHeaderClockEnable.id)) {
        addHeaderClock();
    }
}

export function onVideoOsdHide(e) {
    console.log(e?.type, e);
    if (lsGetItem(lsKeys.osdHeaderClockEnable.id)) {
        removeHeaderClock();
    }
}
