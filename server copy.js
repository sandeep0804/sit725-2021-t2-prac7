require('dotenv').config()
var express = require("express")
var app = express()
const MongoClient = require('mongodb').MongoClient;
let projectCollection;

const uri = "mongodb+srv://sit725-2021:sandy123@sit725-2021-t2-prac4.4epn1.mongodb.net/sit725-2021-t2-prac4?retryWrites=true&w=majority"
const client = new MongoClient(uri,{ useNewUrlParser: true})

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const createColllection = (collectionName) => {
    client.connect((err,db) => {
        projectCollection = client.db().collection(collectionName);
        if(!err) {
            console.log('MongoDB Connected')
        }
        else {
            console.log("DB Error: ", err);
            process.exit(1);
        }
    })
} 

const cardList = [
    //  {
    //     title: "MangoDB",
    //     image: "images/mongo.png",
    //     link: "About MangoDB Course",
    //     desciption: "2months course <br> 30000+ registered users <br> $200"
    // },
    // {
    //     title: "Express JS",
    //     image: "images/ejs.png",
    //     link: "About Express JS Course",
    //     desciption: "2months course <br> 30000+ registered users <br> $300"
    // },
    // {
    //     title: "React JS",
    //     image: "images/react.png",
    //     link: "About React JS Course",
    //     desciption: "2months course <br> 60000+ registered users <br> $500"
    // },
    // {
    //     title: "Node JS",
    //     image: "images/node.png",
    //     link: "About Node JS Course",
    //     desciption: "2months course <br> 20000+ registered users <br> $300"
    // }
]

const insertProjects = (project,callback) => {
    projectCollection.insert(project,callback);
}

const getProjects = (callback) => {
    projectCollection.find({}).toArray(callback);
}

app.get('/api/projects',(req,res) => {
    getProjects((err,result) => {
        if(err) {
            res.json({statusCode: 400, message:err})
        }
        else {
             res.json({statusCode: 200, message:"Success", data: result})
        }
     })
})

app.post('/api/projects',(req,res) => {
    console.log("New Project added", req.body)
    var newProject = req.body;
    insertProjects(newProject,(err,result) => {
        if(err) {
            res.json({statusCode: 400, message: err})
      }
        else {
            res.json({statusCode: 200, message:"Project Successfully addedd", data: result})
        }
     })
})

var port = process.env.port || 3000;

app.listen(port, () => {
    console.log("App listening to: " + port);
    createColllection("New Course")
})