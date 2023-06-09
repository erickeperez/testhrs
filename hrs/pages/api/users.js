import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db("JWDB");

       const witness = await db
           .collection("users")
           .find({})
           .sort({ metacritic: -1 })
           .limit(10)
           .toArray();

       res.json(witness);
   } catch (e) {
       console.error(e);
   }
};