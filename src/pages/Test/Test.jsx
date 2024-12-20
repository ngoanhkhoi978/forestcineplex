import { CardSpotlight } from '~/components/ui-aceternity/CardSpotlight/CardSpotlight.jsx';
import Slider from '~/components/Slider/Slider.jsx';
import { ExpandableCardDemo } from '~/components/ui-aceternity/ExpandableCard/ExpandableCard.jsx';

function Test() {
    return (
        <div className="pd-header min-h-[2000px] bg-primary">
            <Slider options={{ '2xl': 6, xl: 6, lg: 3, md: 3, sm: 2, default: 2 }}>
                <ExpandableCardDemo name={'1'} />
                <ExpandableCardDemo name={'2'} />
                <ExpandableCardDemo name={'3'} />
                <ExpandableCardDemo name={'4'} />
                <ExpandableCardDemo name={'5'} />
                <ExpandableCardDemo name={'6'} />
                <ExpandableCardDemo name={'7'} />
            </Slider>
        </div>
    );
}

export default Test;
