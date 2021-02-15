import React, { Fragment, useEffect, useState } from "react";

import SimulateListItem from "./SimulateListItem"

const SimulateList = () => {
  const [simulations, setSimulations] = useState([]);

  const getSimulations = async () => {
    try {
      let lead = sessionStorage.getItem('lead');
      if (lead) {
        lead = JSON.parse(lead);
        const response = await fetch(`http://localhost:5000/simulation?lead_name=${lead.lead_name}&lead_email=${lead.lead_email}&phone=${lead.phone}`);
        const jsonData = await response.json();

        setSimulations(jsonData);
      }
    } catch (error) {
      console.error(error.message)
    }
  };

  useEffect(() => {
    getSimulations();
  }, []);

  if (simulations.length > 0 ) {
    return (
      <Fragment>
        <div className="mt-5">
          <h3>Suas simulações</h3>
          <div className="accordion" id="simulationsList">
            {simulations.map(simulation => (
              <SimulateListItem simulation={simulation} key={simulation.simulate_id}/>
              ))}
          </div>
        </div>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
      </Fragment>
    )
  }
};

export default SimulateList;