export function evaluateTitle(title: string): { delta: number; suggestions: string[] } {
    const suggestions: string[] = [];
    let delta = 0;

    // Length checks
    if (title.length < 10) {
        delta -= 10;
        suggestions.push("Your title is too short. Try adding more context or detail.");
    } else if (title.length < 30) {
        delta += 5;
        suggestions.push("Good title length! This is optimal for Reddit.");
    }

    if (title.length > 150) {
        delta -= 5;
        suggestions.push("Your title is quite long. Shorter titles are easier to read and understand.");
    }

    // Emoji check
    if (/[\u{1F600}-\u{1F6FF}]/u.test(title)) {
        delta -= 5;
        suggestions.push("Avoid using emojis in your title. Keep it clean and professional.");
    }

    // Empty check
    if (/^\s*$/.test(title)) {
        delta -= 20;
        suggestions.push("Your title can't be empty.");
    }

    // Text content check
    if (!/[A-Za-z]/.test(title)) {
        delta -= 10;
        suggestions.push("Your title must include actual words.");
    }

    // Question mark check
    if (title.includes('?')) {
        delta += 3;
        suggestions.push("Good use of a question! Questions often drive engagement.");
    }

    // Number check
    if (/\d+/.test(title)) {
        delta += 2;
        suggestions.push("Numbers in titles can increase click-through rates!");
    }

    // Power words check
    const powerWords = ['how', 'why', 'what', 'best', 'top', 'ultimate', 'guide', 'tutorial', 'tips', 'tricks'];
    const hasPowerWord = powerWords.some(word => title.toLowerCase().includes(word));
    if (hasPowerWord) {
        delta += 4;
        suggestions.push("Great use of engaging words! These often perform well on Reddit.");
    }

    // Personal pronoun check
    if (/^i['']?m|^i am|^my|^we/i.test(title)) {
        delta += 3;
        suggestions.push("Personal titles work well! They create connection with readers.");
    }

    return { delta, suggestions };
}

export function evaluateContent(content: string): { delta: number; suggestions: string[] } {
    const suggestions: string[] = [];
    let delta = 0;

    const wordCount = content.trim().split(/\s+/).length;
    const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim().length > 0);

    // Length checks
    if (wordCount < 50) {
        delta -= 10;
        suggestions.push("Your content is too short. Try to explain your story or idea more clearly.");
    } else if (wordCount < 200) {
        delta -= 5;
        suggestions.push("Consider adding more detail to your story. 200-500 words is ideal.");
    } else if (wordCount < 500) {
        delta += 5;
        suggestions.push("Good length! This is optimal for Reddit engagement.");
    }

    if (wordCount > 1500) {
        delta -= 5;
        suggestions.push("Your content is very long. Try making it more concise.");
    }

    // Emoji check
    if (/[\u{1F600}-\u{1F6FF}]/u.test(content)) {
        delta -= 5;
        suggestions.push("Avoid using emojis in your post. Focus on clear and helpful writing.");
    }

    // Empty check
    if (/^\s*$/.test(content)) {
        delta -= 20;
        suggestions.push("Your post can't be empty.");
    }

    // Text content check
    if (!/[A-Za-z]/.test(content)) {
        delta -= 10;
        suggestions.push("Your post should include readable text.");
    }

    // Structure analysis
    const hasStructure = /(?:i (started|began|was working on)|here's how|first|then|eventually|finally|now)/i.test(content);
    if (!hasStructure) {
        delta -= 5;
        suggestions.push("Try to structure your post with an intro, a middle, and a clear ending.");
    } else {
        delta += 5;
        suggestions.push("Great structure! Your post flows well.");
    }

    // Paragraph structure
    if (paragraphs.length < 3) {
        delta -= 3;
        suggestions.push("Try breaking your content into more paragraphs for better readability.");
    } else if (paragraphs.length > 10) {
        delta -= 2;
        suggestions.push("Consider combining some paragraphs to improve flow.");
    } else {
        delta += 3;
        suggestions.push("Good paragraph structure! This makes your post easy to read.");
    }

    // Personal story elements
    const personalElements = {
        journey: /my journey|i built|i made|we launched|we built|side project/i,
        challenges: /challenge|problem|issue|struggle|difficulty/i,
        solution: /solution|fixed|resolved|overcame|solved/i,
        results: /result|outcome|achieved|reached|success/i
    };

    let personalScore = 0;
    if (personalElements.journey.test(content)) {
        personalScore += 2;
        suggestions.push("Great job sharing your journey! This creates connection.");
    }
    if (personalElements.challenges.test(content)) {
        personalScore += 2;
        suggestions.push("Good job discussing challenges! This adds authenticity.");
    }
    if (personalElements.solution.test(content)) {
        personalScore += 2;
        suggestions.push("Nice work explaining your solution! This provides value.");
    }
    if (personalElements.results.test(content)) {
        personalScore += 2;
        suggestions.push("Excellent job sharing results! This completes the story.");
    }

    delta += personalScore;

    // Code blocks or technical content
    if (/```|`.*`|\[code\]|<\/?pre>/i.test(content)) {
        delta += 3;
        suggestions.push("Good use of code blocks! This adds technical value.");
    }

    // Links and references
    const linkCount = (content.match(/https?:\/\/[^\s]+/g) || []).length;
    if (linkCount > 0 && linkCount <= 3) {
        delta += 2;
        suggestions.push("Good use of references! This adds credibility.");
    } else if (linkCount > 3) {
        delta -= 2;
        suggestions.push("Consider reducing the number of links to keep focus.");
    }

    return { delta, suggestions };
}