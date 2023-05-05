import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import google from "googlethis"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res)=>{
    res.send("server is up and running")
})

app.post("/", (req, res)=>{
    console.log(req.body.num)
    switch(req.body.num){
        case 0:
            fetch("https://catfact.ninja/fact").then(res =>{
                return res.json()
            }).then(data =>{
                res.json(data)
            })
            
            break;
        case 1:
            fetch("https://api.thecatapi.com/v1/images/search").then(res=>{
                return res.json()
            }).then(data =>{
                res.send({
                    url : data[0].url
                })
            })
            break;
        case 2:
            fetch("https://catfact.ninja/breeds").then(res =>{
                return res.json()
            }).then(data =>{
                let random = Math.floor(Math.random() * 25)
                console.log(random)
                res.json(data.data[random])
            })
            break;

        default:
            console.log("invalid input");
            break;
    }
})


app.listen(PORT, ()=>{
    console.log(`listening to port ${PORT}`)
})