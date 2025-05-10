import { Routes, Route } from "react-router-dom";
import { UserSettings } from "./UserSettings";
import { DeleteAccount } from "./DeleteAccount";

export const Settings = () => {
  return (
    <div className="settings-container">
      <Routes>
        <Route path="/" element={<UserSettings />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
      </Routes>
    </div>
  );
};
