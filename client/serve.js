const app = require('express')();
const port = 3900;

app.use(require("express").static(`${process.cwd()}\\client`));
app.get('/', (req, res) => {
    const path = `${process.cwd()}\\client\\index.html`;
    res.sendFile(path);
})

app.listen(port);