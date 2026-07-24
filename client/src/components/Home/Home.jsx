import Navbar from "./Navbar/Navbar";
import Hero from "./Hero";
import MedicalServices from "./MedicalServices/MedicalServices";
import Booking from "./Booking/Booking";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
import Footer from "../Footer/Footer";
import Service from "./Service/Service"
function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Service/>
      <MedicalServices/>
      <Booking/>
      <WhyChooseUs/>
      <Footer/>
    </>
  );
}

export default Home;