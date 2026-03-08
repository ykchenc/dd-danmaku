/**
 * Bangumi API 相关
 * 从 ede.js 迁移，未修改原有实现逻辑
 */

import { lsGetItem, dandanplayApi, bangumiApi } from '../config/api.js';
import { lsLocalKeys } from '../config/ls-local-keys.js';
import { fetchJson } from '../utils/fetch.js';

/**
 * 修正 Bangumi 集数索引（番剧非第一季时）
 * @param {number} currentBgmEpisodeIndex
 * @param {object} danDanPlayBangumi
 * @returns {number}
 */
export function offsetBgmEpisodeIndex(currentBgmEpisodeIndex, danDanPlayBangumi) {
    if (!danDanPlayBangumi) {
        return currentBgmEpisodeIndex;
    }
    let bangumiEp = danDanPlayBangumi.episodes[currentBgmEpisodeIndex];
    if (!bangumiEp) {
        console.log(
            `未匹配到 danDanPlayBangumi 番剧集数,剧集不为第一季,尝试切换接口数据匹配返回修正后的 bgmEpisodeIndex`
        );
        return danDanPlayBangumi.episodes.findIndex((ep) => ep.episodeNumber == currentBgmEpisodeIndex + 1);
    } else {
        return currentBgmEpisodeIndex;
    }
}

/**
 * 获取当前集对应的 Bangumi 关联信息
 * @returns {Promise<object>}
 */
export async function getEpisodeBangumiRel() {
    const episode_info = window.ede.episode_info;
    const _bangumi_key = lsLocalKeys.bangumiEpInfoPrefix + episode_info.episodeId;
    let bangumiInfoLs = localStorage.getItem(_bangumi_key);
    if (bangumiInfoLs) {
        bangumiInfoLs = JSON.parse(bangumiInfoLs);
    }
    let bangumiEpsRes = bangumiInfoLs ? bangumiInfoLs.bangumiEpsRes : null;
    let subjectId = bangumiInfoLs ? bangumiInfoLs.subjectId : null;
    let bangumiUrl = bangumiInfoLs ? bangumiInfoLs.bangumiUrl : null;
    const animeId = episode_info.animeId;
    if (!subjectId) {
        if (!animeId) {
            throw new Error('未获取到 animeId');
        }
        const danDanPlayBangumiRes = await fetchJson(dandanplayApi.getBangumi(animeId));
        episode_info.bgmEpisodeIndex = offsetBgmEpisodeIndex(
            episode_info.bgmEpisodeIndex,
            danDanPlayBangumiRes.bangumi
        );
        bangumiUrl = danDanPlayBangumiRes.bangumi.bangumiUrl;
        if (!bangumiUrl) {
            throw new Error('未请求到 bangumiUrl');
        }
        subjectId = parseInt(bangumiUrl.match(/\/(\d+)$/)[1]);
    }
    const episodeIndex = episode_info ? episode_info.episodeIndex : null;
    const bgmEpisodeIndex = episode_info ? episode_info.bgmEpisodeIndex : null;
    const bangumiInfo = {
        animeId,
        bangumiUrl,
        subjectId,
        episodeIndex,
        bgmEpisodeIndex,
        bangumiEpsRes,
        _bangumi_key,
    };
    window.ede.bangumiInfo = bangumiInfo;
    localStorage.setItem(bangumiInfo._bangumi_key, JSON.stringify(bangumiInfo));
    return bangumiInfo;
}

/**
 * 提交 Bangumi 章节收藏状态为「看过」
 * @param {string} token - Bangumi 个人令牌
 * @returns {Promise<object>}
 */
export async function putBangumiEpStatus(token) {
    const bangumiInfo = await getEpisodeBangumiRel();
    const { subjectId, bgmEpisodeIndex } = bangumiInfo;
    const episodeIndex = bgmEpisodeIndex ? bgmEpisodeIndex : bangumiInfo.episodeIndex;
    console.log('准备校验 Bangumi 条目收藏状态是否为看过');
    let bangumiMe = localStorage.getItem(lsLocalKeys.bangumiMe);
    if (bangumiMe) {
        bangumiMe = JSON.parse(bangumiMe);
    } else {
        bangumiMe = await fetchBangumiApiGetMe(token);
    }
    let msg = '';
    let bangumiUserColl = null;
    try {
        bangumiUserColl = await fetchJson(bangumiApi.getUserCollection(bangumiMe.username, subjectId), {
            token,
        });
    } catch (error) {
        console.warn('Bangumi 条目未收藏');
    }
    if (bangumiUserColl && bangumiUserColl.type === 2) {
        msg = 'Bangumi 条目已为看过状态,跳过更新';
        console.log(msg, bangumiUserColl);
        throw new Error(msg);
    }
    console.log('准备修改 Bangumi 条目收藏状态为在看, 如果不存在则创建, 如果存在则修改');
    let body = { type: 3 };
    await fetchJson(bangumiApi.postUserCollection(subjectId), { token, body });
    if (!bangumiInfo.bangumiEpsRes) {
        const fetchUrl = bangumiApi.getUserSubjectEpisodeCollection(subjectId);
        const bangumiEpsRes = await fetchJson(fetchUrl, { token });
        bangumiInfo.bangumiEpsRes = bangumiEpsRes;
        const bangumiEpColl = bangumiEpsRes.data[episodeIndex];
        if (!bangumiEpColl) {
            throw new Error('未匹配到 bangumiEpColl');
        }
    }
    const bangumiEpColl = bangumiInfo.bangumiEpsRes.data[episodeIndex];
    const bangumiEp = bangumiEpColl.episode;
    if (bangumiEpColl.type === 2) {
        msg = 'Bangumi 章节收藏已是看过状态,跳过更新';
        console.log(msg, bangumiEp);
        throw new Error(msg);
    }
    console.log('准备更新 Bangumi 章节收藏状态, 详情: ', bangumiEp);
    body.type = 2;
    await fetchJson(bangumiApi.putUserEpisodeCollection(bangumiEp.id), { token, body, method: 'PUT' });
    bangumiEp.type = body.type;
    console.log(`成功更新 Bangumi 章节收藏状态, 在看 => 看过, 详情: `, bangumiEp);
    window.ede.bangumiInfo = bangumiInfo;
    localStorage.setItem(bangumiInfo._bangumi_key, JSON.stringify(bangumiInfo));
    return bangumiInfo;
}

/**
 * 验证 Bangumi Token 并获取用户信息
 * @param {string} bangumiToken
 * @returns {Promise<object>}
 */
export async function fetchBangumiApiGetMe(bangumiToken) {
    try {
        const res = await fetchJson(bangumiApi.getMe(), { token: bangumiToken });
        console.log('Bangumi Token 验证成功', res);
        localStorage.setItem(lsLocalKeys.bangumiMe, JSON.stringify(res));
        return res;
    } catch (error) {
        console.error('Bangumi Token 验证失败', error);
        throw error;
    }
}
