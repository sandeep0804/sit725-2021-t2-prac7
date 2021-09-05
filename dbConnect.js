/// DATABASE Connections
//database connection
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://sit725-2021:sandy123@sit725-2021-t2-prac4.4epn1.mongodb.net/sit725-2021-t2-prac4?retryWrites=true&w=majority";
let mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let projectsCollection;

mongoClient.connect((err, db) => {
    // projectsCollection = mongoClient.db("deakinCrowds").collection("projects");
    if (!err) {
        console.log('Database Connected')
    } else {
        console.log('[error]', err)
    }
});


exports.mongoClient = mongoClient;







