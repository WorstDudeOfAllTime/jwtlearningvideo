import { useState } from 'react';
const Form = ({ setMovies }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authToken, setAuthToken] = useState(null)
  const checkUser = async (username, password) => {
    const fetchTokens = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const theTokens = await fetchTokens.json();
    setAuthToken(theTokens.accessToken);
  };
  const getMovies = async () => {
    console.log('fired');
    const fetchMovies = await fetch('http://localhost:4000/movies', {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'Authorization': "Bearer " + authToken,
      }
    })
    console.log(fetchMovies);
    const movieList = await fetchMovies.json();
    console.log(movieList);
    setMovies(movieList);
  }
  return (
    <div className="formBox">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          checkUser(username, password);
          setUsername('');
          setPassword('');
        }}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <input
          style={{ margin: '10px 0' }}
          type="text"
          name="text"
          placeholder="enter username"
          value={username}
          require={true}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <input
          style={{ margin: '10px 0' }}
          type="password"
          placeholder="enter password"
          value={password}
          require={true}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button>Submit</button>
      </form>
      <button onClick={()=>{
        if(authToken){
          getMovies();
        }else {
          console.log('you dont have a token yet');
        }
      }}>Get List of Movies</button>
    </div>
  );
};

export default Form;
