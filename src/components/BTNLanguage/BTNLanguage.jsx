import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia } from '@fortawesome/free-solid-svg-icons';

function BTNLanguage() {
    const handleOnClick = useCallback(() => {
        i18n.changeLanguage(i18n.language === 'en' ? 'vi' : 'en');
    }, []);

    const { t, i18n } = useTranslation();

    return (
        <button onClick={handleOnClick} className="text-white">
            <FontAwesomeIcon icon={faEarthAsia} />
            {i18n.language}
        </button>
    );
}

export default BTNLanguage;
