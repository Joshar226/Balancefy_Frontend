import AssetDashboardCard from '../../components/dashboard/AssetDashboardCard';
import ExpenseDashboardCard from '../../components/dashboard/ExpenseDashboardCard';
import IncomeDashboardCard from '../../components/dashboard/IncomeDashboardCard';
import IncomeExpenseChart from '../../components/dashboard/IncomeExpensesChart';
import LiabilityDashboardCard from '../../components/dashboard/LiabilityDashboardCard';
import TotalBalanceChart from '../../components/dashboard/TotalBalanceChart';

export default function DashboardView() {

  return (
    <>
      <div className='flex justify-between items-center md:justify-around'>
        <TotalBalanceChart />
        <IncomeExpenseChart />
      </div>

      <div className='grid grid-cols-2 lg:grid-cols-4 mt-10 gap-4
        md:gap-10'>
        <IncomeDashboardCard />
        <ExpenseDashboardCard />
        <AssetDashboardCard />
        <LiabilityDashboardCard />
      </div>
    </>
  )
}
