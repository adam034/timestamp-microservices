const express = require('express');
const cors = require('cors');
const moment = require('moment');
const app = express();
const port = '3000'
app.get('/api/:date', (req,res) => {
    const { date } = req.params
    let results = {}
    let cekDateformat = moment(date,'YYYY-MM-DD').format('YYYY-MM-DD') === date
    if (date.includes('-') && cekDateformat === true ) {
        
        results.unix = new Date(date).getTime()
        results.utc = new Date(date).toUTCString()
    } else if (isNaN(parseInt(date)) === false){
        if (/\d{5,}/.test(date)) {
            results.unix = new Date(parseInt(date)).getTime()
            results.utc = new Date(parseInt(date)).toUTCString()
        } else {
            results.unix = new Date(date).getTime()
            results.utc = new Date(date).toUTCString()
        }
        
    } else if (cekDateformat === false) {
        results.error = 'Invalid date'
    }
    
    
    res.json(results)
})
app.get('/api', (req, res) => {
    let results = {}
    results.unix = new Date().getTime()
    results.utc = new Date().toUTCString()

    res.json(results)
})

app.listen(port,() => {
    console.log(`Server running at port ${port}`)
})