import { useState } from "react";
import clientPromise from "../lib/mongodb";
import "bootstrap/dist/css/bootstrap.css";

export default function Users({ users }) {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  // const [group_number, setGroupNumber] = useState("");
  
  function handleSubmit(e) {
    e.preventDefault();
    
    const postData = async () => {
      const data = {
        first_name: first_name,
        last_name: last_name,
        // group_number: group_number,
      };

      const response = await fetch("/api/post", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    };
    postData().then((data) => {
      alert(data.message);
    });
  }

  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Numero De Groupo</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} > 
              <>
                <th scope="row">1</th>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.group_number}</td>
              </>
            </tr>
          ))}
        </tbody>
      </table>

      <form class="row g-3" onSubmit={handleSubmit}>
        <div class="col-md-4 form-floating mb-3">
          <input
            type="text"
            id="first"
            name="first"
            class="form-control"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label for="first">First Name</label>
        </div>
        <div class="col-md-4 form-floating mb-3">
          <input
            type="text"
            id="last"
            name="last"
            class="form-control"
            onChange={(e) => setLastName(e.target.value)}
          />
          <label for="last">Last Name</label>
        </div>
        <div class="col-md-4 form-floating mb-3">
          <select
            class="form-select"
            id="group-select"
            aria-label="Floating label select example"
          >
            <option selected>Selecione el numero de Grupo</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {/* <label for="floatingSelect">Works with selects</label> */}
        </div>
        <div class="col-12 form-floating mb-3">
          <label for="inputAddress" class="form-label">
            Address
          </label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>
        <div class="col-12 form-floating mb-3">
          <label for="inputAddress2" class="form-label">
            Address 2
          </label>
          <input
            type="text"
            class="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div>
        <div class="col-md-4 form-floating mb-3">
          <label for="inputCity" class="form-label">
            City
          </label>
          <input type="text" class="form-control" id="inputCity" />
        </div>
        <div class="col-md-4 form-floating mb-3">
          <select id="inputState" class="form-select">
            <option selected>NJ</option>
          </select>
          <label for="inputState" class="form-label">
            State
          </label>
        </div>
        <div class="col-md-4 form-floating mb-3">
          <input type="text" class="form-control" id="inputZip" />
          <label for="inputZip">
            Zip
          </label>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("JWDB");
    const witness = await db
      .collection("users")
      .find({})
      .sort({})
      .limit(10)
      .toArray();

    return {
      props: { users: JSON.parse(JSON.stringify(witness)) },
    };
  } catch (e) {
    console.error(e);
  }
}
