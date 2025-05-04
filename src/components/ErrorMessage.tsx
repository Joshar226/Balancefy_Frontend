

export default function ErrorMessage({children} : {children : React.ReactNode}) {
  return (
    <p className="text-center text-red-600 my-2 font-medium">{children}</p>
  )
}
