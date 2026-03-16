import React from 'react';
import {Link, Outlet} from "react-router-dom";

const Layout = () => {

    return (
        <>
            <header>
                <h1>
                    <Link to={"/"} className={'header-link'}>Wisdom Pet</Link>
                </h1>
            </header>
            <div>
                <Outlet/>
            </div>
        </>
    )

}

export default Layout;