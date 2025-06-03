import { evaluateTitle, evaluateContent } from "./baseRules";
import { saasRules } from "./subredditRules/saas";

type AnalyzeInput = {
    title: string;
    content: string;
    subreddit?: string;
};

type AnalyzeResult = {
    score: number;
    titleSuggestions: string[];
    contentSuggestions: string[];
};

export function analyzePost({ title, content, subreddit }: AnalyzeInput): AnalyzeResult {
    // Base analysis
    const {
        delta: titleDelta,
        suggestions: titleSuggestionsBase,
    } = evaluateTitle(title);

    const {
        delta: contentDelta,
        suggestions: contentSuggestionsBase,
    } = evaluateContent(content);

    let subredditDelta = 0;
    const subredditSuggestions: string[] = [];

    // Apply subreddit-specific rules if applicable
    if (subreddit?.toLowerCase() === "saas") {
        for (const rule of saasRules.checks) {
            // Controlla se la regola viene violata dal title o dal content
            if (rule.test(title) || rule.test(content)) {
                // penalty è negativo, quindi si somma direttamente
                subredditDelta += rule.penalty ?? -10; // se manca penalty, default a -10
                subredditSuggestions.push(rule.message);
            }
        }
    }

    // Calculate final score (80% base rules, 20% subreddit rules)
    const baseScore = 100 + titleDelta + contentDelta;
    const finalScore = subreddit
        ? Math.round((baseScore * 0.8) + ((100 + subredditDelta) * 0.2))
        : baseScore;

    return {
        score: Math.max(0, Math.min(100, finalScore)),
        titleSuggestions: titleSuggestionsBase,
        contentSuggestions: [...contentSuggestionsBase, ...subredditSuggestions],
    };
}
