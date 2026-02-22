import React, { createContext, useContext, useState, useEffect } from 'react';
import { sqlLevels, nosqlLevels } from '../data/levels';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children, dbType = 'SQL', user, initialProgress }) => {
    // Select appropriate level set based on dbType
    const levels = dbType === 'SQL' ? sqlLevels : nosqlLevels;

    // State from User Profile (Restored on Login)
    const [currentLevelId, setCurrentLevelId] = useState(() => {
        const completedCount = initialProgress.completedLevels.length;
        return completedCount > 0 ? Math.min(completedCount + 1, levels.length) : 1;
    });

    const [maxUnlockedLevel, setMaxUnlockedLevel] = useState(() => {
        const completedCount = initialProgress.completedLevels.length;
        return Math.min(completedCount + 1, levels.length);
    });

    const [completedQuestions, setCompletedQuestions] = useState(initialProgress.completedQuestions || []);
    const [score, setScore] = useState(initialProgress.score || 0);

    // Current Session State
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Derived State
    const currentLevel = levels.find(l => l.id === currentLevelId) || levels[0];
    const currentQuestion = currentLevel.questions[currentQuestionIndex];

    // RESUMPTION LOGIC: Find the first incomplete question when level or session starts
    useEffect(() => {
        const firstIncomplete = currentLevel.questions.findIndex(q => !completedQuestions.includes(q.id));
        if (firstIncomplete !== -1) {
            setCurrentQuestionIndex(firstIncomplete);
        } else {
            // All questions in this level are done, start at 0 but maybe show a "Reviewing" state in UI
            setCurrentQuestionIndex(0);
        }
    }, [currentLevelId, completedQuestions]);

    const [showConfetti, setShowConfetti] = useState(false);
    const [lastAttemptResult, setLastAttemptResult] = useState(null);

    const getToken = () => {
        if (user && user.token) return user.token;
        try {
            const raw = localStorage.getItem('qa_auth');
            if (!raw) return '';
            const parsed = JSON.parse(raw);
            return parsed && parsed.token ? parsed.token : '';
        } catch {
            return '';
        }
    };

    // Sync Progress Helper
    const syncProgress = async (updatedCompletedQuestions, updatedScore, updatedMaxLevel) => {
        try {
            const completedLevels = [];
            for (let i = 1; i <= levels.length; i++) {
                const levelQuestions = levels.find(l => l.id === i)?.questions || [];
                const allDone = levelQuestions.length > 0 && levelQuestions.every(q => updatedCompletedQuestions.includes(q.id));
                if (allDone) completedLevels.push(i);
            }

            const token = getToken();
            if (!token) {
                console.warn('Progress sync skipped: missing auth token');
                return;
            }

            const res = await fetch('/api/user/progress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    dbType,
                    progress: {
                        completedLevels,
                        completedQuestions: updatedCompletedQuestions,
                        score: updatedScore
                    }
                })
            });

            if (!res.ok) {
                let message = `HTTP ${res.status}`;
                try {
                    const payload = await res.json();
                    if (payload && payload.error) message = payload.error;
                } catch {
                    // ignore
                }
                console.warn('Progress sync failed:', message);
            }
        } catch (e) {
            console.error("Failed to sync progress:", e);
        }
    };

    const handleCorrectAnswer = (attempts = 1) => {
        let points = 10;
        if (attempts === 2) points = 7;
        if (attempts >= 3) points = 5;

        // Prevent double scoring if user clicks multiple times
        if (completedQuestions.includes(currentQuestion.id)) return;

        const newScore = score + points;
        const newCompletedQuestions = [...completedQuestions, currentQuestion.id];

        setScore(newScore);
        setCompletedQuestions(newCompletedQuestions);
        setShowConfetti(true);
        setLastAttemptResult({ success: true, message: "Excellent! Correct Answer." });

        setTimeout(() => {
            setShowConfetti(false);
            setLastAttemptResult(null);

            // Logic to move to next question or next level
            const nextIncompleteIndex = currentLevel.questions.findIndex((q, idx) => idx > currentQuestionIndex && !newCompletedQuestions.includes(q.id));

            if (nextIncompleteIndex !== -1) {
                // Stay in level, move to next incomplete Q
                setCurrentQuestionIndex(nextIncompleteIndex);
                syncProgress(newCompletedQuestions, newScore, maxUnlockedLevel);
            } else {
                // Current Level Complete!
                let nextMaxLevel = maxUnlockedLevel;
                if (currentLevelId === maxUnlockedLevel && currentLevelId < levels.length) {
                    nextMaxLevel = currentLevelId + 1;
                    setMaxUnlockedLevel(nextMaxLevel);
                }

                syncProgress(newCompletedQuestions, newScore, nextMaxLevel);

                if (currentLevelId < levels.length) {
                    setCurrentLevelId(prev => prev + 1);
                    // The useEffect above will handle setting question index for the new level
                    alert(`🎉 Level ${currentLevelId} Complete! Level ${currentLevelId + 1} Unlocked.`);
                } else {
                    alert("🏆 CONGRATULATIONS! You have completed all levels!");
                }
            }
        }, 1500);
    };

    const handleWrongAnswer = (message) => {
        setLastAttemptResult({ success: false, message: message || "Incorrect. Try again!" });
    };

    return (
        <GameContext.Provider value={{
            currentLevel,
            currentQuestion,
            currentQuestionIndex,
            score,
            lastAttemptResult,
            showConfetti,
            handleCorrectAnswer,
            handleWrongAnswer,
            levels,
            maxUnlockedLevel,
            setCurrentLevelId
        }}>
            {children}
        </GameContext.Provider>
    );
};
