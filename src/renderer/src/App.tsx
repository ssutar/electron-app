import { DailyRegister } from './components/DailyRegister';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginForm, SignupForm } from './components/Login';
import { AuthContextProvider } from './components/AuthContext';
import { RequireAuth } from './components/RequireAuth';
import { StatusPage } from './components/StatusPage';
import { Home } from './components/Home';
import { Updates } from './components/Updates';
import DefaultLayout from './components/layout/DefaultLayout';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/dashboard" element={<RequireAuth />}>
            <Route index element={<DailyRegister />} />
            <Route path="updates" element={<Updates />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
