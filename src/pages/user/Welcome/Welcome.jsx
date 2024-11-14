import { useNavigate } from 'react-router-dom';

function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full bg-primary">
            <div className="flex h-full w-full items-center justify-center">
                <button
                    onClick={() => navigate('/home')}
                    className="h-10 w-20 rounded-2xl border border-black bg-green-700"
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Welcome;
