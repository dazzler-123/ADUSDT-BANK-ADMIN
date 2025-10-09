import { lazy, Suspense } from 'react';
import './App.css';
import { Routes, Route, BrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { store, persistedStore } from "./redux/store";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from './Layout/Layout';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import OnboardingUsers from './Screens/OnboardingUsers';
import Dashboard from './Screens/Dashboard';
import AnnouncementTable from './Screens/AnnouncementTable';
import IncomeTable from './Screens/IncomeTable';
import IncomeDistribution from './Screens/IncomeDistribution';
import TicketTable from './Screens/TicketTable';
import TransactionTable from './Screens/TransactionTable';
import UserReport from './Screens/UserReport';
const Login = lazy(() => import('./Screens/Login'));


const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to='/' replace />;
};

const PublicRoute = () => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to='/dashboard' replace /> : <Outlet />;
};

function App() {

  // const methods = useForm()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
       
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistedStore}>
            <Suspense fallback={<div>loading ............</div>}>
              <Routes>
                {/* Public-only route: redirect to dashboard if authenticated */}
                <Route element={<PublicRoute />}>
                  <Route path='/' element={<Login />} />
                </Route>
                {/* Protected routes inside layout */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<Layout />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/users' element={<OnboardingUsers />} />
                    <Route path='/transactions' element={<TransactionTable />} />
                    <Route path='/announcement' element={<AnnouncementTable />} />
                    <Route path='/incomes' element={<IncomeTable />} />
                    <Route path='/income-distribution' element={<IncomeDistribution />} />
                    <Route path='/tickets' element={<TicketTable />} />
                    <Route path='/users' element={<UserReport />} />
                  </Route>
                </Route>
              </Routes>
            </Suspense>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
