import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/app/DashboardView";
import IncomeView from "./views/app/IncomeView";
import ExpensesView from "./views/app/ExpensesView";
import AssetsView from "./views/app/AssetsView";
import LiabilitiesView from "./views/app/LiabilitiesView";
import AuthLayout from "./layouts/AuthLayout";
import SingUpForm from "./components/auth/SingUpForm";
import LogInForm from "./components/auth/LogInForm";
import ConfirmAccount from "./components/auth/ConfirmAccount";

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
          <Route path="/auth/sing-up" element={<SingUpForm />}/>
          <Route path="/auth/log-in" element={<LogInForm />}/>
          <Route path="/auth/confirm-account" element={<ConfirmAccount />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
