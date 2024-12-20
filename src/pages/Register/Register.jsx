import images from '~/assets/images/index.js';
import RegisterForm from '~/pages/Register/RegisterForm.jsx';
import BackgroundLines from '~/components/ui-aceternity/BackgroundLines/BackgroundLines.jsx';

function Register() {
    return (
        <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
            <Background />
            <BackgroundLines className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
                <RegisterForm className="relative min-h-max" />
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

export default Register;
