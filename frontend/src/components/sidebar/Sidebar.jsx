import React from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import LineStyleIcon from "@material-ui/icons/LineStyle";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AssessmentIcon from "@material-ui/icons/Assessment";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import FeedbackIcon from "@material-ui/icons/Feedback";
import BusinessIcon from "@material-ui/icons/Business";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/">
              <li className="sidebarListItem">
                <LineStyleIcon className="sidebarIcon" />
                Home
              </li>
            </Link>
            <li className="sidebarListItem">
              <PeopleOutlineIcon className="sidebarIcon" />
              Patients
            </li>

            <Link to="/company">
              <li className="sidebarListItem">
                <BusinessIcon className="sidebarIcon" />
                Company Info
              </li>
            </Link>

            <li className="sidebarListItem">
              <PersonAddIcon className="sidebarIcon" />
              New
            </li>

            <li className="sidebarListItem">
              <AssessmentIcon />
              Assessment
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutlineIcon />
              Contact
            </li>

            <li className="sidebarListItem">
              <HelpOutlineIcon />
              Help
            </li>

            <li className="sidebarListItem">
              <FeedbackIcon />
              Feedback
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
