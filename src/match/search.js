/**
 * 弹弹 play 搜索与 match 接口
 */

import { fetchJson } from '../utils/fetch.js';

/**
 * @param {string} anime
 * @param {number|string|null} episode
 * @param {string} prefix
 * @returns {Promise<object|null>}
 */
export async function fetchSearchEpisodes(anime, episode, prefix) {
    if (!anime) throw new Error('anime is required');
    const url = `${prefix}/search/episodes?anime=${encodeURIComponent(anime)}${episode ? `&episode=${episode}` : ''}`;
    const searchResult = await fetchJson(url).catch((error) => {
        console.error(`[API请求] search/episodes 查询失败: ${error.message}`);
        return null;
    });
    console.log(`[API请求] search/episodes 查询成功`, searchResult);
    return searchResult;
}

/**
 * @param {string} tmdbId
 * @param {string} prefix
 * @returns {Promise<object|null>}
 */
export async function fetchSearchEpisodesByTmdbId(tmdbId, prefix) {
    if (!tmdbId) return null;
    const url = `${prefix}/search/episodes?tmdbId=${encodeURIComponent(tmdbId)}`;
    const searchResult = await fetchJson(url).catch((error) => {
        console.error(`[API请求] search/episodes(tmdbId) 查询失败: ${error.message}`);
        return null;
    });
    if (searchResult?.animes?.length > 0) {
        console.log(`[API请求] search/episodes(tmdbId=${tmdbId}) 查询成功, animes: ${searchResult.animes.length}`);
    }
    return searchResult;
}

/**
 * @param {object} payload
 * @param {string} prefix
 * @returns {Promise<object|null>}
 */
export async function fetchMatchApi(payload, prefix) {
    const url = `${prefix}/match`;
    console.log(`[自动匹配] 尝试 match 接口`);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept-Encoding': 'gzip',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const responseText = await response.text();
            console.warn(`[自动匹配] match 失败: HTTP ${response.status}`);
            throw new Error(`HTTP error! Status: ${response.status}, Body: ${responseText}`);
        }

        const matchResult = await response.json();
        console.log(`[自动匹配] match 成功`);

        if (matchResult?.matches) {
            matchResult.animes = matchResult.matches;
            delete matchResult.matches;
        }
        return matchResult;
    } catch (error) {
        console.warn(`[自动匹配] match 失败:`, error.message || error);
        return null;
    }
}
