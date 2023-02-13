const { fork } = require('child_process')

const express = require('express');
const app = express();

app.get("/prime/:num", (req, res) => {
    const num = req.params.num;

    const child = fork("child.js");

    // child.send({time: Date.now()})
    child.send(num)
    
    child.on("message", (message) => {
        console.log('child process 가 보낸 메세지: ', message);
        res.json(message);
    })

    child.on("error", (err) => {
        console.log('child process에서 난 에러: ', err);
    })

    child.on("exit", (code) => {
        console.log('child process 종료. 그와 동시에 넘어온 값: ', code);
    })


    // res.json({});

});

app.listen(8080)
