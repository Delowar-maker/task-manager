const dotenv = require('dotenv')
const app = require('./app')
dotenv.config({ path: './config.env' })

app.listen(process.env.RUNNING_PORT, () => {
    console.log(process.env.RUNNING_PORT)
})

