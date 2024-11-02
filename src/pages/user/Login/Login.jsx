import images from '~/assets/images/index.js';
import SignInForm from '~/components/ui-aceternity/SignInForm/SignInForm.jsx';

function Login() {
    return (
        <div className="relative">
            <img className="absolute bottom-0 left-0 right-0 top-0 z-0" src={images.backgroundLogin} alt="" />
            <SignInForm className="relative mx-auto" />
        </div>
    );
}

export default Login;
