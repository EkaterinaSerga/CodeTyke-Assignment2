import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './Styles.scss';

const Thumb = styled.div`
  width: ${(props) => props.percentage}%;
  height: 300%;
  background-color: #9c53fd;
  border-radius: ${(props) => {
    return props.percentage === 100 ? '8px' : '8px 0px 0px 8px';
  }};
  position: absolute;
  top: 50%;
  margin-top: -7px;
`;

export default class ProgressBar extends React.Component {
  render() {
    return (
      <div className="track">
        <Thumb percentage={this.props.percentage} />
      </div>
    );
  }
}

ProgressBar.propTypes = {
  percentage: PropTypes.number,
};
