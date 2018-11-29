import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import './styles.css';

function ActivityProcedureDetails({
  name,
  description,
  primaryActors,
  supportiveActors,
  resources,
}) {
  return (
    <Fragment>
      <h5 className="ActivityProcedureDetailsHeader">PROCEDURE NAME</h5>
      <p className="ActivityProcedureDetailsContent">{name}</p>
      <h5 className="ActivityProcedureDetailsHeader">PROCEDURE DESCRIPTION</h5>
      <p className="ActivityProcedureDetailsContent">{description}</p>
      <h5 className="ActivityProcedureDetailsHeader">PRIMARY ACTORS</h5>
      {primaryActors.map(actor => (
        <p className="ActivityProcedureDetailsContent">{`${
          actor.name
        } (${actor.abbreviation || 'N/A'})`}</p>
      ))}
      <h5 className="ActivityProcedureDetailsHeader">SUPPORTIVE ACTORS</h5>
      {supportiveActors.map(actor => (
        <p className="ActivityProcedureDetailsContent">{`${
          actor.name
        } (${actor.abbreviation || 'N/A'})`}</p>
      ))}
      <h5 className="ActivityProcedureDetailsHeader">RESOURCES</h5>
      {resources.map(resource => (
        <p className="ActivityProcedureDetailsContent">{`${resource.name}`}</p>
      ))}
    </Fragment>
  );
}

ActivityProcedureDetails.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  primaryActors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      abbreviation: PropTypes.string,
    })
  ),
  supportiveActors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      abbreviation: PropTypes.string,
    })
  ),
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    })
  ),
};

ActivityProcedureDetails.defaultProps = {
  primaryActors: [],
  supportiveActors: [],
  resources: [],
};

const mapStateToProps = state => ({
  name: state.selectedPlanActivityProcedure.name,
  description: state.selectedPlanActivityProcedure.description,
  primaryActors: state.selectedPlanActivityProcedure.primary,
  supportiveActors: state.selectedPlanActivityProcedure.supportive,
  resources: state.selectedPlanActivityProcedure.resources,
});

export default connect(mapStateToProps)(ActivityProcedureDetails);