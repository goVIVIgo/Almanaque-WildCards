import React, { useState, useEffect } from 'react';
import AddEntityModal from './AddEntityModal';

const getFromStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

function Almanaque() {

  const [cartas, setCartas] = useState(() => getFromStorage('cartas'));
  const [animais, setAnimais] = useState(
    () => getFromStorage('animais').length > 0 ? getFromStorage('animais') : [
      { id: 1, nome: 'Orca', nomeCientifico: 'Orcinus orca' },
      { id: 2, nome: 'Bullfrog', nomeCientifico: 'Rana catesbeiana' }
    ]
  );
  const [acoes, setAcoes] = useState(() => getFromStorage('acoes'));
  const [atributos, setAtributos] = useState(() => getFromStorage('atributos'));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveCarta = (dataFromModal) => {

    const { habilidade, vida, tamanho, ataque, defesa, custo, animalId, acoesIds, atributosIds } = dataFromModal;


    const animal = animais.find(a => a.id === Number(animalId)); 
    if (!animal) {
      alert("Erro: Animal não encontrado! (ID: " + animalId + ")");
      return;
    }

    const acoesObjs = acoesIds.map(id => acoes.find(a => a.id === Number(id))).filter(Boolean);
    const atributosObjs = atributosIds.map(id => atributos.find(a => a.id === Number(id))).filter(Boolean);

    const novaCarta = {
      id: Date.now(),
      nome: animal.nome,
      numero: `#${String(Date.now()).slice(-4)}`,
      imagemSrc: animal.imagemSrc,
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

    setIsModalOpen(false);

  const handleSaveAnimal = (novoAnimal) => {
    const animalComId = { ...novoAnimal, id: Date.now() };
    setAnimais(prevAnimais => {
      const novosAnimais = [...prevAnimais, animalComId];
      saveToStorage('animais', novosAnimais);
      return novosAnimais;
    });
    console.log("Animal salvo:", animalComId);
  };

  const handleSaveAcao = (novaAcao) => {
    const acaoComId = { ...novaAcao, id: Date.now() };
    setAcoes(prevAcoes => {
      const novasAcoes = [...prevAcoes, acaoComId];
      saveToStorage('acoes', novasAcoes);
      return novasAcoes;
    });
    console.log("Ação salva:", acaoComId);
  };
  
  const handleSaveAtributo = (novoAtributo) => {
    const atributoComId = { ...novoAtributo, id: Date.now() };
    setAtributos(prevAtributos => {
      const novosAtributos = [...prevAtributos, atributoComId];
      saveToStorage('atributos', novosAtributos);
      return novosAtributos;
    });
    console.log("Atributo salvo:", atributoComId);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Almanaque WildCards</h1>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="my-4 rounded bg-pink-400 px-4 py-2 text-white hover:bg-pink-500"
      >
        Adicionar Nova Carta
      </button>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {cartas.map(carta => (
          <div key={carta.id} className="rounded border p-4 shadow-lg">
            <h3 className="font-bold text-lg">

              {animais.find(a => a.id === carta.animalId)?.nome || 'Criatura'}
            </h3>
            <p>HP: {carta.vida} / ATK: {carta.ataque}</p>
            <p>Custo: {carta.custo}</p>

          </div>
        ))}
      </div>

      {isModalOpen && (
        <AddEntityModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}

          onSaveCarta={handleSaveCarta}
          onSaveAnimal={handleSaveAnimal}
          onSaveAcao={handleSaveAcao}
          onSaveAtributo={handleSaveAtributo}

          animaisDisponiveis={animais}
          acoesDisponiveis={acoes}
          atributosDisponiveis={atributos}
        />
      )}
    </div>
  );
}
}

export default Almanaque;