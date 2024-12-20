import images from '~/assets/images/index.js';
import SignInForm from '~/pages/Login/SignInForm.jsx';
import BackgroundLines from '~/components/ui-aceternity/BackgroundLines/BackgroundLines.jsx';

function Login() {
    return (
        <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
            <Background />
            <BackgroundLines className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
                <SignInForm className="relative min-h-max" />
            </BackgroundLines>
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
