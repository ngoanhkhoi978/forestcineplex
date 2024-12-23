import { Link } from 'react-router-dom';
import config from '~/config/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '~/features/user/userSelectors.js';
import images from '~/assets/images/index.js';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUpload } from '@fortawesome/free-solid-svg-icons';
import { getAvatarSrc, parseValidationErrors, resizeImage } from '~/utils/utils.js';
import { changePassword, modifyProfile } from '~/services/meService.js';
import { login } from '~/features/user/userSlice.js';
import classNames from 'classnames';
import { useToast } from '~/providers/ToastProvider.jsx';

function Profile() {
    return (
        <div className={'container mx-auto pt-header 2xl:w-[1200px]'}>
            <div className={'mb-6'}>
                <Link
                    to={config.routes.home}
                    className={'space-x-2 rounded-md p-4 text-xl text-gray-500 hover:bg-black/25 hover:text-gray-300'}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <span>Back to ForestCineplex</span>
                </Link>
            </div>
            <div className={'grid h-40 grid-cols-12 gap-8'}>
                <div className={'col-span-12 md:col-span-6'}>
                    <AccountInformation />
                </div>
                <div className={'col-span-12 md:col-span-6'}>
                    <Password />
                </div>
            </div>
        </div>
    );
}

const AccountInformation = () => {
    const user = useSelector(selectUser);

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState(null);
    const dispatch = useDispatch();
    const { showToast } = useToast();

    useEffect(() => {
        setFullName(user.fullName);
        setPhone(user.phone);
    }, [user]);

    const handleUpload = (e) => {
        resizeImage(e.target.files[0], 250, 250, (file) => {
            setAvatar(file);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('phone', phone);
        if (avatar) formData.append('avatar', avatar);

        modifyProfile(formData).then((currentUser) => {
            setAvatar(null);
            dispatch(login(currentUser));
            showToast('Information changed successfully.', 'success', 5000);
        });
    };

    useEffect(() => {}, []);

    return (
        <div className={'h-full rounded-xl border border-gray-700 p-8'}>
            <div className={'grid grid-cols-12 justify-between gap-4'}>
                <div className={'col-span-4 flex justify-between'}>
                    <label htmlFor="avatar" className={'group relative max-h-max cursor-pointer'}>
                        <img
                            src={
                                avatar
                                    ? URL.createObjectURL(avatar)
                                    : user.avatar
                                      ? getAvatarSrc(user.avatar)
                                      : images.avatar
                            }
                            className={'w-full rounded-md'}
                            alt=""
                        />
                        <div
                            className={
                                'absolute bottom-0 left-0 right-0 top-0 hidden items-center justify-center bg-black/50 group-hover:flex'
                            }
                        >
                            <FontAwesomeIcon icon={faUpload} className={'text-4xl leading-none text-white'} />
                        </div>
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        name="avatar"
                        id={'avatar'}
                        className={'hidden'}
                        onChange={handleUpload}
                    />
                </div>
                <div className={'col-span-8'}>
                    <div className="group pointer-events-none relative z-0 mb-5 w-full brightness-50">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                            placeholder=""
                            disabled
                            value={user.username}
                        />
                        <label
                            htmlFor="username"
                            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                        >
                            Username
                        </label>
                    </div>

                    <div className="group relative z-0 mb-5 w-full">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="peer pointer-events-none block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 brightness-50 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                            placeholder=""
                            value={user.email}
                            disabled
                        />
                        <label
                            htmlFor="email"
                            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                        >
                            Email address
                        </label>
                    </div>
                    <div className="group relative z-0 mb-5 w-full">
                        <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                            placeholder=""
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <label
                            htmlFor="fullName"
                            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                        >
                            FullName
                        </label>
                    </div>
                    <div className="group relative z-0 mb-5 w-full">
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                            placeholder=""
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <label
                            htmlFor="phone"
                            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
                        >
                            Phone
                        </label>
                    </div>
                </div>
            </div>
            <div className={'h-10'}>
                {(fullName !== user.fullName || phone !== user.phone || avatar !== null) && (
                    <button
                        type="button"
                        className="mb-2 me-2 w-full rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none dark:bg-green-600 dark:hover:bg-green-700"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                )}
            </div>
        </div>
    );
};

const Password = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const dispatch = useDispatch();
    const { showToast } = useToast();

    const [validators, setValidators] = useState({});

    const handleSubmit = (e) => {
        setValidators({});
        e.preventDefault();
        changePassword({ currentPassword, newPassword, confirmNewPassword })
            .then((user) => {
                dispatch(login(user));
                setConfirmNewPassword('');
                setCurrentPassword('');
                setNewPassword('');
                showToast('Password changed successfully.', 'success', 5000);
            })
            .catch((err) => setValidators(parseValidationErrors(err)));
    };

    return (
        <div className={'flex h-full w-full flex-col justify-end rounded-xl border border-gray-700 p-8'}>
            <div className={'w-full'}>
                <h1 className={'mb-4 text-2xl font-medium text-white'}>Password </h1>
                <div className="group relative z-0 mb-5">
                    <input
                        type="password"
                        name="currentPassword"
                        id="currentPassword"
                        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                        placeholder=""
                        value={currentPassword}
                        onChange={(e) => {
                            setCurrentPassword(e.target.value);
                            setValidators((pre) => ({ ...pre, currentPassword: null }));
                        }}
                    />
                    <label
                        htmlFor="currentPassword"
                        className={classNames(
                            'absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500',
                            { '!text-red-500': validators.currentPassword },
                        )}
                    >
                        Current password <span className={'italic text-gray-500'}>{validators.currentPassword}</span>
                    </label>
                </div>

                <div className="group relative z-0 mb-5 w-full">
                    <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                        placeholder=""
                        value={newPassword}
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                            setValidators((pre) => ({ ...pre, newPassword: null }));
                        }}
                    />
                    <label
                        htmlFor="newPassword"
                        className={classNames(
                            'absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500',
                            { '!text-red-500': validators.newPassword },
                        )}
                    >
                        New password <span className={'italic text-gray-500'}>{validators.newPassword}</span>
                    </label>
                </div>

                <div className="group relative z-0 mb-5 w-full">
                    <input
                        type="password"
                        name="confirmNewPassword"
                        id="confirmNewPassword"
                        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
                        placeholder=""
                        value={confirmNewPassword}
                        onChange={(e) => {
                            setConfirmNewPassword(e.target.value);
                            setValidators((pre) => ({ ...pre, confirmNewPassword: null }));
                        }}
                    />
                    <label
                        htmlFor="confirmNewPassword"
                        className={classNames(
                            'absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500',
                            { '!text-red-500': validators.confirmNewPassword },
                        )}
                    >
                        Confirm new password{' '}
                        <span className={'italic text-gray-500'}>{validators.confirmNewPassword}</span>
                    </label>
                </div>

                <div className={'h-10'}>
                    {currentPassword && newPassword && confirmNewPassword && (
                        <button
                            onClick={handleSubmit}
                            type="button"
                            className="mb-2 me-2 w-full rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none dark:bg-green-600 dark:hover:bg-green-700"
                        >
                            Save
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
