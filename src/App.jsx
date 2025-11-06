import { useState, useEffect } from 'react';
import Card from './components/Card.jsx';
import CardDetail from './components/CardDetail.jsx';
import AddModal from './components/AddModal.jsx';

import AWclaro from './assets/AWclaro.png';
import AWescuro from './assets/AWescuro.png';

import noturno from './assets/Noturno.png';
import claro from './assets/Claro.png';

import {
  getTodasAsCartas,
  getTodosOsAnimais,
  getTodosOsAtributos,
  getTodasAsAcoes,
  getTodosOsEfeitos,
  getCartaPorId,
  criarCarta,
  criarAnimal,
  criarImagem,
  criarAtributo,
  criarAcao,
  criarEfeito,
  deletarCarta,
  uploadImagem
} from './apiAlmanaqueWildcards.jsx';

const senhaGamedev = '250618';

function App() {

  const [cartas, setCartas] = useState([]);
  const [animais, setAnimais] = useState([]);

  const [acoes, setAcoes] = useState([]);
  const [atributos, setAtributos] = useState([]);
  const [efeitos, setEfeitos] = useState([]);

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
        const [cartasData, animaisData, atributosData, acoesData, efeitosData] = await Promise.all([
          getTodasAsCartas(),
          getTodosOsAnimais(),
          getTodosOsAtributos(),
          getTodasAsAcoes(),
          getTodosOsEfeitos()
        ]);
        setCartas(cartasData);
        setAnimais(animaisData);
        const atributosNormalizados = atributosData.map(attr => ({
          id: attr.atributoID,
          nome: attr.nomeAtributo,
          descricao: attr.descricaoAtributo
        }));
        setAtributos(atributosNormalizados);

        const acoesNormalizadas = acoesData.map(ac => ({
          id: ac.acaoID,
          nome: ac.custo,
          descricao: ac.descricaoAcao
        }));
        setAcoes(acoesNormalizadas);

        const efeitosNormalizados = efeitosData.map(ef => ({
          id: ef.efeitoID,
          nome: ef.nomeEfeito,
          descricao: ef.descricaoEfeito
        }));
        setEfeitos(efeitosNormalizados);

      } catch (err) {
        console.error("Erro ao carregar dados da API:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    carregarDados();
  }, []);
  const handleCardClick = async (carta) => {
    try {
      setCartaSelecionada(null);
      const dadosDetalhados = await getCartaPorId(carta.cartaID);
      setCartaSelecionada(dadosDetalhados);
    } catch (err) {
      console.error("Erro ao buscar detalhes da carta:", err);
      alert(`Não foi possível carregar os detalhes da carta: ${err.message}`);
    }
  };
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
      const {
        habilidade, vida, tamanho, ataque, defesa, custo, animalId,
        acoesIds, atributosIds
      } = dataFromModal;

      const novaCartaData = {
        habilidade: habilidade || null,
        vida: Number(vida),
        tamanho: tamanho ? Number(tamanho) : null,
        ataque: Number(ataque),
        defesa: Number(defesa),
        custo: Number(custo),
        animalID: Number(animalId),
        acoesIds: acoesIds,
        atributosIds: atributosIds,
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

  const handleSaveAcao = async (dataFromModal) => {
    try {
      await criarAcao(dataFromModal);

      const acoesAtualizadasBrutas = await getTodasAsAcoes();
      const acoesNormalizadas = acoesAtualizadasBrutas.map(ac => ({
        id: ac.acaoID,
        nome: ac.custo,
        descricao: ac.descricaoAcao
      }));
      setAcoes(acoesNormalizadas);

    } catch (err) {
      console.error("Erro ao salvar acao:", err);
      alert(`Erro ao salvar acao: ${err.message}`);
      throw err;
    }
  };

  const handleSaveAtributo = async (dataFromModal) => {
    try {
      const atributoDataParaAPI = {
        nomeAtributo: dataFromModal.nome,
        descricaoAtributo: dataFromModal.descricao
      };

      await criarAtributo(atributoDataParaAPI);

      const atributosAtualizadosBrutos = await getTodosOsAtributos();
      const atributosNormalizados = atributosAtualizadosBrutos.map(attr => ({
        id: attr.atributoID,
        nome: attr.nomeAtributo,
        descricao: attr.descricaoAtributo
      }));
      setAtributos(atributosNormalizados);

    } catch (err) {
      console.error("Erro ao salvar atributo:", err);
      alert(`Erro ao salvar atributo: ${err.message}`);
      throw err;
    }
  };


  const handleSaveEfeito = async (dataFromModal) => {
    try {
      await criarEfeito(dataFromModal);
      const efeitosAtualizadosBrutos = await getTodosOsEfeitos();
      const efeitosNormalizados = efeitosAtualizadosBrutos.map(ef => ({
        id: ef.efeitoID,
        nome: ef.nomeEfeito,
        descricao: ef.descricaoEfeito
      }));
      setEfeitos(efeitosNormalizados);

    } catch (err) {
      console.error("Erro ao salvar efeito:", err);
      alert(`Erro ao salvar efeito: ${err.message}`);
      throw err;
    }
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
            isDarkMode={isDarkMode} 
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
        onSaveEfeito={handleSaveEfeito}

        animaisDisponiveis={animais}
        acoesDisponiveis={acoes}
        atributosDisponiveis={atributos}
        efeitosDisponiveis={efeitos}
        cartasExistentes={cartas}
      />

      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 rounded-full bg-gray-500 p-3 text-white shadow-lg hover:bg-gray-600"
        title={isDarkMode ? "Mudar para Tema Claro" : "Mudar para Tema Escuro"}
      >
        <img
          src={isDarkMode ? claro : noturno}
          alt="Mudar tema"
          className="h-6 w-6"
        />
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
          className={`absolute left-0 top-0 h-full w-full max-w-2xl md:max-w-3xl lg:max-w-4xl shadow-xl p-6 md:p-8 overflow-y-auto ${isDarkMode ? 'bg-zinc-900 text-zinc-200' : 'bg-white text-zinc-800'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl md:text-3xl font-semibold ${isDarkMode ? 'text-pink-100' : 'text-gray-900'}`}>Regras do Almanaque WildCards</h2>
            <button
              onClick={closeRules}
              className={`px-3 py-1.5 rounded hover:bg-pink-400 ${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-pink-300'}`}
            >
              Fechar
            </button>
          </div>

          <div className="space-y-6">
            {regras.map((r) => (
              <section key={r.id} className="space-y-2">
                <h3 className={`text-lg md:text-xl font-medium ${isDarkMode ? 'text-pink-100' : 'text-gray-800'}`}>{r.titulo}</h3>
                <p className="text-base leading-relaxed whitespace-pre-line">
                  {r.texto}
                </p>
                {r.bullets && r.bullets.length > 0 && (
                  <ul className="list-disc pl-6 space-y-1 text-base leading-relaxed">
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