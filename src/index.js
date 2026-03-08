/**
 * EDE 模块化入口
 * 阶段 0-5，组装 config、core、utils、match、danmaku、bangumi、ui、events
 */
import { EDE } from './core/EDE.js';
import { refreshEventListener } from './events/emby-events.js';
import { onViewShow, beforeDestroy } from './events/view.js';

(function () {
    'use strict';

    window.ede = new EDE();

    refreshEventListener({ viewshow: onViewShow });
    refreshEventListener({ viewbeforehide: beforeDestroy });

    console.log('[EDE] modular init done');
})();
