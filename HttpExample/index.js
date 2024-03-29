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
    await sql.connect(sqlConfig);
    const result = await sql.query(`INSERT INTO [dbo].[dogwalkertabletesttwo] (walkername, walkeremail, walkerlocation) VALUES ('${walker.walkername}', '${walker.walkeremail}', '${walker.walkerlocation}');`);
    console.log("Inserted walker with iD: ", result.recordset[0].id);
  } catch (err) {
    console.log("Error inserting walker: ", err);
  }
}

module.exports = async function (context, req) {
  const walkername = req.query.walkername || req.body.walkername;
  const walkeremail = req.query.walkeremail || req.body.walkeremail;
  const walkerlocation = req.query.walkerlocation || req.body.walkerlocation;
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
