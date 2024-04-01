module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const walkername = (req.query.walkername || (req.body && req.body.walkername));
    const walkeremail = (req.query.walkeremail || (req.body && req.body.walkeremail));
    const walkerlocation = (req.query.walkerlocation || (req.body && req.body.walkerlocation));
    const responseMessage = walkername && walkeremail && walkerlocation
        ? "Hello, " + walkername + " from " + walkerlocation + " with email: " + walkeremail + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}