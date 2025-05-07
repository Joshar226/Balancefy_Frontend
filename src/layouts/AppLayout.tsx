import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { MdOutlineDashboard } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { GiExpense } from "react-icons/gi";
import { BsGraphUp } from "react-icons/bs";
import { BsGraphDown } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";







export default function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const {data: user} = useAuth()

  if(!user) navigate('/404')
  
  const colors : Record<string, string> = {
    dashboard: 'bg-[#18183d]',
    assets: 'bg-[#008236]',
    expenses: 'bg-[#c10007]',  
    incomes: 'bg-[#155dfc]',      
    liabilities: 'bg-[#f54a00]',
    profile: 'bg-[#18183d]',
  }
  const hoverColors : Record<string, string> = {
    dashboard: 'hover:bg-[#111130]',
    assets: 'hover:bg-[#006e2e]',
    expenses: 'hover:bg-[#a00006]',  
    incomes: 'hover:bg-[#0045dd]',      
    liabilities: 'hover:bg-[#da4200]',
    profile: 'hover:bg-[#111130]'
  }

  const path = location.pathname.split('/')[1] || 'dashboard'
  
  const currentColor = colors[path]
  const currectHoverColor = hoverColors[path]

  if(user)
  return (
    <div className="flex">
      <div className={`w-3xs h-[100vh] px-5 pt-5 flex flex-col justify-between ${currentColor}`}>
        <div>
          <Link to={'/'} className="logo-font text-white font-bold text-4xl text-center mb-15 block mt-7">Balancefy</Link>
          <div className="space-y-8">

            <Link to={'/'} className={`flex items-center justify-center gap-4 rounded-md py-2 cursor-pointer ${currectHoverColor}`}>
              <MdOutlineDashboard color="white" size={30}/>
              <p className={'text-white text-xl font-bold'}>Dashboard</p>
            </Link>

            <Link to={'/incomes'} className={`flex items-center justify-center gap-4 rounded-md py-2 cursor-pointer ${currectHoverColor}`}>
              <GiMoneyStack color="white" size={30}/>
              <p className={'text-white text-xl font-bold '}>Incomes</p>
            </Link>

            <Link to={'/expenses'} className={`flex items-center justify-center gap-4 rounded-md py-2 cursor-pointer ${currectHoverColor}`}>
              <GiExpense color="white" size={30}/>
              <p className={'text-white text-xl font-bold '}>Expenses</p>
            </Link>

            <Link to={'/assets'} className={`flex items-center justify-center gap-4 rounded-md py-2 cursor-pointer ${currectHoverColor}`}>
              <BsGraphUp color="white" size={30}/>
              <p className={'text-white text-xl font-bold '}>Assets</p>
            </Link>

            <Link to={'/liabilities'} className={`flex items-center justify-center gap-4 rounded-md py-2 cursor-pointer ${currectHoverColor}`}>
              <BsGraphDown color="white" size={30}/>
              <p className={'text-white text-xl font-bold '}>Liabilities</p>
            </Link>

          </div>
        </div>
        <Link to={'/profile'} className={`flex items-center justify-center gap-4 rounded-md py-2 mb-5 cursor-pointer ${currectHoverColor}`}>
          <FaUserAlt color="white" size={30}/>
          <p className={'text-white text-xl font-bold'}>Profile</p>
        </Link>
      </div>

      <div className="flex-1 p-[40px]">
        <Outlet />
      </div>
    </div>
  )
}
