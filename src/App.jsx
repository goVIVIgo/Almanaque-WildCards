import { useState } from 'react'
import Card from './components/Card.jsx';
import CardDetail from './components/CardDetail.jsx';
import AddModal from './components/AddModal.jsx';

import AWclaro from './assets/AWclaro.png';
import AWescuro from './assets/AWescuro.png';

import orcaImg from './assets/orca.png';
import bullfrogImg from './assets/bullfrog.png';
import lyrebirdImg from './assets/lyrebird.png';
import antImg from './assets/ant-export.png';
import cheerleaderCrabImg from './assets/cheerleader_crab.png';
import chrysalisImg from './assets/chrysalis.png';
import coneSnailImg from './assets/cone_snail.png';
import decoratorCrabImg from './assets/decorator_crab.png';
import earthwormImg from './assets/earthworm.png';
import falseEyedFrogImg from './assets/false_eyed_frog.png';
import fireglyImg from './assets/firefly.png';
import giantSnailImg from './assets/giant_snail.png';
import googlyImg from './assets/googly.png';
import nautilusImg from './assets/nautilus.png';
import pearlOysterImg from './assets/pearl_oyster.png';
import penguinImg from './assets/penguin.png';
import shrimpImg from './assets/shrimp-export.png';
import silverfishImg from './assets/silverfish.png';


const getFromStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};


const senhaGamedev = '250618';

function App() {

  const [cartas, setCartas] = useState(() => {
    
  });

  const [animais, setAnimais] = useState(() => {
    const saved = getFromStorage('animais');
    if (saved.length > 0) return saved;

  });

  const [acoes, setAcoes] = useState(() => {
    const saved = getFromStorage('acoes');
    if (saved.length > 0) return saved;

  });

  const [atributos, setAtributos] = useState(() => {
    const saved = getFromStorage('atributos');
    if (saved.length > 0) return saved;

  });


  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [cartaSelecionada, setCartaSelecionada] = useState(null);

  const handleCardClick = (carta) => {
    setCartaSelecionada(carta);
  };

  const handleCloseModal = () => {
    setCartaSelecionada(null);
  };

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [titleClickCount, setTitleClickCount] = useState(0);

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

  const handleSaveAnimal = (novoAnimal) => {
    const animalComId = { ...novoAnimal, id: Date.now() };
    setAnimais(prevAnimais => {
      const novosAnimais = [...prevAnimais, animalComId];
      saveToStorage('animais', novosAnimais);
      return novosAnimais;
    });
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

  const handleSaveCarta = (dataFromModal) => {
    const { habilidade, vida, tamanho, ataque, defesa, custo, animalId, nomeAnimalSelecionado, acoesIds, atributosIds } = dataFromModal;

    const animal = animais.find(a => a.nome === nomeAnimalSelecionado); 
    if (!animal) {

      const animalById = animais.find(a => a.id === animalId);
      if (!animalById) {
        alert("Erro crítico: Animal não encontrado nem pelo nome nem pelo ID!");
        return;
      }

      console.warn("Animal encontrado pelo ID, mas não pelo nome. Verifique consistência.");

    }

    const animalJaExiste = cartas.some(carta => carta.nome === nomeAnimalSelecionado); 
    if (animalJaExiste) {
      alert("Erro: Já existe uma carta para este animal (Nome: " + nomeAnimalSelecionado + ")!");
      return;
    }

    const acoesObjs = acoesIds.map(id => acoes.find(a => a.id === id)).filter(Boolean);
    const atributosObjs = atributosIds.map(id => atributos.find(a => a.id === id)).filter(Boolean);

    const novaCarta = {
      id: Date.now(),
      animalId: animalId,
      nome: nomeAnimalSelecionado || animal?.nome || `Animal ID ${animalId}`,
      numero: `#${String(Date.now()).slice(-4)}`,
      imagemSrc: animal?.imagemSrc || animais.find(a=>a.id === animalId)?.imagemSrc,
      statsResumo: `tam: ${tamanho} hp: ${vida} atk: ${ataque} def: ${defesa}`,
      statsDetalhe: {
        hp: String(vida),
        tamanho: String(tamanho),
        defesa: String(defesa),
        ataque: String(ataque)
      },
      descricao: habilidade,
      acoes: acoesObjs,
      atributos: atributosObjs,
      tags: [
        ...atributosObjs.map(a => ({ nome: a.nome, tipo: 'ciano' })),
        ...acoesObjs.map(a => ({ nome: a.nome, tipo: 'amarelo' }))
      ]
    };

    setCartas(prevCartas => {
      const novasCartas = [...prevCartas, novaCarta];
      saveToStorage('cartas', novasCartas);
      return novasCartas;
    });

    setIsAddModalOpen(false);
  };
  
  const handleDeleteCarta = (idToDelete) => {
    setCartas(prevCartas => {
      const novasCartas = prevCartas.filter(carta => carta.id !== idToDelete);
      saveToStorage('cartas', novasCartas);
      console.log("Carta excluída:", idToDelete);
      return novasCartas;
    });

    if (cartaSelecionada?.id === idToDelete) {
        setCartaSelecionada(null);
    }
  };

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('themeMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  const bgColor = isDarkMode ? ' hover:bg-gray-700' : 'bg-pink-100';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';

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
              Adicionar Nova Carta
            </button>
          </div>
        )}

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* {cartas.map((carta) => ( 
          <Card 
            key={carta.id} 
            cardId={carta.id}
            nome={carta.nome}
            imagemSrc={carta.imagemSrc}
            statsResumo={carta.statsResumo}
            tags={carta.tags}
            onClick={() => handleCardClick(carta)}
            isAdmin={isAdminMode}
            onDelete={handleDeleteCarta}
          />
        ))} */}
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
        className="fixed top-4 right-4 z-50 rounded-full bg-gray-500 p-3 text-white shadow-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
        title={isDarkMode ? "Mudar para Tema Claro" : "Mudar para Tema Escuro"}
      >
        {/* OLOCA ICON DO PEDRO AQU */}
        {isDarkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );
}

export default App;