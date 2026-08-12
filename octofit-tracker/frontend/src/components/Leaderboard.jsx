import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
};

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchLeaderboard() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const list = Array.isArray(payload) ? payload : payload.results ?? [];
        setItems(list);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load leaderboard.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
    return () => controller.abort();
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        <ul className="list-group">
          {items.length === 0 ? (
            <li className="list-group-item text-muted">No leaderboard entries found.</li>
          ) : (
            items.map((item, index) => (
              <li key={item.id ?? `${item.name}-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{item.name}</span>
                <span className="badge bg-primary rounded-pill">{item.score ?? item.points ?? index + 1}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}

export default Leaderboard;
