import BannerContainer from "./custom/BannerContainer";

const externalLink = () => {
    return (
        <div className="w-full h-fit flex flex-col gap-1">
            <p className="text-sm text-gray-600">App by <span><a href="https://www.reddit.com/user/WerewolfCapital4616" target="_blank" className="underline hover:text-gray-400">dmasiii</a></span></p>
            <p className="text-sm text-gray-600">Affiliated with <span><a href="https://www.postonreddit.com" target="_blank" className="underline hover:text-gray-400">postonreddit</a></span></p>
            <p className="text-sm text-gray-600">Made in <span><a href="https://it.wikipedia.org/wiki/Unione_europea" target="_blank">🇪🇺</a></span></p>
        </div>
    );
}

export default function BannerCriteria() {
    return (
        <BannerContainer hidden={true}>
            <h1 className="font-bold text-xl">
                How does SleekPost calculate your score?
            </h1>
            <p className="text-sm text-gray-600 text-balance">
                SleekPost analyzes your title and content using a set of custom rules and guidelines inspired by what typically works well on Reddit.
                The score is meant to help you improve clarity, structure, and alignment with subreddit expectations, not to predict virality.
            </p>
            <ul className="list-disc list-outside text-sm text-gray-700 space-y-2 mt-4 ml-4 text-balance">
                <li><strong>Title strength:</strong> Is your title clear, relevant, and engaging?</li>
                <li><strong>Content quality:</strong> Is your post easy to read, well structured, and valuable to others?</li>
                <li><strong>Subreddit fit:</strong> Does your post follow the tone and common rules of the selected subreddit?</li>
                <li><strong>Link usage:</strong> Are links used appropriately and not too promotional?</li>
                <li><strong>Length & formatting:</strong> Is your content concise, well paced, and visually readable?</li>
            </ul>
            <p className="text-sm text-gray-600 mt-4 text-balance">
                Keep in mind: a high score doesn't guarantee your post will go viral, and a low score doesn't mean it won't succeed.
                Reddit is a dynamic platform, this score is just a helpful guide to make your post more aligned with best practices.
            </p>
            {externalLink()}
        </BannerContainer>
    );
}