import React from "react";
import "./Page.css";

const Page = ({children }) => {
  return (
    <div className="page-container">
      <main className="container">
        <div className="content">{children}</div>
      </main>
    </div>
  );
};

export default Page;