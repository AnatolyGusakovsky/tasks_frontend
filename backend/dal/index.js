import {MongoClient} from "mongodb";

const client = new MongoClient('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

client.connect(error => {
  if (error) {
    console.log(error)
    process.exit(-1)
  }
  console.log('Successfully connected to the MongoDB')
})

export {client}