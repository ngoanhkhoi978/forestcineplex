import Billboard from '~/pages/user/Home/Billboard/Billboard.jsx';
import { ExpandableCardDemo } from '~/components/ui-aceternity/ExpandableCard/ExpandableCard.jsx';

function Home() {
    return (
        <div>
            <Billboard />
            <div className="container relative z-20 mx-auto">
                <ExpandableCardDemo />
            </div>
        </div>
    );
}

export default Home;
