import React from 'react';
import { useGame } from '../../context/GameContext';

const LevelMap = () => {
    const { currentLevel, levels, score, maxUnlockedLevel, setCurrentLevelId } = useGame();

    // Visualize levels as a vertical road
    // 30 Levels
    // 1-10 Forest (Green)
    // 11-20 Hills (Yellow/Orange)
    // 21-30 Mountains (Snow/Purple)

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.scoreTitle}>SCORE</div>
                <div style={styles.scoreValue}>{score}</div>
            </div>

            <div style={styles.mapScroll}>
                <div style={styles.roadLine}></div>
                {levels.map((level, index) => {
                    // Use Persistent Max Level for unlocking logic
                    const isUnlocked = level.id <= maxUnlockedLevel;
                    const isCurrent = level.id === currentLevel.id;

                    let bgColor = '#059669'; // Forest (More muted emerald)
                    if (level.id > 10) bgColor = '#d97706'; // Hills (Muted amber)
                    if (level.id > 20) bgColor = '#4f46e5'; // Mountains (Indigo)

                    if (!isUnlocked) bgColor = '#1f2937'; // Locked (New border color)

                    return (
                        <div key={level.id} style={styles.levelRow}>
                            <div
                                onClick={() => {
                                    if (isUnlocked) setCurrentLevelId(level.id);
                                    else alert(`Level ${level.id} is locked! Complete previous levels first.`);
                                }}
                                style={{
                                    ...styles.levelNode,
                                    backgroundColor: bgColor,
                                    border: isCurrent ? '3px solid white' : '2px solid transparent',
                                    transform: isCurrent ? 'scale(1.2)' : 'scale(1)',
                                    boxShadow: isCurrent ? '0 0 15px rgba(255,255,255,0.5)' : 'none',
                                    cursor: isUnlocked ? 'pointer' : 'not-allowed',
                                    opacity: isUnlocked ? 1 : 0.6
                                }}
                            >
                                {isUnlocked ? level.id : '🔒'}
                            </div>

                            {isCurrent && (
                                <div style={styles.character}>
                                    🏃
                                </div>
                            )}

                            <div style={{
                                ...styles.levelLabel,
                                opacity: isUnlocked ? 1 : 0.5,
                                fontWeight: isCurrent ? 'bold' : 'normal',
                                color: isCurrent ? 'white' : '#94a3b8'
                            }}>
                                {level.title}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '240px',
        backgroundColor: '#161e31',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #1f2937',
        height: '100%'
    },
    header: {
        padding: '20px',
        backgroundColor: '#0b1120',
        borderBottom: '1px solid #1f2937',
        textAlign: 'center'
    },
    scoreTitle: {
        fontSize: '11px',
        color: '#94a3b8',
        letterSpacing: '1px'
    },
    scoreValue: {
        fontSize: '28px',
        color: '#fcd34d',
        fontWeight: 'bold',
        fontFamily: 'monospace'
    },
    mapScroll: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px 10px 150px 10px', // MASSIVE padding-bottom (150px) to clear taskbar
        boxSizing: 'border-box', // Ensure padding is calculated correctly
        position: 'relative',
        display: 'flex',
        flexDirection: 'column-reverse', // Start from bottom (Level 1)
        gap: '20px'
    },
    roadLine: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '34px',
        width: '4px',
        backgroundColor: '#1f2937',
        zIndex: 0
    },
    levelRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        position: 'relative',
        paddingLeft: '10px'
    },
    levelNode: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        zIndex: 1,
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    },
    levelLabel: {
        fontSize: '12px',
        flex: 1
    },
    character: {
        position: 'absolute',
        left: '30px',
        top: '-5px',
        fontSize: '24px',
        zIndex: 10,
        animation: 'bounce 1s infinite'
    }
};

export default LevelMap;
