import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/app/DashboardView";
import IncomeView from "./views/app/IncomeView";
import ExpensesView from "./views/app/ExpensesView";
import AssetsView from "./views/app/AssetsView";
import LiabilitiesView from "./views/app/LiabilitiesView";
import AuthLayout from "./layouts/AuthLayout";
import SingUpView from "./views/auth/SingUpView";
import LogInView from "./views/auth/LogInView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import ResetPasswordView from "./views/auth/ResetPasswordView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} />
          <Route path="/incomes" element={<IncomeView />} />
          <Route path="/expenses" element={<ExpensesView />} />
          <Route path="/assets" element={<AssetsView />} />
          <Route path="/liabilities" element={<LiabilitiesView />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/sing-up" element={<SingUpView />}/>
          <Route path="/auth/log-in" element={<LogInView />}/>
          <Route path="/auth/confirm-account" element={<ConfirmAccountView />}/>
          <Route path="/auth/forgot-password" element={<ForgotPasswordView />}/>
          <Route path="/auth/reset-password" element={<ResetPasswordView />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
