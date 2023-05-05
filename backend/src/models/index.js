import {MongoClient, ServerApiVersion} from 'mongodb';

const uri = 'mongodb://0.0.0.0:27017'
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  }
);

async function run() {
  try {
    await client.connect(err => {
      if (err) {
        console.error(err);
        process.exit(-1);
      }
    })
    await client.db("admin").command({ping: 1});
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error(err)
  }
}

run()

export {client}