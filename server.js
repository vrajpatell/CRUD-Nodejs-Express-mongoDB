
const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const { query } = require('express');
const app = express();

app.listen(3000, function() {
console.log('listening to express server 3000')
})
app.use(express.static('public'))

MongoClient.connect('mongodb+srv://<username>:<password>@cluster0.ngl79.mongodb.net/<DatabaseName>?retryWrites=true&w=majority',  { useUnifiedTopology: true })
.then(client => {
  console.log('Connected to Database')
  const db = client.db('vraj-quotes')
  const vrajCollection = db.collection('quotes')
//   app.use(/* ... */)
//   app.get(/* ... */)
//   app.post(/* ... */)
//   app.listen(/* ... */)
app.use(bodyParser.json())

app.post('/quotes',(req, res) =>{
    vrajCollection.insertOne(req.body)
    .then(result => {
        res.redirect('/')
    })
    .catch(error => console.error(error))
 })

 

 app.get('/', (req, res) => {
    db.collection('quotes').find().toArray()
      .then(results => {
        res.render('index.ejs', { quotes: results })
      })
      .catch(error => console.error(error))
     
  })

vrajCollection.findOneAndReplace(
    { name: 'vraj' },
    {
        $set: {
            name: req.body.name,
            quote: req.body.quote
        }
    },
    {
        upsert: true
    }
)
.then(result => {/* ... */})
.catch(error => console.error(error))

app.put('/quotes', (req, res) => {
    quotesCollection.findOneAndUpdate(/* ... */)
    .then(result => {
       res.json('Success')
     })
    .catch(error => console.error(error))
  })

  app.delete('/quotes', (req, res) => {
    vrajCollection.deleteOne(
      { name: req.body.name }
    )
    .then(result => {
        if (result.deletedCount === 0) {
          return res.json('No quote to delete')
        }
        res.json(`Deleted quote`)
      })
      .catch(error => console.error(error))
  })


})
.catch(console.error)


app.use(bodyParser.urlencoded({ extended: true }))

// app.get('/',(req, res) => {
//    res.sendFile(__dirname + '/index.html')
// })
