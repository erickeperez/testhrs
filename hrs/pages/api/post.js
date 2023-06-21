import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const { title, post } = JSON.parse(req.body);
    // console.log(req.body)
    // Then save the post data to a database
    try {
        const client = await clientPromise;
        const db = client.db("JWDB");
        let bodyObject = JSON.parse(req.body)
        const witness = await db
            .collection("users")
            .insertOne(bodyObject)
             res.json(witness)
             return
    } catch (e) {
        console.error(e);
    }
    // res.status(200).json({ message: "Post created successfully" });
  }