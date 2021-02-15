const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//do simulation
app.post('/simulation', async (req, res) => {
  try {
    const { lead_name, lead_email, phone, tax_cdi, tax_poupanca, tax_cdb, deadline, amount } = req.body;
    const currentDateInSecouns = Date.now() / 1000.0;

    //Verifica se os dados do lead já existem no banco de dados, caso não exista os insere.
    const resultSearchForLead = await pool.query(
      'SELECT lead_id FROM lead WHERE lead_name = $1 AND lead_email = $2 AND phone = $3',
      [lead_name, lead_email, phone]
    );
    const isAnExistingLead = resultSearchForLead.rows.length > 0;
    let lead_id = 0;
    if (isAnExistingLead) {
      lead_id = resultSearchForLead.rows[0].lead_id;
    } else {
      const resultInserLead = await pool.query(
        'INSERT INTO lead (lead_name, lead_email, phone, created_at, updated_at) VALUES($1, $2, $3, to_timestamp($4), to_timestamp($5)) RETURNING *',
        [lead_name, lead_email, phone, currentDateInSecouns, currentDateInSecouns]
      );
      lead_id = resultInserLead.rows[0].lead_id;
    }

    //Realiza o cálculo de simulação, e insere o registro da simulação vinculando o registro do usuário.
    const mounthlyPoupancaYield = tax_poupanca / 12 / 100;
    const result_poupanca = amount * mounthlyPoupancaYield * deadline;
    const mounthlyCdbYield = tax_cdb * tax_cdi / 100 / 12 / 100;
    const result_cdi = amount * mounthlyCdbYield * deadline;
    const resultInsertSimulation = await pool.query(
      'INSERT INTO simulate (lead_id, tax_cdi, tax_poupanca, tax_cdb, deadline, amount, result_poupanca, result_cdi, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, to_timestamp($9), to_timestamp($10))',
      [lead_id, tax_cdi, tax_poupanca, tax_cdb, deadline, amount, result_poupanca, result_cdi, currentDateInSecouns, currentDateInSecouns]
    );

    res.status(200).json({message: 'ok'});
  } catch (error) {
    console.error(error.message);
  }
});

//get all simulations
app.get('/simulation', async (req, res) => {
  try {
    const { lead_name, lead_email, phone} = req.query;
    let simulations = [];
    //Verifica se os dados do lead já existem no banco de dados
    const resultSearchForLead = await pool.query(
      'SELECT lead_id FROM lead WHERE lead_name = $1 AND lead_email = $2 AND phone = $3',
      [lead_name, lead_email, phone]
    );
    const isAnExistingLead = resultSearchForLead.rows.length > 0;
    if (isAnExistingLead) {
      //busca todas as simulações realizadas pelo lead
      const lead_id = resultSearchForLead.rows[0].lead_id;
      const resultSearchForLeadSimulations = await pool.query(
        'SELECT * FROM simulate WHERE lead_id = $1 AND deleted_at IS NULL ORDER BY created_at DESC',
        [lead_id]
      );
      simulations = resultSearchForLeadSimulations.rows;
    }

    res.status(200).json(simulations);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(5000, () => {
  console.log('server has started on port 5000')
});