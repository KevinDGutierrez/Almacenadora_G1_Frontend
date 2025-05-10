import { Route, Routes } from 'react-router-dom';
import { Settings } from '../settings/Settings';
import { UserSettings } from '../settings/UserSettings';
import { DeleteAccount } from '../settings/DeleteAccount';

export const Content = () => {
  return (
    <div className="content-container">
      <Routes>
        <Route path="settings/*" element={<Settings />}>
          <Route index element={<UserSettings />} />
          <Route path="delete-account" element={<DeleteAccount />} />
        </Route>
      </Routes>
    </div>
  );
};
