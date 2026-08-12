import { useEffect, useState } from 'react';

const getApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities`
    : 'http://localhost:8000/api/activities';
};

function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchActivities() {
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
          setError(err.message || 'Unable to load activities.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
    return () => controller.abort();
  }, []);

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Activities</h2>
        <ul className="list-group">
          {items.length === 0 ? (
            <li className="list-group-item text-muted">No activities found.</li>
          ) : (
            items.map((item) => (
              <li key={item.id ?? `${item.name}-${item.description}`} className="list-group-item">
                <strong>{item.name}</strong>
                <div className="small text-muted">{item.description}</div>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}

export default Activities;
