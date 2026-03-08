/**
 * core 模块统一导出
 */

export { EDE } from './EDE.js';
export { AppLogAspect } from './AppLogAspect.js';
export {
    lsSetItem,
    lsCheckOld,
    lsCheckSet,
    lsBatchSet,
    lsBatchRemove,
} from './storage.js';

/**
 * 清理所有由 waitForElement 创建的 interval
 * @param {EDE} ede - EDE 实例
 */
export function destroyAllInterval(ede) {
    if (ede && ede.destroyIntervalIds) {
        ede.destroyIntervalIds.forEach((id) => clearInterval(id));
        ede.destroyIntervalIds = [];
    }
}
