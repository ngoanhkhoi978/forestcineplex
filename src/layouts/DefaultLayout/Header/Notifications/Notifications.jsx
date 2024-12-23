import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function Notifications() {
    return (
        <div className="relative">
            <FontAwesomeIcon icon={faBell} className={'text-xl text-white'} />
            <div
                className={
                    'absolute bottom-0 right-[-50%] m-0 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] leading-none text-white'
                }
            >
                1
            </div>
        </div>
    );
}

export default Notifications;
