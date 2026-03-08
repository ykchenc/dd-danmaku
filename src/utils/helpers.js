/**
 * 通用工具函数
 * 从 ede.js 迁移，未修改原有实现逻辑
 */

/**
 * 将对象转为 [key, value] 数组，兼容非对象
 * @param {object} obj
 * @returns {Array<[string, any]>}
 */
export function objectEntries(obj) {
    if (obj && typeof obj === 'object') {
        return Object.keys(obj).map((key) => [key, obj[key]]);
    }
    return [];
}
