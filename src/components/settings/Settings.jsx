import { Routes, Route } from "react-router-dom";
import { UserSettings } from "./UserSettings";
import { DeleteAccount } from "./DeleteAccount";
import { Outlet } from "react-router-dom";


export const Settings = () => {
  return (
    <div className="settings-container">
      <Outlet />
    </div>
  );
};