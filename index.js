const express = require("express");
const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");
const methodOverride = require("method-override");
const path = require("path");

const app = express();
// let port = 8080;  // port number

app.use(methodOverride('_method_'));
app.use(express.urlencoded({ extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));

let connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        database: 'delta_main',
        password: "Jaihanuman@1964"
    }
);

let createRandomUser = () => {
    return [
      faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
      faker.internet.password(),
    ];
}
  
let data_arr = [];

// for(let i = 1; i <= 100; i++){
//     data_arr.push(createRandomUser());
// }

// let query = "INSERT INTO user (id, username, email, password) VALUES ?";

// try{
//     connection.query(query, [data_arr], (err, result) => {
//         if(err) throw err;
//         console.log(result);
//     });
// }catch(err){
//     console.log(err);
// }
app.listen(8000, () => {
    console.log("Server is Listening.");
})

app.get("/", (req, res) => {
    let query = "SELECT count(*) FROM user";
    
    try{
        connection.query(query, (err, result) => {
            if(err) throw err;
            let count = result[0]["count(*)"];
            console.log(result[0]["count(*)"]);
            res.render("home.ejs", {count});
        });
    }catch(err){
        console.log(err);
    }
    console.log("app is listening.")
    
});

app.get("/user", (req, res) => {
    let query = "SELECT * FROM user";

    try{
        connection.query(query, (err, data) => {
            if(err) throw err;
            res.render("show.ejs", {data});
        })
    }catch{
        console.log("ERROR IS DATABASE!");
    }
});

app.get("/user/:id/edit", (req, res) => {
    let {id} = req.params;
    let query = `SELECT * FROM user WHERE id = '${id}'`;

    try{
        connection.query(query, (err, data) => {
            if(err) throw err;
            data = data[0];
            res.render("edit.ejs", {data});
            
        })
    }catch{
        console.log("ERROR IS DATABASE!");
    }
});

app.patch("/user/:id", (req, res) => {
    let {id} = req.params;
    let {username: newUsername, password: formPassword} = req.body;
    let query = `SELECT * FROM user WHERE id = '${id}'`;
    
    try{
        connection.query(query, (err, data) => {
            if(err) throw err;
            data = data[0];
            if(data.password === formPassword){
                let next_query = `UPDATE user SET username = '${newUsername}' WHERE id = '${id}'`;

                try{
                    connection.query(next_query, (err, result) => {
                        console.log(result);
                        res.redirect("/user");
                    });
                }catch(err) {
                    console.log("Error in Database!");
                }
                
            }
            
        });
    }catch{
        console.log("ERROR IS DATABASE!");
    }
});

app.get("/user/:id/verify", (req, res) => {
    let {id} = req.params;
    let query = `SELECT * FROM user WHERE id = '${id}'`;

    try{
        connection.query(query, (err, data) => {
            if(err) throw err;
            data = data[0];
            res.render("verify.ejs", {data});
            
        })
    }catch{
        console.log("ERROR IS DATABASE!");
    }
});

app.delete("/user/:id", (req,res) => {
    let {id} = req.params;
    let {email: formEmail, password: formPassword} = req.body;
    let query = `SELECT * FROM user WHERE id = '${id}'`;

    try{
        connection.query(query, (err, data) => {
            if(err) throw err;
            data = data[0];
            if(data.password === formPassword && data.email === formEmail){
                let next_query = `DELETE FROM user WHERE id = '${id}'`;

                try{
                    connection.query(next_query, (err, result) => {
                        console.log(result);
                        res.redirect("/user");
                    });
                }catch(err) {
                    console.log("Error in Database!");
                }
                
            }
            else{
                res.send("Incorrect Email or Password!");
            }
            
        });
    }catch{
        console.log("ERROR IS DATABASE!");
    }
});

app.get("/user/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/user/new", (req, res) => {
    let {username, email, password} = req.body;
    let query = `INSERT INTO user (id, username, email, password) VALUES ('${faker.string.uuid()}', '${username}', '${email}', '${password}')`;

    try{
        connection.query(query, (err, data) => {
            if(err) throw err;
            res.redirect("/user");
            
        })
    }catch{
        console.log("ERROR IS DATABASE!");
    }
});
