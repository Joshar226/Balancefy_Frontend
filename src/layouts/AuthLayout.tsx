import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex bg-[#18183d] h-[100vh] justify-center items-center flex-col space-y-5">

        <div className="flex flex-col text-center space-y-5">
            <h1 className="logo-font text-white text-6xl">Balancefy</h1>
            <h2 className="logo-font text-white text-2xl">Visualize your money <br />
            Master your future</h2>
        </div>

        <Outlet />

    </div>
  )
}
