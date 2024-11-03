import images from '~/assets/images/index.js';
import SignInForm from '~/pages/user/Login/SignInForm.jsx';
import classNames from 'classnames';

function Login() {
    const image = images.backgroundLogin.slice(1);
    return (
        <div className={classNames('h-screen bg-cover bg-center', `bg-[url('${image}')]`)}>
            <SignInForm className="relative mx-auto" />
        </div>
    );
}

export default Login;
