export function evaluateTitle(title: string): { delta: number; suggestions: string[] } {
    const suggestions: string[] = [];
    let delta = 0;

    // Length checks with stricter scoring
    if (title.length < 15) {
        delta -= 15;
        suggestions.push("Your title is too short. Aim for 15-60 characters for optimal engagement.");
    } else if (title.length < 30) {
        delta -= 5;
        suggestions.push("Your title could be more descriptive. Try adding more context.");
    } else if (title.length < 60) {
        delta += 5;
        suggestions.push("Good title length! This is optimal for Reddit.");
    } else {
        delta -= 5;
        suggestions.push("Your title is quite long. Shorter titles are easier to read and understand.");
    }

    // Emoji check
    if (/[\u{1F600}-\u{1F6FF}]/u.test(title)) {
        delta -= 8;
        suggestions.push("Avoid using emojis in your title. Keep it clean and professional.");
    }

    // Empty check
    if (/^\s*$/.test(title)) {
        delta -= 25;
        suggestions.push("Your title can't be empty.");
    }

    // Text content check
    if (!/[A-Za-z]/.test(title)) {
        delta -= 15;
        suggestions.push("Your title must include actual words.");
    }

    // Question mark check with context
    if (title.includes('?')) {
        const questionWords = ['how', 'why', 'what', 'when', 'where', 'which', 'who'];
        const hasQuestionWord = questionWords.some(word => title.toLowerCase().includes(word));
        if (hasQuestionWord) {
            delta += 5;
            suggestions.push("Great use of a question! This encourages discussion.");
        } else {
            delta += 2;
            suggestions.push("Questions can drive engagement, but try to be more specific.");
        }
    }

    // Number check with context
    if (/\d+/.test(title)) {
        const hasContext = /(?:steps|ways|tips|tricks|days|months|years|dollars|%|percent)/i.test(title);
        if (hasContext) {
            delta += 4;
            suggestions.push("Great use of numbers with context! This adds credibility.");
        } else {
            delta += 1;
            suggestions.push("Numbers can be effective, but try to give them context.");
        }
    }

    // Power words check with categories
    const powerWords = {
        engagement: ['how', 'why', 'what', 'guide', 'tutorial', 'tips', 'tricks'],
        value: ['best', 'top', 'ultimate', 'complete', 'comprehensive'],
        urgency: ['now', 'today', 'quick', 'fast', 'easy'],
        credibility: ['proven', 'tested', 'verified', 'official', 'expert']
    };

    let powerWordScore = 0;
    Object.entries(powerWords).forEach(([category, words]) => {
        if (words.some(word => title.toLowerCase().includes(word))) {
            powerWordScore += 2;
            suggestions.push(`Good use of ${category} words! This helps with engagement.`);
        }
    });
    delta += Math.min(powerWordScore, 6); // Cap the power word bonus

    // Personal pronoun check with context
    if (/^i['']?m|^i am|^my|^we/i.test(title)) {
        const hasStory = /(?:built|created|made|launched|started|learned|discovered)/i.test(title);
        if (hasStory) {
            delta += 4;
            suggestions.push("Great personal story title! This creates connection.");
        } else {
            delta += 1;
            suggestions.push("Personal titles work well, but try to hint at the story.");
        }
    }

    // Clickbait detection
    const clickbaitPatterns = [
        /you won['']?t believe/i,
        /shocking/i,
        /never seen before/i,
        /mind.?blowing/i,
        /this will change/i
    ];
    if (clickbaitPatterns.some(pattern => pattern.test(title))) {
        delta -= 10;
        suggestions.push("Avoid clickbait style titles. Be authentic and direct.");
    }

    // Clarity check
    const clarityScore = title.split(/\s+/).length;
    if (clarityScore < 3) {
        delta -= 5;
        suggestions.push("Your title is too vague. Add more specific details.");
    }

    return { delta, suggestions };
}

