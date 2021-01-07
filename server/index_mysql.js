const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3001;
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'CRUDDB',
});
//npm run devStart ( in package json )
//nodemon index.js ( it allows us not to refreshing server every time we make changes )


app.get('/', (req, res) => {
    // const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('incepcion3','good movie3')";
    // db.query(sqlInsert, (err, result) => {
    //     res.send("hello pred, we are into db.query()")
    // });
    res.send("hello world2")
});

app.use(cors);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result) => {
        console.log(result)
    });
})

app.post("/api/insert", (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(result)
    });
    res.send("api/insert")
});

app.listen(port, () => { console.log(`running on port ${port}`) })