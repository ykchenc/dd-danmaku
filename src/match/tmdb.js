/**
 * TMDB ID 匹配
 */

import { dandanplayApi } from '../config/api.js';
import { fetchSearchEpisodesByTmdbId } from './search.js';

/** 排除特典集（Sn/Cn 开头），返回正片数组 */
export function filterMainEpisodes(episodes) {
    if (!episodes || !Array.isArray(episodes)) return [];
    return episodes.filter((ep) => !/^[SC]\d+\s/.test(ep.episodeTitle || ''));
}

/**
 * 通过 TMDB ID 匹配
 * @param {object} itemInfoMap
 * @param {object} apiConfigs
 * @param {string[]} apiPriority
 * @returns {Promise<object|null>}
 */
export async function tryMatchByTmdbId(itemInfoMap, apiConfigs, apiPriority) {
    const { seriesTmdbId, seasonNumber, episodeNumber, episode } = itemInfoMap;
    if (!seriesTmdbId) return null;

    for (const apiKey of apiPriority) {
        const config = apiConfigs[apiKey];
        if (!config || !config.enabled || (apiKey === 'custom' && !config.prefix)) continue;

        const animaInfo = await fetchSearchEpisodesByTmdbId(seriesTmdbId, config.prefix);
        if (!animaInfo?.animes?.length) continue;

        const animes = animaInfo.animes;

        if (episode === 'movie') {
            const firstAnime = animes[0];
            const mainEps = filterMainEpisodes(firstAnime.episodes);
            const ep = mainEps[0] || firstAnime.episodes?.[0];
            if (ep) {
                console.log(`[tmdbId匹配] 电影匹配成功: ${firstAnime.animeTitle}`);
                return {
                    directMatch: true,
                    apiPrefix: config.prefix,
                    apiName: config.name,
                    episodeInfo: {
                        episodeId: ep.episodeId,
                        episodeTitle: ep.episodeTitle,
                        animeId: firstAnime.animeId,
                        animeTitle: firstAnime.animeTitle,
                        imageUrl: dandanplayApi.posterImg(firstAnime.animeId),
                    },
                };
            }
            continue;
        }

        const seasonAnimes = animes.filter((a) => ['tvseries', 'tvspecial', 'web'].includes(a.type));
        const ovaAnimes = animes.filter((a) => a.type === 'ova');
        const epNum = typeof episodeNumber === 'number' ? episodeNumber : parseInt(episode, 10);
        if (isNaN(epNum) || epNum < 1) continue;
        const season = seasonNumber != null ? seasonNumber : 1;

        let matchedEp = null;
        let matchedAnime = null;

        if (season === 0) {
            const ovaPairs = ovaAnimes.flatMap((a) =>
                filterMainEpisodes(a.episodes).map((ep) => ({ anime: a, ep }))
            );
            const pair = ovaPairs[epNum - 1];
            if (pair) {
                matchedEp = pair.ep;
                matchedAnime = pair.anime;
            }
        } else if (season >= 2) {
            const targetAnime = seasonAnimes[season - 1];
            if (targetAnime) {
                const mainEps = filterMainEpisodes(targetAnime.episodes);
                matchedEp = mainEps[epNum - 1];
                matchedAnime = targetAnime;
            }
        } else {
            let acc = 0;
            for (let i = 0; i < seasonAnimes.length; i++) {
                const mainEps = filterMainEpisodes(seasonAnimes[i].episodes);
                const count = mainEps.length;
                if (epNum <= acc + count) {
                    matchedEp = mainEps[epNum - acc - 1];
                    matchedAnime = seasonAnimes[i];
                    break;
                }
                acc += count;
            }
        }

        if (matchedEp && matchedAnime) {
            console.log(`[tmdbId匹配] 季度剧集匹配成功: ${matchedAnime.animeTitle} - ${matchedEp.episodeTitle}`);
            return {
                directMatch: true,
                apiPrefix: config.prefix,
                apiName: config.name,
                episodeInfo: {
                    episodeId: matchedEp.episodeId,
                    episodeTitle: matchedEp.episodeTitle,
                    animeId: matchedAnime.animeId,
                    animeTitle: matchedAnime.animeTitle,
                    imageUrl: dandanplayApi.posterImg(matchedAnime.animeId),
                },
            };
        }
    }
    return null;
}
