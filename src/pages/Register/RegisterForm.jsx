'use client';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

import { Label } from '~/components/ui-aceternity/SignInForm/label.jsx';
import { Input } from '~/components/ui-aceternity/SignInForm/input.jsx';
import { cn } from '~/utils/utils.js';
import { useDispatch } from 'react-redux';
import { loginUser } from '~/features/user/userThunk.js';

export default function RegisterForm({ className }) {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUsernameOnChange = (e) => {
        setUsername(e.target.value);
    };
    const handlePasswordOnChange = (e) => {
        setPassword(e.target.value);
    };

    const handleFullNameOnChange = (e) => {
        setFullName(e.target.value);
    };

    const handleMailOnChange = (e) => {
        setMail(e.target.value);
    };

    const handleConFirmPasswordOnChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleAsync = async () => {
        try {
            const credentials = { username, password };
            const user = await dispatch(loginUser(credentials)).unwrap();
            navigate('/home');
        } catch (e) {
            console.log(e);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleAsync();
    };

    return (
        <div
            className={cn(
                'w-full min-w-96 max-w-md rounded-2xl bg-white p-8 opacity-85 shadow-input dark:bg-black',
                className,
            )}
        >
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Welcome to ForestCineplex🌳</h2>
            <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                New here? Sign up to get started!
            </p>
            <form className="my-8" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="fullname" className="mb-1">
                        Fullname
                    </Label>
                    <Input
                        id="fullname"
                        value={fullName}
                        placeholder="Enter your name"
                        type="text"
                        onChange={handleFullNameOnChange}
                    />
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                    <Label htmlFor="username" className="mb-1">
                        Username
                    </Label>
                    <Input
                        id="username"
                        value={username}
                        placeholder="Enter your username"
                        type="text"
                        onChange={handleUsernameOnChange}
                    />
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                    <Label htmlFor="mail" className="mb-1">
                        Mail
                    </Label>
                    <Input
                        id="mail"
                        value={mail}
                        placeholder="Enter your mail"
                        type="text"
                        onChange={handleMailOnChange}
                    />
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password" className="mb-1">
                        Password
                    </Label>
                    <Input
                        id="password"
                        value={password}
                        onChange={handlePasswordOnChange}
                        placeholder="••••••••"
                        type="password"
                    />
                </LabelInputContainer>

                <LabelInputContainer className="mb-16">
                    <Label htmlFor="confirmPassword" className="mb-1">
                        Confirm password
                    </Label>
                    <Input
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConFirmPasswordOnChange}
                        placeholder="••••••••"
                        type="password"
                    />
                </LabelInputContainer>

                <button
                    className="group/btn relative mb-6 block h-10 w-full rounded-md bg-green-700 font-medium text-white transition-all duration-300 ease-in-out hover:bg-green-800"
                    type="submit"
                >
                    Sign In &rarr;
                    <BottomGradient />
                </button>

                {/*<div className="mb-6 flex justify-center">*/}
                {/*    <Link to="/forgot-password" className="text-center text-white hover:text-gray-400 hover:underline">*/}
                {/*        Forgot password?*/}
                {/*    </Link>*/}
                {/*</div>*/}

                {/*<div className="text-[#8c8c8c]">*/}
                {/*    <p>*/}
                {/*        New to Netflix?{' '}*/}
                {/*        <Link to="/register" className="font-bold text-white">*/}
                {/*            Sign up now.*/}
                {/*        </Link>{' '}*/}
                {/*    </p>*/}
                {/*</div>*/}

                {/*<div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />*/}

                {/*<div className="flex flex-col space-y-4">*/}
                {/*    <button*/}
                {/*        className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"*/}
                {/*        type="submit"*/}
                {/*    >*/}
                {/*        <span className="text-sm text-neutral-700 dark:text-neutral-300">GitHub</span>*/}
                {/*        <BottomGradient />*/}
                {/*    </button>*/}
                {/*</div>*/}
            </form>
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
