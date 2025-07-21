import { Link } from "react-router-dom"
import "./components.css"

function PetList({ pets }) {
    console.log('Rendering PetList with pets:', pets.map(p => `${p.id} - ${p.name}`))
  if (!pets.length) {
    return <p>No pets found.</p>
    }
    
    if (pets.length === 0) {
  return <p>No pets match your search.</p>
}

  return (
    <ul className="pet-list">
      {pets.map((pet) => (
        <Link key={pet.id} to={`/pets/${pet.id}`}>
        <li className="pet-card">
          <h2>{pet.name}</h2>
          {pet.photos[0] && (
            <img className="main-photo"
              src={pet.photos[0].medium}
              alt={pet.name}
            />
          )}
              <p>{pet.breeds.primary} | {pet.type}</p>
              <p> {pet.gender} | {pet.age}</p>
          </li>
          </Link>
      ))}
          
    </ul>
  )
}

export default PetList;