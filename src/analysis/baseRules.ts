export function evaluateTitle(title: string): { delta: number; suggestions: string[] } {
    const suggestions: string[] = [];
    let delta = 0;

    if (title.length < 10) {
        delta -= 10;
        suggestions.push("Your title is too short. Try adding a bit more context or detail.");
    }

    if (title.length > 150) {
        delta -= 5;
        suggestions.push("Your title is quite long. Shorter titles are easier to read and understand.");
    }

    if (/[\u{1F600}-\u{1F6FF}]/u.test(title)) {
        delta -= 5;
        suggestions.push("Avoid using emojis in your title. Keep it clean and professional.");
    }

    if (/^\s*$/.test(title)) {
        delta -= 20;
        suggestions.push("Your title can't be empty.");
    }

    if (!/[A-Za-z]/.test(title)) {
        delta -= 10;
        suggestions.push("Your title must include actual words.");
    }

    return { delta, suggestions };
}

export function evaluateContent(content: string): {
    delta: number;
    suggestions: string[];
} {
    const suggestions: string[] = [];
    let delta = 0;

    const wordCount = content.trim().split(/\s+/).length;

    if (wordCount < 50) {
        delta -= 10;
        suggestions.push("Your content is too short. Try to explain your story or idea more clearly.");
    }

    if (wordCount > 1500) {
        delta -= 5;
        suggestions.push("Your content is very long. Try making it more concise.");
    }

    if (/[\u{1F600}-\u{1F6FF}]/u.test(content)) {
        delta -= 5;
        suggestions.push("Avoid using emojis in your post. Focus on clear and helpful writing.");
    }

    if (/^\s*$/.test(content)) {
        delta -= 20;
        suggestions.push("Your post can't be empty.");
    }

    if (!/[A-Za-z]/.test(content)) {
        delta -= 10;
        suggestions.push("Your post should include readable text.");
    }

    // Heuristic: checks for a narrative structure (intro → development → conclusion)
    const hasStructure = /(?:i (started|began|was working on)|here's how|first|then|eventually|finally|now)/i.test(content);
    if (!hasStructure) {
        delta -= 5;
        suggestions.push("Try to structure your post with an intro, a middle, and a clear ending.");
    }

    // Heuristic: personal story = +points
    if (/i['’]?m|i am|my journey|i built|i made|we launched|we built|side project/i.test(content)) {
        delta += 5;
        suggestions.push("Personal stories work well on Reddit. Keep sharing your experience.");
    }

    return { delta, suggestions };
}