export function evaluateContent(content: string): { delta: number; suggestions: string[] } {
    const suggestions: string[] = [];
    let delta = 0;

    const wordCount = content.trim().split(/\s+/).length;
    const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);

    // Length checks with stricter scoring
    if (wordCount < 100) {
        delta -= 20;
        suggestions.push("Your content is too short. Aim for at least 200 words for a meaningful post.");
    } else if (wordCount < 200) {
        delta -= 10;
        suggestions.push("Your content is quite short. Try to explain your story or idea more thoroughly.");
    } else if (wordCount < 500) {
        delta += 5;
        suggestions.push("Good length! This is optimal for Reddit engagement.");
    } else if (wordCount < 1000) {
        delta += 8;
        suggestions.push("Excellent length! This provides good depth while maintaining readability.");
    } else {
        delta += 5;
        suggestions.push("Your content is comprehensive, but consider breaking it into multiple posts if it's too long.");
    }

    // Emoji check
    if (/[\u{1F600}-\u{1F6FF}]/u.test(content)) {
        delta -= 8;
        suggestions.push("Avoid using emojis in your post. Focus on clear and professional writing.");
    }

    // Empty check
    if (/^\s*$/.test(content)) {
        delta -= 25;
        suggestions.push("Your post can't be empty.");
    }

    // Text content check
    if (!/[A-Za-z]/.test(content)) {
        delta -= 15;
        suggestions.push("Your post should include readable text.");
    }

    // Structure analysis with more detailed checks
    const structureElements = {
        intro: /(?:i (started|began|was working on)|here's how|first|introduction|overview)/i,
        body: /(?:then|next|after|during|while|when|because|since)/i,
        conclusion: /(?:finally|in conclusion|to summarize|in summary|now|currently)/i
    };

    let structureScore = 0;
    if (structureElements.intro.test(content)) {
        structureScore += 3;
        suggestions.push("Good introduction! This helps readers understand the context.");
    }
    if (structureElements.body.test(content)) {
        structureScore += 3;
        suggestions.push("Well-structured body! The flow is clear and logical.");
    }
    if (structureElements.conclusion.test(content)) {
        structureScore += 3;
        suggestions.push("Strong conclusion! This wraps up your story effectively.");
    }

    if (structureScore < 6) {
        delta -= 5;
        suggestions.push("Try to structure your post with a clear introduction, body, and conclusion.");
    } else {
        delta += structureScore;
    }

    // Paragraph structure with quality checks
    if (paragraphs.length < 3) {
        delta -= 8;
        suggestions.push("Break your content into more paragraphs for better readability.");
    } else if (paragraphs.length > 15) {
        delta -= 5;
        suggestions.push("Consider combining some paragraphs to improve flow.");
    } else {
        // Check paragraph quality
        const shortParagraphs = paragraphs.filter(p => p.split(/\s+/).length < 10).length;
        if (shortParagraphs > paragraphs.length * 0.3) {
            delta -= 3;
            suggestions.push("Some paragraphs are too short. Try to develop your ideas more fully.");
        } else {
            delta += 5;
            suggestions.push("Good paragraph structure! This makes your post easy to read.");
        }
    }

    // Sentence quality check
    const avgSentenceLength = sentences.reduce((acc, s) => acc + s.split(/\s+/).length, 0) / sentences.length;
    if (avgSentenceLength < 5) {
        delta -= 5;
        suggestions.push("Your sentences are too short. Try to vary sentence length for better flow.");
    } else if (avgSentenceLength > 25) {
        delta -= 5;
        suggestions.push("Some sentences are too long. Break them down for better readability.");
    } else {
        delta += 3;
        suggestions.push("Good sentence structure! This makes your writing engaging.");
    }

    // Personal story elements with more detailed scoring
    const personalElements = {
        journey: /my journey|i built|i made|we launched|we built|side project|started with/i,
        challenges: /challenge|problem|issue|struggle|difficulty|obstacle|roadblock/i,
        solution: /solution|fixed|resolved|overcame|solved|implemented|developed/i,
        results: /result|outcome|achieved|reached|success|growth|improvement|impact/i,
        lessons: /learned|lesson|takeaway|insight|realized|discovered|found/i
    };

    let personalScore = 0;
    Object.entries(personalElements).forEach(([element, pattern]) => {
        if (pattern.test(content)) {
            personalScore += 2;
            suggestions.push(`Great job sharing your ${element}! This adds depth to your story.`);
        }
    });

    delta += Math.min(personalScore, 8); // Cap the personal story bonus

    // Technical content quality
    if (/```|`.*`|\[code\]|<\/?pre>/i.test(content)) {
        const hasExplanation = /(?:explain|how|why|because|reason|purpose)/i.test(content);
        if (hasExplanation) {
            delta += 5;
            suggestions.push("Excellent use of code with explanation! This adds real value.");
        } else {
            delta += 2;
            suggestions.push("Good use of code, but try to explain its purpose.");
        }
    }

    // Links and references with quality check
    const linkCount = (content.match(/https?:\/\/[^\s]+/g) || []).length;
    if (linkCount > 0) {
        const hasContext = /(?:check|see|visit|read|learn|more|details|source)/i.test(content);
        if (hasContext && linkCount <= 3) {
            delta += 4;
            suggestions.push("Great use of references with context! This adds credibility.");
        } else if (linkCount > 3) {
            delta -= 5;
            suggestions.push("Too many links. Focus on quality over quantity.");
        } else {
            delta += 1;
            suggestions.push("Add context to your links to explain their relevance.");
        }
    }

    // Engagement elements
    const engagementElements = {
        questions: /(?:what do you think|how about you|your thoughts|your experience)/i,
        callToAction: /(?:let me know|comment below|share your|discuss|join)/i,
        formatting: /(?:#|##|###|\*\*|\*|>|`)/, // Markdown formatting
    };

    Object.entries(engagementElements).forEach(([element, pattern]) => {
        if (pattern.test(content)) {
            delta += 2;
            suggestions.push(`Good use of ${element}! This encourages reader interaction.`);
        }
    });

    return { delta, suggestions };
}