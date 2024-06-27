import React from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
function ItemLayout() {
  return (
    <>
        <Link to="/about/1">Item 1 </Link>
        <br />
        <Link to="/about/2">Item 2 </Link>
        <br />
        <Link to="/about/new">Item (New) </Link>
        <Outlet context={{hello : "World"}}/>
    </>
  )
}

export default ItemLayout
