import { PartyPopper } from "lucide-react";
import BannerContainer from "./custom/BannerContainer";
import { Button } from "./ui/button";
import face1 from '../assets/face1.webp';
import face2 from '../assets/face2.webp';
import face3 from '../assets/face3.webp';
import face4 from '../assets/face4.webp';
import face5 from '../assets/face5.webp';

const testimonials = [
    {
        image: face1,
        description: "I'm a founder, and this got me more upvotes without guessing the best time.",
    },
    {
        image: face2,
        description: "As a dev, I love how easy it is to schedule and forget.",
    },
    {
        image: face3,
        description: "I finally hit peak hours and people actually saw my content.",
    },
    {
        image: face4,
        description: "No more posting at random. Now I just schedule and focus.",
    },
    {
        image: face5,
        description: "Reddit was confusing. This made it simple, and it works.",
    },
];

function Testimonial() {
    return (
        <div className="w-full h-full overflow-scroll flex flex-col gap-6">
            {testimonials.map((item, index) => (
                <div key={index} className="w-full flex gap-3 items-center justify-start">
                    <img src={item.image} alt={`testimonial` + index} className="w-10 h-10 rounded-full" />
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
    );
}

export default function BannerAds() {
    const handlePublish = () => {
        const url = "https://www.postonreddit.com/?ref=sleekpost_banner";
        window.open(url, "_blank", "noopener,noreferrer");
    };
    return (
        <BannerContainer hidden={false}>
            <h1 className="font-bold text-2xl">
                Boost your Reddit reach by <span className="text-orange-600 italic">44%</span>
            </h1>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
                <li>Discover the best time to post</li>
                <li>Schedule posts in advance</li>
                <li>Get smart insights on your profile</li>
            </ul>
            <Button
                className="bg-orange-600 hover:bg-orange-600/90 w-full cursor-pointer"
                onClick={handlePublish}>
                Launch a viral post<PartyPopper />
            </Button>
            <Testimonial />
        </BannerContainer>
    );
}
