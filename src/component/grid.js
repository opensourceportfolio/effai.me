import React from "react";

export const Row = ({ children }) =>
  <div className="row">
    {children}
  </div>;
export const Column = ({ children }) =>
  <div className="col col-2">
    {children}
  </div>;
