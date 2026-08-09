import React from "react";
import {FaFilePdf,FaImage,FaEye,FaDownload} from "react-icons/fa";
import "./DocumentCard.css";

function DocumentCard({document}){
return(
<div className="document-card">
    
<div className="document-icon">
{document.type==="image"?<FaImage/>:<FaFilePdf/>}
</div>
<div className="document-info">
<h4>{document.name}</h4>
<p>Uploaded by {document.uploadedBy}</p>
</div>
<div className="document-actions">
<button><FaEye/> View</button>
<button><FaDownload/> Download</button>
</div>
</div>
);
}

export default DocumentCard;