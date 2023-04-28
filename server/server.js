const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongooes = require('mongoose');

const app = express();

require('dotenv').config();
mongooes.Promise = global.Promise;
mongooes.connect(process.env.DATABASE);

require('./models/user');

const User = mongooes.model('User')

const port = process.env.PORT || 3500;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser())

/*======================================
      USER
=======================================*/

app.post('/api/user/register', async (req, res) => {
  const user = new User(req.body);

  try {
    const data = await user.save()
    res.json(data);
  } catch (err) {
    console.log(err)
    res.status(500).json({success: false, err})
  }
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});

