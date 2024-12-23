'use client';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

import { Label } from '~/components/ui-aceternity/SignInForm/label.jsx';
import { Input } from '~/components/ui-aceternity/SignInForm/input.jsx';
import { cn, parseValidationErrors } from '~/utils/utils.js';
import { useDispatch } from 'react-redux';
import { loginUser } from '~/features/user/userThunk.js';
import { getUserFavouriteMovies } from '~/features/favorites/favouriteThunk.js';
import { login as loginAPI } from '~/services/authService.js';
import { login } from '~/features/user/userSlice.js';
import config from '~/config/index.js';
import classNames from 'classnames';

export default function SignInForm({ className }) {
    const [validators, setValidators] = useState({});
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUsernameOnChange = (e) => {
        setValidators((pre) => ({ ...pre, username: null }));
        setUsername(e.target.value);
    };
    const handlePasswordOnChange = (e) => {
        setValidators((pre) => ({ ...pre, password: null }));
        setPassword(e.target.value);
    };

    const handleAsync = async () => {
        try {
            const credentials = { username, password };
            loginAPI(credentials)
                .then((user) => {
                    dispatch(login(user));
                    navigate(config.routes.home);
                })
                .catch((err) => setValidators(parseValidationErrors(err)));
        } catch (e) {
            console.log(e);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidators({});
        await handleAsync();
    };

    return (
        <div className={'flex h-full w-full items-center justify-center'}>
            <div className={cn('w-[400px] rounded-2xl bg-white p-8 opacity-85 shadow-input dark:bg-black', className)}>
                <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                    Welcome to ForestCineplex🌳
                </h2>
                <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                    Welcome back! Please log in to continue.
                </p>
                <form className="my-8" onSubmit={handleSubmit}>
                    <LabelInputContainer className="mb-8">
                        <Label
                            htmlFor="username"
                            className={classNames('mb-1', { '!text-red-500': validators.username })}
                        >
                            Username
                        </Label>
                        <Input
                            id="username"
                            value={username}
                            placeholder="Username or email"
                            type="text"
                            onChange={handleUsernameOnChange}
                        />
                        <em className={'text-[10px] text-white'}>{validators.username}</em>
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-8">
                        <Label
                            htmlFor="password "
                            className={classNames('mb-1', { '!text-red-500': validators.password })}
                        >
                            Password
                        </Label>
                        <Input
                            id="password"
                            value={password}
                            onChange={handlePasswordOnChange}
                            placeholder="••••••••"
                            type="password"
                        />
                        <em className={'text-[10px] text-white'}>{validators.password}</em>
                    </LabelInputContainer>

                    <button
                        className="group/btn relative mb-6 block h-10 w-full rounded-md bg-green-700 font-medium text-white transition-all duration-300 ease-in-out hover:bg-green-800"
                        type="submit"
                    >
                        Sign In &rarr;
                        <BottomGradient />
                    </button>

                    <div className="mb-6 flex justify-center">
                        <Link
                            to={config.routes.forgotPassword}
                            className="text-center text-white hover:text-gray-400 hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <div className="text-[#8c8c8c]">
                        <p>
                            New to Netflix?{' '}
                            <Link to={config.routes.register} className="font-bold text-white">
                                Sign up now.
                            </Link>{' '}
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

SignInForm.propTypes = {
    className: PropTypes.string,
};

const BottomGradient = () => {
    return (
        <>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-green-300 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

const LabelInputContainer = ({ children, className }) => {
    return <div className={cn('flex w-full flex-col space-y-2', className)}>{children}</div>;
};

LabelInputContainer.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};
