import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { MdOutlineDashboard } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { GiExpense } from "react-icons/gi";
import { BsGraphUp } from "react-icons/bs";
import { BsGraphDown } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { useStore } from "../store";

export default function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const sidebar = useStore((state) => state.sidebar)
  const setSidebar = useStore((state) => state.setSidebar)

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
      <div onClick={() => setSidebar(!sidebar)} className="fixed ml-5 mt-3 lg:hidden z-20">
        <IoMenu size={50}
          color={`${sidebar ? 'white' : 'black'}`}
        />
      </div>
      <div className={`${sidebar ? '-translate-x-0 ' : '-translate-x-full'} fixed z-10 top-0 left-0 h-screen transition-transform duration-500 transform ease-in-out flex flex-col justify-between pt-15 px-5
        lg:static lg:translate-x-0 lg:w-3xs lg:px-5 lg:pt-5
        ${currentColor}`}>
        <div className={`${!sidebar && 'hidden'} lg:block`}>
          <Link to={'/'} className=" logo-font text-white font-bold text-4xl text-center mb-15 block mt-7">Balancefy</Link>
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

            <Link to={'/profile'} className={`flex items-center justify-center gap-4 rounded-md py-2 cursor-pointer mt-20 ${currectHoverColor}`}>
              <FaUserAlt color="white" size={30}/>
              <p className={'text-white text-xl font-bold'}>Profile</p>
            </Link>
          </div>
        </div>
      </div>

      <div className='flex-1 py-[70px] px-[25px] md:p-[40px]'>
        <Outlet />
      </div>
    </div>
  )
}
