import { useState } from "react";
import clientPromise from "../lib/mongodb";
import "bootstrap/dist/css/bootstrap.css";

export default function Users({ users }) {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [group_number, setGroupNumber] = useState("");
  const [address_1, setAddress1] = useState("");
  const [address_2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip_code, setZipCode] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email_address, setEmailAddress] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const postData = async () => {
      const data = {
        first_name: first_name,
        last_name: last_name,
        group_number: group_number,
        address_1: address_1,
        address_2: address_2,
        city: city,
        state: state,
        zip_code: zip_code,
        phone_number: phone_number,
        email_address: email_address,
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
            <tr key={index}>
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

                          {/*  Register User Form */}

      <form class="row g-3" onSubmit={handleSubmit}>
        <div class="col-md-4 form-floating mb-3">
          <input
            type="text"
            id="first"
            name="first"
            class="form-control"
            placeholder="firstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label for="first">Nombre</label>
        </div>
        <div class="col-md-4 form-floating mb-3">
          <input
            type="text"
            id="last"
            name="last"
            class="form-control"
            placeholder="lastName"
            onChange={(e) => setLastName(e.target.value)}
          />
          <label for="last">Apellido</label>
        </div>
        <div class="col-md-4 form-floating mb-3">
          <select
            class="form-select"
            id="group-select"
            aria-label="Floating label select example"
            onChange={(e) => setGroupNumber(e.target.value)}
          >
            <option selected>Selecione el numero de Grupo</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <label for="floatingSelect">Numero de Grupo</label>
        </div>
        <div class="col-12 form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
            onChange={(e) => setAddress1(e.target.value)}
          />
          <label for="inputAddress" class="form-label">
            Direcion
          </label>
        </div>
        <div class="col-12 form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
            onChange={(e) => setAddress2(e.target.value)}
          />
          <label for="inputAddress2" class="form-label">
            Direcion 2
          </label>
        </div>
        <div class="col-md-4 form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="inputCity"
            placeholder="cityInput"
            onChange={(e) => setCity(e.target.value)}
          />
          <label for="inputCity" class="form-label">
            City
          </label>
        </div>
        <div class="col-md-4 form-floating mb-3">
          <select
            id="inputState"
            class="form-select"
            onChange={(e) => setState(e.target.value)}
          >
            <option selected>Selecione su Estado</option>
            <option value="NJ">NJ</option>
          </select>
          <label for="inputState" class="form-label">
            Estado
          </label>
        </div>
        <div class="col-md-4 form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="inputZip"
            placeholder="zipCode"
            onChange={(e) => setZipCode(e.target.value)}
          />
          <label for="inputZip">Zip</label>
        </div>
        <div class="col-md-6 form-floating mb-3">
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            class="form-control"
            placeholder="phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <label for="phoneNumber">Numero de Telefono</label>
        </div>
        <div class="col-md-6 form-floating mb-3">
          <input
            type="text"
            id="emailAddress"
            name="emailAddress"
            class="form-control"
            placeholder="emailAddress"
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <label for="emailAddress">Correo Electronico</label>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">
            Submit
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
