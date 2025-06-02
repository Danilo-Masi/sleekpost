import type { SubredditRules } from "./types";

export const saasRules: SubredditRules = {
    name: "r/SaaS",
    description: "Rules specific to the r/SaaS subreddit",
    checks: [
        {
            id: "no-direct-sales",
            description: "Avoid direct sales or low effort self promotion.",
            test: (content: string) => {
                return /(sign\s?up|buy\s?now|check\s?(out)?\s(my)?\s?(site|product)|pm\s?me)/i.test(content);
            },
            message:
                "Your post looks like direct sales or low effort self promotion. Try to make it helpful and relevant to others instead.",
            penalty: -20,
        },
        {
            id: "feedback-in-weekly-thread",
            description: "Feedback requests must go in the weekly feedback thread.",
            test: (content: string) => {
                return /(feedback|can\s+i\s+get\s+your\s+thoughts|what\s+do\s+you\s+think)/i.test(content);
            },
            message:
                "Feedback requests are only allowed in the weekly feedback thread. Please post them there to follow the community rules.",
            penalty: -15,
        },
        {
            id: "not-saas-related",
            description: "Content must be clearly related to SaaS or business topics.",
            test: (content: string) => {
                const relevantKeywords = ["saas", "startup", "launch", "users", "churn", "growth", "revenue", "mrr", "customer"];
                const matchCount = relevantKeywords.filter((kw) => content.toLowerCase().includes(kw)).length;
                return matchCount < 2;
            },
            message:
                "Your post may not be clearly related to SaaS or business. Make sure it's helpful and on topic for the subreddit.",
            penalty: -15,
        },
        {
            id: "blog-post-no-value",
            description: "Blog posts must add real value inside the Reddit post.",
            test: (content: string) => {
                const hasLink = /(https?:\/\/)/i.test(content);
                const shortText = content.trim().length < 150;
                return hasLink && shortText;
            },
            message:
                "If you're sharing a blog post, make sure your Reddit post explains the main points. Don't just link to your article.",
            penalty: -10,
        },
        {
            id: "link-not-at-end",
            description: "Links should appear only at the end of the post.",
            test: (content: string) => {
                const linkIndex = content.search(/https?:\/\//i);
                return linkIndex !== -1 && linkIndex < content.length - 100;
            },
            message:
                "Place any external links at the very end of your post. This helps keep the focus on the value of your content.",
            penalty: -5,
        },
    ],
};