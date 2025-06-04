import type { SubredditRules } from "./types";

export const entrepreneurRules: SubredditRules = {
    name: "r/Entrepreneur",
    description: "Rules specific to the r/Entrepreneur subreddit",
    checks: [
        {
            id: "no-promotion",
            description: "No self-promotion or direct sales",
            test: (content: string) => {
                const promotionPatterns = [
                    /sign\s?up|buy\s?now|check\s?(out)?\s(my)?\s?(site|product)|pm\s?me/i,
                    /limited\s?time|special\s?offer|discount|promo\s?code/i,
                    /join\s?(my|our)\s?(community|discord|slack)/i,
                    /subscribe\s?(to|for)/i,
                    /dm\s?me|message\s?me|contact\s?me/i,
                    /check\s?(my|our)\s?(profile|bio|website)/i
                ];
                return promotionPatterns.some(pattern => pattern.test(content));
            },
            message: "Self-promotion and direct sales are not allowed. Focus on sharing valuable insights and experiences instead.",
            penalty: -20,
        },
        {
            id: "no-personal-attacks",
            description: "No personal attacks or hostility",
            test: (content: string) => {
                const attackPatterns = [
                    /(you\s+are|you're)\s+(stupid|dumb|idiot|moron)/i,
                    /(fuck\s+you|fuck\s+off)/i,
                    /(kill\s+yourself|kys)/i,
                    /(you\s+don't\s+know\s+what\s+you're\s+talking\s+about)/i
                ];
                return attackPatterns.some(pattern => pattern.test(content));
            },
            message: "Personal attacks and hostile behavior are not tolerated. Keep discussions professional and constructive.",
            penalty: -25,
        },
        {
            id: "links-as-supporting-material",
            description: "Links must be supporting material only",
            test: (content: string) => {
                const hasLink = /(https?:\/\/)/i.test(content);
                const shortText = content.trim().length < 200;
                const hasContext = /(context|background|explanation|details)/i.test(content);
                return hasLink && (shortText || !hasContext);
            },
            message: "When sharing links, provide sufficient context and explanation within the Reddit post itself.",
            penalty: -15,
        },
        {
            id: "no-get-rich-quick",
            description: "No get rich quick schemes",
            test: (content: string) => {
                const quickMoneyPatterns = [
                    /(how\s+to\s+make\s+\$\d+(\s+quick|\s+fast|\s+easy))/i,
                    /(get\s+rich\s+quick|make\s+money\s+fast)/i,
                    /(passive\s+income\s+without\s+work)/i,
                    /(easy\s+way\s+to\s+make\s+money)/i
                ];
                return quickMoneyPatterns.some(pattern => pattern.test(content));
            },
            message: "Get rich quick schemes and low-effort money-making posts are not allowed. Focus on legitimate business discussions.",
            penalty: -20,
        },
        {
            id: "unprofessional-communication",
            description: "Maintain professional communication",
            test: (content: string) => {
                const unprofessionalPatterns = [
                    /(fuck|shit|damn|bitch|ass)/i,
                    /(lol|rofl|lmao)/i,
                    /(bro|dude|man)/i,
                    /(wtf|omg|smh)/i
                ];
                return unprofessionalPatterns.some(pattern => pattern.test(content));
            },
            message: "Maintain professional communication standards. Avoid excessive slang, profanity, or unprofessional language.",
            penalty: -10,
        },
        {
            id: "free-offerings-outside-thread",
            description: "Free offerings must be in Thank You Thursday thread",
            test: (content: string) => {
                const offeringPatterns = [
                    /(free|complimentary|no\s+cost)/i,
                    /(offer|giveaway|promotion)/i,
                    /(discount|deal|special)/i
                ];
                return offeringPatterns.some(pattern => pattern.test(content));
            },
            message: "Free offerings and promotions should be posted in the weekly Thank You Thursday thread.",
            penalty: -15,
        },
        {
            id: "duplicate-content",
            description: "No duplicate or blog-style content",
            test: (content: string) => {
                const blogPatterns = [
                    /(my\s+thoughts|my\s+opinion|i\s+think)/i,
                    /(just\s+sharing|wanted\s+to\s+share)/i,
                    /(day\s+\d+|update\s+\d+)/i
                ];
                return blogPatterns.some(pattern => pattern.test(content)) && content.length < 300;
            },
            message: "Avoid posting personal blog-style content or duplicate posts. Focus on unique, valuable discussions.",
            penalty: -10,
        },
        {
            id: "investment-solicitation",
            description: "No investment solicitation",
            test: (content: string) => {
                const investmentPatterns = [
                    /(invest|investment|crypto|bitcoin|ethereum)/i,
                    /(roi|return\s+on\s+investment)/i,
                    /(trading|traders|market)/i,
                    /(ico|token|coin)/i
                ];
                return investmentPatterns.some(pattern => pattern.test(content));
            },
            message: "Investment discussions and cryptocurrency topics should be posted in dedicated investment subreddits.",
            penalty: -15,
        }
    ],
}; 