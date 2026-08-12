import { useEffect, useState } from 'react';

const getApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
    : 'http://localhost:8000/api/workouts';
};

function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchWorkouts() {
      try {
        const response = await fetch(getApiUrl(), {
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
          setError(err.message || 'Unable to load workouts.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
    return () => controller.abort();
  }, []);

  if (loading) return <p>Loading workouts...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Workouts</h2>
        <ul className="list-group">
          {items.length === 0 ? (
            <li className="list-group-item text-muted">No workouts found.</li>
          ) : (
            items.map((item) => (
              <li key={item.id ?? item.name} className="list-group-item">
                <strong>{item.name}</strong>
                <div className="small text-muted">{item.description ?? item.type ?? 'No details available.'}</div>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}

export default Workouts;
