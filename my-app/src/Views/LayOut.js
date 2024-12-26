import React from 'react';
import Nav from '../Components/LayOut/Nav';
import Header from '../Components/LayOut/Header';
import { Outlet } from 'react-router-dom';

const LayOut = () => {
    return (
        <>
            <Nav />
            <Header />
            <Outlet />
        </>
    );
}

export default LayOut;