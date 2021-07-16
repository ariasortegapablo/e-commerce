import nextConnect from "next-connect";
import { MongoClient } from "mongodb";

const handler = nextConnect();
const client = new MongoClient(
  `mongodb+srv://deku:123456asdf@ecommerce-next.o8k1b.mongodb.net/ecommerce?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    sslCert: false,
  }
);
const accessDb = async () => {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db("ecommerce");
};

export default async function imagehandler(req, res) {
  // handler.get(async (req, res) => {
  //   // req.query => algo.com/games?id=1
  //   // req.body => {} 0bject
  //   const db = await accessDb();
  //   const games = await db.collection("games").find().toArray();
  //   res.status(200).json(games);
  // });
  const db = await accessDb();
  console.log(req);
  const { query, method, body } = req;
  console.log(body);
  console.log(query.url);
  console.log(query);
  // res.status(200);
  switch (method) {
    case "GET":
      // Update or create data in your database
      const data = await await db.collection("platforms").find().toArray();
      res.status(200).json(data);
      break;
    case "PUT":
      // Update or create data in your database
      res.status(200).json({ id, name: name || `User ${id}` });
      break;
    case "POST":
      // Update or create data in your database
      //res.status(200).json({ id, name: name || `User ${id}` });

      await db.collection("platforms").insertOne(body);
      res.status(200).json();
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

//mongodb+srv://deku:123456asdf@ecommerce-next.o8k1b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
