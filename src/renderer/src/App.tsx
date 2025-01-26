import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './components/AuthContext';
import { RequireAuth } from './components/RequireAuth';
import {
  AddDaySpecialsPage,
  AddGoodThoughtsPage,
  AddUpdatesPage,
  DailyUpdatesPage,
  DaySpecialsPage,
  GoodThoughtsPage,
  HomePage,
  LinkDailyUpdatesHeaderPage,
  LinkDailyUpdatesPage,
  LoginPage,
  SignUpPage,
  StatusPage,
  Updates,
} from './pages';
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
              <Route path="good-thoughts" element={<GoodThoughtsPage />} />
              <Route path="good-thoughts/add" element={<AddGoodThoughtsPage />} />
              <Route path="day-specials" element={<DaySpecialsPage />} />
              <Route path="day-specials/add" element={<AddDaySpecialsPage />} />
              <Route path="daily-updates" element={<DailyUpdatesPage />} />
              <Route path="add-updates" element={<AddUpdatesPage />} />
              <Route path="link-daily-updates" element={<LinkDailyUpdatesPage />} />
              <Route path="link-daily-updates-header" element={<LinkDailyUpdatesHeaderPage />} />
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
