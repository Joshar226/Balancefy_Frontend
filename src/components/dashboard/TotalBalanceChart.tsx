import { PieChart } from '@mui/x-charts'
import { useQuery } from '@tanstack/react-query';
import { getAllData } from '../../api/DashboardAPI';
import Spinner from '../Spinner';

export default function TotalBalanceChart() {
    const {data} = useQuery({
    queryFn: getAllData,
    queryKey: ['allData']
    })

    if (!data || typeof data !== 'object') return <Spinner />

    const colors: Record<string, string> = {
      assets: '#008236',
      expenses: '#c10007',  
      incomes: '#155dfc ',      
      liabilities: '#f54a00'
    }

    const result = Object.entries(data).map(([key, items]) => {
    const value = items.reduce((sum, item) => sum + parseFloat(item.value), 0);
    return { label: key, value, color: colors[key] };
    });
    
  return (
    <div className='w-[500px] '>
        <h2 className='text-center text-2xl font-bold text-blue-500 mb-3'>Total Balance</h2>
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
