import Billboard from '~/pages/user/Home/Billboard/Billboard.jsx';
import { ExpandableCardDemo } from '~/components/ExpandableCard/ExpandableCard.jsx';

function Home() {
    return (
        <div>
            <Billboard />
            <div className="container relative z-20 mx-auto mt-[-150px]">
                <ExpandableCardDemo />
            </div>
        </div>
    );
}

export default Home;
