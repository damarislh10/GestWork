import { Navigate, Route, Routes } from "react-router-dom";
import { AddProcess } from "../components/uploadProcess/AddProcess";
import { ProcessInformation } from "../components/ProcessInformation";
import { Profile } from "../components/Profile";
import DetailProcess from "../components/getProcess/DetailProcess";
import EditProcesses from "../components/getProcess/EditProcesses";
import InitialMenu from "../components/menuinicial/InitialMenu";
import React, { } from "react";
import CanalRoute from "../components/chat/CanalRoute";
import { ActiveProcesses } from "../components/getProcess/ActiveProcesses";
import { AssignedProcesses } from "../components/getProcess/AssignedProcesses";


export const DashboardRoutes = () => {

  return (
    <div>
      <Routes>
        <Route path="/*" element={<InitialMenu/>} />
        <Route path="/addp" element={<AddProcess />} />
        <Route path="/activeProcesses" element={<ActiveProcesses />} />
        <Route path="/assignedProcesses" element={<AssignedProcesses />} />
        <Route path="/detailProcess/:id" element={<DetailProcess />} />
        <Route path="/editProcesses/:id" element={<EditProcesses />} />
        <Route path="/processInformation" element={<ProcessInformation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<CanalRoute/>} />
        <Route path="/*" element={<Navigate to="/*" />} />
      </Routes>
    </div>
  );
};
