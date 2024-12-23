'use client';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { Label } from '~/components/ui-aceternity/SignInForm/label.jsx';
import { Input } from '~/components/ui-aceternity/SignInForm/input.jsx';
import { cn, parseValidationErrors } from '~/utils/utils.js';
import config from '~/config/index.js';
import { register } from '~/services/authService.js';
import { login } from '~/features/user/userSlice.js';

export default function RegisterForm({ className }) {
    const [validators, setValidators] = useState({});
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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

    const handleFullNameOnChange = (e) => {
        setValidators((pre) => ({ ...pre, fullName: null }));
        setFullName(e.target.value);
    };

    const handleEmailOnChange = (e) => {
        setValidators((pre) => ({ ...pre, email: null }));
        setEmail(e.target.value);
    };

    const handleConFirmPasswordOnChange = (e) => {
        setValidators((pre) => ({ ...pre, confirmPassword: null }));
        setConfirmPassword(e.target.value);
    };

    const handlePhoneOnChange = (e) => {
        setValidators((pre) => ({ ...pre, phone: null }));
        setPhone(e.target.value);
    };

    const handleAsync = async () => {
        try {
            const userData = {
                username,
                password,
                confirmPassword,
                email,
                phone,
                fullName,
            };

            register(userData)
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
                    New here? Sign up to get started!
                </p>
                <form className="my-8" onSubmit={handleSubmit}>
                    <LabelInputContainer className="mb-4">
                        <Label
                            htmlFor="fullname"
                            className={classNames('mb-1', { '!text-red-500': validators.fullName })}
                        >
                            FullName
                        </Label>
                        <Input
                            id="fullname"
                            value={fullName}
                            placeholder="Enter your name"
                            type="text"
                            onChange={handleFullNameOnChange}
                        />
                        <em className={'text-[10px] text-white'}>{validators.fullName}</em>
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label
                            htmlFor="username"
                            className={classNames('mb-1', { '!text-red-500': validators.username })}
                        >
                            Username
                        </Label>
                        <Input
                            id="username"
                            value={username}
                            placeholder="Enter your username"
                            type="text"
                            onChange={handleUsernameOnChange}
                        />
                        <em className={'text-[10px] text-white'}>{validators.username}</em>
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email" className={classNames('mb-1', { '!text-red-500': validators.email })}>
                            Email
                        </Label>
                        <Input
                            id="email"
                            value={email}
                            placeholder="Enter your mail"
                            type="text"
                            onChange={handleEmailOnChange}
                        />
                        <em className={'text-[10px] text-white'}>{validators.email}</em>
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="phone" className={classNames('mb-1', { '!text-red-500': validators.phone })}>
                            Phone
                        </Label>
                        <Input
                            id="phone"
                            value={phone}
                            placeholder="Enter your phone"
                            type="text"
                            onChange={handlePhoneOnChange}
                        />
                        <em className={'text-[10px] text-white'}>{validators.phone}</em>
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label
                            htmlFor="password"
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

                    <LabelInputContainer className="mb-8">
                        <Label
                            htmlFor="confirmPassword"
                            className={classNames('mb-1', { '!text-red-500': validators.confirmPassword })}
                        >
                            Confirm password
                        </Label>
                        <Input
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConFirmPasswordOnChange}
                            placeholder="••••••••"
                            type="password"
                        />
                        <em className={'text-[10px] text-white'}>{validators.confirmPassword}</em>
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
                            to={config.routes.login}
                            className="text-center text-white hover:text-gray-400 hover:underline"
                        >
                            Already have an account? Log in here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

RegisterForm.propTypes = {
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
