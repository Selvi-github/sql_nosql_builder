import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '../../context/GameContext';
import LevelMap from '../game/LevelMap';
import BlocklyEditor from '../game/BlocklyEditor';
import ERVisualizer from '../game/ERVisualizer';
import { validateQuery } from '../../utils/queryValidator';

const GameLayout = ({ dbType, theme }) => {
    const {
        currentLevel,
        currentQuestion,
        handleCorrectAnswer,
        handleWrongAnswer,
        lastAttemptResult,
        completedQuestions,
        showConfetti,
        levels
    } = useGame();

    // MODES: 'FREE' | 'LEARN'
    const [mode, setMode] = useState('FREE');
    const [generatedCode, setGeneratedCode] = useState("-- Assemble blocks to see code");
    const [executionResult, setExecutionResult] = useState(null);
    const [isExecuting, setIsExecuting] = useState(false);
    const [showERModal, setShowERModal] = useState(false);
    const [showSchemaModal, setShowSchemaModal] = useState(false);
    const [showLevelModal, setShowLevelModal] = useState(false);
    const [selectedLevelId, setSelectedLevelId] = useState(currentLevel.id);
    const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
    const [isBottomPanelOpen, setIsBottomPanelOpen] = useState(false);
    const [bottomHeight, setBottomHeight] = useState(240);
    const isResizingRef = useRef(false);
    const resizeStartRef = useRef({ startY: 0, startHeight: 240 });
    const [confettiMessage, setConfettiMessage] = useState('Congratulations!');
    const [confettiEmoji, setConfettiEmoji] = useState('🎉');
    const isLight = theme !== 'dark';
    const styles = buildStyles(isLight);

    const selectedLevel = levels.find((lvl) => lvl.id === selectedLevelId) || currentLevel;
    const levelQuestions = selectedLevel?.questions || [];
    const completedInLevel = levelQuestions.filter((q) => completedQuestions.includes(q.id)).length;
    const levelTotal = levelQuestions.length || 1;
    const levelProgress = Math.round((completedInLevel / levelTotal) * 100);

    const resultItems = executionResult
        ? (Array.isArray(executionResult.results)
            ? executionResult.results
            : (Array.isArray(executionResult.data)
                ? [{ type: 'table', data: executionResult.data, message: 'Statement 1 OK.' }]
                : []))
        : [];

    const getToken = () => {
        try {
            const raw = localStorage.getItem('qa_auth');
            if (!raw) return '';
            const parsed = JSON.parse(raw);
            return parsed && parsed.token ? parsed.token : '';
        } catch {
            return '';
        }
    };

    const runQuery = async () => {
        setIsExecuting(true);
        setExecutionResult(null);
        setIsBottomPanelOpen(true);

        // Validation only triggers in LEARNING MODE
        if (mode === 'LEARN') {
            const validation = validateQuery(
                generatedCode,
                currentQuestion.expectedPattern
            );

            if (!validation.isValid) {
                handleWrongAnswer(validation.message);
                setIsExecuting(false);
                setExecutionResult({ success: false, error: validation.message });
                return;
            }
        }

        // Execute (Both modes)
        try {
            const endpoint = dbType === 'NoSQL' ? '/api/nosql/execute' : '/api/sql/execute';
            const executeOnce = async () => {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getToken()}`
                    },
                    body: JSON.stringify({ query: generatedCode, mode })
                });
                return response.json();
            };

            let result = await executeOnce();
            if (!result.success && result.errorType !== 'SYNTAX') {
                await new Promise(resolve => setTimeout(resolve, 400));
                result = await executeOnce();
            }

            if (result.success) {
                if (mode === 'LEARN') handleCorrectAnswer();
                setExecutionResult(result);
            } else {
                const isSyntax = result.errorType === 'SYNTAX';
                const message = isSyntax ? result.error : 'Temporary service issue. Please try again.';
                if (mode === 'LEARN') handleWrongAnswer(message);
                setExecutionResult({ success: false, error: message });
            }
        } catch (e) {
            setExecutionResult({ success: false, error: 'Temporary service issue. Please try again.' });
        } finally {
            setIsExecuting(false);
        }
    };

    useEffect(() => {
        if (!showConfetti) return;
        const messages = [
            'Congratulations!',
            'Level Complete!',
            'Excellent!',
            'Super!',
            'Wonderful!',
            'Wow!',
            'Great!'
        ];
        const emojis = ['💪', '🏆', '🎊', '✨', '👍', '👑', '🚀', '🙌', '👏', '🌈', '😁', '💰', '💎', '🌟', '🔝', '💯', '🌞', '💼', '📈', '🍾', '💵', '🎓', '🥇', '🥈', '🥉'];
        setConfettiMessage(messages[Math.floor(Math.random() * messages.length)]);
        setConfettiEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
    }, [showConfetti]);

    useEffect(() => {
        setSelectedLevelId(currentLevel.id);
    }, [currentLevel.id, showLevelModal]);

    const startResize = (event) => {
        isResizingRef.current = true;
        resizeStartRef.current = { startY: event.clientY, startHeight: bottomHeight };
        window.addEventListener('mousemove', handleResize);
        window.addEventListener('mouseup', stopResize);
    };

    const handleResize = (event) => {
        if (!isResizingRef.current) return;
        const delta = resizeStartRef.current.startY - event.clientY;
        const nextHeight = resizeStartRef.current.startHeight + delta;
        const minHeight = 200;
        const maxHeight = Math.min(window.innerHeight * 0.45, 460);
        setBottomHeight(Math.max(minHeight, Math.min(maxHeight, nextHeight)));
    };

    const stopResize = () => {
        isResizingRef.current = false;
        window.removeEventListener('mousemove', handleResize);
        window.removeEventListener('mouseup', stopResize);
    };

    return (
        <div style={styles.container}>
            <div style={styles.mainRow}>
                {/* LEFT: MAP (Only in Learn Mode) */}
                {mode === 'LEARN' && (
                    <div style={{ ...styles.leftPanel, ...(isLeftPanelOpen ? {} : styles.leftPanelCollapsed) }}>
                        <LevelMap theme={theme} />
                    </div>
                )}

                {/* CENTER: WORKSPACE */}
                <div style={styles.centerPanel}>
                    {/* TOOLBAR */}
                    <div style={styles.toolbar}>
                        <div style={styles.toolbarLeft}>
                            {mode === 'LEARN' && (
                                <button
                                    style={styles.collapseBtn}
                                    onClick={() => setIsLeftPanelOpen((prev) => !prev)}
                                    title={isLeftPanelOpen ? 'Hide levels panel' : 'Show levels panel'}
                                >
                                    {isLeftPanelOpen ? '◀' : '▶'}
                                </button>
                            )}
                            <div style={styles.modeToggle}>
                                <button
                                    style={{ ...styles.toggleBtn, ...(mode === 'FREE' ? styles.activeBtn : {}) }}
                                    onClick={() => setMode('FREE')}
                                >
                                    🛠️ Free Builder
                                </button>
                                <button
                                    style={{ ...styles.toggleBtn, ...(mode === 'LEARN' ? styles.activeBtn : {}) }}
                                    onClick={() => setMode('LEARN')}
                                >
                                    🎓 Learning Mode
                                </button>
                            </div>
                            <button
                                style={styles.schemaBtn}
                                onClick={() => setShowSchemaModal(true)}
                                title="View sample data schema"
                            >
                                📋 View Schema
                            </button>
                            <button
                                style={styles.schemaBtn}
                                onClick={() => setShowERModal(true)}
                                title="View ER diagram"
                            >
                                🧩 ER Diagram
                            </button>
                        </div>

                        {mode === 'LEARN' && (
                            <div style={styles.questBar} title={currentQuestion.text}>
                                <span style={{ fontWeight: 'bold', color: '#2563eb' }}>Q:</span> {currentQuestion.text}
                            </div>
                        )}

                        <div style={styles.toolbarRight}>
                            {mode === 'LEARN' && (
                                <button style={styles.levelBtn} onClick={() => setShowLevelModal(true)}>
                                    Level {currentLevel.id}
                                </button>
                            )}
                            <button
                                style={{
                                    ...styles.outputToggleBtn,
                                    ...(isBottomPanelOpen ? styles.outputToggleBtnActive : {})
                                }}
                                onClick={() => setIsBottomPanelOpen(true)}
                            >
                                Query
                            </button>
                        </div>
                    </div>

                    <div style={styles.blocklyContainer}>
                        <BlocklyEditor
                            onCodeChange={setGeneratedCode}
                            category={mode === 'FREE' ? dbType : currentLevel.type} // Pass 'SQL' or 'NoSQL' in Free Mode
                            uiTheme={theme}
                        />
                    </div>
                </div>
            </div>

            {/* BOTTOM: OUTPUT PANEL */}
            {isBottomPanelOpen && (
                <div style={{ ...styles.bottomPanel, height: bottomHeight }}>
                    <div style={styles.resizeHandle} onMouseDown={startResize} title="Drag to resize"></div>
                    <div style={styles.bottomHeader}>
                        <div style={styles.bottomTitle}>Query + Output</div>
                        <button
                            style={styles.closePanelBtn}
                            onClick={() => setIsBottomPanelOpen(false)}
                            title="Close panel"
                        >
                            ✕
                        </button>
                    </div>

                    <div style={styles.bottomContent}>
                        <div style={styles.panelSection}>
                            <div style={styles.codeDisplay}>{generatedCode}</div>
                            <button onClick={runQuery} style={styles.runBtn}>
                                {isExecuting ? 'Running...' : '▶ EXECUTE'}
                            </button>
                        </div>
                        <div style={{ ...styles.panelSection, flex: 1 }}>
                            <div style={styles.panelHeader}>RESULTS (LIVE CLOUD)</div>
                            {executionResult ? (
                                <div style={styles.resultBox}>
                                    {executionResult.success ? (
                                        <>
                                            <div style={styles.executionStatus}>
                                                <div
                                                    style={{
                                                        ...styles.executionDot,
                                                        backgroundColor: executionResult.mode === 'OFFLINE' ? '#f59e0b' : '#10b981'
                                                    }}
                                                ></div>
                                                {executionResult.mode === 'OFFLINE' ? 'OFFLINE MODE' : 'CONNECTED TO CLOUD DB'}
                                            </div>
                                            <div style={styles.tableScroll}>
                                                {/* SQL Multi-Statement Results */}
                                                {resultItems.length > 0 ? (
                                                    resultItems.map((res, idx) => (
                                                        <div key={idx} style={styles.resultBlock}>
                                                            <div style={styles.resultMeta}>{res.message}</div>
                                                            {res.type === 'table' ? (
                                                                dbType === 'NoSQL' ? (
                                                                    <JSONDisplay data={res.data} styles={styles} />
                                                                ) : (
                                                                    <ResultTable data={res.data} styles={styles} />
                                                                )
                                                            ) : (
                                                                <div style={styles.successToast}>
                                                                    {res.data && res.data[0] && res.data[0].message ? `✅ ${res.data[0].message}` : '✅ Statement Executed'}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div style={styles.noDataText}>No data returned</div>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <div style={styles.errorBox}>
                                            <div style={styles.errorTitle}>⚠️ Cloud Execution Error</div>
                                            <div style={styles.errorText}>{executionResult.error}</div>
                                            <div style={styles.errorHint}>
                                                <strong>Tip:</strong> If you changed columns, the old table structure in the cloud might be clashing.
                                                Drag a new <strong>CREATE TABLE</strong> block to drop and recreate it fresh.
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div style={styles.emptyState}>
                                    <div style={{ fontSize: '26px', marginBottom: '8px' }}>⚡</div>
                                    <div style={{ color: '#64748b', fontSize: '12px' }}>
                                        Assemble blocks and hit <strong>EXECUTE</strong> to run your query on the Cloud.
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ER MODAL */}
            {showERModal && (
                <div style={styles.erModalOverlay}>
                    <div style={styles.erModalContent}>
                        <div style={styles.erModalHeader}>
                            <h3>Schema Visualizer</h3>
                            <button onClick={() => setShowERModal(false)} style={styles.closeBtn}>×</button>
                        </div>
                        <div style={styles.erModalBody}>
                            <ERVisualizer sqlCode={generatedCode} />
                        </div>
                    </div>
                </div>
            )}

            {/* SCHEMA MODAL */}
            {showSchemaModal && (
                <div style={styles.schemaModalOverlay} onClick={() => setShowSchemaModal(false)}>
                    <div style={styles.schemaModalContent} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.schemaModalHeader}>
                            <h2 style={styles.modalTitle}>
                                {dbType === 'SQL' ? '📊 SQL Table Schema' : '📄 NoSQL Document Schema'}
                            </h2>
                            <button style={styles.modalClose} onClick={() => setShowSchemaModal(false)}>✕</button>
                        </div>
                        <div style={styles.schemaModalBody}>
                            {dbType === 'SQL' ? <SQLSchemaView styles={styles} /> : <NoSQLSchemaView styles={styles} />}
                        </div>
                    </div>
                </div>
            )}

            {showLevelModal && (
                <div style={styles.levelModalOverlay} onClick={() => setShowLevelModal(false)}>
                    <div style={styles.levelModalContent} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.levelModalHeader}>
                            <h2 style={styles.modalTitle}>Level - {selectedLevelId}</h2>
                            <button style={styles.modalClose} onClick={() => setShowLevelModal(false)}>✕</button>
                        </div>
                        <div style={styles.levelModalBody}>
                            <div style={styles.levelLeft}>
                                <div style={styles.levelCard}>
                                    <div style={styles.levelIcon}>🗒️</div>
                                    <div style={styles.levelTitle}>Level - {selectedLevelId}</div>
                                    <div style={styles.levelMeta}>{completedInLevel} / {levelTotal} questions</div>
                                </div>
                                <div style={styles.levelSelector}>
                                    {levels.map((lvl) => (
                                        <button
                                            key={lvl.id}
                                            style={{
                                                ...styles.levelSelectorBtn,
                                                ...(lvl.id === selectedLevelId ? styles.levelSelectorBtnActive : {})
                                            }}
                                            onClick={() => setSelectedLevelId(lvl.id)}
                                        >
                                            Level {lvl.id}
                                        </button>
                                    ))}
                                </div>
                                <div style={styles.progressCard}>
                                    <svg viewBox="0 0 120 120" style={styles.progressRing}>
                                        <circle cx="60" cy="60" r="48" stroke={styles.progressTrackColor} strokeWidth="10" fill="none" />
                                        <circle
                                            cx="60"
                                            cy="60"
                                            r="48"
                                            stroke={styles.progressFillColor}
                                            strokeWidth="10"
                                            fill="none"
                                            strokeDasharray={`${2 * Math.PI * 48}`}
                                            strokeDashoffset={`${2 * Math.PI * 48 * (1 - levelProgress / 100)}`}
                                            strokeLinecap="round"
                                        />
                                        <text x="60" y="58" textAnchor="middle" style={styles.progressRingLabel}>Solved</text>
                                        <text x="60" y="82" textAnchor="middle" style={styles.progressRingValue}>
                                            {completedInLevel}/{levelTotal}
                                        </text>
                                    </svg>
                                </div>
                            </div>
                            <div style={styles.levelRight}>
                                <div style={styles.levelListHeader}>Questions</div>
                                <div style={styles.levelList}>
                                    {levelQuestions.map((q, idx) => {
                                        const done = completedQuestions.includes(q.id);
                                        return (
                                            <div key={q.id} style={styles.levelRowItem}>
                                                <div style={styles.levelCheck}>{done ? '✓' : ''}</div>
                                                <div style={styles.levelQuestionText}>
                                                    {idx + 1}. {q.text}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showConfetti && (
                <div style={styles.confettiOverlay}>
                    <style>{`
                        @keyframes confetti-fall {
                            0% { transform: translateY(-30px) translateX(0px) rotate(0deg); opacity: 0; }
                            10% { opacity: 1; }
                            100% { transform: translateY(420px) translateX(var(--drift)) rotate(360deg); opacity: 0; }
                        }
                        @keyframes confetti-left {
                            0% { transform: translateX(-40px) translateY(0px) rotate(0deg); opacity: 0; }
                            10% { opacity: 1; }
                            100% { transform: translateX(520px) translateY(var(--drop)) rotate(360deg); opacity: 0; }
                        }
                        @keyframes confetti-right {
                            0% { transform: translateX(40px) translateY(0px) rotate(0deg); opacity: 0; }
                            10% { opacity: 1; }
                            100% { transform: translateX(-520px) translateY(var(--drop)) rotate(360deg); opacity: 0; }
                        }
                        @keyframes confetti-pop {
                            0% { transform: scale(0.9); opacity: 0; }
                            60% { transform: scale(1.05); opacity: 1; }
                            100% { transform: scale(1); opacity: 1; }
                        }
                    `}</style>
                    <div style={styles.confettiBurst}>
                        {Array.from({ length: 48 }).map((_, idx) => {
                            const left = (idx * 7) % 100;
                            const delay = (idx % 12) * 0.06;
                            const size = 10 + (idx % 8);
                            const drift = (idx % 18 - 9) * 10;
                            const colors = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#22d3ee', '#f97316', '#facc15'];
                            return (
                                <span
                                    key={`top-${idx}`}
                                    style={{
                                        ...styles.confettiPiece,
                                        left: `${left}%`,
                                        width: `${size}px`,
                                        height: `${size * 1.6}px`,
                                        backgroundColor: colors[idx % colors.length],
                                        animationDelay: `${delay}s`,
                                        animationDuration: '1.6s',
                                        animationIterationCount: 'infinite',
                                        marginLeft: '-4px',
                                        animationName: 'confetti-fall',
                                        ['--drift']: `${drift}px`
                                    }}
                                ></span>
                            );
                        })}
                        {Array.from({ length: 36 }).map((_, idx) => {
                            const top = (idx * 6) % 100;
                            const delay = (idx % 10) * 0.08;
                            const size = 10 + (idx % 8);
                            const drop = (idx % 10 + 6) * 16;
                            const colors = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#22d3ee', '#f97316', '#facc15'];
                            return (
                                <span
                                    key={`left-${idx}`}
                                    style={{
                                        ...styles.confettiPiece,
                                        top: `${top}%`,
                                        left: '0%',
                                        width: `${size}px`,
                                        height: `${size * 1.6}px`,
                                        backgroundColor: colors[(idx + 2) % colors.length],
                                        animationDelay: `${delay}s`,
                                        animationDuration: '1.8s',
                                        animationIterationCount: 'infinite',
                                        animationName: 'confetti-left',
                                        ['--drop']: `${drop}px`
                                    }}
                                ></span>
                            );
                        })}
                        {Array.from({ length: 36 }).map((_, idx) => {
                            const top = (idx * 6) % 100;
                            const delay = (idx % 10) * 0.08;
                            const size = 10 + (idx % 8);
                            const drop = (idx % 10 + 6) * 16;
                            const colors = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#22d3ee', '#f97316', '#facc15'];
                            return (
                                <span
                                    key={`right-${idx}`}
                                    style={{
                                        ...styles.confettiPiece,
                                        top: `${top}%`,
                                        left: '100%',
                                        width: `${size}px`,
                                        height: `${size * 1.6}px`,
                                        backgroundColor: colors[(idx + 4) % colors.length],
                                        animationDelay: `${delay}s`,
                                        animationDuration: '1.8s',
                                        animationIterationCount: 'infinite',
                                        animationName: 'confetti-right',
                                        ['--drop']: `${drop}px`
                                    }}
                                ></span>
                            );
                        })}
                    </div>
                    <div style={styles.confettiCard}>
                        <div style={styles.confettiEmoji}>{confettiEmoji}</div>
                        <div style={styles.confettiText}>{confettiMessage}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

// SQL Schema View Component
const SQLSchemaView = ({ styles }) => {
    return (
        <div style={styles.schemaContainer}>
            <h3 style={styles.schemaSubtitle}>users Table Structure</h3>
            <table style={styles.schemaTable}>
                <thead>
                    <tr style={styles.schemaHeaderRow}>
                        <th style={styles.schemaTh}>Column</th>
                        <th style={styles.schemaTh}>Type</th>
                        <th style={styles.schemaTh}>Sample Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={styles.schemaRow}>
                        <td style={styles.schemaTd}>id</td>
                        <td style={styles.schemaTd}>INT</td>
                        <td style={styles.schemaTd}>1, 2, 3...</td>
                    </tr>
                    <tr style={styles.schemaRow}>
                        <td style={styles.schemaTd}>user_id</td>
                        <td style={styles.schemaTd}>INT</td>
                        <td style={styles.schemaTd}>1, 2, 3... (for JOINs)</td>
                    </tr>
                    <tr style={styles.schemaRow}>
                        <td style={styles.schemaTd}>firstname</td>
                        <td style={styles.schemaTd}>VARCHAR(50)</td>
                        <td style={styles.schemaTd}>"Alice", "Bob"</td>
                    </tr>
                    <tr style={styles.schemaRow}>
                        <td style={styles.schemaTd}>lastname</td>
                        <td style={styles.schemaTd}>VARCHAR(50)</td>
                        <td style={styles.schemaTd}>"Johnson", "Smith"</td>
                    </tr>
                    <tr style={styles.schemaRow}>
                        <td style={styles.schemaTd}>age</td>
                        <td style={styles.schemaTd}>INT</td>
                        <td style={styles.schemaTd}>25, 30, 22...</td>
                    </tr>
                    <tr style={styles.schemaRow}>
                        <td style={styles.schemaTd}>city</td>
                        <td style={styles.schemaTd}>VARCHAR(50)</td>
                        <td style={styles.schemaTd}>"Mumbai", "Delhi"</td>
                    </tr>
                    <tr style={styles.schemaRow}>
                        <td style={styles.schemaTd}>gender</td>
                        <td style={styles.schemaTd}>VARCHAR(10)</td>
                        <td style={styles.schemaTd}>"Male", "Female"</td>
                    </tr>
                    <tr style={styles.schemaRow}>
                        <td style={styles.schemaTd}>email</td>
                        <td style={styles.schemaTd}>VARCHAR(100)</td>
                        <td style={styles.schemaTd}>"alice@example.com"</td>
                    </tr>
                    <tr style={styles.schemaRow}>
                        <td style={styles.schemaTd}>phone</td>
                        <td style={styles.schemaTd}>VARCHAR(15)</td>
                        <td style={styles.schemaTd}>"9876543210"</td>
                    </tr>
                    <tr style={styles.schemaRow}>
                        <td style={styles.schemaTd}>isActive</td>
                        <td style={styles.schemaTd}>BOOLEAN</td>
                        <td style={styles.schemaTd}>true, false</td>
                    </tr>
                    <tr style={styles.schemaRow}>
                        <td style={styles.schemaTd}>salary</td>
                        <td style={styles.schemaTd}>DECIMAL(10,2)</td>
                        <td style={styles.schemaTd}>50000, 45000...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

// NoSQL Schema View Component
const NoSQLSchemaView = ({ styles }) => {
    return (
        <div style={styles.schemaContainer}>
            <h3 style={styles.schemaSubtitle}>users Collection - Sample Document</h3>
            <pre style={styles.schemaJson}>
                {`{
  "_id": ObjectId("..."),
  "firstname": "Alice",
  "lastname": "Johnson",
  "name": "Alice",
  "age": 25,
  "skills": ["JS", "Python"],
  "role": "Admin",
  "city": "Mumbai",
  "gender": "Female",
  "email": "alice@example.com",
  "phone": "9876543210",
  "isActive": true,
  "salary": 50000
}`}
            </pre>
            <div style={styles.schemaNote}>
                <strong>Note:</strong> Some documents may not have all fields (e.g., email, phone)
            </div>
        </div>
    );
};

// JSON Display Component for NoSQL Results
const JSONDisplay = ({ data, styles }) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
        return <div style={{ padding: '10px', ...styles.noDataText }}>No documents returned</div>;
    }

    return (
        <div style={styles.jsonContainer}>
            <pre style={styles.jsonPre}>
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
};

// Simple Result Table Component with Safety Checks
const ResultTable = ({ data, styles }) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
        return <div style={{ padding: '10px', ...styles.noDataText }}>No data returned</div>;
    }

    // Safety check: Ensure the first item is actually an object to extract keys
    const firstItem = data[0];
    if (typeof firstItem !== 'object' || firstItem === null) {
        return <div style={{ padding: '10px', ...styles.noDataText }}>Invalid data format</div>;
    }

    const cols = Object.keys(firstItem);

    return (
        <table style={styles.table}>
            <thead>
                <tr>{cols.map(c => <th key={c} style={styles.th}>{c}</th>)}</tr>
            </thead>
            <tbody>
                {data.map((row, i) => (
                    <tr key={i}>
                        {cols.map(c => <td key={c} style={styles.td}>{typeof row[c] === 'object' ? JSON.stringify(row[c]) : row[c]}</td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const buildStyles = (isLight) => {
    const palette = isLight
        ? {
            pageBg: '#f4f7fb',
            panelBg: '#ffffff',
            panelSoft: '#f8fafc',
            panelMuted: '#eef2f7',
            border: '#d6dde6',
            borderSoft: '#e2e8f0',
            borderStrong: '#cbd5e1',
            textPrimary: '#1f2937',
            textSecondary: '#64748b',
            textMuted: '#475569',
            accent: '#2563eb',
            accentSoft: '#e0ecff',
            accentBorder: '#93c5fd',
            codeBg: '#eef2f7',
            codeText: '#0f172a',
            tableHeaderBg: '#f1f5f9',
            tableHeaderText: '#334155',
            tableText: '#475569',
            successBg: '#e9f7ef',
            successBorder: '#b7e2c6',
            successText: '#1f2937',
            errorBg: '#fff1f2',
            errorBorder: '#fecdd3',
            errorTitle: '#be123c',
            errorText: '#e11d48',
            schemaDash: '#cbd5f5',
            schemaTitle: '#1d4ed8',
            schemaText: '#475569',
            overlay: 'rgba(15, 23, 42, 0.45)',
            jsonText: '#0f766e'
        }
        : {
            pageBg: '#0b1120',
            panelBg: '#161e31',
            panelSoft: '#0f172a',
            panelMuted: '#0b1120',
            border: '#1f2937',
            borderSoft: '#334155',
            borderStrong: '#475569',
            textPrimary: '#f8fafc',
            textSecondary: '#94a3b8',
            textMuted: '#cbd5e1',
            accent: '#4f46e5',
            accentSoft: '#1e293b',
            accentBorder: '#334155',
            codeBg: '#0b1120',
            codeText: '#e2e8f0',
            tableHeaderBg: '#1e293b',
            tableHeaderText: '#cbd5e1',
            tableText: '#94a3b8',
            successBg: '#0f2a1f',
            successBorder: '#14532d',
            successText: '#cbd5e1',
            errorBg: 'rgba(239, 68, 68, 0.12)',
            errorBorder: '#ef4444',
            errorTitle: '#f87171',
            errorText: '#fca5a5',
            schemaDash: '#334155',
            schemaTitle: '#93c5fd',
            schemaText: '#cbd5e1',
            overlay: 'rgba(0, 0, 0, 0.75)',
            jsonText: '#10b981'
        };

    return {
        container: {
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 60px)',
            width: '100vw',
            backgroundColor: palette.pageBg,
            color: palette.textPrimary,
            overflow: 'hidden',
            minWidth: '1024px'
        },
        mainRow: {
            display: 'flex',
            flex: 1,
            minHeight: 0
        },
        leftPanel: {
            width: '240px',
            minWidth: '240px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: palette.panelBg,
            borderRight: `1px solid ${palette.border}`,
            height: '100%',
            boxSizing: 'border-box',
            overflowY: 'auto'
        },
        leftPanelCollapsed: {
            width: '0px',
            minWidth: '0px',
            borderRight: 'none',
            overflow: 'hidden',
            overflowY: 'hidden'
        },
        centerPanel: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            minHeight: 0,
            backgroundColor: palette.pageBg
        },
        toolbar: {
            height: '60px',
            borderBottom: `1px solid ${palette.border}`,
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            gap: '12px',
            backgroundColor: palette.panelBg
        },
        toolbarLeft: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        },
        toolbarRight: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginLeft: 'auto'
        },
        collapseBtn: {
            border: `1px solid ${palette.border}`,
            backgroundColor: palette.panelSoft,
            color: palette.textMuted,
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px'
        },
        modeToggle: {
            display: 'flex',
            gap: '6px',
            backgroundColor: palette.panelSoft,
            padding: '4px',
            borderRadius: '10px',
            border: `1px solid ${palette.borderSoft}`
        },
        toggleBtn: {
            padding: '6px 12px',
            border: 'none',
            backgroundColor: 'transparent',
            color: palette.textSecondary,
            cursor: 'pointer',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '600'
        },
        activeBtn: { backgroundColor: palette.accent, color: 'white' },
        questBar: {
            flex: 1,
            textAlign: 'center',
            padding: '0 20px',
            fontSize: '14px',
            maxWidth: '800px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minWidth: 0,
            color: palette.textMuted
        },
        blocklyContainer: { flex: 1, position: 'relative', minHeight: 0 },
        outputToggleBtn: {
            padding: '6px 12px',
            border: `1px solid ${palette.border}`,
            backgroundColor: palette.panelSoft,
            color: palette.textMuted,
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '600'
        },
        outputToggleBtnActive: {
            backgroundColor: palette.accentSoft,
            borderColor: palette.accentBorder,
            color: palette.accent
        },
        levelBtn: {
            padding: '6px 12px',
            border: `1px solid ${palette.border}`,
            backgroundColor: palette.panelBg,
            color: palette.textPrimary,
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '600'
        },

        bottomPanel: {
            width: '100%',
            minHeight: '220px',
            backgroundColor: palette.panelSoft,
            borderTop: `1px solid ${palette.border}`,
            display: 'flex',
            flexDirection: 'column'
        },
        resizeHandle: {
            width: '100%',
            height: '8px',
            cursor: 'row-resize',
            backgroundColor: palette.panelBg,
            borderBottom: `1px solid ${palette.borderSoft}`
        },
        bottomHeader: {
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            borderBottom: `1px solid ${palette.borderSoft}`,
            backgroundColor: palette.panelBg
        },
        bottomTitle: {
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.6px',
            color: palette.textSecondary,
            fontWeight: '700'
        },
        closePanelBtn: {
            border: `1px solid ${palette.border}`,
            backgroundColor: palette.panelSoft,
            color: palette.textSecondary,
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
        },
        bottomContent: {
            flex: 1,
            overflow: 'auto'
        },
        panelSection: { padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px' },
        panelHeader: { fontSize: '11px', color: palette.textSecondary, fontWeight: '700', letterSpacing: '0.4px' },
        codeDisplay: {
            fontFamily: 'monospace',
            fontSize: '12px',
            color: palette.codeText,
            backgroundColor: palette.codeBg,
            padding: '10px',
            borderRadius: '6px',
            marginBottom: '6px',
            overflowX: 'auto',
            border: `1px solid ${palette.border}`
        },
        runBtn: {
            padding: '10px 14px',
            backgroundColor: palette.accent,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.2s'
        },
        resultBox: { fontSize: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '10px' },
        tableScroll: { overflow: 'auto', maxHeight: '220px' },
        table: { width: '100%', borderCollapse: 'collapse', fontSize: '11px' },
        th: {
            textAlign: 'left',
            padding: '6px',
            borderBottom: `1px solid ${palette.border}`,
            color: palette.tableHeaderText,
            position: 'sticky',
            top: 0,
            backgroundColor: palette.tableHeaderBg
        },
        td: { padding: '6px', borderBottom: `1px solid ${palette.borderSoft}`, color: palette.tableText },
        executionStatus: {
            color: palette.textMuted,
            marginBottom: '4px',
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
        },
        executionDot: { width: '8px', height: '8px', borderRadius: '50%' },
        resultBlock: { marginBottom: '14px', borderLeft: `2px solid ${palette.accentBorder}`, paddingLeft: '10px' },
        resultMeta: { fontSize: '10px', color: palette.textSecondary, marginBottom: '4px' },
        successToast: {
            color: palette.successText,
            fontSize: '11px',
            backgroundColor: palette.successBg,
            padding: '6px',
            borderRadius: '6px',
            border: `1px solid ${palette.successBorder}`
        },
        errorBox: { backgroundColor: palette.errorBg, padding: '12px', borderRadius: '8px', border: `1px solid ${palette.errorBorder}` },
        errorTitle: { color: palette.errorTitle, fontWeight: '700', marginBottom: '4px', fontSize: '12px' },
        errorText: { color: palette.errorText, fontSize: '11px', lineHeight: '1.4' },
        errorHint: { marginTop: '10px', fontSize: '10px', color: palette.textSecondary, fontStyle: 'italic' },
        emptyState: { textAlign: 'center', marginTop: '20px' },
        schemaReference: {
            marginTop: '6px',
            padding: '10px',
            backgroundColor: palette.panelBg,
            border: `1px dashed ${palette.schemaDash}`,
            borderRadius: '8px'
        },
        schemaReferenceTitle: { fontSize: '11px', fontWeight: '700', color: palette.schemaTitle, marginBottom: '4px' },
        schemaReferenceText: { fontSize: '11px', color: palette.schemaText },
        erModalOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: palette.overlay,
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(5px)'
        },
        erModalContent: {
            width: '90%',
            height: '90%',
            backgroundColor: palette.panelBg,
            borderRadius: '16px',
            border: `1px solid ${palette.border}`,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        },
        erModalHeader: {
            padding: '20px',
            borderBottom: `1px solid ${palette.borderSoft}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        closeBtn: {
            background: 'none',
            border: 'none',
            color: palette.textSecondary,
            fontSize: '24px',
            cursor: 'pointer'
        },
        erModalBody: {
            flex: 1,
            padding: '20px',
            overflow: 'hidden'
        },
        confettiOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(15, 23, 42, 0.2)',
            zIndex: 100,
            pointerEvents: 'none'
        },
        confettiBurst: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        },
        confettiPiece: {
            position: 'absolute',
            top: 0,
            borderRadius: '4px',
            opacity: 0,
            animationName: 'confetti-fall',
            animationDuration: '2.6s',
            animationTimingFunction: 'ease-out',
            animationFillMode: 'forwards',
            boxShadow: '0 2px 6px rgba(15, 23, 42, 0.35)'
        },
        confettiCard: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            padding: '24px 32px',
            backgroundColor: 'rgba(255, 255, 255, 0.88)',
            borderRadius: '20px',
            border: `1px solid ${palette.borderSoft}`,
            boxShadow: '0 20px 60px -24px rgba(15, 23, 42, 0.35)',
            animation: 'confetti-pop 0.6s ease-out'
        },
        confettiEmoji: {
            fontSize: '112px',
            lineHeight: 1
        },
        confettiText: {
            fontSize: '20px',
            fontWeight: '700',
            color: palette.textPrimary,
            letterSpacing: '0.2px'
        },
        jsonContainer: {
            backgroundColor: palette.panelMuted,
            borderRadius: '6px',
            padding: '12px',
            border: `1px solid ${palette.border}`,
            overflow: 'auto',
            maxHeight: '220px'
        },
        jsonPre: {
            margin: 0,
            fontFamily: 'monospace',
            fontSize: '11px',
            color: palette.jsonText,
            lineHeight: '1.5',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
        },
        schemaBtn: {
            padding: '8px 16px',
            backgroundColor: palette.panelSoft,
            color: palette.textPrimary,
            border: `1px solid ${palette.border}`,
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '600',
            transition: 'all 0.2s'
        },
        schemaModalOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: palette.overlay,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        },
        schemaModalContent: {
            backgroundColor: palette.panelBg,
            borderRadius: '12px',
            width: '90%',
            maxWidth: '700px',
            maxHeight: '80vh',
            overflow: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        },
        schemaModalHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 24px',
            borderBottom: `1px solid ${palette.borderSoft}`,
            position: 'sticky',
            top: 0,
            backgroundColor: palette.panelBg,
            zIndex: 1
        },
        modalTitle: {
            margin: 0,
            fontSize: '20px',
            color: palette.textPrimary,
            fontWeight: '600'
        },
        modalClose: {
            background: 'none',
            border: 'none',
            color: palette.textSecondary,
            fontSize: '24px',
            cursor: 'pointer',
            padding: '0',
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            transition: 'all 0.2s'
        },
        schemaModalBody: {
            padding: '24px'
        },
        levelModalOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: palette.overlay,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        },
        levelModalContent: {
            backgroundColor: palette.panelBg,
            borderRadius: '16px',
            width: '92%',
            maxWidth: '980px',
            maxHeight: '82vh',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: `1px solid ${palette.border}`
        },
        levelModalHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '18px 22px',
            borderBottom: `1px solid ${palette.borderSoft}`,
            backgroundColor: palette.panelBg
        },
        levelModalBody: {
            display: 'grid',
            gridTemplateColumns: '280px 1fr',
            gap: '20px',
            padding: '22px',
            backgroundColor: palette.panelSoft,
            height: 'calc(82vh - 64px)'
        },
        levelLeft: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            paddingBottom: '12px',
            overflowY: 'auto'
        },
        levelRight: {
            backgroundColor: palette.panelBg,
            borderRadius: '12px',
            border: `1px solid ${palette.borderSoft}`,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            overflow: 'hidden'
        },
        levelCard: {
            backgroundColor: palette.panelBg,
            borderRadius: '14px',
            border: `1px solid ${palette.borderSoft}`,
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
        },
        levelIcon: {
            width: '52px',
            height: '52px',
            borderRadius: '12px',
            backgroundColor: palette.panelMuted,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
        },
        levelTitle: {
            fontSize: '22px',
            fontWeight: '700',
            color: palette.textPrimary
        },
        levelMeta: {
            fontSize: '13px',
            color: palette.textSecondary
        },
        levelSelector: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
        },
        levelSelectorBtn: {
            padding: '6px 10px',
            borderRadius: '999px',
            border: `1px solid ${palette.borderSoft}`,
            backgroundColor: palette.panelBg,
            color: palette.textSecondary,
            fontSize: '12px',
            cursor: 'pointer'
        },
        levelSelectorBtnActive: {
            backgroundColor: palette.accentSoft,
            borderColor: palette.accentBorder,
            color: palette.accent,
            fontWeight: '600'
        },
        progressCard: {
            backgroundColor: palette.panelBg,
            borderRadius: '14px',
            border: `1px solid ${palette.borderSoft}`,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px'
        },
        progressRing: {
            width: '140px',
            height: '140px'
        },
        progressTrackColor: palette.borderSoft,
        progressFillColor: palette.accent,
        progressRingLabel: {
            fontSize: '10px',
            fill: palette.textSecondary,
            fontWeight: '600'
        },
        progressRingValue: {
            fontSize: '14px',
            fill: palette.textPrimary,
            fontWeight: '700'
        },
        progressLabel: {
            fontSize: '12px',
            color: palette.textSecondary
        },
        progressValue: {
            fontSize: '18px',
            fontWeight: '700',
            color: palette.textPrimary
        },
        levelListHeader: {
            fontSize: '14px',
            fontWeight: '700',
            color: palette.textPrimary
        },
        levelList: {
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            paddingRight: '6px',
            flex: 1
        },
        levelRowItem: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            padding: '8px 10px',
            borderRadius: '10px',
            backgroundColor: palette.panelSoft
        },
        levelCheck: {
            width: '20px',
            height: '20px',
            borderRadius: '6px',
            border: `1px solid ${palette.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: '700',
            color: palette.accent,
            backgroundColor: palette.panelBg
        },
        levelQuestionText: {
            fontSize: '13px',
            color: palette.textMuted
        },
        schemaContainer: {
            color: palette.textPrimary
        },
        schemaSubtitle: {
            fontSize: '16px',
            color: palette.textMuted,
            marginBottom: '16px',
            fontWeight: '600'
        },
        schemaTable: {
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px'
        },
        schemaHeaderRow: {
            backgroundColor: palette.tableHeaderBg
        },
        schemaTh: {
            padding: '12px',
            textAlign: 'left',
            fontWeight: '600',
            color: palette.textPrimary,
            borderBottom: `2px solid ${palette.border}`
        },
        schemaRow: {
            borderBottom: `1px solid ${palette.borderSoft}`
        },
        schemaTd: {
            padding: '10px 12px',
            color: palette.textSecondary
        },
        schemaJson: {
            backgroundColor: palette.panelMuted,
            padding: '16px',
            borderRadius: '8px',
            fontSize: '13px',
            color: palette.jsonText,
            overflow: 'auto',
            fontFamily: 'monospace',
            lineHeight: '1.6'
        },
        schemaNote: {
            marginTop: '16px',
            padding: '12px',
            backgroundColor: palette.panelSoft,
            borderRadius: '6px',
            fontSize: '12px',
            color: palette.textSecondary
        },
        noDataText: {
            color: palette.textSecondary,
            fontSize: '11px'
        }
    };
};

export default GameLayout;
