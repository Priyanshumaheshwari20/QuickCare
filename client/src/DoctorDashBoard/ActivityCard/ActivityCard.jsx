import React from "react";
import "./ActivityCard.css";

import { 
    FaCalendarCheck,
    FaVideo,
    FaFileMedical,
    FaUserPlus
} from "react-icons/fa";


function ActivityCard() {


    const activities = [

        {
            icon:<FaCalendarCheck />,
            title:"New Appointment Booked",
            desc:"Patient Rahul booked an appointment",
            time:"10 minutes ago",
            type:"appointment"
        },


        {
            icon:<FaVideo />,
            title:"Video Consultation Completed",
            desc:"Consultation with Ankit Sharma finished",
            time:"30 minutes ago",
            type:"video"
        },


        {
            icon:<FaFileMedical />,
            title:"Medical Report Uploaded",
            desc:"Patient uploaded a new report",
            time:"1 hour ago",
            type:"report"
        },


        {
            icon:<FaUserPlus />,
            title:"New Patient Registered",
            desc:"A new patient joined platform",
            time:"2 hours ago",
            type:"patient"
        }

    ];



    return (

        <div className="activity-card">


            <div className="activity-header">

                <h3>
                    Recent Activities
                </h3>


                <button>
                    View All
                </button>

            </div>



            <div className="activity-list">


                {
                    activities.map((item,index)=>(


                        <div 
                        className="activity-item"
                        key={index}
                        >


                            <div 
                            className={`activity-icon ${item.type}`}
                            >

                                {item.icon}

                            </div>



                            <div className="activity-content">


                                <h4>
                                    {item.title}
                                </h4>


                                <p>
                                    {item.desc}
                                </p>


                                <span>
                                    {item.time}
                                </span>


                            </div>


                        </div>


                    ))
                }


            </div>


        </div>

    )
}


export default ActivityCard;