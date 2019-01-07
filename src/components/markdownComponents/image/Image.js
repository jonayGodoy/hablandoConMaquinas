import React, {Component} from "react";
import PropTypes from "prop-types";

class Image extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (<img src={"../" + this.props.src}
           style={{
             display: 'block',
             margin: '0 auto',
             width: '100%',
             maxWidth: '800px',
             height: 'auto'
           }}/>)
  }
}
Image.propTypes = {
  src: PropTypes.string.isRequired
};

export default Image;
