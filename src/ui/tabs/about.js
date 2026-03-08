/**
 * 关于 Tab
 * 从 ede.js 迁移，占位实现，待阶段 5 事件整合后补全
 */

import { getById } from '../components/common.js';
import { eleIds } from '../../config/ele-ids.js';
import { openSourceLicense } from '../../config/api.js';

/**
 * 构建关于 Tab
 * @param {string} containerId
 */
export function buildAbout(containerId) {
    const container = getById(containerId);
    if (!container) return;

    const licenseHtml = Object.entries(openSourceLicense)
        .map(
            ([key, val]) =>
                `<div><a href="${val.url}" target="_blank">${val.name}</a> v${val.version} (${val.license})</div>`
        )
        .join('');

    container.innerHTML = `
        <div style="height: 30em;">
            <div id="${eleIds.openSourceLicenseDiv}">
                <h4>开源协议</h4>
                ${licenseHtml}
            </div>
        </div>
    `;
}
