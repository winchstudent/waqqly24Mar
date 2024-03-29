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
module.exports = async function (context, req) {
var walkername = req.query.walkername || req.body.walkername;
var walkeremail = req.query.walkeremail || req.body.walkeremail;
var walkerlocation = req.query.walkerlocation || req.body.walkerlocation;
};

const insertWalker = async (walker) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query("INSERT INTO [dbo].[dogwalkertabletesttwo] (walkername, walkeremail, walkerlocation) VALUES ("+"'"+walkername+"', '"+walkeremail+"', '"+walkerlocation+"');");
  } catch (err) {
    console.log("Error inserting walker: ", err);
  }
}

module.exports = async function (context, req) {

  // const walkername = req.query.walkername || req.body.walkername;
  // const walkeremail = req.query.walkeremail || req.body.walkeremail;
  // const walkerlocation = req.query.walkerlocation || req.body.walkerlocation;
    const walkername = "name"
    const walkeremail = "email"
    const walkerlocation = "location"
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