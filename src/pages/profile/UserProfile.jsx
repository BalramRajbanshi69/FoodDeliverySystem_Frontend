import React from 'react'
import { Link } from 'react-router-dom'

const UserProfile = () => {
  return (
    <div>
        <div className="flex flex-col justify-center items-center h-[100vh]">
            <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
                <div className="mt-2 mb-8 w-full">
                    <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
                    Orders List
                    </h4>
                    <p className="mt-2 px-2 text-base text-gray-600">
                    Overview of orders 
                    </p>
                </div> 
                <div className="grid grid-cols-2 gap-4 px-2 w-full">
                    <Link to="/myorders" className=" px-3 py-4 border-2 hover:bg-amber-400 hover:cursor-pointer hover:border-none hover:text-white  border-green-600 flex items-center justify-center rounded  text-base font-medium text-green-700 dark:text-white">
                        My Orders
                    </Link>
                    <Link to="/myorders" className=" px-3 py-4 border-2 hover:bg-amber-400 hover:cursor-pointer hover:border-none hover:text-white  border-green-600 flex items-center justify-center rounded  text-base font-medium text-green-700 dark:text-white">
                        My Orders
                    </Link>
                    <Link to="/myorders" className=" px-3 py-4 border-2 hover:bg-amber-400 hover:cursor-pointer hover:border-none hover:text-white  border-green-600 flex items-center justify-center rounded  text-base font-medium text-green-700 dark:text-white">
                        My Orders
                    </Link>
                    <Link to="/myorders" className=" px-3 py-4 border-2 hover:bg-amber-400 hover:cursor-pointer hover:border-none hover:text-white  border-green-600 flex items-center justify-center rounded  text-base font-medium text-green-700 dark:text-white">
                        My Orders
                    </Link>

                    

                </div>
            </div>  
        </div>
      </div>
  )
}

export default UserProfile