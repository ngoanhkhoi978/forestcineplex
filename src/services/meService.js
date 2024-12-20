import { post } from '~/services/apiService.js';

export const choosePlan = async (plan) => {
    try {
        const res = await post(`/me/subscription-plan/choose`, { subscriptionPlan: plan });
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};
