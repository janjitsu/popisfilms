import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Search from 'pages/Search/Search.js';
import Home from 'pages/Home/Home.js';

const AppRoutes = () => {
    return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/search" element={<Search />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>

    );
}

export default AppRoutes;
