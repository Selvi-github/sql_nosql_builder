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

    // NoSQL Validation: Script matching with normalization and minor tolerance
    if (expectedPattern.script) {
        const normalizeScript = (str) => str
            .replace(/\s+/g, ' ')           // Collapse whitespace
            .replace(/['"]/g, '"')          // Normalize quotes
            .replace(/\/\"([^\"]*)\"\/([gimsuy]*)/g, '"$1"') // Normalize regex literals with quoted pattern
            .replace(/\/([^/]+)\/([gimsuy]*)/g, '"$1"') // Normalize regex literals
            .replace(/\s*,\s*/g, ',')       // Normalize comma spacing
            .replace(/\s*:\s*/g, ':')       // Normalize colon spacing
            .replace(/\s*([.(){}\[\]])\s*/g, '$1') // Normalize spacing around punctuation
            .replace(/;+\s*$/g, '')          // Drop trailing semicolons
            .trim()
            .toUpperCase();

        const normGenerated = normalizeScript(generatedCode);
        const normExpected = normalizeScript(expectedPattern.script);

        if (normGenerated === normExpected) {
            return { isValid: true, message: "Perfect! Query matches expected pattern." };
        }

        // Allow $and array form when expected uses inline field conditions
        const andToInline = (norm) => {
            const match = norm.match(/^DB\.USERS\.FIND\(\{\$AND:\[(.*)\]\}\)$/);
            if (!match) return norm;
            const inner = match[1]
                .split(/\},\{/)
                .map(part => part.replace(/^\{?/, '{').replace(/\}?$/, '}'))
                .join(',');
            return `DB.USERS.FIND({${inner}})`;
        };
        const normalizedGenerated = andToInline(normGenerated);
        if (normalizedGenerated === normExpected) {
            return { isValid: true, message: "Perfect! Query matches expected pattern." };
        }

        // Allow countDocuments() vs find().count() for beginner levels
        const expectedCountDocs = normExpected.replace(/\.COUNTDOCUMENTS\(\)/g, '.COUNTDOCUMENTS()');
        const generatedCount = normGenerated.replace(/\.FIND\(\)\.COUNT\(\)/g, '.COUNTDOCUMENTS()');
        if (expectedCountDocs === generatedCount) {
            return { isValid: true, message: "Perfect! Query matches expected pattern." };
        }

        // Allow id/_id projection tolerance for beginner levels
        if (normExpected.includes('_ID') && !normGenerated.includes('_ID')) {
            const relaxed = normGenerated.replace(/\bID\b/g, '_ID');
            if (relaxed === normExpected) {
                return { isValid: true, message: "Perfect! Query matches expected pattern." };
            }
        }

        return {
            isValid: false,
            message: "Query doesn't match the expected pattern. Check your syntax and try again!"
        };
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
