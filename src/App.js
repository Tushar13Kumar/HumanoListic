import "./styles.css";
import useFetch from "./useFetch";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

export default function App() {
  const [showMore, setShowMore] = useState(false);
  const { data, loading, error, fetchData } = useFetch(
    "https://randomuser.me/api/?results=3"
  );
  console.log(data);

  return (
    <div className="container py-4">
      <h1>People Directory</h1>
      <button className="btn btn-primary mb-4" onClick={fetchData}>
        Get People
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>An error occurred</p>}

      {data && data.results && (
        <div className="row">
          {data.results.map((person, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card h-100 shadow-sm p-3  text-start">
                <img
                  src={person.picture.medium}
                  alt="profile"
                  className="mb-3"
                />
                <h4>
                  {person.name.first} {person.name.last}
                </h4>
                <p>Age: {person.dob.age}</p>
                <p>Gender: {person.gender}</p>
                <p>Username: {person.login.username}</p>
                <p>Email: {person.email}</p>
                {showMore && (
                  <div className="mt-3 text-start">
                    <p>
                      Phone:
                      {person.phone}
                    </p>
                    <p>
                      Address:
                      {person.location.street.number}{" "}
                      {person.location.street.name}, {person.location.city},{" "}
                      {person.location.state}, {person.location.country}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
          <button
            className="btn btn-primary "
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less Info" : "Show More Info"}
          </button>
        </div>
      )}
    </div>
  );
}
