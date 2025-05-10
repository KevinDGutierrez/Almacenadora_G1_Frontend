import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import videoApp from "../../assets/video/DashboardPage.mp4";
import { Navbar } from "../../components/navbars/Navbar";
import { Content } from "../../components/dashboard/Content";
import { useUserDetails } from "../../shared/hooks";

import './dashboardPage.css';
import "../../index.css";

export const DashboardPage = () => {
  const { isLogged, role, username } = useUserDetails();
  const location = useLocation();

  useEffect(() => {
    console.log("isLogged:", isLogged);
  }, [isLogged]);

  const roleClass = role === "ADMINISTRATOR" ? "role-administrator" : "role-employee";

  const isSettingsPage = location.pathname.includes("/settings");

  return (
    <div className="dashboard-container">
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src={videoApp} type="video/mp4" />
        </video>
        <div className="video-overlay" />
      </div>

      <div className="navbar-container">
        {(() => {
          try {
            return <Navbar />;
          } catch (e) {
            console.error("Error en Navbar:", e);
            return <div>Error al cargar Navbar</div>;
          }
        })()}
      </div>

      {(() => {
        try {
          return <Content />;
        } catch (e) {
          console.error("Error en Content:", e);
          return <div>Error al cargar el contenido</div>;
        }
      })()}

      {isLogged && !isSettingsPage && (
        <div className="dashboard-center-box">
          Bienvenido {username} al panel de usuario
          <div className="role-label">
            ROL ASIGNADO:{" "}
            <span className={`role-badge ${roleClass}`}>
              {role}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
