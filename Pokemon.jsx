import React, { useEffect, useState } from "react";
import "./index.css";
import PokemonCard from "./PokemonCard";

function Pokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=100";
  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        //  console.log(curPokemon.url);
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });
      console.log(detailedPokemonData);

      const detailedResponse = await Promise.all(detailedPokemonData);
      console.log(detailedResponse);
      setPokemon(detailedResponse);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

const searchData = pokemon.filter((curPokemon) => curPokemon.name.toLowerCase().includes(search.toLowerCase()) )



  if (loading) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  } else if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <section className="Container">
      <header>
        <h1>Catch Pokemon</h1>
      </header>
      <div className="pokemon-search">
        <input
          type="text"
          placeholder="Search Pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div>
        <ul className="cards">
          {searchData.map((curPokemon) => {
            return <PokemonCard key={curPokemon.id} pokemonData={curPokemon} />;
          })}
        </ul>
      </div>
    </section>
  );
}

export default Pokemon;