import { Outlet } from "react-router-dom";

import { useState } from "react";

import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";

const Layout = () => {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className='app'>
      <Sidebar isSidebar={isSidebar} />
      <main className='content'>
        <Topbar setIsSidebar={setIsSidebar} />
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
