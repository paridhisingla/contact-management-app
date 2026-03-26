const express = require("express")
const app = express()
const connection = require("./config/db.js")
const ContactRouter = require("./routes/Contact.routes.js")
const UserRouter = require("./routes/User.routes.js")
const cors = require("cors")

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176", "https://paridhisingla-contact-management-ap.vercel.app"]
}))

// Test endpoint
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is running!", timestamp: new Date() })
})

app.use("/api",ContactRouter)
app.use("/api/auth",UserRouter)

const PORT = process.env.port || 5000;

app.listen(PORT,async()=>{
    try {
      await connection
      console.log("Server is connected with DB")
    } catch (error) {
      console.log("Server is not connected with DB")
    }
    console.log(`Server is listening on Port : ${PORT} and Url http://localhost:${PORT}`)
})