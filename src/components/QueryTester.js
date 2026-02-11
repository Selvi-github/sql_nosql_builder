import React, { useState } from 'react';

const QueryTester = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const executeQuery = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/sql/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query })
      });

      const data = await response.json();

      if (data.success) {
        setResults(data.data);
        setError('');
      } else {
        setError(data.error);
        setResults(null);
      }
    } catch (err) {
      setError('Failed to execute query');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="query-tester">
      <h2>SQL Query Tester</h2>

      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your SQL query here..."
        rows="6"
        style={{ width: '100%', padding: '10px' }}
      />

      <button
        onClick={executeQuery}
        disabled={loading || !query.trim()}
        style={{ margin: '10px 0', padding: '10px 20px' }}
      >
        {loading ? 'Executing...' : 'Execute Query'}
      </button>

      {error && (
        <div style={{ color: 'red', margin: '10px 0' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {results && (
        <div style={{ margin: '20px 0' }}>
          <h3>Results:</h3>
          <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {Object.keys(results[0] || {}).map(key => (
                  <th key={key} style={{ padding: '8px', background: '#f0f0f0' }}>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, cellIndex) => (
                    <td key={cellIndex} style={{ padding: '8px' }}>
                      {String(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QueryTester;