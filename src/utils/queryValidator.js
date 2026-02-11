/**
 * Validates a query against a logical pattern.
 * Supports both SQL (structure-based) and NoSQL (script-based) validation.
 */
export const validateQuery = (generatedCode, expectedPattern) => {
    if (!generatedCode || generatedCode.trim().length === 0) {
        return { isValid: false, message: "Please build a query first." };
    }

    if (!expectedPattern) {
        // Fallback for levels without rigorous pattern definition yet
        return { isValid: true, message: "Structure looks okay." };
    }

    // NoSQL Validation: Exact script matching (with normalization)
    if (expectedPattern.script) {
        const normalizeScript = (str) => str
            .replace(/\s+/g, ' ')           // Collapse whitespace
            .replace(/['"]/g, '"')          // Normalize quotes
            .trim()
            .toUpperCase();

        const normGenerated = normalizeScript(generatedCode);
        const normExpected = normalizeScript(expectedPattern.script);

        if (normGenerated === normExpected) {
            return { isValid: true, message: "Perfect! Query matches expected pattern." };
        } else {
            return {
                isValid: false,
                message: "Query doesn't match the expected pattern. Check your syntax and try again!"
            };
        }
    }

    // SQL Validation: Structure-based (token presence check)
    // Normalize code: Remove extra spaces, newlines, quotes (for easier matching)
    const normCode = generatedCode
        .replace(/\s+/g, ' ') // Collapse whitespace
        .replace(/['\"`]/g, '') // Remove quotes for easier keyword matching
        .toUpperCase();

    // Check missing structures
    // expectedPattern.structures is an array of REQUIRED tokens 
    // e.g. ["SELECT", "FROM", "USERS"]
    const missing = [];

    if (expectedPattern.structures) {
        expectedPattern.structures.forEach(token => {
            const normToken = token.toUpperCase().replace(/['\"`]/g, '');
            if (!normCode.includes(normToken)) {
                missing.push(token);
            }
        });
    }

    if (missing.length > 0) {
        return {
            isValid: false,
            message: `Missing logic: ${missing.join(", ")}`
        };
    }

    // Advanced: Check ordering? (e.g. SELECT comes before FROM)
    // For now, presence check is sufficient for block-based learning
    // since blocks naturally enforce some ordering.

    return { isValid: true, message: "Great! Logic looks correct." };
};
