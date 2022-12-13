import { useEffect, useContext, useCallback } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Search from 'pages/Search/Search.js';
import Home from 'pages/Home/Home.js';
import { SessionContext } from "providers/Session";

const AppRoutes = () => {
    const { checkUserLogin } = useContext(SessionContext);

    const isValid = useCallback(async () => {
        await checkUserLogin();
    },[checkUserLogin]);

    useEffect(() => {
        isValid();
    }, [isValid]);

    return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/add" element={<Search />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>

    );
}

export default AppRoutes;
