import { DailyRegister } from './components/DailyRegister';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginForm, SignupForm } from './components/Login';
import { AuthContextProvider } from './components/AuthContext';
import { RequireAuth } from './components/RequireAuth';
import { StatusPage } from './components/StatusPage';
import { Home } from './components/Home';
import { Updates } from './components/Updates';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/dashboard" element={<RequireAuth />}>
            <Route index element={<DailyRegister />} />
            <Route path="updates" element={<Updates />} />
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
