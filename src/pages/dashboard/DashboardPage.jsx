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
  }, [isLogged]);

  return (
    <div className="dashboard-container">
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src={videoApp} type="video/mp4" />
        </video>
      </div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <Content />
    </div>
  );
};
