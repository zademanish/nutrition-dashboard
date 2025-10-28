import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import GradientBackground from "../components/GrandientBackground";

const MainLayout = () => {
  return (
    <GradientBackground>
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-3 overflow-y-auto">
          {/* ✅ Outlet renders the child route (Dashboard, Clients, etc.) */}
          <Outlet />
        </main>
      </div>
    </div>
    </GradientBackground>
  );
};

export default MainLayout;
