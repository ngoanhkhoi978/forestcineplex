import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia } from '@fortawesome/free-solid-svg-icons';

const ButtonLanguage = () => {
    const { t, i18n } = useTranslation();
    const handleOnClick = useCallback(() => {
        i18n.changeLanguage(i18n.language === 'en' ? 'vi' : 'en').catch();
    }, [i18n]);
    return (
        <button className="group/menu-item mb-1 flex w-full items-center" onClick={handleOnClick}>
            <span className="mr-3 text-2xl text-[#b3b3b3]">
                <FontAwesomeIcon icon={faEarthAsia} />
            </span>
            <span className="text-sm text-white group-hover/menu-item:underline">
                {i18n.language === 'en' ? 'English' : 'Tiếng Việt'}
            </span>
        </button>
    );
};

export default ButtonLanguage;
