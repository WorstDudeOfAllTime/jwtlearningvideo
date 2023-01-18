const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
const keySec = 'Worst3_DUDE4_of3_ALL4_66688';
const refSec = keySec.split('').reverse().join('');


app.use(bodyParser.json());
app.use(cors());
const users = [
  {
    username: 'wdoatDev',
    password: '666wdoat666',
    title: 'admin',
  },
  {
    username: 'bdoatNotdev',
    password: '42JerryStackhouse42',
    title: 'user',
  },
  
];
const movies = [
  {
    title: 'Saving Private Ryan',
    releaseDate: 1999,
    star: 'Tom Hanks'
  },
  {
    title: 'Big',
    releaseDate: 1999,
    star: 'Tom Hanks'
  },
  {
    title: 'Sleepless in Seattle',
    releaseDate: 1999,
    star: 'Tom Hanks'
  },
]

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(authHeader){
    const token = authHeader.split(' ')[1]
    jwt.verify(token, keySec, (err, user) => {
      if(err){
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    })
  }
  else {
    res.sendStatus(401)
  }

}
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => {
    return user.username === username && user.password === password;
  });

  if (user) {
    const accessToken = jwt.sign(
      { username: user.username, role: user.title },
      keySec,
      { expiresIn: '5m' }
    );
    const refreshToken = jwt.sign(
      { username: user.username, role: user.title },
      keySec
    );
    res.send({ accessToken, refreshToken });
  } else {
    res.send('Username and password have not been found');
  }
});

app.get('/movies', authenticateToken, (req, res) => {
  const {role} = req.user;
  if(role === 'admin'){
    res.send(movies)
  }else {
    res.sendStatus(403);
  }
})

app.listen(4000, () => {
  console.log('we are listening');
});
