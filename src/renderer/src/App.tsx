import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './components/AuthContext';
import { RequireAuth } from './components/RequireAuth';
import { Updates, DailyUpdatesPage, LoginPage, SignUpPage, StatusPage, HomePage } from './pages';
import { AddUpdatesPage } from './pages/AddUpdatesPage';
import { LinkDailyUpdatesPage } from './pages/LinkDailyUpdatesPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthContextProvider>
          <Routes>
            <Route path="/dashboard" element={<RequireAuth />}>
              <Route index element={<Updates />} />
              <Route path="daily-updates" element={<DailyUpdatesPage />} />
              <Route path="add-updates" element={<AddUpdatesPage />} />
              <Route path="link-daily-updates" element={<LinkDailyUpdatesPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </AuthContextProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
