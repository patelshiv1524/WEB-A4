var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require("path");
var officeData = require("./modules/officeData");

app.use(express.static("public"));

app.listen(HTTP_PORT, ()=>{console.log("server listening on port: " + HTTP_PORT)});
app.use(express.urlencoded({ extended: true }));

app.get("/",(req, res)=> {
    res.sendFile(path.join(__dirname,"/views/home.html"));
});

app.get("/PartTimer",(req, res) => {
    officeData.initialize().then(()=> {
        return officeData.getPartTimers();
    }).then ((employees) => {
        res.json(employees);
    })
    .catch((error) => {
        res.send ('no results found');
    });
});

app.get("/employee/:num",(req, res) => {
    var num = req.params.num;
    var employeeNumber = parseInt(num);

    if (isNaN(employeeNumber)){
        res.status(400).json({error: "Error: Employee number needs to be an integer."});
    } else {
        officeData.initialize().then(()=> {
            return officeData.getEmployeeByNum(employeeNumber);
        }).then((retrievedEmployee) => {
            res.json(retrievedEmployee);
        }).catch((err) => {
            res.send("No results found");
            res.status(500).json({error: err});
        });
    }
});

app.get("/audio",(req, res) => {
    res.sendFile(path.join(__dirname,"/views/audio.html"));
});

app.get("/video",(req, res) => {
    res.sendFile(path.join(__dirname,"/views/video.html"));
});

app.get("/table",(req, res) => {
    res.sendFile(path.join(__dirname,"/views/table.html"));
});

app.get("/list",(req, res) => {
    res.sendFile(path.join(__dirname,"/views/list.html"));
});

app.get("/storefront",(req, res) => {
    res.sendFile(path.join(__dirname,"/views/storefront.html"));
});


app.use((req, res, next) => {
    res.status(404).json({ message: 'Error 404: Page Not Found' });
  });