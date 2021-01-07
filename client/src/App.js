import React, { useState, useEffect } from "react"
import './App.css';
import Axios from 'axios';

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [reviewsList, setReviewList] = useState([]);

  const submitReview = () => {
    Axios.post("http://localhost:3001/movie", {
      movieName: movieName,
      movieReview: review
    })
    setReviewList([...reviewsList, { movieName: movieName, movieReview: review }])
  }


  useEffect(() => {
    Axios.get("http://localhost:3001/movie").then((response) => {
      console.log(response.data)
      setReviewList(response.data)
    })

  }, [])

  const revList = reviewsList.map((val) => {
    return <p key={val.movieName + val.movieReview + Math.random()}>Movie Name: {val.movieName} | Movie Review: {val.movieReview}</p>
  })

  return (
    <div className="App">

      {revList}
      <h1>crud app</h1>
      <div className="form">
        <label>Movie Name:</label>
        <input type="text" name="movieName" onChange={(e) => { setMovieName(e.target.value) }} />
        <label>Review:</label>
        <input type="text" name="review" onChange={(e) => { setReview(e.target.value) }} />
        <button onClick={submitReview}>submit</button>
      </div>
    </div>
  );
}

export default App;
