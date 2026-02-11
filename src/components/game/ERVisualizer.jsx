import React, { useState, useEffect } from 'react';

const ERVisualizer = ({ sqlCode }) => {
    const [erData, setErData] = useState({ tables: [], relationships: [] });
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        const ddlKeywords = /CREATE TABLE|ALTER TABLE|DROP TABLE|FOREIGN KEY/i;
        if (ddlKeywords.test(sqlCode)) {
            const parsed = parseSQLToER(sqlCode);
            setErData(parsed);
            setShouldRender(true);
        } else {
            setShouldRender(false);
        }
    }, [sqlCode]);

    if (!shouldRender || (erData.tables.length === 0 && erData.relationships.length === 0)) {
        return (
            <div style={styles.placeholderContainer}>
                <div style={styles.placeholderIcon}>📊</div>
                <div style={styles.placeholderText}>
                    Standard ER Notation Visualizer
                    <br />
                    <span style={{ fontSize: '11px', opacity: 0.7 }}>
                        (Entities: Rectangles | Attributes: Ellipses | Relationships: Diamonds)
                    </span>
                </div>
            </div>
        );
    }

    const renderERDiagram = () => {
        const centerX = 500;
        const centerY = 400;
        const tableRadius = 250;
        const attrRadius = 80;

        return (
            <div style={styles.erDiagram}>
                <svg style={styles.svgOverlay} viewBox="0 0 1000 800">
                    {/* Connections: Table to Attributes */}
                    {erData.tables.map((table, tIdx) => {
                        const tAngle = (tIdx / erData.tables.length) * 2 * Math.PI - Math.PI / 2;
                        const tx = centerX + tableRadius * Math.cos(tAngle);
                        const ty = centerY + tableRadius * Math.sin(tAngle);

                        return table.columns.map((col, cIdx) => {
                            const cAngle = (cIdx / table.columns.length) * 2 * Math.PI;
                            const cx = tx + attrRadius * Math.cos(cAngle);
                            const cy = ty + attrRadius * Math.sin(cAngle);
                            return (
                                <line key={`line-${tIdx}-${cIdx}`} x1={tx} y1={ty} x2={cx} y2={cy} stroke="#64748b" strokeWidth="1" />
                            );
                        });
                    })}

                    {/* Connections: Relationships (Diamonds) to Tables */}
                    {erData.relationships.map((rel, rIdx) => {
                        const t1 = erData.tables.find(t => t.name.toLowerCase() === rel.from.toLowerCase());
                        const t2 = erData.tables.find(t => t.name.toLowerCase() === rel.to.toLowerCase());
                        if (!t1 || !t2) return null;

                        const idx1 = erData.tables.indexOf(t1);
                        const idx2 = erData.tables.indexOf(t2);

                        const a1 = (idx1 / erData.tables.length) * 2 * Math.PI - Math.PI / 2;
                        const a2 = (idx2 / erData.tables.length) * 2 * Math.PI - Math.PI / 2;

                        const x1 = centerX + tableRadius * Math.cos(a1);
                        const y1 = centerY + tableRadius * Math.sin(a1);
                        const x2 = centerX + tableRadius * Math.cos(a2);
                        const y2 = centerY + tableRadius * Math.sin(a2);

                        const midX = (x1 + x2) / 2;
                        const midY = (y1 + y2) / 2;

                        return (
                            <g key={`rel-${rIdx}`}>
                                <line x1={x1} y1={y1} x2={midX} y2={midY} stroke="#4f46e5" strokeWidth="2" strokeDasharray="4" />
                                <line x1={midX} y1={midY} x2={x2} y2={y2} stroke="#4f46e5" strokeWidth="2" strokeDasharray="4" />
                                <path d={`M ${midX - 20} ${midY} L ${midX} ${midY - 20} L ${midX + 20} ${midY} L ${midX} ${midY + 20} Z`} fill="#161e31" stroke="#4f46e5" strokeWidth="2" />
                                <text x={midX} y={midY + 4} fontSize="8" textAnchor="middle" fill="#f1f5f9" fontWeight="bold">REF</text>
                            </g>
                        );
                    })}
                </svg>

                {/* Table Entities (Rectangles) */}
                {erData.tables.map((table, tIdx) => {
                    const angle = (tIdx / erData.tables.length) * 2 * Math.PI - Math.PI / 2;
                    const tx = centerX + tableRadius * Math.cos(angle);
                    const ty = centerY + tableRadius * Math.sin(angle);

                    return (
                        <React.Fragment key={`table-group-${tIdx}`}>
                            <div style={{ ...styles.entityBox, left: tx, top: ty }}>
                                {table.name}
                            </div>
                            {/* Attributes (Ellipses) */}
                            {table.columns.map((col, cIdx) => {
                                const cAngle = (cIdx / table.columns.length) * 2 * Math.PI;
                                const cx = tx + attrRadius * Math.cos(cAngle);
                                const cy = ty + attrRadius * Math.sin(cAngle);
                                const isPK = col.constraints.toUpperCase().includes('PRIMARY KEY');

                                return (
                                    <div key={`attr-${tIdx}-${cIdx}`} style={{
                                        ...styles.attributeEllipse,
                                        left: cx,
                                        top: cy,
                                        textDecoration: isPK ? 'underline' : 'none',
                                        fontWeight: isPK ? 'bold' : 'normal',
                                        borderColor: isPK ? '#f59e0b' : '#1f2937'
                                    }}>
                                        {col.name}
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    );
                })}
            </div>
        );
    };

    return (
        <div style={styles.erDiagramContainer}>
            {renderERDiagram()}
        </div>
    );
};

const parseSQLToER = (sql) => {
    const tables = [];
    const relationships = [];

    // Improved Regex: match everything between ( and ) specifically for CREATE TABLE
    const createTableRegex = /CREATE TABLE\s+(\w+)\s*\(([\s\S]*?)\)(?:\s*;|$)/gi;
    let match;

    while ((match = createTableRegex.exec(sql)) !== null) {
        const tableName = match[1];
        const columnsBlock = match[2];
        const columns = [];

        // Split by comma, respecting parentheses (e.g., DECIMAL(10,2))
        const lines = columnsBlock.split(/,(?![^(]*\))/);

        lines.forEach(line => {
            line = line.trim();
            if (!line) return;

            // Handle inline FOREIGN KEY
            if (line.toUpperCase().includes('REFERENCES')) {
                const fkMatch = line.match(/REFERENCES\s+(\w+)/i);
                if (fkMatch) {
                    relationships.push({ from: tableName, to: fkMatch[1] });
                }
            }

            // Standard column parsing (ignore stand-alone FK/PK lines for now)
            if (line.toUpperCase().startsWith('PRIMARY KEY') || line.toUpperCase().startsWith('FOREIGN KEY')) return;

            const parts = line.split(/\s+/);
            if (parts.length < 2) return;

            columns.push({
                name: parts[0].replace(/['"`]/g, ''),
                type: parts[1],
                constraints: parts.slice(2).join(' ')
            });
        });

        tables.push({ name: tableName, columns });
    }

    return { tables, relationships };
};

const styles = {
    placeholderContainer: {
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        height: '100%', color: '#64748b', backgroundColor: '#0b1120', border: '1px dashed #1f2937', borderRadius: '8px'
    },
    placeholderIcon: { fontSize: '48px', marginBottom: '16px', opacity: 0.5 },
    placeholderText: { textAlign: 'center', fontSize: '14px', lineHeight: '1.5' },
    erDiagramContainer: { width: '100%', height: '100%', overflow: 'auto', backgroundColor: '#0b1120', position: 'relative' },
    erDiagram: { position: 'relative', width: '1000px', height: '800px' },
    svgOverlay: { position: 'absolute', top: 0, left: 0, width: '1000px', height: '800px', pointerEvents: 'none', zIndex: 5 },
    entityBox: {
        position: 'absolute', transform: 'translate(-50%, -50%)',
        backgroundColor: '#4f46e5', padding: '8px 16px', borderRadius: '4px',
        color: 'white', fontWeight: 'bold', border: 'none',
        boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.4)', zIndex: 20, minWidth: '100px', textAlign: 'center'
    },
    attributeEllipse: {
        position: 'absolute', transform: 'translate(-50%, -50%)',
        backgroundColor: '#161e31', padding: '4px 10px', borderRadius: '20px',
        color: '#f1f5f9', fontSize: '10px', border: '1px solid #1f2937',
        zIndex: 15, whiteSpace: 'nowrap'
    }
};

export default ERVisualizer;
