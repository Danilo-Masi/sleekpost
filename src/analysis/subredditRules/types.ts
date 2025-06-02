export type RuleCheck = {
    /** Unique identifier for the rule */
    id: string;

    /** Human-readable description of the rule (not shown to users) */
    description: string;

    /** Function that returns true if the content violates this rule */
    test: (content: string) => boolean;

    /** Message to show to the user when this rule is triggered */
    message: string;

    /** Penalty score to apply if the rule is violated (default can be -10) */
    penalty?: number;
};

export type SubredditRules = {
    /** Name of the subreddit, e.g. "r/SaaS" */
    name: string;

    /** Short description or purpose of this rule set */
    description: string;

    /** List of specific rule checks for this subreddit */
    checks: RuleCheck[];
};