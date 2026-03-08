/**
 * match 模块统一导出
 */

export { fetchSearchEpisodes, fetchSearchEpisodesByTmdbId, fetchMatchApi } from './search.js';
export {
    calculateStringSimilarity,
    similarityPercentage,
    normalizeTitle,
    parseSearchKeyword,
    extractKeywords,
} from './similarity.js';
export {
    autoFailback,
    oriTitleAutoFailback,
    movieAutoFailback,
    selectBestMatch,
    calculateMatchScore,
} from './fallback.js';
export { calculateFileHash, tryMatchByHash } from './hash.js';
export { filterMainEpisodes, tryMatchByTmdbId } from './tmdb.js';
export { parseAnimeName, lsSeasonSearchEpisodes, searchEpisodes } from './episode.js';
export { getMapByEmbyItemInfo } from './emby-item.js';
