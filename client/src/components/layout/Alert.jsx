import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { closeAlert } from "../../actions/alert";

import { VscChromeClose } from "react-icons/vsc";
import { IconContext } from "react-icons";

import "../styles/Alert.scss";

const Alert = ({ alerts, closeAlert }) => {
  const closeButton = () => {
    closeAlert(alerts[0].id);

  };

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className="alert_container">
        <div className={`alert alert_${alert.alertType}`}>
          {alert.msg}
          <IconContext.Provider
            value={{ className: "close_button" }}
          >
            <VscChromeClose onClick={closeButton} />
          </IconContext.Provider>
        </div>
      </div>
    ))
  );
};

Alert.propTypes = {
  closeAlert: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { closeAlert })(Alert);
