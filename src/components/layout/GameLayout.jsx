import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import LevelMap from '../game/LevelMap';
import BlocklyEditor from '../game/BlocklyEditor';
import ERVisualizer from '../game/ERVisualizer';
import { validateQuery } from '../../utils/queryValidator';

const GameLayout = ({ dbType }) => {
    const {
        currentLevel,
        currentQuestion,
        handleCorrectAnswer,
        handleWrongAnswer,
        lastAttemptResult,
        showConfetti
    } = useGame();

    // MODES: 'FREE' | 'LEARN'
    const [mode, setMode] = useState('FREE');
    const [generatedCode, setGeneratedCode] = useState("-- Assemble blocks to see code");
    const [executionResult, setExecutionResult] = useState(null);
    const [isExecuting, setIsExecuting] = useState(false);
    const [showERModal, setShowERModal] = useState(false);
    const [showSchemaModal, setShowSchemaModal] = useState(false);

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

    return (
        <div style={styles.container}>
            {/* LEFT: MAP (Only in Learn Mode) */}
            {mode === 'LEARN' && <LevelMap />}

            {/* CENTER: WORKSPACE */}
            <div style={styles.centerPanel}>
                {/* TOOLBAR */}
                <div style={styles.toolbar}>
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
                        <button
                            style={{ ...styles.schemaBtn }}
                            onClick={() => setShowSchemaModal(true)}
                            title="View sample data schema"
                        >
                            📋 View Schema
                        </button>
                    </div>

                    {mode === 'LEARN' && (
                        <div style={styles.questBar} title={currentQuestion.text}>
                            <span style={{ fontWeight: 'bold', color: '#fbbf24' }}>Q:</span> {currentQuestion.text}
                        </div>
                    )}
                </div>

                <div style={styles.blocklyContainer}>
                    <BlocklyEditor
                        onCodeChange={setGeneratedCode}
                        category={mode === 'FREE' ? dbType : currentLevel.type} // Pass 'SQL' or 'NoSQL' in Free Mode
                    />
                </div>
            </div>

            {/* RIGHT: RESULTS */}
            <div style={styles.rightPanel}>
                <div style={styles.panelSection}>
                    <div style={styles.panelHeader}>GENERATED QUERY</div>
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
                                    <div style={{ color: executionResult.mode === 'OFFLINE' ? '#fbbf24' : '#4ade80', marginBottom: '8px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <div style={{ width: '8px', height: '8px', backgroundColor: executionResult.mode === 'OFFLINE' ? '#fbbf24' : '#4ade80', borderRadius: '50%' }}></div>
                                        {executionResult.mode === 'OFFLINE' ? 'OFFLINE MODE' : 'CONNECTED TO CLOUD DB'}
                                    </div>
                                    <div style={styles.tableScroll}>
                                        {/* SQL Multi-Statement Results */}
                                        {executionResult.results && (
                                            executionResult.results.map((res, idx) => (
                                                <div key={idx} style={{ marginBottom: '20px', borderLeft: '2px solid #3b82f6', paddingLeft: '10px' }}>
                                                    <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '4px' }}>{res.message}</div>
                                                    {res.type === 'table' ? (
                                                        dbType === 'NoSQL' ? (
                                                            <JSONDisplay data={res.data} />
                                                        ) : (
                                                            <ResultTable data={res.data} />
                                                        )
                                                    ) : (
                                                        <div style={{ color: '#94a3b8', fontSize: '11px', backgroundColor: '#1e293b', padding: '6px', borderRadius: '4px' }}>
                                                            {res.data && res.data[0] && res.data[0].message ? `✅ ${res.data[0].message}` : '✅ Statement Executed'}
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '6px', border: '1px solid #ef4444' }}>
                                    <div style={{ color: '#f87171', fontWeight: 'bold', marginBottom: '4px' }}>⚠️ Cloud Execution Error</div>
                                    <div style={{ color: '#fca5a5', fontSize: '11px', lineHeight: '1.4' }}>{executionResult.error}</div>
                                    <div style={{ marginTop: '10px', fontSize: '10px', color: '#94a3b8', fontStyle: 'italic' }}>
                                        <strong>Senior Dev Tip:</strong> If you changed columns, the old table structure in the cloud might be clashing.
                                        Drag a new <strong>CREATE TABLE</strong> block to drop and recreate it fresh!
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', marginTop: '40px' }}>
                            <div style={{ fontSize: '30px', marginBottom: '10px' }}>⚡</div>
                            <div style={{ color: '#64748b', fontSize: '12px' }}>
                                Assemble blocks and hit <strong>EXECUTE</strong><br />
                                to run your query on the Cloud.
                            </div>
                        </div>
                    )}
                </div>

                {/* Schema Reference Guide */}
                <div style={{ ...styles.panelSection, backgroundColor: '#0f172a', margin: '10px', borderRadius: '8px', border: '1px solid #334155' }}>
                    <div style={{ ...styles.panelHeader, color: '#3b82f6' }}>📑 SCHEMA REFERENCE</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                        <div style={{ marginBottom: '8px' }}>
                            <strong style={{ color: '#e2e8f0' }}>Dynamic Schema</strong><br />
                            Create tables using blocks to see them here in the future or via the ER Visualizer.
                        </div>
                    </div>
                </div>

                {/* ER Visualizer Button (Bottom Right) */}
                <div style={{ ...styles.panelSection, borderBottom: 'none' }}>
                    <button
                        style={styles.erBtn}
                        onClick={() => setShowERModal(true)}
                    >
                        📊 View Entity-Relationship (ER) Diagram
                    </button>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '10px', textAlign: 'center' }}>
                        Visualizes CREATE TABLE & RELATIONSHIPS
                    </div>
                </div>
            </div>

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
                            {dbType === 'SQL' ? <SQLSchemaView /> : <NoSQLSchemaView />}
                        </div>
                    </div>
                </div>
            )}

            {showConfetti && <div style={styles.confetti}>🎊 LEVEL COMPLETE! 🎊</div>}
        </div>
    );
};

