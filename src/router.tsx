import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import { lazy, Suspense } from "react";
import Spinner from "./components/Spinner";

const DashboardView = lazy(() => import('./views/app/DashboardView'))
const IncomesView = lazy(() => import('./views/app/IncomesView'))
const ExpensesView = lazy(() => import('./views/app/ExpensesView'))
const AssetsView = lazy(() => import('./views/app/AssetsView'))
const LiabilitiesView = lazy(() => import('./views/app/LiabilitiesView'))
const ProfileData = lazy(() => import('./components/auth/ProfileData'))

const SingUpView = lazy(() => import('./views/auth/SingUpView'))
const LogInView = lazy(() => import('./views/auth/LogInView'))
const ConfirmAccountView = lazy(() => import('./views/auth/ConfirmAccountView'))
const ForgotPasswordView = lazy(() => import('./views/auth/ForgotPasswordView'))
const ResetPasswordView = lazy(() => import('./views/auth/ResetPasswordView'))

const NotFoundView = lazy(() => import('./views/NotFoundView'))

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Suspense fallback={<Spinner/>}><DashboardView/></Suspense>} />
          <Route path="/incomes" element={<Suspense fallback={<Spinner/>}><IncomesView/></Suspense>} />
          <Route path="/expenses" element={<Suspense fallback={<Spinner/>}><ExpensesView/></Suspense>} />
          <Route path="/assets" element={<Suspense fallback={<Spinner/>}><AssetsView/></Suspense>} />
          <Route path="/liabilities" element={<Suspense fallback={<Spinner/>}><LiabilitiesView/></Suspense>} />
          <Route path="/profile" element={<Suspense fallback={<Spinner/>}><ProfileData/></Suspense>}/>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/sing-up" element={<Suspense fallback={<Spinner/>}><SingUpView/></Suspense>} />
          <Route path="/auth/log-in" element={<Suspense fallback={<Spinner/>}><LogInView/></Suspense>} />
          <Route path="/auth/confirm-account" element={<Suspense fallback={<Spinner/>}><ConfirmAccountView/></Suspense>} />
          <Route path="/auth/forgot-password" element={<Suspense fallback={<Spinner/>}><ForgotPasswordView/></Suspense>} />
          <Route path="/auth/reset-password" element={<Suspense fallback={<Spinner/>}><ResetPasswordView/></Suspense>} />
        </Route>


        <Route path="/404" element={<Suspense fallback={<Spinner/>}><NotFoundView/></Suspense>}/>
      </Routes>
    </BrowserRouter>
  )
}
