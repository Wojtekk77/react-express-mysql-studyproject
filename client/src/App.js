import React, { useState, useEffect } from "react"
import './App.css';
import Axios from 'axios';


// {"Authorization": "Token itutajtoken"}
function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [reviewsList, setReviewList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(['jakis item']);
  const submitReview = () => {
    Axios.post("http://localhost:3001/movie", {
      movieName: movieName,
      movieReview: review
    })
    setReviewList([...reviewsList, { movieName: movieName, movieReview: review }])
  }

  const api = 'https://ticketmaster-django.herokuapp.com/';
  const token = 'Token 654f6ac41de1b0f152e5cc36a3b6ce2c0b5350cb';
  const getDataFromApi = () => {
    Axios.get(api, { headers: { "Authorization": `${token}` } })
      .then(res => {
        console.log(res.data);
        setIsLoaded(!isLoaded);
        this.setState({
          items: res.data,  /*set response data in items array*/
          isLoaded: true,
          redirectToReferrer: false
        })
      })
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
      <button onClick={getDataFromApi}>Get data From API</button>
    </div>
  );
}

export default App;
