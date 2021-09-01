import React from "react";
import "./topbar.scss";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Cure Bionics</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <DashboardIcon />
            <span className="topIconBadge"></span>
          </div>

          <div className="topbarIconContainer">
            <SettingsIcon />
          </div>
          <img
            src="https://image.shutterstock.com/image-photo/attractive-young-asian-woman-career-260nw-1686062533.jpg"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
