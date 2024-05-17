require("dotenv").config(); // 引入dotenv(.env) config默認? 不是require(".env") 可能是因為.前面沒有東西...
const express = require("express");
const mongoose = require("mongoose");
const workoutRouter = require("./routes/workouts");   // workouts的路由器模組
const userRouter = require("./routes/user");   // user的路由器模組
// 解決 'Uncaught in promise unexpected token <doctype + Invalid options object. Dev Server has been initialized using object that does no match the API schema. - options.allowedHosts[0] should  be a non-empty string.
const cors = require("cors")

const app = express();

// middleware
app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
});
// 使用 cors 中間件
app.use(cors({
    origin: 'http://localhost:3000', // 設置允許訪問的源（即React應用程式所在的端口）
}));
// routes
// use workoutRouter route
app.use("/api/workouts",workoutRouter);
app.use("/api/user",userRouter);

// mongoDB const collection = db.collection("member"); collection = db.collection("diary");
// is different PangPang teach the url of mongoDB to connect...
// ?的前面:mernapp ，database的名稱
mongoose.connect(process.env.url)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log("connect the db& http://localhost:"+process.env.PORT+"/api/workouts")
        });
    })
    .catch((err)=>{
        console.log(err);
    })



