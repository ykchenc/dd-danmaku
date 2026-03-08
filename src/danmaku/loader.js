/**
 * 弹幕加载与创建
 * 依赖运行时: window.Danmaku, window.ede, mediaContainerQueryStr
 */

import { isVersionOld } from '../config/constants.js';
import { mediaContainerQueryStr, mediaQueryStr } from '../config/constants.js';
import { lsGetItem, lsKeys } from '../config/api.js';
import { eleIds } from '../config/ele-ids.js';
import { currentDanmakuInfoContainerId } from '../config/options.js';
import { getById, getByClass, waitForElement } from '../utils/dom.js';
import { danmakuParser } from './parser.js';
import { danmakuFilter } from './filter.js';
import { buildProgressBarChart } from './chart.js';

/**
 * 创建并初始化弹幕实例
 * @param {object[]} comments - 原始弹幕数据
 * @param {object} [hooks] - 可选回调 { buildCurrentDanmakuInfo, appendvideoOsdDanmakuInfo }
 * @returns {Promise<void>}
 */
export async function createDanmaku(comments, hooks = {}) {
    if (!comments) return;

    const buildCurrentDanmakuInfo =
        hooks.buildCurrentDanmakuInfo || (() => {});
    const appendvideoOsdDanmakuInfo =
        hooks.appendvideoOsdDanmakuInfo || (() => {});

    if (window.ede.danmaku) {
        window.ede.danmaku.destroy();
        window.ede.danmaku = null;
    }

    window.ede.commentsOriginal = comments;
    const commentsParsed = danmakuParser(comments);
    window.ede.commentsParsed = commentsParsed;
    const _comments = danmakuFilter(commentsParsed);
    console.log('[加载]弹幕成功: ' + _comments.length);

    const _media = document.querySelector(mediaQueryStr);
    if (!_media) {
        if (!window.ede.danmaku) {
            window.ede.danmaku = { comments: _comments };
        }
        buildCurrentDanmakuInfo(currentDanmakuInfoContainerId);
        throw new Error('用户已退出视频播放');
    }

    if (!isVersionOld) _media.style.position = 'absolute';

    const wrapperTop = 0;
    let wrapper = getById(eleIds.danmakuWrapper);
    if (wrapper) wrapper.remove();
    wrapper = document.createElement('div');
    wrapper.id = eleIds.danmakuWrapper;
    wrapper.style.cssText = `
        position: fixed;
        width: 100%;
        height: calc(${lsGetItem(lsKeys.heightPercent.id)}% - ${wrapperTop}px);
        background-color: ${lsGetItem(lsKeys.debugShowDanmakuWrapper.id) ? 'rgba(115, 160, 255, 0.3)' : ''};
        top: ${wrapperTop}px;
        pointer-events: none;
    `;

    const _container = await waitForElement(mediaContainerQueryStr);
    _container.prepend(wrapper);

    const _speed = 144 * lsGetItem(lsKeys.speed.id);
    const DanmakuClass = window.Danmaku;
    if (!DanmakuClass) {
        throw new Error('Danmaku 引擎未加载');
    }

    window.ede.danmaku = new DanmakuClass({
        container: wrapper,
        media: _media,
        comments: _comments,
        engine: lsGetItem(lsKeys.engine.id),
        speed: _speed,
    });

    lsGetItem(lsKeys.switch.id) ? window.ede.danmaku.show() : window.ede.danmaku.hide();

    if (window.ede.ob) {
        window.ede.ob.disconnect();
    }
    window.ede.ob = new ResizeObserver(() => {
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
            require(['playbackManager'], (playbackManager) => {
                if (
                    playbackManager?.getCurrentPlayer() &&
                    playbackManager.getPlayerState()?.PlayState?.IsPaused
                ) {
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
