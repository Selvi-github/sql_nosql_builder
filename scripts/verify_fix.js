
async function verify() {
    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch('http://localhost:5000/api/sql/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: "SELECT u.firstname, o.amount FROM users u INNER JOIN orders o ON u.user_id = o.user_id;" })
        });
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (e) {
        console.error(e);
    }
}
verify();
