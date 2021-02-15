import React, { Fragment, useState } from "react";

const SimulateForm = () => {
  const [lead_name, setLeadName] = useState("");
  const [lead_email, setLeadEmail] = useState("");
  const [phone, setLeadPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [tax_poupanca, setTaxPoupanca] = useState("");
  const [tax_cdi, setTaxCdi] = useState("");
  const [tax_cdb, setTaxCdb] = useState("");

  const [error_lead_name, setErrorLeadName] = useState("");
  const [error_lead_email, setErrorLeadEmail] = useState("");
  const [error_phone, setErrorLeadPhone] = useState("");
  const [error_amount, setErrorAmount] = useState("");
  const [error_deadline, setErrorDeadline] = useState("");
  const [error_tax_poupanca, setErrorTaxPoupanca] = useState("");
  const [error_tax_cdi, setErrorTaxCdi] = useState("");
  const [error_tax_cdb, setErrorTaxCdb] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const onSubmitForm = async e => {
    e.preventDefault();
    if (!isValidForm()) {
      return;
    }

    let lead = sessionStorage.getItem('lead');
    if (lead) {
      lead = JSON.parse(lead);
      try {
        setIsLoading(true);
        const body = { lead_name: lead.lead_name, lead_email: lead.lead_email, phone: lead.phone, amount, deadline, tax_poupanca, tax_cdi, tax_cdb };
        const response = await fetch("http://localhost:5000/simulation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        const modalCloseButton = document.getElementById("modalCloseButton");
        modalCloseButton.click();
        document.location = "/";
      } catch (error) {
        console.error(error.message);
      }
    } else {
      const leadFormModal = document.getElementById('submitButton');
      if (!leadFormModal.hasAttribute("data-bs-toggle")) {
        leadFormModal.setAttribute("data-bs-toggle", "modal")
      }

      if (!leadFormModal.hasAttribute("data-bs-target")) {
        leadFormModal.setAttribute("data-bs-target", "#leadFormModal")
      }

      leadFormModal.click();
    }
  }

  const onSubmitLeadForm = e => {
    e.preventDefault();
    if (!isValidLeadForm()) {
      return;
    }

    const lead = {
      lead_name, lead_email, phone
    }
    sessionStorage.setItem('lead', JSON.stringify(lead));
    const submitButton = document.getElementById('submitButton');
    if (submitButton.hasAttribute("data-bs-toggle")) {
      submitButton.removeAttribute("data-bs-toggle");
    }

    if (submitButton.hasAttribute("data-bs-target")) {
      submitButton.removeAttribute("data-bs-target");
    }

    submitButton.click();
  }

  const isValidLeadForm = () => {
    let hasError = false;
    const leadNameInput = document.getElementById("lead_name");
    const leadEmailInput = document.getElementById("lead_email");
    const leadPhoneInput = document.getElementById("phone");

    if (lead_name.length === 0) {
      setErrorLeadName("Por favor informe seu nome.");
      leadNameInput.classList.add("is-invalid");
      hasError = true;
    } else {
      setErrorLeadName("");
      leadNameInput.classList.remove("is-invalid");
    }

    if (lead_email.length === 0) {
      setErrorLeadEmail("Por favor informe seu email.");
      leadEmailInput.classList.add("is-invalid");
      hasError = true;
    } else {
      setErrorLeadEmail("");
      leadEmailInput.classList.remove("is-invalid");
    }

    if (phone.length === 0) {
      setErrorLeadPhone("Por favor informe seu telefone");
      leadPhoneInput.classList.add("is-invalid");
      hasError = true;
    } else {
      setErrorLeadPhone("");
      leadPhoneInput.classList.remove("is-invalid");
    }

    return !hasError;
  }

  const isValidForm = () => {
    let hasError = false;
    const amountInput = document.getElementById("amount");
    const deadlineInput = document.getElementById("deadline");
    const cdiInput = document.getElementById("tax_cdi");
    const poupancaInput = document.getElementById("tax_poupanca");
    const cdbInput = document.getElementById("tax_cdb");

    if (amount.length === 0) {
      setErrorAmount("Por favor informe o valor do investimento.");
      amountInput.classList.add("is-invalid");
      hasError = true;
    } else {
      setErrorAmount("");
      amountInput.classList.remove("is-invalid");
    }

    if (deadline.length === 0) {
      setErrorDeadline("Por favor informe o período.");
      deadlineInput.classList.add("is-invalid");
      hasError = true;
    } else {
      setErrorDeadline("");
      deadlineInput.classList.remove("is-invalid");
    }

    if (tax_cdi.length === 0) {
      setErrorTaxCdi("Por favor informe a taxa DI.");
      cdiInput.classList.add("is-invalid");
      hasError = true;
    } else {
      setErrorTaxCdi("");
      cdiInput.classList.remove("is-invalid");
    }

    if (tax_poupanca.length === 0) {
      setErrorTaxPoupanca("Por favor informe a taxa da poupanca.");
      poupancaInput.classList.add("is-invalid");
      hasError = true;
    } else {
      setErrorTaxPoupanca("");
      poupancaInput.classList.remove("is-invalid");
    }

    if (tax_cdb.length === 0) {
      setErrorTaxCdb("Por favor informe a taxa do CDB.");
      cdbInput.classList.add("is-invalid");
      hasError = true;
    } else {
      setErrorTaxCdb("");
      cdbInput.classList.remove("is-invalid");
    }

    return !hasError;
  }

  return (
    <Fragment>
      <form onSubmit={onSubmitForm}>
        <fieldset>
          <legend>A poupança ou um CDB pós fixado é mais rentável?</legend>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Quanto você quer investir hoje?</label>
            <input type="number" id="amount" className="form-control" placeholder="Valor a ser investido" value={amount} onChange={e => setAmount(e.target.value)} disabled={isLoading}/>
            <div className="invalid-feedback">
              {error_amount}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="deadline" className="form-label">Por quanto tempo você pretende deixar o seu dinheiro investido?</label>
            <input type="number" id="deadline" className="form-control" placeholder="Número de meses" value={deadline} onChange={e => setDeadline(e.target.value)} disabled={isLoading} />
            <div className="invalid-feedback">
              {error_deadline}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="tax_cdi" className="form-label">Qual é a taxa DI?</label>
            <input type="number" id="tax_cdi" className="form-control" placeholder="Taxa DI" value={tax_cdi} onChange={e => setTaxCdi(e.target.value)} disabled={isLoading} />
            <div className="invalid-feedback">
              {error_tax_cdi}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="tax_poupanca" className="form-label">Qual a taxa da Poupança?</label>
            <input type="number" id="tax_poupanca" className="form-control" placeholder="Taxa da Poupança" value={tax_poupanca} onChange={e => setTaxPoupanca(e.target.value)} disabled={isLoading} />
            <div className="invalid-feedback">
              {error_tax_poupanca}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="tax_cdb" className="form-label">Qual taxa do CDB sobre o CDI?</label>
            <input type="number" id="tax_cdb" className="form-control" placeholder="Taxa do CDB" value={tax_cdb} onChange={e => setTaxCdb(e.target.value)} disabled={isLoading} />
            <div className="invalid-feedback">
              {error_tax_cdb}
            </div>
          </div>
          <button id="submitButton" type="submit" className="btn btn-success" disabled={isLoading}>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" hidden={!isLoading}></span>
            Calcular
          </button>
        </fieldset>
      </form>
      <div className="modal fade" id="leadFormModal" tabIndex="-1" aria-labelledby="leadFormModalLabel" aria-hidden="true" data-bs-backdrop="static">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="leadFormModalLabel">Identifique-se</h5>
              <button id="modalCloseButton" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" hidden></button>
            </div>
            <div className="modal-body">
            <form onSubmit={onSubmitForm}>
              <fieldset>
                <legend>Informe seus dados para visualizar o resultado da simulação.</legend>
                <div className="mb-3">
                  <label htmlFor="lead_name" className="form-label">Qual é o seu nome?</label>
                  <input type="text" id="lead_name" className="form-control" placeholder="Informe seu nome" value={lead_name} onChange={e => setLeadName(e.target.value)} />
                  <div className="invalid-feedback">
                    {error_lead_name}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="lead_email" className="form-label">Qual é o seu endereço de e-mail?</label>
                  <input type="text" id="lead_email" className="form-control" placeholder="Informe seu e-mail" value={lead_email} onChange={e => setLeadEmail(e.target.value)} />
                  <div className="invalid-feedback">
                    {error_lead_email}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Qual é o seu número de telefone?</label>
                  <input type="text" id="phone" className="form-control" placeholder="Informe seu telefone" value={phone} onChange={e => setLeadPhone(e.target.value)} />
                  <div className="invalid-feedback">
                    {error_phone}
                  </div>
                </div>
              </fieldset>
            </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" onClick={onSubmitLeadForm}>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" hidden={!isLoading}></span>
                Ver o resultado
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
};

export default SimulateForm;