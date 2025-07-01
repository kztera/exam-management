import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import "./app.css";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import StudentsPage from "@/pages/Students";
import LayoutComponent from "@/components/Layout";

const root = document.getElementById("root");
if (root !== null) {
  const appRoot = createRoot(root);
  appRoot.render(
    <React.Fragment>
      <MantineProvider>
        <Notifications />
          <BrowserRouter>
            <LayoutComponent>
              <Routes>
                <Route path="/" element={<Home key="home" />} />
                <Route path="/dashboard" element={<Dashboard key="dashboard" />} />
                <Route path="/students" element={<StudentsPage key="students" />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </LayoutComponent>
          </BrowserRouter>
      </MantineProvider>
    </React.Fragment>
  );
}
