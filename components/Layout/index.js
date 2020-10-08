import React from "react";
import Head from "next/head";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useRouter } from "next/router";

const Layout = (props) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>CRM System</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU="
          crossOrigin="anonymous"
        />
        <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      {router.pathname === "/login" ||
      router.pathname === "/login-admin" ||
      router.pathname === "/nuevacuenta" ? (
        <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
          <div>{props.children}</div>
        </div>
      ) : (
        <div className="bg-gray-200 min-h-screen">
          <div className="sm:flex min-h-screen">
            <Sidebar />

            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
              <Header />
              {props.children}
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
