import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
};

function Teams() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTeams() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`, {
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
          setError(err.message || 'Unable to load teams.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
    return () => controller.abort();
  }, []);

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Teams</h2>
        <ul className="list-group">
          {items.length === 0 ? (
            <li className="list-group-item text-muted">No teams found.</li>
          ) : (
            items.map((item) => (
              <li key={item.id ?? item.name} className="list-group-item">
                <strong>{item.name}</strong>
                <div className="small text-muted">{item.members ?? item.description ?? 'No description available.'}</div>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}

export default Teams;
