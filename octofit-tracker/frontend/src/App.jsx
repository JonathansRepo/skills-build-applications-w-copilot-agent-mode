import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/workouts', label: 'Workouts' },
  { to: '/leaderboard', label: 'Leaderboard' }
];

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  return (
    <div className="container-fluid py-4 px-3 px-lg-5">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h1 className="h3 mb-2">Octofit Tracker</h1>
              <p className="mb-2 text-secondary">
                API host: <strong>{apiBaseUrl}</strong>
              </p>
              <p className="mb-0 small text-muted">
                Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to enable the
                Codespaces URL. If it is not set, the app falls back to localhost.
              </p>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-light bg-white rounded shadow-sm mb-4 border">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h5">Navigation</span>
          <div className="navbar-nav d-flex flex-row flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded ${isActive ? 'bg-primary text-white' : 'text-dark'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;
