import { useEffect, useState } from 'react'
import { getAreaData } from './api'

import './App.css'

function App() {

  const [areas, setAreas] = useState([]);
  const [newOutcode, setNewOutcode] = useState('');
  const [submitOutcode, setSubmitOutcode] = useState('');
  const [error, setError] = useState(false);

  const load = async () => {
    try {
      const areaData = await getAreaData(submitOutcode)
  
      setAreas(areaData);
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const regex = new RegExp('(^[A-Z]{1,2}[0-9]{1,2}$)');

    if(regex.test(newOutcode)) {
      setError(false)
      setSubmitOutcode(newOutcode)
    } else {
      setError(true)
    }
  
  try {
    await getAreaData(submitOutcode)
  } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    load();
  }, [submitOutcode]);

  return (
    <div className="App">
      <h1>Postcoders</h1>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder='Outcode to search...'
          value={newOutcode}
          onChange={(e) => {
            setNewOutcode(e.target.value.toUpperCase())
          }}        />
        <input type="submit" value="Submit"></input>
      </form>
      {error ? <p>Invalid outcode format.</p> : null}
      {areas.length ? <h2>{`Areas for ${submitOutcode}: ${areas.length}`}</h2> : null}
    </div>
  )
}

export default App
