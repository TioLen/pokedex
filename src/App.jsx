import React, { useState, useEffect, useActionState } from 'react';
import Item from './components/Item';
import List from './components/List';

import styles from './App.module.css'; // Importe o CSS Module
import './index.css';

function App() {
  const [pokemons, setPokemons] = useState([]);          // estados dos pokemons
  const [isLoading, setIsLoading] = useState(false);  // estado de carregamento
  const [isError, setIsError] = useState(false);      // estado de erro

  // Efeito para buscar dados da API da PokéAPI
  useEffect(() => {
    setIsLoading(true); // carregando = true
    setIsError(false); // diz que por agora não há erro

    let rand = Math.floor(Math.random() * (1019 - 0 + 1)) + 0;
    // Chamada direta à PokéAPI para obter uma lista de Pokémons
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=40&offset=${rand}` )
      .then(response => response.json())
      .then(async result => {
        const pokemonList = result.results.map(pokemon => {
          const id = pokemon.url.split('/').slice(-2, -1)[0];
          
          // Torna a primeira letra maiúscula
          const capitalizedName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
          return {
            id: id,
            name: capitalizedName,
            // imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/showdown/${id}.gif`,
            url: pokemon.url
          };
        } );
        setPokemons(pokemonList);
        setIsLoading(false);
      })
      .catch(() => { // caso haja algum erro:
        setIsError(true);   // define o estado de erro
        setIsLoading(false); // finaliza o carregamento
      });
  }, []); // Array de dependências vazio para que o efeito seja executado apenas uma vez (ao montar o componente)

  // A lista filtrada agora será a lista completa de Pokémons, já que não há searchTerm para filtrar
  const displayedPokemons = pokemons;

  // renderizar elementos na tela
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Meus Pokémons</h1>

      <hr />

      {/* Se isError é true, renderizar logo em seguida o conteúdo após '&&' */}
      {isError && <p className={styles.errorMessage}>Algo deu errado ao carregar os Pokémons.</p>}

      {isLoading ?
        (<p className={styles.loadingMessage}>Carregando Pokémons...</p>) // se isLoading == true
        :
        (<List list={displayedPokemons} />)    // se isLoading == false
      }

      <hr />
      
      <button type="submit">Adicionar</button>
    </div>
  );
}

export default App;