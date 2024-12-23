'use client';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

import { Label } from '~/components/ui-aceternity/SignInForm/label.jsx';
import { Input } from '~/components/ui-aceternity/SignInForm/input.jsx';
import { cn, parseValidationErrors } from '~/utils/utils.js';
import { useDispatch } from 'react-redux';
import { forgotPassword, resetPassword } from '~/services/authService.js';
import classNames from 'classnames';
import config from '~/config/index.js';
import { useToast } from '~/providers/ToastProvider.jsx';

export default function ForgotPasswordForm({ className }) {
    const [step, setStep] = useState({
        state: '',
        identifier: '',
    });

    return (
        <div className={'flex h-full items-center justify-center'}>
            <div
                className={cn(
                    'w-full max-w-md rounded-2xl bg-white p-8 opacity-85 shadow-input dark:bg-black',
                    className,
                )}
            >
                <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                    Welcome to ForestCineplex🌳
                </h2>
                <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                    Forgot your password? Don&#39;t worry, reset it here!
                </p>
                {step.state === 'resetPassword' ? (
                    <ResetPasswordForm step={step} />
                ) : (
                    <FindUserForm setStep={setStep} />
                )}
            </div>
        </div>
    );
}

ForgotPasswordForm.propTypes = {
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

// eslint-disable-next-line react/prop-types
const FindUserForm = ({ setStep }) => {
    const [identifier, setIdentifier] = useState('');

    const { showToast } = useToast();

    const [validators, setValidators] = useState({});

    const handleIdentifierOnChange = (e) => {
        setValidators({});
        setIdentifier(e.target.value);
    };

    const handleSubmit = (e) => {
        setValidators({});
        e.preventDefault();
        setValidators({});
        forgotPassword(identifier)
            .then((result) => {
                showToast(result?.message, 'success', 3000);
                setStep({
                    state: 'resetPassword',
                    identifier: identifier,
                });
            })
            .catch((err) => setValidators(parseValidationErrors(err)));
    };

    return (
        <form className="my-8 min-w-96" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-8">
                <Label
                    htmlFor="identifier"
                    className={classNames('mb-3', {
                        '!text-red-500': validators.identifier,
                    })}
                >
                    Username
                </Label>
                <Input
                    id="identifier"
                    value={identifier}
                    placeholder="Username or email"
                    type="text"
                    onChange={handleIdentifierOnChange}
                />
                {validators.identifier && (
                    <em className={'text-[10px] italic text-red-300'}>{validators.identifier}</em>
                )}
            </LabelInputContainer>

            <button className="group/btn relative mb-6 block h-10 w-full rounded-md bg-green-700 font-medium text-white transition-all duration-300 ease-in-out hover:bg-green-800">
                Reset Password &rarr;
                <BottomGradient />
            </button>

            <div className="text-[#8c8c8c]">
                <p className={'text-center'}>
                    <Link to={config.routes.login} className="font-bold text-white">
                        Already have an account? Log in here!
                    </Link>{' '}
                </p>
            </div>
        </form>
    );
};

const ResetPasswordForm = ({ step }) => {
    const [validators, setValidators] = useState({});
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleNewPasswordOnChange = (e) => {
        setNewPassword(e.target.value);
        setValidators((pre) => ({ ...pre, newPassword: null }));
    };
    const handleConfirmNewPasswordOnChange = (e) => {
        setConfirmNewPassword(e.target.value);
        setValidators((pre) => ({ ...pre, confirmNewPassword: null }));
    };

    const handleOtpOnChange = (e) => {
        setOtp(e.target.value);
        setValidators((pre) => ({ ...pre, otp: null }));
    };

    const handleSubmit = (e) => {
        setValidators({});
        e.preventDefault();
        resetPassword({
            otp,
            newPassword,
            confirmNewPassword,
            identifier: step.identifier,
        })
            .then((user) => {
                showToast('Password reset successful', 'success', 3000);
                navigate(config.routes.login);
            })
            .catch((err) => setValidators(parseValidationErrors(err)));
    };

    return (
        <form className={'my-8 min-w-96'}>
            <LabelInputContainer className="mb-8">
                <Label
                    htmlFor="newPassword"
                    className={classNames('mb-3', {
                        '!text-red-500': validators.otp,
                    })}
                >
                    OTP
                </Label>
                <Input id="otp" value={otp} placeholder="Enter OTP" type="text" onChange={handleOtpOnChange} />
                {validators.otp && <em className={'text-[10px] italic text-red-300'}>{validators.otp}</em>}
            </LabelInputContainer>

            <LabelInputContainer className="mb-8">
                <Label
                    htmlFor="newPassword"
                    className={classNames('mb-3', {
                        '!text-red-500': validators.newPassword,
                    })}
                >
                    New Password
                </Label>
                <Input
                    id="username"
                    value={newPassword}
                    placeholder="••••••••"
                    type="password"
                    onChange={handleNewPasswordOnChange}
                />
                {validators.newPassword && (
                    <em className={'text-[10px] italic text-red-300'}>{validators.newPassword}</em>
                )}
            </LabelInputContainer>

            <LabelInputContainer className="mb-8">
                <Label
                    htmlFor="confirmNewPassword"
                    className={classNames('mb-3', {
                        '!text-red-500': validators.confirmNewPassword,
                    })}
                >
                    Confirm password
                </Label>
                <Input
                    id="confirmNewPassword"
                    value={confirmNewPassword}
                    placeholder="••••••••"
                    type="password"
                    onChange={handleConfirmNewPasswordOnChange}
                />
                {validators.confirmNewPassword && (
                    <em className={'text-[10px] italic text-red-300'}>{validators.confirmNewPassword}</em>
                )}
            </LabelInputContainer>

            <button
                onClick={handleSubmit}
                className="group/btn relative mb-6 block h-10 w-full rounded-md bg-green-700 font-medium text-white transition-all duration-300 ease-in-out hover:bg-green-800"
            >
                Save password &rarr;
                <BottomGradient />
            </button>
        </form>
    );
};
ResetPasswordForm.propTypes = {
    step: PropTypes.object,
};
