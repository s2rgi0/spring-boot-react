import React from 'react';
import {Link, Outlet} from "react-router-dom";
import Home from "./Home";

const Layout = () => {

    return (
        <>
            <header>
                <h1>
                    <Link to={"/"} className={'header-link'}>Wisdom Pet</Link>
                </h1>
            </header>
            <nav>
                <ul className="navbar-list">
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/customers'}>Customers</Link></li>
                    <li><Link to={'/products'}>Products</Link></li>
                    <li><Link to={'/services'}>Services</Link></li>
                    <li><Link to={'/vendors'}>Vendors</Link></li>
                </ul>
            </nav>
            <div style={{ padding: '20px' }}>
                <Outlet />
            </div>
        </>
    )

}

export default Layout;