import BannerContainer from "./custom/BannerContainer";

export default function BannerCriteria() {
    return (
        <BannerContainer hidden={true}>
            <h1 className="font-bold text-xl">
                How does SleekPost calculate your score?
            </h1>
            <p className="text-sm text-gray-600 text-balance">
                Each post is analyzed using key factors that influence performance on Reddit.
                Here's what we look at when calculating your score:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2 mt-4 text-balance">
                <li><strong>Title effectiveness:</strong> How clear, engaging, and relevant your title is.</li>
                <li><strong>Content clarity:</strong> Whether your post is easy to read and well structured.</li>
                <li><strong>Timing:</strong> If you're posting at a time with high activity in your subreddit.</li>
                <li><strong>Length:</strong> Whether your content is too short or too long for optimal engagement.</li>
                <li><strong>Formatting:</strong> Use of paragraphs, line breaks, and emphasis to improve readability.</li>
                <li><strong>Subreddit compatibility:</strong> How well your content fits the rules and vibe of the target subreddit.</li>
            </ul>
        </BannerContainer>
    );
}