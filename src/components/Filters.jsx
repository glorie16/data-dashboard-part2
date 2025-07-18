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
            
            <button onClick={() => {
            setSearchInput('');
            setSelectedAge('');
            }}>
            Clear Filters
            </button>
            <div className="by-type">
                <h2>Filter By Pet Type</h2>
            
        <input
        type="text"
                placeholder="Search by pet type..."
        onChange={handleInputChange}
        value={searchInput}
                />
                </div>

            <div className="by-age">
            <h2>Age Range</h2>
            {ageGroups.map(age => (
                <label key={age}>
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
                </div>
        </div>
)

}


export default Filters;