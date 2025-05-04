import { Link, Outlet, useLocation } from "react-router-dom";


export default function AppLayout() {

  const location = useLocation()

  const colors : Record<string, string> = {
    dashboard: 'bg-[#155dfc]',
    assets: 'bg-[#008236]',
    expenses: 'bg-[#c10007]',  
    incomes: 'bg-[#155dfc]',      
    liabilities: 'bg-[#f54a00]'
  }
  const hoverColors : Record<string, string> = {
    dashboard: 'hover:bg-[#0045dd]',
    assets: 'hover:bg-[#006e2e]',
    expenses: 'hover:bg-[#a00006]',  
    incomes: 'hover:bg-[#0045dd]',      
    liabilities: 'hover:bg-[#da4200]'
  }

  const path = location.pathname.split('/')[1] || 'dashboard'
  
  const currentColor = colors[path]
  const currectHoverColor = hoverColors[path]

  return (
    <div className="flex">
      <div className={`w-3xs h-[100vh] px-2 pt-5 flex flex-col justify-between ${currentColor}`}>
        <div>
          <h1 className="logo-font text-white font-bold text-4xl text-center mb-15">Balancefy</h1>
          <div className="space-y-5">
            <Link to={'/'} className={`text-white text-xl font-bold py-1 block text-center rounded-md ${currectHoverColor}`}
              
            >Dashboard</Link>
            <Link to={'/incomes'} className={`text-white text-xl font-bold py-1 block text-center rounded-md ${currectHoverColor}`}>Incomes</Link>
            <Link to={'/expenses'} className={`text-white text-xl font-bold py-1 block text-center rounded-md ${currectHoverColor}`}>Expenses</Link>
            <Link to={'/assets'} className={`text-white text-xl font-bold py-1 block text-center rounded-md ${currectHoverColor}`}>Assets</Link>
            <Link to={'/liabilities'} className={`text-white text-xl font-bold py-1 block text-center rounded-md ${currectHoverColor}`}>Liabilities</Link>
          </div>
        </div>
        <Link to={'/profile'} className={`text-white text-xl font-bold py-1 block text-center rounded-md mb-10 ${currectHoverColor}`}>Profile</Link>
      </div>

      <div className="flex-1 p-[40px]">
        <Outlet />
      </div>
    </div>
  )
}
