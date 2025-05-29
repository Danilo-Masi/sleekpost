import { PartyPopper } from "lucide-react";
import BannerContainer from "./custom/BannerContainer";
import { Button } from "./ui/button";

import face1 from '../assets/face1.webp';
import face2 from '../assets/face2.webp';
import face3 from '../assets/face3.webp';
import face4 from '../assets/face4.webp';
import face5 from '../assets/face5.webp';

const testimonials = [
    { image: face1, description: "I doubled my post upvotes in just one week!" },
    { image: face2, description: "Finally, a tool that understands Reddit." },
    { image: face3, description: "Scheduling made my Reddit strategy 10x easier." },
    { image: face4, description: "Simple, powerful, and effective." },
    { image: face5, description: "The analytics helped me write better posts." },
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
            <Button className="bg-orange-600 hover:bg-orange-600/90 w-full cursor-pointer">Launch a viral post<PartyPopper /></Button>
            <Testimonial />
        </BannerContainer>
    );
}
