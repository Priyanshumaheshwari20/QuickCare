import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import socket from "../Socket/socket";
import { FaUpload } from "react-icons/fa";
import "./DocumentsTab.css";

function DocumentsTab({ appointmentId }) {

    const [documents, setDocuments] = useState([]);

    const fileInputRef = useRef(null);

    const role = localStorage.getItem("role");

    const loadDocuments = async () => {

        try {

            const res = await axios.get(
                `https://quickcare-3.onrender.com/api/documents/${appointmentId}`
            );

            setDocuments(res.data.documents);

        } catch (error) {

            console.log(error);

        }

    };

    // Initial Load
    useEffect(() => {

        if (appointmentId) {

            loadDocuments();

        }

    }, [appointmentId]);

    // Live Update
    useEffect(() => {

        const handleDocumentUploaded = ({ appointmentId: id }) => {

            if (id === appointmentId) {

                loadDocuments();

            }

        };

        socket.on(
            "document-uploaded",
            handleDocumentUploaded
        );

        return () => {

            socket.off(
                "document-uploaded",
                handleDocumentUploaded
            );

        };

    }, [appointmentId]);

    const handleUpload = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const formData = new FormData();

        formData.append("pdf", file);

        formData.append("appointmentId", appointmentId);

        try {

            await axios.post(

                "https://quickcare-3.onrender.com/api/documents/upload",

                formData,

                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }

            );

            loadDocuments();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="documents-container">

            <div className="documents-title">

                <div>

                    <h3>Shared Documents</h3>

                    <p>Files shared during consultation</p>

                </div>

            </div>

            <div className="documents-list">

                {

                    documents.length === 0 ?

                        <div className="documents-empty">

                            <p>No documents shared yet</p>

                            <span>
                                Upload PDF during consultation
                            </span>

                        </div>

                        :

                        documents.map((doc) => (

                            <div
                                key={doc._id}
                                className="document-card"
                            >

                                <div>

                                    <h4>{doc.fileName}</h4>

                                </div>

                                <div className="document-actions">

                                    <a
                                        href={`https://quickcare-3.onrender.com/uploads/${doc.fileName}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        View
                                    </a>

                                    <a
                                        href={`https://quickcare-3.onrender.com/uploads/${doc.fileName}`}
                                        download
                                    >
                                        Download
                                    </a>

                                </div>

                            </div>

                        ))

                }

            </div>

            {

                role === "doctor" &&

                <>

                    <input

                        type="file"

                        accept="application/pdf"

                        ref={fileInputRef}

                        style={{ display: "none" }}

                        onChange={handleUpload}

                    />

                    <button

                        className="upload-document-btn"

                        onClick={() =>
                            fileInputRef.current.click()
                        }

                    >

                        <FaUpload />

                        <span>Upload Document</span>

                    </button>

                </>

            }

        </div>

    );

}

export default DocumentsTab;