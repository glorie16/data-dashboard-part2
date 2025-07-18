import React from 'react'

function Summary({ pets }) {
const getMostCommonBreedWithType = (pets) => {
  if (!Array.isArray(pets) || pets.length === 0) return { breed: 'N/A', type: '' }

  const breedCounts = {}
  const breedToType = {}

  pets.forEach(pet => {
    const breed = pet.breeds?.primary
    const type = pet.type
    if (breed) {
      breedCounts[breed] = (breedCounts[breed] || 0) + 1
      // Only set type once per breed
      if (!breedToType[breed]) {
        breedToType[breed] = type
      }
    }
  })

  const mostCommon = Object.entries(breedCounts).sort((a, b) => b[1] - a[1])[0]
  const breed = mostCommon?.[0] || 'N/A'
    const type = breedToType[breed] || ''
    
    
  return { breed, type }
    }

      const getGenderSplit = (pets) => {
        const counts = {
            female: 0,
            male: 0,
            unknown: 0
        }

        pets.forEach(pet => {
            const gender = pet.gender?.toLowerCase()
            if (gender === 'male') {
                counts.male++;
            }
            else if (gender === "female") {
                counts.female++;
            }
            else {
                counts.unknown++;
            }
        })
         return counts;
    }

    const getAnimalType = (pets) => {
        const typeCounts = {}

        pets.forEach(pet => {
            const type = pet.type?.toLowerCase()
            if (type) {
                typeCounts[type] = (typeCounts[type] || 0) + 1
            }
        })
        return typeCounts;
    }
    
       const genderCounts = getGenderSplit(pets)
    const { breed, type } = getMostCommonBreedWithType(pets)
    const typeCounts = getAnimalType(pets)

        return(
        <div className="summary">
            <h2>Summary</h2>

            <div className="sum-container">
                    <p className="sum-card">Most Common Breed:<br />
                        {breed} ({type})</p>

                <div className="sum-card">
                        Gender<br />
                    <ul>
                        <li>Male: {genderCounts.male}</li>
                        <li>Female: {genderCounts.female} </li>
                        </ul>
                        </div>
                
                    <div className="sum-card">
                        <p>Animal Types:
                            
                            <ul>
                        {Object.entries(typeCounts).map(([type, count]) => (
                        <li key={type}>{type}: {count}</li>
                        ))}
                    </ul>
                    </p>
                    
                    </div>
                </div>

        </div>
    )
}

export default Summary