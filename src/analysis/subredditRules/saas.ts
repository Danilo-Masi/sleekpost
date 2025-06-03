import type { SubredditRules } from "./types";

export const saasRules: SubredditRules = {
    name: "r/SaaS",
    description: "Rules specific to the r/SaaS subreddit",
    checks: [
        {
            id: "no-direct-sales",
            description: "Avoid direct sales or low effort self promotion.",
            test: (content: string) => {
                const salesPatterns = [
                    /sign\s?up|buy\s?now|check\s?(out)?\s(my)?\s?(site|product)|pm\s?me/i,
                    /limited\s?time|special\s?offer|discount|promo\s?code/i,
                    /join\s?(my|our)\s?(community|discord|slack)/i,
                    /subscribe\s?(to|for)/i
                ];
                return salesPatterns.some(pattern => pattern.test(content));
            },
            message: "Your post looks like direct sales or low effort self promotion. Focus on sharing valuable insights and experiences instead.",
            penalty: -20,
        },
        {
            id: "feedback-in-weekly-thread",
            description: "Feedback requests must go in the weekly feedback thread.",
            test: (content: string) => {
                const feedbackPatterns = [
                    /(feedback|can\s+i\s+get\s+your\s+thoughts|what\s+do\s+you\s+think)/i,
                    /(review|critique|opinion|suggestions)/i,
                    /(how\s+does\s+it\s+look|what\s+should\s+i\s+change)/i
                ];
                return feedbackPatterns.some(pattern => pattern.test(content));
            },
            message: "Feedback requests belong in the weekly feedback thread. Please post there to follow community guidelines.",
            penalty: -15,
        },
        {
            id: "not-saas-related",
            description: "Content must be clearly related to SaaS or business topics.",
            test: (content: string) => {
                const relevantKeywords = {
                    business: ["saas", "startup", "business", "company", "enterprise"],
                    metrics: ["mrr", "arr", "churn", "cac", "ltv", "revenue", "growth"],
                    technical: ["api", "integration", "infrastructure", "scaling", "deployment"],
                    marketing: ["acquisition", "conversion", "retention", "pricing", "market"],
                    product: ["feature", "roadmap", "development", "launch", "beta"]
                };

                let score = 0;
                Object.values(relevantKeywords).forEach(category => {
                    const matches = category.filter(keyword => 
                        content.toLowerCase().includes(keyword)
                    ).length;
                    if (matches > 0) score += 1;
                });

                return score < 2;
            },
            message: "Your post should be more focused on SaaS topics. Include relevant business metrics, technical details, or market insights.",
            penalty: -15,
        },
        {
            id: "blog-post-no-value",
            description: "Blog posts must add real value inside the Reddit post.",
            test: (content: string) => {
                const hasLink = /(https?:\/\/)/i.test(content);
                const shortText = content.trim().length < 200;
                const hasSummary = /(summary|key\s+points|main\s+takeaways|tl;?dr)/i.test(content);
                return hasLink && (shortText || !hasSummary);
            },
            message: "When sharing external content, provide a detailed summary of key points and your own insights in the Reddit post.",
            penalty: -10,
        },
        {
            id: "link-not-at-end",
            description: "Links should appear only at the end of the post.",
            test: (content: string) => {
                const linkIndex = content.search(/https?:\/\//i);
                return linkIndex !== -1 && linkIndex < content.length - 150;
            },
            message: "Place external links at the end of your post. Focus on providing value in the Reddit post itself.",
            penalty: -5,
        },
        {
            id: "missing-context",
            description: "Posts should provide proper context and background.",
            test: (content: string) => {
                const contextIndicators = [
                    /(i|we)\s+(started|began|launched|created)/i,
                    /(our|my)\s+(journey|experience|story)/i,
                    /(problem|challenge|issue)\s+(we|i)\s+(faced|encountered)/i
                ];
                return !contextIndicators.some(pattern => pattern.test(content));
            },
            message: "Provide more context about your SaaS journey, challenges faced, and lessons learned.",
            penalty: -10,
        },
        {
            id: "low-effort-question",
            description: "Questions should be specific and show research effort.",
            test: (content: string) => {
                const lowEffortPatterns = [
                    /(how|what|why)\s+do\s+i\s+start/i,
                    /(best|good)\s+(way|method|approach)/i,
                    /(tips|advice|suggestions)/i
                ];
                return lowEffortPatterns.some(pattern => pattern.test(content)) && content.length < 300;
            },
            message: "Make your questions more specific and show that you've done some research. Include your current situation and specific challenges.",
            penalty: -8,
        },
        {
            id: "missing-metrics",
            description: "Include relevant business metrics when sharing success/failure stories.",
            test: (content: string) => {
                const hasMetrics = /(mrr|arr|revenue|users|customers|growth|churn)/i.test(content);
                const isStory = /(success|failure|journey|experience|story)/i.test(content);
                return isStory && !hasMetrics;
            },
            message: "Include relevant metrics (MRR, users, growth, etc.) to make your story more valuable to the community.",
            penalty: -7,
        }
    ],
};