
export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-[80vh] bg-[#d7dfde] text-black">
      <h1 className="next-error-h1 border-r border-gray-300 dark:border-gray-700 pr-6 mr-5 text-2xl font-medium leading-[49px]">404</h1>
      <div>
        <h2 className="text-sm font-normal leading-[49px] m-0">This page could not be found.</h2>
      </div>
    </div>
  )
}