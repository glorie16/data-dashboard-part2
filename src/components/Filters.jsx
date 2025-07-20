function Filters({ setSearchInput, setSelectedAge, searchInput, selectedAge }) {
    const ageGroups = ['Baby', 'Young', 'Adult', 'Senior']

    const handleInputChange = (e) => {
  setSearchInput(e.target.value)
    }
    
      const handleAgeChange = (e) => {
    setSelectedAge(e.target.value);
    };
    

    return (
        <div className="filters">
            <h5>Search by animal type</h5>
            <div className="by-type">
               
        <input
        type="text"
                    placeholder="eg., dog, cat, bird"
        onChange={handleInputChange}
        value={searchInput}
                />
                </div>

            <div className="by-age">
            <h5>Age Range</h5>
            {ageGroups.map(age => (
                <label className="rad-buttons"key={age}>
                    <input
                    type="radio"
                    name="age"
                        value={age}
                        checked={selectedAge === age}
                    onChange={handleAgeChange}
                    />
                    {age}
                </label>
            ))}
                
                 <button className="submit"onClick={() => {
            setSearchInput('');
            setSelectedAge('');
            }}>
            Clear Filters
            </button>
                </div>
        </div>
)

}


export default Filters;