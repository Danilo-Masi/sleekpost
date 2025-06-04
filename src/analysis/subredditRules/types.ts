export type RuleCheck = {
    id: string;
    description: string;
    test: (content: string) => boolean;
    message: string;
    penalty?: number;
};

export type SubredditRules = {
    name: string;
    description: string;
    checks: RuleCheck[];
};