import { useEffect } from "react";
import videoApp from "../../assets/video/DashboardPage.mp4";
import { Navbar } from "../../components/navbars/Navbar";
import { Content } from "../../components/dashboard/Content";
import { useUserDetails } from "../../shared/hooks";

import './dashboardPage.css';
import "../../index.css";

export const DashboardPage = () => {
  const { isLogged } = useUserDetails();

  useEffect(() => {
    // Puedes colocar lógica relacionada con el estado de autenticación aquí
    console.log("isLogged:", isLogged);
  }, [isLogged]);

  return (
    <div className="dashboard-container">
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src={videoApp} type="video/mp4" />
        </video>
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
    </div>
  );
};
