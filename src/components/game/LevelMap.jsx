import React from 'react';
import { useGame } from '../../context/GameContext';

const LevelMap = ({ theme = 'light' }) => {
    const { currentLevel, levels, score, maxUnlockedLevel, setCurrentLevelId } = useGame();
    const isLight = theme !== 'dark';
    const styles = buildStyles(isLight);

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

                    let bgColor = isLight ? '#38bdf8' : '#059669';
                    if (level.id > 10) bgColor = isLight ? '#34d399' : '#d97706';
                    if (level.id > 20) bgColor = isLight ? '#818cf8' : '#4f46e5';

                    if (!isUnlocked) bgColor = isLight ? '#cbd5e1' : '#1f2937';

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
                                color: isCurrent ? (isLight ? '#0f172a' : '#ffffff') : (isLight ? '#64748b' : '#94a3b8')
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

const buildStyles = (isLight) => ({
    container: {
        width: '240px',
        backgroundColor: isLight ? '#ffffff' : '#161e31',
        display: 'flex',
        flexDirection: 'column',
        borderRight: isLight ? '1px solid #d6dde6' : '1px solid #1f2937',
        height: '100%'
    },
    header: {
        padding: '20px',
        backgroundColor: isLight ? '#f8fafc' : '#0b1120',
        borderBottom: isLight ? '1px solid #e2e8f0' : '1px solid #1f2937',
        textAlign: 'center'
    },
    scoreTitle: {
        fontSize: '11px',
        color: isLight ? '#64748b' : '#94a3b8',
        letterSpacing: '1px'
    },
    scoreValue: {
        fontSize: '28px',
        color: isLight ? '#2563eb' : '#fcd34d',
        fontWeight: 'bold',
        fontFamily: 'monospace'
    },
    mapScroll: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px 10px 150px 10px',
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: '20px'
    },
    roadLine: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '34px',
        width: '4px',
        backgroundColor: isLight ? '#d6dde6' : '#1f2937',
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
});

export default LevelMap;
