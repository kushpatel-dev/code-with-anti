const { MongoClient } = require('mongodb');

const uri_srv = 'mongodb+srv://kush:kush%2399@cluster0.qmqksdb.mongodb.net/modules_data?retryWrites=true&w=majority';
const uri_standard = 'mongodb://kush:kush%2399@ac-edkvqjb-shard-00-00.qmqksdb.mongodb.net:27017,ac-edkvqjb-shard-00-01.qmqksdb.mongodb.net:27017,ac-edkvqjb-shard-00-02.qmqksdb.mongodb.net:27017/modules_data?ssl=true&replicaSet=atlas-rj6or1-shard-0&authSource=admin&retryWrites=true&w=majority';

async function testConnection(uri, name) {
  console.log(`Testing ${name}...`);
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  try {
    await client.connect();
    console.log(`[SUCCESS] Connected to ${name}`);
    await client.close();
    return true;
  } catch (err) {
    console.log(`[FAILED] ${name}:`, err.message);
    return false;
  }
}

async function run() {
  await testConnection(uri_srv, "SRV Connection");
  await testConnection(uri_standard, "Standard Connection");
}

run();
