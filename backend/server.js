const express = require('express')
const app = express()
const env = require('dotenv')

const port = 3000



//Body access
app.use (express.urlencoded({extended: false}))
app.use(express.json());


app.use('/patient', require('./routes/patient'))
app.use('/partner', require('./routes/partner'))





app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)