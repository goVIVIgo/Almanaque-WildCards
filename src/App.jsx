import { useState, useEffect } from 'react'
import Card from './components/Card.jsx';
import CardDetail from './components/CardDetail.jsx';
import AddModal from './components/AddModal.jsx';

import AWclaro from './assets/AWclaro.png';
import AWescuro from './assets/AWescuro.png';

import { getTodasAsCartas } from './apiAlmanaqueWildcards.jsx';

function App() {
  const [cartas, setCartas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    const carregarCartas = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const cartasData = await getTodasAsCartas();
        setCartas(cartasData);

      } catch (err) {
        console.error("Erro ao carregar dados da API:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    carregarCartas();
  }, []);
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('themeMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-pink-100';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';

  if (isLoading) {
    return <div className={`min-h-screen p-8 ${bgColor} ${textColor}`}>Carregando dados da API...</div>;
  }

  if (error) {
    return <div className={`min-h-screen p-8 ${bgColor} text-red-500`}>Erro ao conectar com a API: {error}</div>;
  }

  return (
    <div className={`min-h-screen p-8 ${bgColor} ${textColor}`}> 

      <div className="mb-6 cursor-pointer text-center text-4xl font-bold">
        <img
          src={isDarkMode ? AWescuro : AWclaro}
          alt="Almanaque WildCards"
          className="mx-auto h-24 sm:h-28 md:h-32 lg:h-40 object-contain"
        />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cartas.map((carta) => ( 
          <Card 
            key={carta.cartaID}
            cardId={carta.cartaID}
            nome={carta.nomeCientifico}
            imagemSrc={carta.urlImagem}
            statsResumo={`tam: ${carta.tamanho || '?'} hp: ${carta.vida} atk: ${carta.ataque} def: ${carta.defesa}`}
            tags={[]}
          />
        ))}
      </div>

      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 rounded-full bg-gray-500 p-3 text-white shadow-lg hover:bg-gray-600"
        title={isDarkMode ? "Mudar para Tema Claro" : "Mudar para Tema Escuro"}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );
}

export default App;