import { useNavigate } from 'react-router-dom';
import AuroraBackground from '~/components/ui-aceternity/AuroraBackground/AuroraBackground.jsx';
import TypewriterEffectSmooth from '~/components/ui-aceternity/TypewriterEffect/TypewriterEffectSmooth.jsx';
import { SparklesCore } from '~/components/ui-aceternity/SparklesCore/SparklesCore.jsx';

function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full bg-primary">
            <AuroraBackground className={'overflow-hidden'}>
                <div className="flex h-full w-full flex-col items-center justify-center">
                    <div className={'relative p-2'}>
                        <h1 className="relative z-20 text-center text-6xl font-bold leading-none text-white md:text-8xl lg:text-9xl">
                            <span className="text-green-500">Forest</span>Cineplex
                        </h1>
                        <div className="relative">
                            <div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-green-500 to-transparent blur-sm"></div>
                            <div className="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
                            <div className="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-emerald-500 to-transparent blur-sm"></div>
                            <div className="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
                        </div>
                        <SparklesCore
                            background={'transparent'}
                            id={'ForestCineplex'}
                            maxSize={1}
                            particleDensity={1000}
                            className={'absolute bottom-0 left-0 right-0 top-0'}
                        />
                    </div>
                    <TypewriterEffectSmooth
                        words={[
                            {
                                text: 'Unlimited movies, TV Shows, and more ...',
                                className: 'text-xl md:text-3xl lg:text-4xl !text-gray-300',
                            },
                        ]}
                    />
                    <div>
                        <button
                            className="inline-flex h-12 w-36 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#199245,45%,#4ade80,55%,#199245)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-1 focus:ring-green-400 focus:ring-offset-1 focus:ring-offset-slate-50"
                            onClick={() => navigate(`/home`)}
                        >
                            Get started
                        </button>

                        {/*<button className="animate-shimmer inline-flex h-12 w-32 items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#0007,45%,#1e2631,55%,#0007)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-50">*/}
                        {/*    Register*/}
                        {/*</button>*/}

                        {}
                    </div>
                </div>
            </AuroraBackground>
        </div>
    );
}

export default Welcome;
