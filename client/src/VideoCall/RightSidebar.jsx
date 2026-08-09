import React, { useState } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

import DocumentsTab from "./DocumentsTab";
import ChatTab from "./ChatTab";

import "./RightSidebar.css";

function RightSidebar({ appointmentId }) {

    const [activeTab, setActiveTab] = useState("documents");

    return (

        <div className="right-sidebar">

            <div className="sidebar-header">

                <button
                    className={
                        activeTab === "documents"
                            ? "qc-sidebar-tab qc-active"
                            : "qc-sidebar-tab"
                    }
                    onClick={() => setActiveTab("documents")}
                >
                    <FaRegFileAlt />
                    <span>Documents</span>
                </button>

                <button
                    className={
                        activeTab === "chat"
                            ? "qc-sidebar-tab qc-active"
                            : "qc-sidebar-tab"
                    }
                    onClick={() => setActiveTab("chat")}
                >
                    <HiOutlineChatBubbleLeftRight />
                    <span>Chat</span>
                </button>

            </div>

            <div className="sidebar-body">

                {
                    activeTab === "documents"
                        ? (
                            <DocumentsTab
                                appointmentId={appointmentId}
                            />
                        )
                        : (
                            <ChatTab />
                        )
                }

            </div>

        </div>

    );
}

export default RightSidebar;