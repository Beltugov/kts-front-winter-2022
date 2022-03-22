import React from "react";

import { REPOS_ROUTE, routes } from "@utils/routes";
import { Routes, Route, Navigate } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="/*" element={<Navigate to={REPOS_ROUTE} />} />
    </Routes>
  );
};

export default AppRoutes;
