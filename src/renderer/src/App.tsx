import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './components/AuthContext';
import { RequireAuth } from './components/RequireAuth';
import {
  AddDaySpecialsPage,
  AddGoodThoughtsPage,
  AddSubjectsPage,
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
  SubjectsPage,
  Updates,
} from './pages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CenteredLayout } from '@/components/layout/CenteredLayout';
import { ThemeProvider } from '@/components/theme-provider';
import { BreadcrumbProvider } from './components/Breadcrumbs/Breadcrumb';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BreadcrumbProvider>
          <Router>
            <AuthContextProvider>
              <Routes>
                <Route element={<RequireAuth />}>
                  <Route path="/updates">
                    <Route index element={<Updates />} />
                    <Route path="add" element={<AddUpdatesPage />} />
                  </Route>
                  <Route path="/good-thoughts">
                    <Route index element={<GoodThoughtsPage />} />
                    <Route path="add" element={<AddGoodThoughtsPage />} />
                  </Route>
                  <Route path="/day-specials">
                    <Route index element={<DaySpecialsPage />} />
                    <Route path="add" element={<AddDaySpecialsPage />} />
                  </Route>
                  <Route path="/subjects">
                    <Route index element={<SubjectsPage />} />
                    <Route path="add" element={<AddSubjectsPage />} />
                  </Route>
                  <Route path="/daily-updates">
                    <Route index element={<DailyUpdatesPage />} />
                    <Route path="add" element={<LinkDailyUpdatesPage />} />
                    <Route path="add-header" element={<LinkDailyUpdatesHeaderPage />} />
                  </Route>
                </Route>
                <Route element={<CenteredLayout />}>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/status" element={<StatusPage />} />
                </Route>
                <Route path="/" element={<HomePage />} />
              </Routes>
            </AuthContextProvider>
          </Router>
        </BreadcrumbProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
