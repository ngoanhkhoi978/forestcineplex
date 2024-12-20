import { del, get, patch, post } from '~/services/apiService.js';

export const fetchEpisodeComments = async (episodeId) => {
    try {
        const res = await get(`/comments/episode/${episodeId}`);
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export const addComment = async (episodeId, content) => {
    try {
        const res = await post(`/comments`, { episodeId, content });
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export const deleteComment = async (commentId) => {
    try {
        const res = await del(`/comments/${commentId}`);
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export const likeComment = async (commentId) => {
    try {
        const res = await patch(`/comments/like/${commentId}`);
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export const unlikeComment = async (commentId) => {
    try {
        const res = await patch(`/comments/unlike/${commentId}`);
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export const reportComment = async (commentId) => {
    try {
        const res = await patch(`/comments/report/${commentId}`);
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export const unReportComment = async (commentId) => {
    try {
        const res = await patch(`/comments/unreport/${commentId}`);
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};
