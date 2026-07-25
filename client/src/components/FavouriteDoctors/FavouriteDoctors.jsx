import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Home/Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./FavouriteDoctors.css";

function FavouriteDoctors() {
  const navigate = useNavigate();

  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favouriteDoctors")) || []
  );

  const removeFavourite = (id) => {
    const updated = favourites.filter((item) => item._id !== id);
    setFavourites(updated);
    localStorage.setItem("favouriteDoctors", JSON.stringify(updated));
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <h2 className="text-center mb-5">
          ❤️ Favourite Doctors
        </h2>

        <div className="row">

          {favourites.length === 0 ? (
            <h4 className="text-center">
              No Favourite Doctors Added
            </h4>
          ) : (
            favourites.map((item) => (
              <div className="col-lg-4 col-md-6 mb-4" key={item._id}>

                <div className="fav-card">

                  <div className="doctor-image">
                    👨‍⚕️
                  </div>

                  <h4>{item.name}</h4>

                  <p className="badge bg-primary">
                    {item.specialization}
                  </p>

                  <h5>₹ {item.consultationFee}</h5>

                  <p>
                    Experience : {item.experience} Years
                  </p>

                  <button
                    className="btn btn-primary w-100 mb-2"
                    onClick={() =>
                      navigate(`/DoctorDetails/${item._id}`)
                    }
                  >
                    Book Appointment
                  </button>

                  <button
                    className="btn btn-danger w-100"
                    onClick={() =>
                      removeFavourite(item._id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default FavouriteDoctors;