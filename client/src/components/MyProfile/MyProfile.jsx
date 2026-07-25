import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { State, City } from "country-state-city";
import "./MyProfile.css";
import Navbar from "../Home/Navbar/Navbar";


function MyProfile() {


const [patient,setPatient] = useState({});

const [editMode,setEditMode] = useState(false);


const patientId = localStorage.getItem("patientId");



const states = State.getStatesOfCountry("IN");



useEffect(()=>{


const fetchProfile = async()=>{


try{


const res = await axios.get(

`http://localhost:5000/api/patients/${patientId}`

);


let data = res.data.patient;



// stateCode find karne ke liye

const selectedState = states.find(
(state)=>state.name === data.state
);



setPatient({

...data,

stateCode:selectedState?.isoCode || ""

});



localStorage.setItem(
"patientName",
data.name
);



}
catch(error){

console.log(error);

}


};


fetchProfile();


},[]);






const cities = patient.stateCode

?
City.getCitiesOfState(
"IN",
patient.stateCode
)

:

[];







const handleChange=(e)=>{


setPatient({

...patient,

[e.target.name]:e.target.value

});


};







const handleStateChange=(e)=>{


const selectedState = states.find(

(state)=>state.isoCode === e.target.value

);



setPatient({

...patient,

state:selectedState.name,

stateCode:selectedState.isoCode,

city:""

});


};







const handleSave = async()=>{


try{


const res = await axios.put(

`http://localhost:5000/api/patients/${patientId}`,

patient

);



setPatient(res.data.patient);


localStorage.setItem(

"patientName",

res.data.patient.name

);



window.dispatchEvent(

new Event("patientUpdated")

);



setEditMode(false);


toast.success(
"Profile Updated Successfully"
);



}

catch(error){


console.log(error);


toast.error(
"Update Failed"
);


}


};






return(

<>


<Navbar/>



<div className="profile-page">


<div className="profile-card">



<div className="profile-top">


<h2>
Welcome, {patient.name}
</h2>



{

editMode ?

<>

<button onClick={handleSave}>
Save
</button>


<button
onClick={()=>setEditMode(false)}
>
Cancel
</button>

</>


:

<button
onClick={()=>setEditMode(true)}
>
Edit
</button>


}



</div>





<div className="profile-user">


<div className="profile-avatar">
👤
</div>


<h3>
{patient.name}
</h3>


</div>







<div className="profile-form">





<div className="field">

<label>
Full Name
</label>

<input

name="name"

value={patient.name || ""}

onChange={handleChange}

readOnly={!editMode}

/>

</div>






<div className="field">

<label>
Email
</label>

<input

name="email"

value={patient.email || ""}

onChange={handleChange}

readOnly={!editMode}

/>

</div>






<div className="field">

<label>
Gender
</label>


<input

name="gender"

value={patient.gender || ""}

onChange={handleChange}

readOnly={!editMode}

/>

</div>






<div className="field">

<label>
Age
</label>


<input

type="number"

name="age"

value={patient.age || ""}

onChange={handleChange}

readOnly={!editMode}

/>

</div>






<div className="field">

<label>
Blood Group
</label>


<input

name="bloodGroup"

value={patient.bloodGroup || ""}

onChange={handleChange}

readOnly={!editMode}

/>

</div>






<div className="field">

<label>
Phone Number
</label>


<input

name="phoneNumber"

value={patient.phoneNumber || ""}

onChange={handleChange}

readOnly={!editMode}

/>

</div>







<div className="field">

<label>
Emergency Contact
</label>


<input

name="emergencyContact"

value={patient.emergencyContact || ""}

onChange={handleChange}

readOnly={!editMode}

/>

</div>








<div className="field">

<label>
State
</label>



{

editMode ?

<select

value={patient.stateCode || ""}

onChange={handleStateChange}

>


<option value="">
Select State
</option>



{

states.map((state)=>(


<option

key={state.isoCode}

value={state.isoCode}

>

{state.name}

</option>


))


}


</select>


:


<input

value={patient.state || ""}

readOnly

/>

}



</div>









<div className="field">

<label>
City
</label>


{


editMode ?

<select

name="city"

value={patient.city || ""}

onChange={handleChange}

>


<option>
Select City
</option>


{

cities.map((city)=>(

<option

key={city.name}

value={city.name}

>

{city.name}

</option>


))


}


</select>


:

<input

value={patient.city || ""}

readOnly

/>

}


</div>








<div className="field">

<label>
Address
</label>


<textarea

name="address"

value={patient.address || ""}

onChange={handleChange}

readOnly={!editMode}

/>


</div>








<div className="field">

<label>
PIN Code
</label>


<input

type="text"

name="pinCode"

value={patient.pinCode || ""}

onChange={handleChange}

maxLength="6"

readOnly={!editMode}

/>


</div>







</div>



</div>


</div>



</>

);


}


export default MyProfile;