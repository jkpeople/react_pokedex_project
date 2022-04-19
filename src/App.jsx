import './App.css';
import { useEffect, useState} from "react";
import { getKnownAttributes } from "./utils/pokemon"; 

function App() {
  const [refList, setRefList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [knownTypes, setKnownTypes] = useState([]);
  const [knownWeaknesses, setKnownWeaknesses] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);


  async function fetchPokemon() {
    let res = await fetch(
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
    );
    let data = await res.json();
    let { types, weaknesses } = getKnownAttributes(data.pokemon);
    setKnownTypes(types);
    setKnownWeaknesses(weaknesses);
    setRefList(data.pokemon);
    setDisplayList(data.pokemon);
  }

  function filterPokemon(val, type) {
    setSearchName(val);

    let filteredList = refList.filter((pokemon) => 
      pokemon.name.toLowerCase().includes(val.toLowerCase())
    );
    setDisplayList(filteredList);
  }

  function updateTypeFilter(e) {
    let tempTypeFilter = [...typeFilter];

    if (e.target.checked && !typeFilter.includes(e.target.value)) {
      tempTypeFilter.push(e.value.target);
      setTypeFilter(tempTypeFilter);
    } else {
      tempTypeFilter = tempTypeFilter.filter(type => type !== e.target.value);
      setTypeFilter(tempTypeFilter);
    }

    let filteredList = refList.filter((pokemon) => {
      for (let i = 0; i < pokemon.type.length; i++) {
        if (!tempTypeFilter.includes(pokemon.type[i])) {
          
        }
      }
    });

    setDisplayList(filteredList);
  }

  useEffect(() => {
    fetchPokemon();
  }, []);

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
          onChange={updateTypeFilter} 
        />
        <details>
          <summary>Pokemon Type</summary>
          {knownTypes.map((t) => {
            return (
              <div key={t}>
                <label htmlFor={`${t}Type`}>{t}</label>
                <input 
                  type="checkbox" 
                  name="searchType" 
                  id={`${t}Type`}
                  value={t}
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
            );
          })}
        </details>
        <details>
          <summary>Pokemon Weaknesses</summary>
          {knownWeaknesses.map((w) => {
            return (
              <div key={w}>
                <label htmlFor={`${w}Weakness`}>{w}</label>
                <input 
                  type="checkbox" 
                  name="searchType" 
                  id={`${w}Weakness`}
                  value={w}
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
            );
          })}
        </details>
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