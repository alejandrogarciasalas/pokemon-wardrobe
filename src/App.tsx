import { useState } from 'react';
import { availablePokemon } from './data/pokemon';
import { getItemsByCategory } from './data/clothing';
import type { Pokemon, ClothingItem, Outfit } from './types';
import './App.css';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>(availablePokemon[0]);
  const [outfit, setOutfit] = useState<Outfit>({
    hat: null,
    shirt: null,
    pants: null,
    accessory: null
  });

  const [currentIndices, setCurrentIndices] = useState({
    hat: 0,
    shirt: 0,
    pants: 0,
    accessory: 0
  });

  const categories = ['hat', 'shirt', 'pants', 'accessory'] as const;

  const handlePrevItem = (category: typeof categories[number]) => {
    const items = getItemsByCategory(category);
    const currentIndex = currentIndices[category];
    const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    
    setCurrentIndices({ ...currentIndices, [category]: newIndex });
    setOutfit({ ...outfit, [category]: items[newIndex].imageUrl ? items[newIndex] : null });
  };

  const handleNextItem = (category: typeof categories[number]) => {
    const items = getItemsByCategory(category);
    const currentIndex = currentIndices[category];
    const newIndex = (currentIndex + 1) % items.length;
    
    setCurrentIndices({ ...currentIndices, [category]: newIndex });
    setOutfit({ ...outfit, [category]: items[newIndex].imageUrl ? items[newIndex] : null });
  };

  const getCurrentItem = (category: typeof categories[number]): ClothingItem => {
    const items = getItemsByCategory(category);
    return items[currentIndices[category]];
  };

  const resetOutfit = () => {
    setOutfit({
      hat: null,
      shirt: null,
      pants: null,
      accessory: null
    });
    setCurrentIndices({
      hat: 0,
      shirt: 0,
      pants: 0,
      accessory: 0
    });
  };

  return (
    <div className="app">
      <header>
        <h1>🎮 POKÉMON WARDROBE</h1>
        <p>Dress up your Pokémon!</p>
      </header>

      <main>
        {/* Left: Pokemon selector */}
        <div className="pokemon-selector">
          <h3>Select Pokémon</h3>
          <div className="pokemon-grid">
            {availablePokemon.map((pokemon) => (
              <button
                key={pokemon.id}
                className={`pokemon-option ${selectedPokemon.id === pokemon.id ? 'selected' : ''}`}
                onClick={() => setSelectedPokemon(pokemon)}
              >
                <img src={pokemon.imageUrl} alt={pokemon.name} />
                <span>{pokemon.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Center: Pokemon with outfit */}
        <div className="pokemon-display">
          <div className="pokemon-canvas">
            <h2>{selectedPokemon.name}</h2>
            <div className="pokemon-wrapper">
              <img 
                src={selectedPokemon.imageUrl} 
                alt={selectedPokemon.name}
                className="pokemon-base"
              />
              {/* Clothing layers */}
              {outfit.shirt && (
                <img 
                  src={outfit.shirt.imageUrl} 
                  alt={outfit.shirt.name}
                  className="clothing-layer shirt"
                />
              )}
              {outfit.pants && (
                <img 
                  src={outfit.pants.imageUrl} 
                  alt={outfit.pants.name}
                  className="clothing-layer pants"
                />
              )}
              {outfit.hat && (
                <img 
                  src={outfit.hat.imageUrl} 
                  alt={outfit.hat.name}
                  className="clothing-layer hat"
                />
              )}
              {outfit.accessory && (
                <img 
                  src={outfit.accessory.imageUrl} 
                  alt={outfit.accessory.name}
                  className="clothing-layer accessory"
                />
              )}
            </div>
            <button className="reset-btn" onClick={resetOutfit}>
              Reset Outfit
            </button>
          </div>
        </div>

        {/* Right: Wardrobe */}
        <div className="wardrobe">
          <h2>👔 Wardrobe</h2>
          
          {categories.map((category) => {
            const currentItem = getCurrentItem(category);
            return (
              <div key={category} className="wardrobe-category">
                <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                <div className="item-selector">
                  <button 
                    className="arrow-btn"
                    onClick={() => handlePrevItem(category)}
                  >
                    ←
                  </button>
                  
                  <div className="item-display">
                    {currentItem.imageUrl ? (
                      <img 
                        src={currentItem.imageUrl} 
                        alt={currentItem.name}
                        className="item-preview"
                      />
                    ) : (
                      <div className="item-none">None</div>
                    )}
                    <p>{currentItem.name}</p>
                  </div>
                  
                  <button 
                    className="arrow-btn"
                    onClick={() => handleNextItem(category)}
                  >
                    →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
