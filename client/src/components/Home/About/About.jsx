import "./About.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../../Footer/Footer"
function About() {
  return (
    <>
    <Navbar/>
    <div className="about">

      {/* Hero Section */}

      <section className="hero">

        <div className="hero-left">

          <span className="tag">
            💙 Smart Healthcare Platform
          </span>

          <h1>
            Healthcare <br />
            Made <span>Simple.</span>
          </h1>

          <p>
            QuickCare connects patients with experienced doctors through
            secure online appointments and video consultations.
            Quality healthcare should be accessible anytime,
            anywhere.
          </p>

       

        </div>

        <div className="hero-right">

          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700"
            alt="doctor"
          />

          <div className="floating card1">
            ❤️ 5000+ Happy Patients
          </div>

          <div className="floating card2">
            👨‍⚕️ 100+ Doctors
          </div>

          <div className="floating card3">
            📹 Video Consultation
          </div>

        </div>

      </section>



{/* ================= WHO WE ARE ================= */}

<section className="who">

  <div className="who-image">

    <img
      src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=700"
      alt="Medical Team"
    />

  </div>

  <div className="who-content">

    <span className="small-title">
      ABOUT QUICKCARE
    </span>

    <h2>
      Healthcare That Fits <br /> Your Lifestyle
    </h2>

    <p>
      At QuickCare, we believe healthcare should be simple, fast, and
      accessible. Whether you need an online consultation or want to
      book an appointment with an experienced doctor, everything is
      available in one secure platform.
    </p>

    <p>
      Our mission is to bridge the gap between patients and healthcare
      professionals using modern technology and a user-friendly
      experience.
    </p>

    <div className="about-boxes">

      <div className="box">
        <h3>100+</h3>
        <span>Doctors</span>
      </div>

      <div className="box">
        <h3>5000+</h3>
        <span>Patients</span>
      </div>

      <div className="box">
        <h3>99%</h3>
        <span>Success</span>
      </div>

    </div>

  </div>

</section>



{/* ================= QUICKCARE PROMISE ================= */}

<section className="promise">

    <div className="promise-heading">

        <span>OUR PROMISE</span>

        <h2>More Than Healthcare, We Deliver Trust.</h2>

        <p>
            Every interaction on QuickCare is built around trust, care,
            security, and speed because your health deserves nothing less.
        </p>

    </div>

    <div className="promise-container">

        <div className="promise-card">
            <div className="promise-icon">💙</div>
            <h3>We Care</h3>
            <p>
                Every patient receives personalized attention and a seamless healthcare experience.
            </p>
        </div>

        <div className="promise-card">
            <div className="promise-icon">🛡️</div>
            <h3>We Protect</h3>
            <p>
                Your personal information and medical records remain private and secure.
            </p>
        </div>

        <div className="promise-card">
            <div className="promise-icon">⚡</div>
            <h3>We Respond</h3>
            <p>
                Fast appointment booking and quick communication whenever you need us.
            </p>
        </div>

        <div className="promise-card">
            <div className="promise-icon">🤝</div>
            <h3>We Support</h3>
            <p>
                From booking to consultation, we're here to make healthcare simple.
            </p>
        </div>

    </div>

</section>



{/* ================= QUICKCARE ECOSYSTEM ================= */}

<section className="ecosystem">

    <div className="eco-heading">
        <span>OUR ECOSYSTEM</span>
        <h2>Everything Revolves Around Your Health</h2>
        <p>
            QuickCare brings every healthcare service together in one seamless experience.
        </p>
    </div>

    <div className="eco-circle">

        <div className="center-circle">
            <h2>QuickCare</h2>
            <p>Your Health Hub</p>
        </div>

        <div className="bubble top">👨‍⚕️ Doctor</div>
        <div className="bubble right">📹 Video Call</div>
        <div className="bubble bottom">💊 Prescription</div>
        <div className="bubble left">📅 Appointment</div>

        <div className="bubble top-left">❤️ Care</div>
        <div className="bubble top-right">🔒 Security</div>
        <div className="bubble bottom-left">📄 Records</div>
        <div className="bubble bottom-right">⭐ Support</div>

    </div>

</section>
    </div>

    <Footer/>

    </>
  );
}

export default About;