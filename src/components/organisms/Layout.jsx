import React from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CartSidebar from "@/components/organisms/CartSidebar";
import Header from "@/components/organisms/Header";
import { CartProvider } from "@/hooks/useCart";

const Layout = () => {
  // App-level state and methods that can be shared via outlet context
  const sharedContext = {
    // Add any shared state or methods here that child routes might need
  };

  return (
    <CartProvider>
    <div className="min-h-screen bg-background font-body">
        <div className="min-h-screen bg-background">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet context={sharedContext} />
            </main>
            <CartSidebar />
        </div>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            style={{
                zIndex: 9999
            }} />
    </div>
</CartProvider>
  );
};

export default Layout;