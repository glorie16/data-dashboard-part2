import { Component, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./components.css"


function PetDetails() {
     const { id } = useParams()
    const [fullDetails, setFullDetails] = useState(null)

    useEffect(() => {
        const fetchPetDetails = async () => {
            try {
                 const response = await fetch(`http://localhost:3001/api/pets/${id}`);
            
                if (!response.ok) {
                    throw new Error("Failed to fetch pet details.");
                }
                const data = await response.json();
                setFullDetails(data);
            }
            catch (error) {
                console.error(error);
            }
        }
    
        
        fetchPetDetails();
        
    }, [id]);

    
    if (!fullDetails) {
        return <p style={{ color: "black" }}>Loading...</p>
    }
    console.log(fullDetails?.description);
    const hasPhotos = fullDetails.photos && fullDetails.photos.length > 0;



    return (
        <div className="pet-detail-container">
            <h1>{fullDetails.name}</h1>

            {hasPhotos ? (
                <img className="images"
                    src={fullDetails.photos[0]?.medium}
                    alt={`Photo of ${fullDetails.name}`}
                />
            ) : (
                <p>No photo available.</p>
            )}

            <div>

                
            </div>
            <div className="descrip">
                <h4>Description <br/>(Read the full description by visiting the official pet profile!)</h4>
                {fullDetails.description || "No description available."}</div>
            <a href={fullDetails.url} target="_blank" rel="noopener noreferrer">
  View full pet profile
            </a>
            
            <p>Location: {" "}
                {fullDetails.contact?.city && fullDetails.contact?.state
                    ?
                    `{fullDetails.contact?.city}, {fullDetails.contact?.state}`
                    : "Check full pet profile"}
            </p>
           
           
            <p>Email: {" "}
                {fullDetails.contact?.email ? (
                    <a href={`mailto:${fullDetails.contact?.email}`}>{fullDetails.contact?.email}</a>
                ) : (
                    "Check full pet profile"
                )}
                    </p>
            <p>Phone: {fullDetails.contact?.phone || "Check full pet profile"}</p>
            

                <h3>About:</h3>
   
            
<table>
  <tbody>
    <tr>
      <th>Animal</th>
      <td>{fullDetails.type}</td>
    </tr>
    <tr>
      <th>Breed</th>
      <td>{fullDetails.breeds?.primary}</td>
    </tr>
    <tr>
      <th>Age</th>
      <td>{fullDetails.age}</td>
    </tr>
    <tr>
      <th>Gender</th>
      <td>{fullDetails.gender}</td>
    </tr>
    <tr>
      <th>Size</th>
      <td>{fullDetails.size}</td>
    </tr>
    <tr>
      <th>Spayed/Neutered</th>
      <td>{fullDetails.attributes?.spayed_neutered ? "Yes" : "No"}</td>
    </tr>
    <tr>
      <th>House-Trained</th>
      <td>{fullDetails.attributes?.house_trained ? "Yes" : "No"}</td>
    </tr>
    <tr>
      <th>Declawed</th>
      <td>{fullDetails.attributes?.declawed !== undefined ? (fullDetails.attributes.declawed ? "Yes" : "No") : "N/A"}</td>
    </tr>
    <tr>
      <th>Special Needs</th>
      <td>{fullDetails.attributes?.special_needs ? "Yes" : "No"}</td>
    </tr>
    <tr>
      <th>Personality Tags</th>
      <td>
        {fullDetails.tags?.length > 0 ? fullDetails.tags.join(", ") : "None"}
      </td>
    </tr>
  </tbody>
</table>
            
        </div>
    );
}

export default PetDetails