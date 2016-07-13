import express from 'express'
const app = express()
const port = process.env.PORT || 5000

app.use(express.static('pub'))

console.log(`Listening on http://localhost:${port}`)

app.listen(port)
