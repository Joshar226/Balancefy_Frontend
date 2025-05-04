import { PieChart } from '@mui/x-charts'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Spinner';
import { getIncomeExpenseData } from '../../api/DashboardAPI';

export default function IncomeExpenseChart() {
    const {data} = useQuery({
        queryFn: getIncomeExpenseData,
        queryKey: ['incomeExpenseData']
    })

    if (!data || typeof data !== 'object') return <Spinner />

    const colors: Record<string, string> = {
      expenses: '#c10007',  
      incomes: '#155dfc '  
    }

    const result = Object.entries(data).map(([key, items]) => {
    const value = items.reduce((sum, item) => sum + parseFloat(item.value), 0);
    return { label: key, value, color: colors[key] };
    });

  return (
    <div className='w-[500px] '>
        <h2 className='text-center text-2xl font-bold text-blue-500 mb-3'>Incomes & Expenses</h2>
        <PieChart
          series={[
            {
              data: result,
              innerRadius: 45,
              outerRadius: 100,
              paddingAngle: 2,
              cornerRadius: 5,
              startAngle: -45,
              endAngle: 360,
              cx: 100,
              cy: 100,
            }
          ]}
          height={250}
          width={300}
        />
      </div>
  )
}
