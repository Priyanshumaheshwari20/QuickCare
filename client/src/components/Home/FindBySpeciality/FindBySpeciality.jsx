import React,{useEffect} from "react";
import "./FindBySpeciality.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function FindBySpeciality() {
    const navigate = useNavigate();

    
  useEffect(() => {

    gsap.from(".find", {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.25,
      ease: "power3.out",

      scrollTrigger: {
        trigger: ".find",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

  }, []);

const handleSpeciality = (speciality) => {
  const patientId = localStorage.getItem("patientId");
  const role = localStorage.getItem("role");

  if (!patientId || role !== "patient") {
    toast.warning("Please login as a patient first!");
    return;
  }

  navigate("/DoctorList", {
    state: { speciality }
  });
};
  return (
    <>
    <div className="find" style={{marginTop:"5rem"}}>
      <h1 className="title">Find by Speciality</h1>

      <p className="subtitle">
        Simply browse through our extensive list of trusted doctors
      </p>

      <p className="subtitle">Schedule your appointment</p>

      <div className="find-By-Speciality">

        <div className="speciality"   onClick={() => handleSpeciality("Gynecologist")}
>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL1udmQHXjAN-ai9Ec_Um-27v0OlJOMGZAKcedpNFP2g&s=10"
            alt="Gynecologist"
          />
          <h5>Gynecologist</h5>
        </div>

        <div className="speciality"   onClick={() => handleSpeciality("Ophthalmologist")}
>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhVTrEVKPp1Aob0LvPJpPaKoc5OvtW91XXv0UPv8SP-Q&s=10"
            alt="Ophthalmologist"
          />
          <h5>Ophthalmologist</h5>
        </div>

        <div className="speciality"   onClick={() => handleSpeciality("Cardiologist")}
>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScBsjB8kZ_gvvt4fYXazz8tSANcL7ef9KuVx1x98xiNQ&s=10"
            alt="Urologist"
          />
          <h5>Cardiologist</h5>
        </div>

      </div>

      <h4 className="more">And many more...</h4>
      </div>
    </>
  );
}

export default FindBySpeciality;