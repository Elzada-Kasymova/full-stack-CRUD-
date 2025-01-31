import express from "express"
import cors from "cors"
import clientRoutes from "./routes/clientRouts.js"

const app = express()
const PORT = process.env.PORT || 8383
app.use(cors())
app.use(express.json())

// app.get("/", (req,res) => {
//     res.send('<h1>Hello World</h1>')
// })

app.use("/api", clientRoutes)


app.listen(PORT, () => {
    console.log(`Server has started on ${PORT}`)
})