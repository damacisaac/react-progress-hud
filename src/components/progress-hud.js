import React, { Component, PropTypes } from "react";
import { Spring } from "react-motion";

import styles from "../styles";
import images from "../images";

const propTypes = {
  clickHandler: PropTypes.func,
  color: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  overlayColor: PropTypes.string
};
const defaultProps = {
  clickHandler: () => {},
  color: "#000",
  overlayColor: "rgba(0, 0, 0, 0)"
};

export default class ProgressHUD extends Component {
  constructor(props) {
    super(props);
  }

  _getEndValue(prevValue) {
    return {
      val: prevValue.val === 0 ? 360 : prevValue.val + 360,
      config: [100, 100]
    };
  }

  render() {
    return (
      // jshint ignore:start
      <div
        key="ProgressHUD"
        style={Object.assign(
          styles.overlay,
          {
            backgroundColor: this.props.overlayColor,
            display: this.props.isVisible ? "flex" : "none"
          }
        )}
        onClick={this.props.clickHandler}
      >
        <div style={styles.container}>
          <Spring defaultValue={{ val: 0 }} endValue={this._getEndValue}>
            {interpolated =>
              <div
                style={Object.assign(
                  styles.spinner,
                  {
                    transform: `rotate(${interpolated.val}deg)`,
                    backgroundColor: this.props.color
                  }
                )}
              >
                <img src={`data:image/png;base64,${images["1x"]}`} />
                <div
                  style={Object.assign(
                    styles.curve,
                    { backgroundColor: this.props.color }
                  )}
                />
                <div style={styles.inner_spinner} />
              </div>
            }
          </Spring>
        </div>
      </div>
      // jshint ignore:end
    );
  }
}

ProgressHUD.propTypes = propTypes;
ProgressHUD.defaultProps = defaultProps;
