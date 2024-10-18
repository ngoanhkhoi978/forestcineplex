import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                welcome: 'Welcome',
                home: 'Home',
                'tv shows': 'TV Shows',
                movies: 'Movies',
                'my list': 'My List',
                news: 'News',
            },
        },
        vi: {
            translation: {
                welcome: 'Chào mừng',
                home: 'Trang chủ',
                'tv shows': 'Phim truyền hình',
                movies: 'Phim',
                'my list': 'Danh sách của tôi',
                news: 'Tin tức',
            },
        },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
