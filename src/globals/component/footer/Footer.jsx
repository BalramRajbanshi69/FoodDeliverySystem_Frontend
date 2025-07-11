import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900  pt-12 pb-6 px-10 font-sans tracking-wide relative">
      {/* <div className="max-w-screen-xl mx-auto"> */}
      <div className="mx-auto max-w-2xl px-4  lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-white text-sm uppercase font-medium mb-6">Quick Links</h2>
            <ul className="space-y-4">
              <li>
                <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm transition-all">Newsroom</a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm transition-all">Tailwind CSS</a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm transition-all">Careers</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-sm uppercase font-medium mb-6">Follow Us</h2>
            <ul className="space-y-4">
              <li>
                <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm transition-all">Github</a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm transition-all">linkedin</a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm transition-all">Twitter</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-sm uppercase font-medium mb-6">Company</h2>
            <ul className="space-y-4">
              <li>
                <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm transition-all">About</a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm transition-all">Privacy Policy</a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm transition-all">Terms &amp; Conditions</a>
              </li>
            </ul>
          </div>

          <div className="flex items-center lg:justify-center max-sm:-order-1">
            <a href='javascript:void(0)'><img src="https://readymadeui.com/readymadeui-light.svg" alt="logo" className="sm:w-52 w-40" /></a>
          </div>
        </div>

        <hr className="mt-12 mb-6 border-gray-600" />

        <div className="flex sm:justify-between flex-wrap gap-6">
          <div className="flex space-x-5">
            <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm transition-all">
              <svg className="w-5 h-5 fill-gray-400 hover:fill-white" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63
                  .772-1.63 1.558V12h2.77l-.443 2.89h-2.327V22C18.343 21.128 22 16.991 22 12"></path>
              </svg>
            </a>
            <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm transition-all">
              <svg className="w-5 h-5 fill-gray-400 hover:fill-white" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.486 2 2 6.486 2 12c0 5.513 4.486 10 10 10s10-4.487 10-10c0-5.514-4.486-10-10-10zm0 1.542c4.951 0 8.458 3.392 8.458 8.458 0 4.949-3.391 8.458-8.458 8.458-4.948 0-8.458-3.391-8.458-8.458
                      0-4.949 3.392-8.458 8.458-8.458zM9.743 16.747V7.128l6.027 4.31-6.027 4.309z">
                </path>
              </svg>
            </a>
            <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="fill-gray-400 hover:fill-white w-5 h-5"
                viewBox="0 0 24 24">
                <path fillRule="evenodd"
                  d="M21 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5zm-2.5 8.2v5.3h-2.79v-4.93a1.4 1.4 0 0 0-1.4-1.4c-.77 0-1.39.63-1.39 1.4v4.93h-2.79v-8.37h2.79v1.11c.48-.78 1.47-1.3 2.32-1.3 1.8 0 3.26 1.46 3.26 3.26zM6.88 8.56a1.686 1.686 0 0 0 0-3.37 1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 1.57v8.37H5.5v-8.37h2.77z"
                  clipRule="evenodd"></path>
              </svg>
            </a>
          </div>

          <p className="text-gray-400 text-sm">© ReadymadeUI. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer