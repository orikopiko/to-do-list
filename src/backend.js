const express = require('express');
const app = express();

app.get('/',
    (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

app.post('/',
    (req, res) => {
        const { username, password } = req.body;
        const { authorization } = req.headers;
        res.send(
            {
                username,
                password,
                authorization
            }
        );
    });

app.listen(8000,
    () => {
        console.log(
            'Our express server is up on port 3000'
        );
    }
);