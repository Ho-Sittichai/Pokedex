import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styles from '../styles/Button.module.css';

export default function Home() {
  const [pokemonData, setPokemonData] = useState([]);
  const router = useRouter();
  const [view, setView] = useState('grid');
  const [displayLabel, setDisplayLabel] = useState('Products');
  const [searchNotFound, setSearchNotFound] = useState(false);

  const handleDetailClick = (pokemon) => {
    router.push({
      pathname: '/detail',
      query: { pokemon: JSON.stringify(pokemon), view }
    });
  };

  const fetchAllPokemonData = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
      const data = await response.json();
      const results = data.results;

      // Fetch details of each Pokemon
      const pokemonDetails = await Promise.all(
        results.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          return await pokemonResponse.json();
        })
      );

      return pokemonDetails;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonDetails = await fetchAllPokemonData();
        setPokemonData(pokemonDetails);
        setDisplayLabel(`Products (${pokemonDetails.length})`);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (router.query.view) {
      setView(router.query.view);
    }
  }, [router.query.view]);

  useEffect(() => {
    const searchQuery = router.query.search;

    const fetchData = async () => {
      try {
        const pokemonDetails = await fetchAllPokemonData();

        if (searchQuery && searchQuery !== '') {
          const searchTerm = searchQuery.toLowerCase();
          const filteredData = pokemonDetails.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchTerm)
          );

          if (filteredData.length === 0) {
            setSearchNotFound(true);
            setDisplayLabel(`Search Results (0 Product)`);
          } else {
            setSearchNotFound(false);
            setDisplayLabel(`Search Results (${filteredData.length} Product${filteredData.length !== 1 ? 's' : ''})`);
          }

          setPokemonData(filteredData);
        } else {
          setSearchNotFound(false);
          setDisplayLabel(`Products (${pokemonDetails.length})`);
          setPokemonData(pokemonDetails);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [router.query.search]);

  const handleViewChange = (newView) => {
    setView(newView);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, view: newView }
    });
  };

  return (
    <div className="w-full max-w-none px-[180px] py-10">
      <div className="flex flex-row justify-between items-center mb-10">
        <h1 className="text-xl font-bold place-content-center" style={{ color: '#373737' }}>{displayLabel}</h1>
        <div className="flex">
          <button
            className={`${view === 'grid' ? 'bg-yellow-400' : 'bg-gray-300'} p-2 rounded`}
            onClick={() => handleViewChange('grid')}
          >
            <img src="/icons/grid_filter.png" alt="Grid View" className="h-8" />
          </button>
          <button
            className={`${view === 'list' ? 'bg-yellow-400' : 'bg-gray-300'} p-2 rounded`}
            onClick={() => handleViewChange('list')}
          >
            <img src="/icons/list_filter.png" alt="List View" className="h-8" />
          </button>
        </div>
      </div>

      {searchNotFound ? (
        <div className="flex flex-col items-center pt-20 h-screen">
          <img src="icons/search_no.png" alt="Icon" className="mb-4 w-10 h-10" />
          <p className="text-lg text-[#909090] font-semibold text-center">
            Oops! Nothing was found for &quot;{router.query.search}&quot;
            <br />
            Please try to search for something else.
          </p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {pokemonData.map((pokemon, index) => (
            <div key={pokemon.id} className={`${index % 2 === 0 ? 'ml-0' : 'ml-5 md:ml-0'}`}>
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="shadow rounded-t-lg w-full h-auto"
              />
              <div className="p-2" style={{ backgroundColor: '#FAFAFA' }}>
                <h2 className="text-xl font-bold mb-2 capitalize" style={{ fontSize: '20px' }}>{pokemon.name}</h2>
                <div className="flex space-x-2">
                  {pokemon.types.map((type, index) => (
                    <div key={index} className="rounded-lg px-2 py-1 text-sm font-semibold capitalize" style={{ fontSize: '16px', backgroundColor: '#FFF4E3', color: '#FFAE33' }}>
                      {type.type.name}
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    className={`w-full rounded-md transition-colors duration-300 ease-in-out ${styles.button}`}
                    onClick={() => handleDetailClick(pokemon)}
                  >
                    Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {pokemonData.map((pokemon) => (
            <div key={pokemon.id} className="flex cursor-pointer items-center bg-white shadow rounded-lg p-4" onClick={() => handleDetailClick(pokemon)}>
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="w-20 h-20 object-contain rounded-md mr-4"
              />
              <div className="flex-grow">
                <h2 className="text-xl font-bold mb-1 capitalize" style={{ fontSize: '20px', color: '#373737' }}>{pokemon.name}</h2>
                <div className="flex space-x-2 mb-2">
                  {pokemon.types.map((type, index) => (
                    <div key={index} className="rounded-lg px-2 py-1 text-sm font-semibold capitalize" style={{ fontSize: '16px', backgroundColor: '#FFF4E3', color: '#FFAE33' }}>
                      {type.type.name}
                    </div>
                  ))}
                </div>
                <p className="text-gray-700 mb-4" style={{ fontSize: '16px', color: '#666666' }}>Abilities: {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
