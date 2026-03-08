/**
 * 常量配置
 * 从 ede.js 迁移，未修改原有实现逻辑
 */

export const check_interval = 200;

export const LOAD_TYPE = {
    CHECK: 'check',
    INIT: 'init',
    REFRESH: 'refresh',
    RELOAD: 'reload', // 优先走缓存,其余类型走接口
    SEARCH: 'search',
};

export let isVersionOld = false;
export const setVersionOld = (v) => { isVersionOld = v; };

// htmlVideoPlayerContainer
export let mediaContainerQueryStr = '.graphicContentContainer';
export const setMediaContainerQueryStr = (v) => { mediaContainerQueryStr = v; };

export const notHide = ':not(.hide)';
export const mediaQueryStr = 'video';
