import images from '~/assets/images/index.js';
import SignInForm from '~/pages/user/Login/SignInForm.jsx';
import { div } from 'framer-motion/m';

function Login() {
    return (
        <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
            <Background />
            <SignInForm className="relative min-h-max" />
        </div>
    );
}

const Background = () => (
    <img
        src={images.backgroundLogin}
        className="absolute end-0 left-0 right-0 top-0 h-full w-full object-cover brightness-[50%]"
        alt=""
    />
);

export default Login;
