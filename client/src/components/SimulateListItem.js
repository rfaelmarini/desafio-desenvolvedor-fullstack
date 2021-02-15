import React from "react";

const SimulateListItem = ({ simulation }) => {

  const d = new Date(simulation.created_at);
  const date = new Intl.DateTimeFormat('pt-br', { dateStyle: 'short', timeStyle: 'medium' }).format(d);

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={"heading" + simulation.simulate_id}>
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + simulation.simulate_id} aria-expanded="FALSE" aria-controls={"collapse" + simulation.simulate_id}>
          Simulado em {date}
        </button>
      </h2>
      <div id={"collapse" + simulation.simulate_id} className="accordion-collapse collapse" aria-labelledby={"heading" + simulation.simulate_id} data-bs-parent="#simulationsList">
        <div className="accordion-body">
          Com o valor investido de <strong>R$ {simulation.amount}</strong> por <strong>{simulation.deadline} meses</strong> na <strong>Poupança </strong>
          com uma taxa de <strong>{simulation.tax_poupanca} %</strong> seu rendimento será de <strong>R$ {simulation.result_poupanca}</strong>, enquanto em um <strong>CDB </strong>
          com taxa de <strong>{simulation.tax_cdb}% do CDI</strong>, onde o <strong>CDI</strong> possuí taxa de <strong>{simulation.tax_cdi}%</strong>, seu rendimento será de <strong>R$ {simulation.result_cdi}</strong>.
        </div>
      </div>
    </div>
  )
};

export default SimulateListItem;