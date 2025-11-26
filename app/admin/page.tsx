export default function AdminDashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the admin area.</p>
            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                    <h3>Total Posts</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>0</p>
                </div>
                <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                    <h3>Total Projects</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>0</p>
                </div>
            </div>
        </div>
    );
}
