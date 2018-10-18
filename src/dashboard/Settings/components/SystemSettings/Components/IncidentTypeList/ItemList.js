import PropTypes from 'prop-types';
import { Col, List, Avatar, Row } from 'antd';
import classNames from 'classnames/bind';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectedIncidentType } from '../../../../actions';
import styles from '../../SystemSettings.css';

/**
 * Render a single contact item component for contacts list
 *
 * @function
 * @name Contact
 * @version 0.1.0
 * @since 0.1.0
 */

const cx = classNames.bind(styles);

class IncidentTypeItem extends React.Component {
  onClick = () => {
    const { incidentSelected, handleselectedIncidentType } = this.props;
    handleselectedIncidentType(incidentSelected);
  };

  render() {
    const { incidentSelected, selected } = this.props;
    const { _id: id } = selected;
    const {
      name,
      nature,
      family,
      code,
      description,
      color,
      _id,
    } = incidentSelected;
    const isSelected = selected ? id === _id : false;
    return (
      <List.Item className={cx('p-l-20', { isSelected })}>
        <List.Item.Meta
          avatar={
            <Avatar
              style={{ backgroundColor: color, verticalAlign: 'middle' }}
              size="large"
            >
              {name.charAt(0)}
            </Avatar>
          }
          title={
            <Row>
              <Col xs={18} sm={16} span={20}>
                <span
                  role="link"
                  style={{ cursor: 'pointer' }}
                  className={cx('f-600 f-15', 'name')}
                  onClick={this.onClick}
                  onKeyDown={this.onClick}
                  tabIndex="0"
                  title="Click to view more"
                >
                  {name}
                </span>
              </Col>
              <Col
                xs={6}
                sm={8}
                span={4}
                style={{
                  paddingRight: '10px',
                }}
              >
                {code.cap}
              </Col>
            </Row>
          }
          description={
            <Row>
              <Col span={24} className={cx('b-0', { isSelected })}>
                {nature}-{family}
              </Col>

              <Col
                span={24}
                style={{
                  textOverflow: 'ellipsis',
                  width: '350px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
                className={cx('b-0', { isSelected })}
              >
                {description}
              </Col>
            </Row>
          }
        />
      </List.Item>
    );
  }
}

const mapStateToProps = state => ({
  selected: state.incidentsType.data,
});
const mapDispatchToProps = dispatch => ({
  handleselectedIncidentType: bindActionCreators(
    selectedIncidentType,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IncidentTypeItem);

const incidentsTypePropTypes = PropTypes.shape({
  name: PropTypes.string,
  nature: PropTypes.string.isRequired,
  family: PropTypes.string.isRequired,
  code: PropTypes.shape({
    given: PropTypes.string,
    cap: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string,
  color: PropTypes.string,
  _id: PropTypes.string,
}).isRequired;

IncidentTypeItem.propTypes = {
  selected: PropTypes.arrayOf(incidentsTypePropTypes),
  incidentSelected: incidentsTypePropTypes,
  handleselectedIncidentType: PropTypes.func,
};

IncidentTypeItem.defaultProps = {
  selected: null,
  incidentSelected: null,
  handleselectedIncidentType: () => {},
};
