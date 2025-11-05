import { useState, useEffect } from 'react';
import Card from './components/Card.jsx';
import CardDetail from './components/CardDetail.jsx';
import AddModal from './components/AddModal.jsx';

import AWclaro from './assets/AWclaro.png';
import AWescuro from './assets/AWescuro.png';

import {
  getTodasAsCartas,
  getTodosOsAnimais,
  criarCarta,
  criarAnimal,
  criarImagem,
  deletarCarta,
  uploadImagem
} from './apiAlmanaqueWildcards.jsx';
const getFromStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const senhaGamedev = '250618';

function App() {

  const [cartas, setCartas] = useState([]);
  const [animais, setAnimais] = useState([]);

  const [acoes, setAcoes] = useState(() => getFromStorage('acoes'));
  const [atributos, setAtributos] = useState(() => getFromStorage('atributos'));

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [cartaSelecionada, setCartaSelecionada] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [titleClickCount, setTitleClickCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [cartasData, animaisData] = await Promise.all([
          getTodasAsCartas(),
          getTodosOsAnimais()
        ]);
        setCartas(cartasData);
        setAnimais(animaisData);
      } catch (err) {
        console.error("Erro ao carregar dados da API:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    carregarDados();
  }, []);
  const handleCardClick = (carta) => setCartaSelecionada(carta);
  const handleCloseModal = () => setCartaSelecionada(null);
  
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('themeMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  const handleTitleClick = () => {
    const newClickCount = titleClickCount + 1;
    setTitleClickCount(newClickCount);
    if (newClickCount === 3) {
      const enteredPassword = window.prompt("dica: meu, seu, nosso aniversario!");
      if (enteredPassword === senhaGamedev) {
        setIsAdminMode(true);
        alert('Modo Admin ativado!');
      } else if (enteredPassword !== null) {
        alert('Senha incorreta.');
      }
      setTitleClickCount(0);
    }
  };


  const handleSaveCarta = async (dataFromModal) => {
    try {
      const { habilidade, vida, tamanho, ataque, defesa, custo, animalId } = dataFromModal;
      const novaCartaData = {
        habilidade: habilidade || null,
        vida: Number(vida),
        tamanho: tamanho ? Number(tamanho) : null,
        ataque: Number(ataque),
        defesa: Number(defesa),
        custo: Number(custo),
        animalID: Number(animalId)
      };
      await criarCarta(novaCartaData);
      const cartasAtualizadas = await getTodasAsCartas();
      setCartas(cartasAtualizadas);
      setIsAddModalOpen(false);
      alert('Carta criada com sucesso!');
    } catch (err) {
      console.error("Erro ao salvar carta:", err);
      alert(`Erro ao salvar carta: ${err.message}`);
    }
  };

  const handleSaveAnimal = async (novoAnimal) => {
    try {
      const { nomeCientifico, descricaoAnimal, imagemFile } = novoAnimal;
      if (!imagemFile || !nomeCientifico) {
        alert('Nome Científico e um Arquivo de Imagem são obrigatórios.');
        return;
      }
      const uploadResult = await uploadImagem(imagemFile);
      const imageUrl = uploadResult.url;
      const imagemSalva = await criarImagem(imageUrl);
      const animalData = { nomeCientifico, descricaoAnimal, imagemID: imagemSalva.imagemID };
      await criarAnimal(animalData);
      const animaisAtualizados = await getTodosOsAnimais();
      setAnimais(animaisAtualizados);
      alert('Animal e Imagem criados com sucesso!');
    } catch (err) {
      console.error("Erro ao salvar animal:", err);
      alert(`Erro ao salvar animal: ${err.message}`);
    }
  };

  const handleDeleteCarta = async (idToDelete) => {
    if (!window.confirm('Tem certeza que deseja excluir esta carta?')) {
      return;
    }
    try {
      await deletarCarta(idToDelete);
      setCartas(prevCartas => prevCartas.filter(carta => carta.cartaID !== idToDelete));
      if (cartaSelecionada?.cartaID === idToDelete) {
        setCartaSelecionada(null);
      }
      alert('Carta deletada.');
    } catch (err) {
      console.error("Erro ao deletar carta:", err);
      alert(`Erro ao deletar carta: ${err.message}`);
    }
  };

  const handleSaveAcao = (novaAcao) => {
    const acaoComId = { ...novaAcao, id: Date.now() };
    setAcoes(prevAcoes => {
      const novasAcoes = [...prevAcoes, acaoComId];
      saveToStorage('acoes', novasAcoes);
      return novasAcoes;
    });
  };
  
  const handleSaveAtributo = (novoAtributo) => {
    const atributoComId = { ...novoAtributo, id: Date.now() };
    setAtributos(prevAtributos => {
      const novosAtributos = [...prevAtributos, atributoComId];
      saveToStorage('atributos', novosAtributos);
      return novosAtributos;
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
      <div
        className="mb-6 cursor-pointer text-center text-4xl font-bold"
        onClick={handleTitleClick}
        title="dica: meu, seu, nosso aniversario!"
      >
        <img
          src={isDarkMode ? AWescuro : AWclaro}
          alt="Almanaque WildCards"
          className="mx-auto h-24 sm:h-28 md:h-32 lg:h-40 object-contain"
        />
        {isAdminMode && <p className={`mt-2 text-xl font-bold ${textColor}`}>(modo: admin)</p>}
      </div>

      {isAdminMode && (
        <div className="col-span-full mt-6 mb-8 text-center">
          <button onClick={() => setIsAddModalOpen(true)}
            className="rounded bg-pink-300 px-4 py-2 font-bold text-white hover:bg-pink-400 ">
            Adicionar Nova Entidade
          </button>
        </div>
      )}

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cartas.map((carta) => ( 
          <Card 
            key={carta.cartaID}
            cardId={carta.cartaID}
            nome={carta.nomeCientifico}
            imagemSrc={carta.urlImagem}
            statsResumo={`tam: ${carta.tamanho || '?'} hp: ${carta.vida} atk: ${carta.ataque} def: ${carta.defesa}`}
            tags={[]}
            onClick={() => handleCardClick(carta)}
            isAdmin={isAdminMode}
            onDelete={handleDeleteCarta}
          />
        ))}
      </div>

      {cartaSelecionada && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={handleCloseModal}
        >
          <div onClick={(e) => e.stopPropagation()}> 
            <CardDetail 
              carta={cartaSelecionada} 
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}

      <AddModal
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        
        onSaveCarta={handleSaveCarta}
        onSaveAnimal={handleSaveAnimal}
        onSaveAcao={handleSaveAcao}
        onSaveAtributo={handleSaveAtributo}

        animaisDisponiveis={animais}
        acoesDisponiveis={acoes}
        atributosDisponiveis={atributos}
        cartasExistentes={cartas}
      />

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