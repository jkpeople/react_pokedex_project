import './App.css';
import { useEffect, useState} from "react";

function App() {
  const [refList, setRefList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [searchName, setSearchName] = useState("");

  async function fetchPokemon() {
    let res = await fetch("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json");
    let data = await res.json();
    console.log(data.pokemon)
    setRefList(data.pokemon)
    setDisplayList(data.pokemon)

  }

  function filterPokemon(val, type) {
    setSearchName(val);

    let filteredList = refList.filter((pokemon) => pokemon.name.toLowerCase().includes(val.toLowerCase()));
    setDisplayList(filteredList);
  }

  useEffect(() => {
    fetchPokemon()
  }, [])

  return (
    <div>
      <h1>Pokedex</h1>
      <form>
        <label htmlFor="searchName">Pokemon Search</label>
        <input
          type="text"
          name="searchName" 
          id="searchName" 
          value={searchName} 
          onChange={(e) => filterPokemon(e.target.value, "name")} 
        />
      </form>
      <div>
        {displayList.map((pokemon) => {
          return (
          <div key={pokemon.id}>
            <small>{pokemon.num}</small>
            <h3>{pokemon.name}</h3>
            <details>
              <summary>Types</summary>
              <ul>
                {pokemon.type.map(t => <li key={t}>{t}</li>)}
              </ul>
            </details>
            <details>
              <summary>Weaknesses</summary>
              <ul>
                {pokemon.weaknesses.map(w => <li key={w}>{w}</li>)}
              </ul>
            </details>

          </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;


// rendering any list is going to be mapping over an array and returning jsx per element in that array 
// when rendering list, top-most element must have a key value 