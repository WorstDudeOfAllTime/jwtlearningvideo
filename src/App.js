import './App.css';
import users from './../src/users.json';
import Form from './components/Form';
import React, { useState } from 'react';
function App() {
  const [movies, setMovies] = useState(null);
  return (
    <div className="App">
      <Form setMovies={setMovies} />
      <div style={{color: 'white'}}>
        {movies &&
          movies.map((movie) => {
            console.log(movies);
            return <h1>{movie.title}</h1>;
          })}
      </div>
    </div>
  );
}

export default App;
