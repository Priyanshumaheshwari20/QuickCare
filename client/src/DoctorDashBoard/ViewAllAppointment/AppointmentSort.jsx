import React from "react";
import { FaSortAmountDown } from "react-icons/fa";

import "./AppointmentSort.css";


function AppointmentSort({
    sortType,
    setSortType
}) {

    return (

        <div className="appointment-sort">

            <FaSortAmountDown />


        <select
 value={sortType}
 onChange={(e)=>setSortType(e.target.value)}
>
<option value="latest">Latest Appointment</option>
<option value="oldest">Oldest Appointment</option>
<option value="az">Patient Name A-Z</option>
<option value="za">Patient Name Z-A</option>
</select>


        </div>

    );
}


export default AppointmentSort;