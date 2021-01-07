var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'CRUDDB',
});

/* GET users listing. */
router.get('/', function (req, res, next) {
    const sqlInsert = "SELECT * FROM movie_reviews;";
    db.query(sqlInsert, (err, result) => {
        res.send(result)
    });
    // res.send('respond with a resource2123sda12');
});
// POST A REVIEW 
// router.post('/', function (req, res) {
//     res.send('Got a POST request')
// })

router.post("/", (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(result)
    });
});

module.exports = router;
