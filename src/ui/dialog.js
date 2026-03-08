/**
 * 弹窗相关
 * 从 ede.js 迁移，未修改原有实现逻辑
 */

import { getByClass } from './components/common.js';
import { waitForElement } from '../utils/dom.js';
import { eleIds } from '../config/ele-ids.js';
import { classes } from '../config/icons.js';

/**
 * 调用 Emby 原生 dialog 模块
 * @param {object} opts - { text, title, timeout, html, buttons }
 * @returns {Promise}
 */
export async function embyDialog(opts = {}) {
    const defaultOpts = { text: '', title: '', timeout: 0, html: '', buttons: [] };
    opts = { ...defaultOpts, ...opts };
    if (typeof require === 'function') {
        return require(['dialog'])
            .then((items) => items[0](opts))
            .catch((error) => {
                console.log('点击弹出框外部取消: ' + error);
            });
    }
    return Promise.reject(new Error('Emby require not available'));
}

/**
 * 关闭当前弹窗
 */
export function closeEmbyDialog() {
    const footerItem = getByClass(classes.formDialogFooterItem);
    if (footerItem) {
        footerItem.dispatchEvent(new Event('click'));
    }
}

/**
 * 调用 Emby 原生 alert 模块
 * @param {object} opts - { text, title, timeout, html }
 * @returns {Promise}
 */
export async function embyAlert(opts = {}) {
    const defaultOpts = { text: '', title: '', timeout: 0, html: '' };
    opts = { ...defaultOpts, ...opts };
    if (typeof require === 'function') {
        return require(['alert'])
            .then((items) => items[0](opts))
            .catch((error) => {
                console.log('点击弹出框外部取消: ' + error);
            });
    }
    return Promise.reject(new Error('Emby require not available'));
}

/**
 * 调用 Emby 原生 toast 模块
 * @param {object} opts - { text, secondaryText, icon, iconStrikeThrough }
 * @returns {Promise}
 */
export async function embyToast(opts = {}) {
    const defaultOpts = { text: '', secondaryText: '', icon: '', iconStrikeThrough: false };
    opts = { ...defaultOpts, ...opts };
    if (typeof require === 'function') {
        return require(['toast']).then((toast) => toast(opts));
    }
    return Promise.reject(new Error('Emby require not available'));
}

/**
 * 创建弹幕设置弹窗
 * @param {function(HTMLElement): void} [onDialogReady] - 弹窗容器就绪后的回调，用于构建 Tab 内容
 */
export function createDialog(onDialogReady) {
    if (typeof require === 'function') {
        require([
            'emby-select',
            'emby-checkbox',
            'emby-slider',
            'emby-textarea',
            'emby-collapse',
            'emby-button',
        ]);
    }
    const html = `<div id="${eleIds.dialogContainer}"></div>`;
    embyDialog({ html, buttons: [{ name: '关闭' }] });
    if (typeof onDialogReady === 'function') {
        waitForElement('#' + eleIds.dialogContainer, onDialogReady);
    }
}
