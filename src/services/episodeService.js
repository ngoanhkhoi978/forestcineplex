import { get } from './apiService';

export const fetchEpisodeByMediaId = async (mediaId) => {
    try {
        const res = await get(`/episodes/media/${mediaId}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
