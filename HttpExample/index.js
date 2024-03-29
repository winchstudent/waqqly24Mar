const sql = require('mssql');

const sqlConfig = {
  user: 'azureuser',
  password: 'waqqly1!',
  database: 'dogwalker',
  server: 'waqqlysqlserver.database.windows.net',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

const insertWalker = async (walker) => {
  try {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .input('walkername', sql.NVarChar, walker.walkername)
      .input('walkeremail', sql.NVarChar, walker.walkeremail)
      .input('walkerlocation', sql.NVarChar, walker.walkerlocation)
      .query('INSERT INTO [dbo].[dogwalkertabletesttwo] (walkername, walkeremail, walkerlocation) VALUES (@walkername, @walkeremail, @walkerlocation);');
    
    console.log("Inserted walker with ID: ", result.recordset[0].id);
  } catch (err) {
    console.log("Error inserting walker: ", err);
  }
}

module.exports = async function (context, req) {
  const queryString = req.body;
  const params = new URLSearchParams(queryString);

  const walkername = params.get('walkername');
  const walkeremail = params.get('walkeremail');
  const walkerlocation = params.get('walkerlocation');
  
  if (!walkername || !walkeremail || !walkerlocation) {
    context.res = {
      status: 400,
      body: "Please provide walkername, walkeremail, and walkerlocation in the request."
    };
    return;
  }

  const walker = {
    walkername,
    walkeremail,
    walkerlocation
  };

  await insertWalker(walker);

  context.res = {
    body: "Walker inserted."
  };
}
