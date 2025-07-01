import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="px-4 min-h-screen bg-gray-50">
      {children}
    </div>
  )
}

export default Layout