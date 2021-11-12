const express = require('express');
// const fs = require('fs');
const app = express();

// let raw = fs.readFileSync('data.json');
// let data = JSON.parse(raw);
// console.log(data);

let port = process.env.PORT || 5000;

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/dist/index.html')
// });
// app.get('/index_bundle.js', (req, res) => {
//     res.sendFile(__dirname + '/dist/index_bundle.js')
// });
app.use(express.static('dist'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