// SQL Schema View Component
const SQLSchemaView = () => {
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
const NoSQLSchemaView = () => {
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
const JSONDisplay = ({ data }) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
        return <div style={{ padding: '10px', color: '#94a3b8' }}>No documents returned</div>;
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
const ResultTable = ({ data }) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
        return <div style={{ padding: '10px', color: '#94a3b8' }}>No data returned</div>;
    }

    // Safety check: Ensure the first item is actually an object to extract keys
    const firstItem = data[0];
    if (typeof firstItem !== 'object' || firstItem === null) {
        return <div style={{ padding: '10px', color: '#94a3b8' }}>Invalid data format</div>;
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

const styles = {
    container: {
        display: 'flex',
        height: 'calc(100vh - 60px)',
        width: '100vw',
        backgroundColor: '#0b1120',
        color: 'white',
        overflow: 'hidden',
        minWidth: '1024px'
    },
    leftPanel: {
        width: '240px',
        minWidth: '240px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#161e31',
        borderRight: '1px solid #1f2937',
        height: '100%',
        boxSizing: 'border-box',
        overflowY: 'auto',
        paddingBottom: '100px'
    },
    centerPanel: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #1f2937',
        overflowY: 'hidden'
    },
    toolbar: {
        height: '60px', borderBottom: '1px solid #1f2937', display: 'flex', alignItems: 'center', padding: '0 20px',
        backgroundColor: '#161e31'
    },
    modeToggle: { display: 'flex', gap: '10px', backgroundColor: '#0f172a', padding: '4px', borderRadius: '8px' },
    toggleBtn: {
        padding: '6px 12px', border: 'none', backgroundColor: 'transparent', color: '#94a3b8',
        cursor: 'pointer', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold'
    },
    activeBtn: { backgroundColor: '#4f46e5', color: 'white' },
    questBar: {
        flex: 1, textAlign: 'center', padding: '0 20px',
        fontSize: '14px', maxWidth: '800px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        minWidth: 0
    },
    blocklyContainer: { flex: 1, position: 'relative' },

    // RIGHT PANEL FIX
    rightPanel: {
        width: '25%',
        minWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#161e31',
        borderLeft: '1px solid #1f2937',
        height: '100%',
        boxSizing: 'border-box',
        overflowY: 'auto',
        paddingBottom: '100px'
    },
    panelSection: { padding: '15px', borderBottom: '1px solid #1f2937', display: 'flex', flexDirection: 'column' },
    panelHeader: { fontSize: '11px', color: '#94a3b8', fontWeight: 'bold', marginBottom: '10px' },
    codeDisplay: { fontFamily: 'monospace', fontSize: '12px', color: '#e2e8f0', backgroundColor: '#0b1120', padding: '10px', borderRadius: '4px', marginBottom: '10px', overflowX: 'auto', border: '1px solid #1f2937' },
    runBtn: { padding: '10px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' },
    resultBox: { fontSize: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', flex: 1 },
    tableScroll: { overflow: 'auto', maxHeight: '400px' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: '11px' },
    th: { textAlign: 'left', padding: '6px', borderBottom: '1px solid #475569', color: '#cbd5e1', position: 'sticky', top: 0, backgroundColor: '#1e293b' },
    td: { padding: '6px', borderBottom: '1px solid #334155', color: '#94a3b8' },

    erBtn: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#6366f1',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '13px',
        transition: 'all 0.3s',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.4)'
    },
    erModalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(5px)'
    },
    erModalContent: {
        width: '90%',
        height: '90%',
        backgroundColor: '#0f172a',
        borderRadius: '16px',
        border: '1px solid #334155',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    erModalHeader: {
        padding: '20px',
        borderBottom: '1px solid #334155',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#94a3b8',
        fontSize: '24px',
        cursor: 'pointer'
    },
    erModalBody: {
        flex: 1,
        padding: '20px',
        overflow: 'hidden'
    },
    confetti: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px', backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 100 },
    jsonContainer: {
        backgroundColor: '#0b1120',
        borderRadius: '6px',
        padding: '12px',
        border: '1px solid #1f2937',
        overflow: 'auto',
        maxHeight: '400px'
    },
    jsonPre: {
        margin: 0,
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#10b981',
        lineHeight: '1.5',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word'
    },
    schemaBtn: {
        padding: '8px 16px',
        backgroundColor: '#8b5cf6',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '600',
        transition: 'all 0.2s',
        marginLeft: '10px'
    },
    schemaModalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    },
    schemaModalContent: {
        backgroundColor: '#1e293b',
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
        borderBottom: '1px solid #334155',
        position: 'sticky',
        top: 0,
        backgroundColor: '#1e293b',
        zIndex: 1
    },
    modalTitle: {
        margin: 0,
        fontSize: '20px',
        color: '#f1f5f9',
        fontWeight: '600'
    },
    modalClose: {
        background: 'none',
        border: 'none',
        color: '#94a3b8',
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
    schemaContainer: {
        color: '#e2e8f0'
    },
    schemaSubtitle: {
        fontSize: '16px',
        color: '#cbd5e1',
        marginBottom: '16px',
        fontWeight: '600'
    },
    schemaTable: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '13px'
    },
    schemaHeaderRow: {
        backgroundColor: '#334155'
    },
    schemaTh: {
        padding: '12px',
        textAlign: 'left',
        fontWeight: '600',
        color: '#f1f5f9',
        borderBottom: '2px solid #475569'
    },
    schemaRow: {
        borderBottom: '1px solid #334155'
    },
    schemaTd: {
        padding: '10px 12px',
        color: '#cbd5e1'
    },
    schemaJson: {
        backgroundColor: '#0f172a',
        padding: '16px',
        borderRadius: '8px',
        fontSize: '13px',
        color: '#10b981',
        overflow: 'auto',
        fontFamily: 'monospace',
        lineHeight: '1.6'
    },
    schemaNote: {
        marginTop: '16px',
        padding: '12px',
        backgroundColor: '#334155',
        borderRadius: '6px',
        fontSize: '12px',
        color: '#cbd5e1'
    }
};

export default GameLayout;
