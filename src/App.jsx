import { useEffect, useState } from 'react'
import PetList from './components/PetList'
import Summary from './components/Summary'
import './App.css'
import Filters from './components/Filters'
import Header from './components/Header'
import PetCharts from './components/PetCharts'

function App() {
  const [pets, setPets] = useState([])
  const [filteredResults, setFilteredResults] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [selectedAge, setSelectedAge]= useState("")

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/pets')
        const data = await response.json()
        setPets(data)
      }
      catch (error) {
        console.error('Error fetching pets:', error)
      
      }
    }
    fetchPets()
  }, [])

     console.log(`Fetched ${pets.length} pets from the server.`);
  pets.forEach(pet => console.log(pet.name))
  
  useEffect(() => {
  filterPets();
}, [searchInput, selectedAge, pets]);

  const filterPets = () => {
    let filtered = pets;
    if (searchInput.trim() !== "") {
    filtered = filtered.filter(pet =>
      pet.type?.toLowerCase().includes(searchInput.toLowerCase())
    );
  }

  if (selectedAge) {
    filtered = filtered.filter(pet =>
      pet.age?.toLowerCase() === selectedAge.toLowerCase()
    );
  }

  setFilteredResults(filtered);
};
  
  return (
    <div className="app-container">

      <div className="top-items">
        <Header className="header"/>
         <Filters className="filters"
        searchInput={searchInput}
        selectedAge={selectedAge}
        setSearchInput={setSearchInput}
        setSelectedAge={setSelectedAge}/>
     
      </div>
      <div className="body-container">
          
     
      <div className="main-items">  
      <PetList
        pets={filteredResults ||[]}
          ></PetList>
          
          <div className="last-column">
           <Summary
        pets={pets}>
        </Summary> 
            <PetCharts pets={pets} />
            </div>
       </div>
      </div>
      </div>
  )
}

export default App
