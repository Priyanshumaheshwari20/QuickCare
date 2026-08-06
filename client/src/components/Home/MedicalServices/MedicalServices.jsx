import React from "react";
import "./MedicalServices.css"
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger)


function MedicalServices() {
useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
    useEffect(()=> {
        gsap.from(".Our-Medical-Facilities" ,  {
            y:150,
            opacity:0,
            duration:1.8,
            scale:0.8,
            stagger:0.5,
            ease:"circ.out",
            scrollTrigger :{
                trigger:".Our-Medical-Facilities",
                start: "top 80%",
      toggleActions: "play none none none",
            }
        })
    },[])
  return (
    <>
    <div className="Our-Medical-Facilities">
      <strong> <h1 style={{fontWeight:"800" , textAlign:"center" , marginBottom:"2rem"  }}> OUR MEDICAL FACILITIES  </h1></strong>
    <div  className="medical-container"  style={{display:"flex" , gap:"3rem" , gridTemplateColumns:"repeat(4, 1fr)",
        justifyContent:"center" ,     flexWrap: "wrap"}}
    
    >

      {/*card 1 */}
      <div className="card medical-card" >
        <img
          src="https://img.freepik.com/premium-photo/medical-professional-holding-human-heart-model-with-ecg-line_1101054-95689.jpg?semt=ais_hybrid&w=740&q=80"
          className="card-img-top"
          alt="Medical Service"
        />

        <div className="card-body">
          <h5 className="card-title"> Cardiologist</h5>

          <p className="card-text">
            Comprehensive heart care, from routine checkups to advanced cardiac treatment.
          </p>

        </div>
      </div>

      {/*card 2 */}

      <div className="card medical-card " >
        <img
          src="https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg"
          className="card-img-top"
          alt="Medical Service"
        />

        <div className="card-body">
          <h5 className="card-title">Pulmonary</h5>

          <p className="card-text">
            Connect with experienced pulmonologists for personalized care, accurate diagnosis, and effective treatment plans.
          </p>

        
        </div>
      </div>

      {/*card 3 */}


      <div className="card medical-card" >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw8bQ_hngeAJfjNEFr9zdOfDAhNvR1MoKYuK0qYbkplQ&s=10"
          className="card-img-top"
          alt="Medical Service"
        />

        <div className="card-body">
          <h5 className="card-title">Gynecologist
</h5>

          <p className="card-text">
    Consult experienced gynecologists for personalized diagnosis, treatment, and preventive care.
          </p>

  
        </div>
      </div>

      {/*card 4 */}

      <div className="card medical-card" >
        <img
          src="https://www.neovisioneyecenters.com/wp-content/uploads/2020/10/neovision-october-2020-1-jpg.webp"
          className="card-img-top"
          alt="Medical Service"
        />

        <div className="card-body">
          <h5 className="card-title">Ophthalmology </h5>

          <p className="card-text">
            Expert eye care services for vision correction, eye diseases, and routine eye examinations.
          </p>

        </div>
      </div>

      {/*card 5 */}

      <div className="card  medical-card" >
        <img
          src="https://media.istockphoto.com/id/1646576038/photo/a-smiling-female-psychologist-consoled-a-female-patient-during-the-appointment.jpg?s=612x612&w=0&k=20&c=SxCgHc6t3ywdK_b6hI1aGhjtjm88mCn9FZKPBaWLk1s="
          className="card-img-top"
          alt="Medical Service"
        />

        <div className="card-body">
          <h5 className="card-title">Psychiatry
</h5>

          <p className="card-text">
            Professional care for mental and emotional wellness through personalized treatment plans.
          </p>

        
        </div>
      </div>


      {/*card 6 */}

        <div className="card medical-card" >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-IobqP9CxN4Y6O0dSq9pHuSdTDfe8CBfgNNuXNqlaqw&s=10"
          className="card-img-top"
          alt="Medical Service"
        />

        <div className="card-body">
          <h5 className="card-title">Otology</h5>

          <p className="card-text">
            Advanced otology services for healthy hearing, balance, and long-term ear wellness.
          </p>

        
        </div>
      </div>

      {/*card 7 */}

      <div className="card medical-card" >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaiP_sG32KUdbcBkBGWxdyJfXEi5xn19Rnshkq2GVmDw&s=10"
          className="card-img-top"
          alt="Medical Service"
        />

        <div className="card-body">
          <h5 className="card-title">Hematology</h5>

          <p className="card-text">
            Specialized care for blood disorders with accurate diagnosis and personalized treatment.
          </p>

        
        </div>
      </div>

      {/*card 8 */}

      <div className="card  medical-card" >
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXd-rsyr_tc1hpYvrZTR11oOmkfWGUREQov0_Eklrjrg&s=10"  className="card-img-top"
          alt="Medical Service"
        />

        <div className="card-body">
          <h5 className="card-title">Orthopedics
</h5>

          <p className="card-text">
            Restore mobility and improve quality of life with expert orthopedic consultation and treatment.
          </p>

    
        </div>
      </div>
      </div>
      </div>
    </>
  );
}

export default MedicalServices;