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

const insertOwner = async (owner) => {
  try {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .input('ownername', sql.NVarChar, owner.ownername)
      .input('owneremail', sql.NVarChar, owner.owneremail)
      .input('ownerpetname', sql.NVarChar, owner.ownerpetname)
      .query('INSERT INTO [dbo].[dogtable] (ownername, owneremail, ownerpetname) VALUES (@ownername, @owneremail, @ownerpetname);');
    
    console.log("Inserted owner with ID: ", result.recordset[0].id);
  } catch (err) {
    console.log("Error inserting owner: ", err);
  }
}

module.exports = async function (context, req) {
  const queryString = req.body;
  const params = new URLSearchParams(queryString);

  const ownername = params.get('ownername');
  const owneremail = params.get('owneremail');
  const ownerpetname = params.get('ownerpetname');
  
  if (!ownername || !owneremail || !ownerpetname) {
    context.res = {
      status: 400,
      body: "Please provide ownername, owneremail, and ownerpetname in the request."
    };
    return;
  }

  const owner = {
    ownername,
    owneremail,
    ownerpetname
  };

  await insertOwner(owner);

  context.res = {
    body: "Owner inserted."
  };
}