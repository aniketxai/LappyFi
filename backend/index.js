const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// 1️⃣ Get Google Auth URL
app.get('/auth-url', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/blogger'],
  });
  res.json({ url });
});

// 2️⃣ Exchange code for token
app.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  // ✅ Redirect to frontend with token in URL
  res.redirect(`${process.env.FURL}?access_token=${tokens.access_token}`);
});


// 3️⃣ Create Blogger Post
app.post('/create-post', async (req, res) => {
  const { access_token, blogId, title, content,labels } = req.body;
  oauth2Client.setCredentials({ access_token });

  const blogger = google.blogger({ version: 'v3', auth: oauth2Client });

  try {
    const response = await blogger.posts.insert({
      blogId,
      requestBody: { title, content , labels },
    });
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Post creation failed');
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});


//Get Post

