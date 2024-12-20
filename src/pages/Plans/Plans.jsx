import PlanItem from '~/pages/Plans/PlanItem.jsx';
import { BackgroundBeams } from '~/components/ui-aceternity/BackgroundBeams/BackgroundBeams.jsx';

function Plans() {
    return (
        <div className="container mx-auto pt-header">
            <BackgroundBeams></BackgroundBeams>
            <div className={'flex-col md:mt-[-150px] md:flex md:h-screen md:justify-center'}>
                <p className="bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-center text-4xl font-bold text-transparent">
                    Plans and pricing
                </p>
                <div className={'mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 2xl:gap-32'}>
                    {planItems.map((plan, index) => (
                        <div key={index}>
                            <PlanItem
                                className={'h-96 w-full rounded-xl bg-[#030604]'}
                                details={plan}
                                colors={plan.colors}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const planItems = [
    {
        name: 'Basic',
        descriptions: [
            'Maximum Resolution: 480p',
            'Video Quality: Standard Definition (SD).',
            'Bandwidth Requirement: Low (~1.5 Mbps).',
            'Suitable For: Users who watch on phones or smaller screens.',
        ],
        price: null,
    },
    {
        name: 'Standard',
        descriptions: [
            'Maximum Resolution: 720p',
            'Video Quality: High Definition (HD).',
            'Bandwidth Requirement: Medium (~3 Mbps).',
            'Suitable For: Users wanting sharper visuals on laptops or TVs.',
        ],
        price: '4.99',
        colors: [
            [255, 223, 63],
            [255, 215, 0],
        ],
    },
    {
        name: 'Premium',
        descriptions: [
            'Maximum Resolution: 1080p',
            'Video Quality: Full High Definition (Full HD).',
            'Bandwidth Requirement: High (~5 Mbps).',
            'Suitable For: Large families or users seeking the best video quality on big screens.',
        ],

        price: '9.99',
        colors: [
            [34, 193, 94], // Màu xanh lá
            [50, 205, 50], // Màu xanh lá sáng
        ],
    },
];

export default Plans;
