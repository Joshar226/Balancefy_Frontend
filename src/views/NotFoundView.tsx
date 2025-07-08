import { Link } from "react-router-dom";

export default function NotFoundView() {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] bg-[#18183d] ">
      <div className="text-white text-center font-bold space-y-2">
        <h1 className="text-8xl">404</h1>
        <h2 className="text-4xl">Not Found</h2>
      </div>

      <Link to={'/'} className="bg-blue-900 py-2 px-5 mt-5 text-white text-xl font-bold rounded-md hover:bg-blue-950">Log In</Link>
    </div>
  )
}
