import { useState } from 'react'
import Card from './components/Card.jsx';
import CardDetail from './components/CardDetail.jsx';
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

import AddModal from './components/AddModal.jsx';


const dadosDasCartas = [
  {
    id: 1,
    nome: 'Orca',
    numero: '#1234',
    imagemSrc: orcaImg,
    statsResumo: 'tam: 9 hp: 7 atk: 6 def: 4',
    statsDetalhe: {
      hp: 'X',
      tamanho: 'X',
      defesa: 'X',
      ataque: 'X'
    },
    descricao: 'blablabla blablabla',
    habilidades: [
      {
        nome: 'Derrubar',
        descricao: 'blebleble blebleble',
      },
      {
        nome: 'Contracoloração',
        descricao: 'bliblbilbi bliblbibli',
        social: {
          nome: 'Social',
          descricao: 'blobloblo blobloblo',
        }
      }
    ],
    tags: [
      { nome: 'derrubar', tipo: 'amarelo' },
      { nome: 'hidrodinamico', tipo: 'ciano' },
      { nome: 'social', tipo: 'ciano' },
    ]
  },
  {
    id: 2,
    nome: 'BullFrog',
    imagemSrc: bullfrogImg,
    statsResumo: 'tam: 9 hp: 7 atk: 6 def: 4',
    statsDetalhe: {
      hp: 'X',
      tamanho: 'X',
      defesa: 'X',
      ataque: 'X'
    },
    descricao: 'blablabla blablabla',
    habilidades: [
      {
        nome: 'Derrubar',
        descricao: 'blebleble blebleble',
      },
      {
        nome: 'Contracoloração',
        descricao: 'bliblbilbi bliblbibli',
        social: {
          nome: 'Social',
          descricao: 'blobloblo blobloblo',
        }
      }
    ],
    tags: [
      { nome: 'derrubar', tipo: 'amarelo' },
      { nome: 'hidrodinamico', tipo: 'ciano' },
      { nome: 'social', tipo: 'ciano' },
    ]
  },
  {
    id: 3,
    nome: 'Lyrebird',
    imagemSrc: lyrebirdImg,
    statsResumo: 'tam: 9 hp: 7 atk: 6 def: 4',
    statsDetalhe: {
      hp: 'X',
      tamanho: 'X',
      defesa: 'X',
      ataque: 'X'
    },
    descricao: 'blablabla blablabla',
    habilidades: [
      {
        nome: 'Derrubar',
        descricao: 'blebleble blebleble',
      },
      {
        nome: 'Contracoloração',
        descricao: 'bliblbilbi bliblbibli',
        social: {
          nome: 'Social',
          descricao: 'blobloblo blobloblo',
        }
      }
    ],
    tags: [
      { nome: 'derrubar', tipo: 'amarelo' },
      { nome: 'hidrodinamico', tipo: 'ciano' },
      { nome: 'social', tipo: 'ciano' },
    ]
  },
  {
    id: 4,
    nome: 'Ant',
    imagemSrc: antImg,
    statsResumo: 'tam: 9 hp: 7 atk: 6 def: 4',
    statsDetalhe: {
      hp: 'X',
      tamanho: 'X',
      defesa: 'X',
      ataque: 'X'
    },
    descricao: 'blablabla blablabla',
    habilidades: [
      {
        nome: 'Derrubar',
        descricao: 'blebleble blebleble',
      },
      {
        nome: 'Contracoloração',
        descricao: 'bliblbilbi bliblbibli',
        social: {
          nome: 'Social',
          descricao: 'blobloblo blobloblo',
        }
      }
    ],
    tags: [
      { nome: 'derrubar', tipo: 'amarelo' },
      { nome: 'hidrodinamico', tipo: 'ciano' },
      { nome: 'social', tipo: 'ciano' },
    ]
  },
  {
    id: 5,
    nome: 'Cheerleader Crab',
    imagemSrc: cheerleaderCrabImg,
    statsResumo: 'tam: 9 hp: 7 atk: 6 def: 4',
    statsDetalhe: {
      hp: 'X',
      tamanho: 'X',
      defesa: 'X',
      ataque: 'X'
    },
    descricao: 'blablabla blablabla',
    habilidades: [
      {
        nome: 'Derrubar',
        descricao: 'blebleble blebleble',
      },
      {
        nome: 'Contracoloração',
        descricao: 'bliblbilbi bliblbibli',
        social: {
          nome: 'Social',
          descricao: 'blobloblo blobloblo',
        }
      }
    ],
    tags: [
      { nome: 'derrubar', tipo: 'amarelo' },
      { nome: 'hidrodinamico', tipo: 'ciano' },
      { nome: 'social', tipo: 'ciano' },
    ]
  },
  {
    id: 6,
    nome: 'Chrysalis',
    imagemSrc: chrysalisImg,
    statsResumo: 'tam: 9 hp: 7 atk: 6 def: 4',
    statsDetalhe: {
      hp: 'X',
      tamanho: 'X',
      defesa: 'X',
      ataque: 'X'
    },
    descricao: 'blablabla blablabla',
    habilidades: [
      {
        nome: 'Derrubar',
        descricao: 'blebleble blebleble',
      },
      {
        nome: 'Contracoloração',
        descricao: 'bliblbilbi bliblbibli',
        social: {
          nome: 'Social',
          descricao: 'blobloblo blobloblo',
        }
      }
    ],
    tags: [
      { nome: 'derrubar', tipo: 'amarelo' },
      { nome: 'hidrodinamico', tipo: 'ciano' },
      { nome: 'social', tipo: 'ciano' },
    ]
  },
  {
    id: 7,
    nome: 'Cone Snail',
    imagemSrc: coneSnailImg,
    statsResumo: 'tam: 9 hp: 7 atk: 6 def: 4',
    statsDetalhe: {
      hp: 'X',
      tamanho: 'X',
      defesa: 'X',
      ataque: 'X'
    },
    descricao: 'blablabla blablabla',
    habilidades: [
      {
        nome: 'Derrubar',
        descricao: 'blebleble blebleble',
      },
      {
        nome: 'Contracoloração',
        descricao: 'bliblbilbi bliblbibli',
        social: {
          nome: 'Social',
          descricao: 'blobloblo blobloblo',
        }
      }
    ],
    tags: [
      { nome: 'derrubar', tipo: 'amarelo' },
      { nome: 'hidrodinamico', tipo: 'ciano' },
      { nome: 'social', tipo: 'ciano' },
    ]
  },
  {
    id: 8,
    nome: 'Decorator Crab',
    imagemSrc: decoratorCrabImg,
    statsResumo: 'tam: 9 hp: 7 atk: 6 def: 4',
    statsDetalhe: {
      hp: 'X',
      tamanho: 'X',
      defesa: 'X',
      ataque: 'X'
    },
    descricao: 'blablabla blablabla',
    habilidades: [
      {
        nome: 'Derrubar',
        descricao: 'blebleble blebleble',
      },
      {
        nome: 'Contracoloração',
        descricao: 'bliblbilbi bliblbibli',
        social: {
          nome: 'Social',
          descricao: 'blobloblo blobloblo',
        }
      }
    ],
    tags: [
      { nome: 'derrubar', tipo: 'amarelo' },
      { nome: 'hidrodinamico', tipo: 'ciano' },
      { nome: 'social', tipo: 'ciano' },
    ]
  },
  {
    id: 9,
    nome: 'Earthworm',
    imagemSrc: earthwormImg,
    statsResumo: 'tam: 9 hp: 7 atk: 6 def: 4',
    statsDetalhe: {
      hp: 'X',
      tamanho: 'X',
      defesa: 'X',
      ataque: 'X'
    },
    descricao: 'blablabla blablabla',
    habilidades: [
      {
        nome: 'Derrubar',
        descricao: 'blebleble blebleble',
      },
      {
        nome: 'Contracoloração',
        descricao: 'bliblbilbi bliblbibli',
        social: {
          nome: 'Social',
          descricao: 'blobloblo blobloblo',
        }
      }
    ],
    tags: [
      { nome: 'derrubar', tipo: 'amarelo' },
      { nome: 'hidrodinamico', tipo: 'ciano' },
      { nome: 'social', tipo: 'ciano' },
    ]
  },
  {
    id: 10,
    nome: 'False Eyed Frog',
    imagemSrc: falseEyedFrogImg,
    statsResumo: 'tam: 9 hp: 7 atk: 6 def: 4',
    statsDetalhe: {
      hp: 'X',
      tamanho: 'X',
      defesa: 'X',
      ataque: 'X'
    },
    descricao: 'blablabla blablabla',
    habilidades: [
      {
        nome: 'Derrubar',
        descricao: 'blebleble blebleble',
      },
      {
        nome: 'Contracoloração',
        descricao: 'bliblbilbi bliblbibli',
        social: {
          nome: 'Social',
          descricao: 'blobloblo blobloblo',
        }
      }
    ],
    tags: [
      { nome: 'derrubar', tipo: 'amarelo' },
      { nome: 'hidrodinamico', tipo: 'ciano' },
      { nome: 'social', tipo: 'ciano' },
    ]
  },
  {
    id: 11,
    nome: 'Firefly',
    imagemSrc: fireglyImg,
    statsResumo: 'tam: 9 hp: 7 atk: 6 def: 4',
    statsDetalhe: {
      hp: 'X',
      tamanho: 'X',
      defesa: 'X',
      ataque: 'X'
    },
    descricao: 'blablabla blablabla',
    habilidades: [
      {
        nome: 'Derrubar',
        descricao: 'blebleble blebleble',
      },
      {
        nome: 'Contracoloração',
        descricao: 'bliblbilbi bliblbibli',
        social: {
          nome: 'Social',
          descricao: 'blobloblo blobloblo',
        }
      }
    ],
    tags: [
      { nome: 'derrubar', tipo: 'amarelo' },
      { nome: 'hidrodinamico', tipo: 'ciano' },
      { nome: 'social', tipo: 'ciano' },
    ]
  },
  {
    id: 12,
    nome: 'Giant Snail',
    imagemSrc: giantSnailImg,
    statsResumo: 'tam: 9 hp: 7 atk: 6 def: 4',
    statsDetalhe: {
      hp: 'X',
      tamanho: 'X',
      defesa: 'X',
      ataque: 'X'
    },
    descricao: 'blablabla blablabla',
    habilidades: [
      {
        nome: 'Derrubar',
        descricao: 'blebleble blebleble',
      },
      {
        nome: 'Contracoloração',
        descricao: 'bliblbilbi bliblbibli',
        social: {
          nome: 'Social',
          descricao: 'blobloblo blobloblo',
        }
      }
    ],
    tags: [
      { nome: 'derrubar', tipo: 'amarelo' },
      { nome: 'hidrodinamico', tipo: 'ciano' },
      { nome: 'social', tipo: 'ciano' },
    ]
  },
  {
    id: 13,
    nome: 'Googly',
    imagemSrc: googlyImg,
    statsResumo: 'tam: 9 hp: 7 atk: 6 def: 4',
    statsDetalhe: {
      hp: 'X',
      tamanho: 'X',
      defesa: 'X',
      ataque: 'X'
    },
    descricao: 'blablabla blablabla',
    habilidades: [
      {
        nome: 'Derrubar',
        descricao: 'blebleble blebleble',
      },
      {
        nome: 'Contracoloração',
        descricao: 'bliblbilbi bliblbibli',
        social: {
          nome: 'Social',
          descricao: 'blobloblo blobloblo',
        }
      }
    ],
    tags: [
      { nome: 'derrubar', tipo: 'amarelo' },
      { nome: 'hidrodinamico', tipo: 'ciano' },
      { nome: 'social', tipo: 'ciano' },
    ]
  },
  {
    id: 14,
    nome: 'Nautilus',
    imagemSrc: nautilusImg,
    statsResumo: 'tam: 9 hp: 7 atk: 6 def: 4',
    statsDetalhe: {
      hp: 'X',
      tamanho: 'X',
      defesa: 'X',
      ataque: 'X'
    },
    descricao: 'blablabla blablabla',
    habilidades: [
      {
        nome: 'Derrubar',
        descricao: 'blebleble blebleble',
      },
      {
        nome: 'Contracoloração',
        descricao: 'bliblbilbi bliblbibli',
        social: {
          nome: 'Social',
          descricao: 'blobloblo blobloblo',
        }
      }
    ],
    tags: [
      { nome: 'derrubar', tipo: 'amarelo' },
      { nome: 'hidrodinamico', tipo: 'ciano' },
      { nome: 'social', tipo: 'ciano' },
    ]
  },
  {
    id: 15,
    nome: 'Pearl Oyster',
    imagemSrc: pearlOysterImg,
    statsResumo: 'tam: 9 hp: 7 atk: 6 def: 4',
    statsDetalhe: {
      hp: 'X',
      tamanho: 'X',
      defesa: 'X',
      ataque: 'X'
    },
    descricao: 'blablabla blablabla',
    habilidades: [
      {
        nome: 'Derrubar',
        descricao: 'blebleble blebleble',
      },
      {
        nome: 'Contracoloração',
        descricao: 'bliblbilbi bliblbibli',
        social: {
          nome: 'Social',
          descricao: 'blobloblo blobloblo',
        }
      }
    ],
    tags: [
      { nome: 'derrubar', tipo: 'amarelo' },
      { nome: 'hidrodinamico', tipo: 'ciano' },
      { nome: 'social', tipo: 'ciano' },
    ]
  },
  {
    id: 16,
    nome: 'Penguin',
    imagemSrc: penguinImg,
    statsResumo: 'tam: 9 hp: 7 atk: 6 def: 4',
    statsDetalhe: {
      hp: 'X',
      tamanho: 'X',
      defesa: 'X',
      ataque: 'X'
    },
    descricao: 'blablabla blablabla',
    habilidades: [
      {
        nome: 'Derrubar',
        descricao: 'blebleble blebleble',
      },
      {
        nome: 'Contracoloração',
        descricao: 'bliblbilbi bliblbibli',
        social: {
          nome: 'Social',
          descricao: 'blobloblo blobloblo',
        }
      }
    ],
    tags: [
      { nome: 'derrubar', tipo: 'amarelo' },
      { nome: 'hidrodinamico', tipo: 'ciano' },
      { nome: 'social', tipo: 'ciano' },
    ]
  },
  {
    id: 17,
    nome: 'Shrimp',
    imagemSrc: shrimpImg,
    statsResumo: 'tam: 9 hp: 7 atk: 6 def: 4',
    statsDetalhe: {
      hp: 'X',
      tamanho: 'X',
      defesa: 'X',
      ataque: 'X'
    },
    descricao: 'blablabla blablabla',
    habilidades: [
      {
        nome: 'Derrubar',
        descricao: 'blebleble blebleble',
      },
      {
        nome: 'Contracoloração',
        descricao: 'bliblbilbi bliblbibli',
        social: {
          nome: 'Social',
          descricao: 'blobloblo blobloblo',
        }
      }
    ],
    tags: [
      { nome: 'derrubar', tipo: 'amarelo' },
      { nome: 'hidrodinamico', tipo: 'ciano' },
      { nome: 'social', tipo: 'ciano' },
    ]
  },
  {
    id: 18,
    nome: 'Silverfish',
    imagemSrc: silverfishImg,
    statsResumo: 'tam: 9 hp: 7 atk: 6 def: 4',
    statsDetalhe: {
      hp: 'X',
      tamanho: 'X',
      defesa: 'X',
      ataque: 'X'
    },
    descricao: 'blablabla blablabla',
    habilidades: [
      {
        nome: 'Derrubar',
        descricao: 'blebleble blebleble',
      },
      {
        nome: 'Contracoloração',
        descricao: 'bliblbilbi bliblbibli',
        social: {
          nome: 'Social',
          descricao: 'blobloblo blobloblo',
        }
      }
    ],
    tags: [
      { nome: 'derrubar', tipo: 'amarelo' },
      { nome: 'hidrodinamico', tipo: 'ciano' },
      { nome: 'social', tipo: 'ciano' },
    ]
  },
];

const senhaGamedev = '250618';

function App() {

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

  const bgColor = isAdminMode ? 'bg-indigo-100' : 'bg-gray-100';

  return (
   <div className={`min-h-screen p-8 ${bgColor}`}> 

      <h1 
        className="mb-6 cursor-pointer text-center text-4xl font-bold"
        onClick={handleTitleClick}
        title="dica: meu, seu, nosso aniversario!"
      >
        Almanaque WildCards {isAdminMode && '(modo: admin)'}
      </h1>

      {isAdminMode && (
          <div className="col-span-full mt-6 mb-8 text-center">
             <button onClick={() => setIsAddModalOpen(true)}
             className="rounded bg-pink-300 px-4 py-2 font-bold text-white hover:bg-pink-400 ">
               Adicionar Nova Carta
             </button>
          </div>
        )}

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {dadosDasCartas.map((carta) => (
          <Card 
            key={carta.id} 
            nome={carta.nome}
            imagemSrc={carta.imagemSrc}
            statsResumo={carta.statsResumo}
            tags={carta.tags}
            onClick={() => handleCardClick(carta)}
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
  />
    </div>
  );
}

export default App;
