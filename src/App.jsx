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
      imagemSrc: animal?.imagemSrc || animais.find(a => a.id === animalId)?.imagemSrc,
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

  /* BOTÃO DE REGRASSSSSSSSSSSSSSS */

  const [showRules, setShowRules] = useState(false);

  const [regras, setRegras] = useState([
    {
      id: 1,
      titulo: 'Introdução',
      texto: `Wildcards é um jogo de combate de criaturas e colecionamento de cartas onde seu deck é repleto de cartas inspiradas em animais na vida real. Cada jogador começa a partida puxando 5 cartas aleatoriamente do seu baralho e realizando várias ações ao longo de múltiplos turnos alternantes até que somente um seja vitorioso.`
    },
    {
      id: 2,
      titulo: 'Condição de vitória',
      texto: `O primeiro jogador a atingir 40 pontos vence. Pontos são consumidos para gerar criaturas e utilizar algumas ações, mas no geral devem ser pensados como um investimento: você gasta pontos para ganhar pontos.`
    },
    {
      id: 3,
      titulo: 'Regras do baralho',
      texto: `Cada jogador tem que iniciar o jogo com um baralho de no mínimo 20 cartas, sem criaturas repetidas. Assim que o jogo inicia, cada jogador compra 5, e a partir daí, cada compra de carta custa uma ação ou foi consequência de alguma outra mecânica.`
    },
    {
      id: 4,
      titulo: 'Regras de campo',
      texto: `Cada jogador tem seu campo, espelhado com o do time inimigo. Cada campo contém uma linha de frente e uma retaguarda, onde na linha de frente, suas criaturas podem entrar em combate com criaturas inimigas, ou, caso incontestadas, podem ganhar pontos passivamente ao segurar território, ou escolher encurralar uma criatura da retaguarda inimiga, trazendo-a para o combate.`
    },
    {
      id: 5,
      titulo: 'Regras de mão',
      texto: `Cada jogador tem suas cartas em mão, que estrategicamente devem ser mantidas ocultas de seu oponente. Para jogar uma carta no baralho, você pode consumir pontos equivalente ao valor da carta para gerá-la em sua retaguarda, ou pode deixar a carta no preparo, onde seu custo diminuirá em 1 a cada turno até que a carta seja automaticamente gerada.`
    },
    {
      id: 6,
      titulo: 'Regras de preparo',
      texto: `Inicialmente cada jogador só pode deixar uma carta passivamente preparando por vez. Em seu turno, você pode escolher consumir ações para acelerar o preparo, ou "nutrir" sua carta, onde cada ação consumida reduz seu custo em 1.`
    },
    {
      id: 7,
      titulo: 'O que é uma ação?',
      texto: `Ações são todas as maneiras que o jogador vai interagir com o jogo. Puxar uma carta é uma ação, como é jogar uma criatura ou utilizar alguma de suas ações. No início de cada um dos seus turnos o jogador ganha direito a 2 ações, com ações inutilizadas podendo ser acumuladas entre diferentes turnos. Diferentes ações custam diferentes valores, com algumas sendo grátis (não consumindo de suas ações acumuladas) e outras necessitando de mais de uma ação pra realizar. Algumas das ações que o jogador sempre vai ter disponível são:`,
      bullets: [
        'comprar uma carta (1 ação);',
        'descartar da mão (grátis);',
        'jogar uma carta (1 ação).'
      ]
    },
    {
      id: 8,
      titulo: 'O que é uma carta?',
      texto: `Cada carta é um conjunto de diferentes características e informações de uma criatura inspirada em um animal real e seu papel na natureza. Nela, tem todos os atributos e habilidades que ditam como a criatura se comportará em meio ao jogo, com quase todas elas tendo acesso a um variado punhado de ações que o jogador pode escolher realizar. 4 desses atributos existirão não importa qual criatura seja escolhida, sendo eles Vida, Tamanho, Defesa e Ataque, com a vida determinando quanto dano a criatura consegue resistir antes de morrer, a defesa reduzindo o dano que ela toma, o ataque sendo o valor usado no cálculo de dano na maioria das ações e o tamanho alterando como interações entre duas criaturas são calculadas.`
    }
  ]);


  const openRules = () => setShowRules(true);
  const closeRules = () => setShowRules(false);

  /* BOTÃO DE REGRAS ACABA AQUI*/

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

      {/* Botão de Regras*/}
      {!showRules && (
        <button
          onClick={openRules}
          className="fixed top-4 left-4 z-50 rounded-full bg-pink-400 p-3 text-white shadow-lg hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          title="Regras do Jogo"
        >REGRAS
        </button>
      )}

      {/* Painel de Regras */}
      {showRules && (
        <div
          className="absolute left-0 top-0 h-full w-full max-w-2xl md:max-w-3xl lg:max-w-4xl bg-white dark:bg-zinc-900 shadow-xl p-6 md:p-8 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold">Regras do Almanaque WildCards</h2>
            <button
              onClick={closeRules}
              className="px-3 py-1.5 rounded bg-pink-300 dark:bg-zinc-800 hover:bg-pink-400 dark:hover:bg-zinc-700"
            >
              Fechar
            </button>
          </div>

          <div className="space-y-6">
            {regras.map((r) => (
              <section key={r.id} className="space-y-2">
                <h3 className="text-lg md:text-xl font-medium">{r.titulo}</h3>
                <p className="text-base leading-relaxed text-zinc-800 dark:text-zinc-200 whitespace-pre-line">
                  {r.texto}
                </p>
                {r.bullets && r.bullets.length > 0 && (
                  <ul className="list-disc pl-6 space-y-1 text-base leading-relaxed text-zinc-800 dark:text-zinc-200">
                    {r.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>


      )}
    </div>
  );
}

export default App;