import type { SubredditRules } from "./types";

export const entrepreneurRideAlongRules: SubredditRules = {
    name: "r/EntrepreneurRideAlong",
    description: "Rules specific to the r/EntrepreneurRideAlong subreddit",
    checks: [
        {
            id: "be-respectful",
            description: "Be respectful and kind to others",
            test: (content: string) => {
                const disrespectfulPatterns = [
                    /(you\s+are|you're)\s+(stupid|dumb|idiot|moron)/i,
                    /(fuck\s+you|fuck\s+off)/i,
                    /(kill\s+yourself|kys)/i,
                    /(you\s+don't\s+know\s+what\s+you're\s+talking\s+about)/i,
                    /(hate|stupid|dumb|idiot|moron)/i,
                    /(racist|sexist|homophobic|transphobic)/i
                ];
                return disrespectfulPatterns.some(pattern => pattern.test(content));
            },
            message: "Harassment, personal attacks, and hate speech are not tolerated. Keep the community welcoming and supportive.",
            penalty: -25,
        },
        {
            id: "follow-reddit-rules",
            description: "Follow Reddit's global rules",
            test: (content: string) => {
                const redditViolationPatterns = [
                    /(spam|scam|phishing)/i,
                    /(illegal|unlawful|against\s+the\s+law)/i,
                    /(porn|nsfw|explicit)/i,
                    /(dox|doxx|personal\s+information)/i,
                    /(vote\s+manipulation|brigading)/i
                ];
                return redditViolationPatterns.some(pattern => pattern.test(content));
            },
            message: "Ensure all content follows Reddit's terms and conditions. No spam, illegal content, or vote manipulation.",
            penalty: -30,
        },
        {
            id: "good-intent",
            description: "Engage with good intent",
            test: (content: string) => {
                const negativePatterns = [
                    /(this\s+is\s+stupid|this\s+is\s+dumb)/i,
                    /(waste\s+of\s+time|pointless)/i,
                    /(nobody\s+cares|who\s+cares)/i,
                    /(this\s+won't\s+work|this\s+will\s+fail)/i,
                    /(you're\s+wrong|you're\s+incorrect)/i
                ];
                return negativePatterns.some(pattern => pattern.test(content));
            },
            message: "Approach discussions with openness and a desire to help others succeed. Avoid negative or dismissive comments.",
            penalty: -15,
        }
    ],
};