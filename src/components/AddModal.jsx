import { useState } from 'react';

const TABS = ['Criatura', 'Animal', 'Ação', 'Atributo', 'Efeito'];

function AddEntityModal({
  isOpen,
  onClose,
  onSaveCarta,
  onSaveAnimal,
  onSaveAcao,
  onSaveAtributo,
  onSaveEfeito,
  animaisDisponiveis = [],
  acoesDisponiveis = [],
  atributosDisponiveis = [],
  efeitosDisponiveis = [],
  cartasExistentes = []
}) {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const [habilidade, setHabilidade] = useState('');
  const [vida, setVida] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [ataque, setAtaque] = useState('');
  const [defesa, setDefesa] = useState('');
  const [custo, setCusto] = useState('');
  const [selectedAnimalId, setSelectedAnimalId] = useState('');
  const [selectedAcoes, setSelectedAcoes] = useState([]);
  const [selectedAtributos, setSelectedAtributos] = useState([]);

  const [animalNomeCient, setAnimalNomeCient] = useState('');
  const [animalDesc, setAnimalDesc] = useState('');
  const [animalFile, setAnimalFile] = useState(null);
  const [animalPreview, setAnimalPreview] = useState(null);
  const [acaoNome, setAcaoNome] = useState('');
  const [acaoDesc, setAcaoDesc] = useState('');
  const [atributoNome, setAtributoNome] = useState('');
  const [atributoDesc, setAtributoDesc] = useState('');
  const [efeitoNome, setEfeitoNome] = useState('');
  const [efeitoDesc, setEfeitoDesc] = useState('');
  const [selectedEfeitos, setSelectedEfeitos] = useState([]);
  const [dropdownEfeito, setDropdownEfeito] = useState('');
  const [dropdownAcao, setDropdownAcao] = useState('');
  const [dropdownAtributo, setDropdownAtributo] = useState('');

  const resetForms = () => {
    setHabilidade('');
    setVida('');
    setTamanho('');
    setAtaque('');
    setDefesa('');
    setCusto('');
    setSelectedAnimalId('');
    setSelectedAcoes([]);
    setSelectedAtributos([]);
    setSelectedEfeitos([]);
    setDropdownAcao('');
    setDropdownAtributo('');
    setDropdownEfeito('');
    setAnimalNomeCient('');
    setAnimalDesc('');
    setAnimalFile(null);
    setAnimalPreview(null);
    setAcaoNome('');
    setAcaoDesc('');
    setAtributoNome('');
    setAtributoDesc('');
    setEfeitoNome('');
    setEfeitoDesc('');
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAnimalFile(file);
      setAnimalPreview(URL.createObjectURL(file));
    } else {
      setAnimalFile(null);
      setAnimalPreview(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (activeTab === 'Criatura') {
        if (!selectedAnimalId) {
          alert('Por favor, selecione um Animal Base.');
          return;
        }

        const nomeAnimalSelecionado = animaisDisponiveis.find(
          a => a.animalID === Number(selectedAnimalId)
        )?.nomeCientifico;
        onSaveCarta({
          habilidade,
          vida: Number(vida) || 0,
          tamanho: Number(tamanho) || 0,
          ataque: Number(ataque) || 0,
          defesa: Number(defesa) || 0,
          custo: Number(custo) || 0,
          animalId: Number(selectedAnimalId),
          nomeAnimalSelecionado: nomeAnimalSelecionado,
          acoesIds: selectedAcoes,
          atributosIds: selectedAtributos,
          efeitosIds: selectedEfeitos
        });

      } else if (activeTab === 'Animal') {
        if (!animalNomeCient || !animalFile) {
          alert('Nome Científico e Arquivo de Imagem são obrigatórios.');
          return;
        }

        await onSaveAnimal({
          nomeCientifico: animalNomeCient,
          descricaoAnimal: animalDesc,
          imagemFile: animalFile
        });
        setAnimalNomeCient('');
        setAnimalDesc('');
        setAnimalFile(null);
        setAnimalPreview(null);
        
        alert('Animal salvo! Você pode selecioná-lo na aba "Criatura" (talvez precise reabrir o modal).');
        setActiveTab('Criatura');

      } else if (activeTab === 'Ação') {
        if (!acaoNome) {
          alert('Por favor, preencha o nome/custo da ação.');
          return;
        }
        await onSaveAcao({ nome: acaoNome, descricao: acaoDesc });
        setAcaoNome('');
        setAcaoDesc('');
        alert('Ação salva! Você pode selecioná-la na aba "Criatura".');
        setActiveTab('Criatura');

      } else if (activeTab === 'Atributo') {
        if (!atributoNome) {
          alert('Por favor, preencha o nome do atributo.');
          return;
        }
        await onSaveAtributo({ nome: atributoNome, descricao: atributoDesc });
        setAtributoNome('');
        setAtributoDesc('');
        alert('Atributo salvo! Você pode selecioná-lo na aba "Criatura".');
        setActiveTab('Criatura');

      } else if (activeTab === 'Efeito') {
        if (!efeitoNome) {
          alert('Por favor, preencha o nome do efeito.');
          return;
        }
        await onSaveEfeito({ nome: efeitoNome, descricao: efeitoDesc });
        setEfeitoNome('');
        setEfeitoDesc('');
        alert('Efeito salvo! Você pode selecioná-lo na aba "Criatura".');
        setActiveTab('Criatura');
      }
      if (activeTab === 'Criatura') {
        onClose();
        resetForms();
      }

    } catch (error) {
      console.error("Erro ao salvar:", error);
      // O App.jsx já exibe o alerta de erro
    }
  };
  const addAcao = () => {
    const id = Number(dropdownAcao);
    if (id && !selectedAcoes.includes(id)) {
      setSelectedAcoes([...selectedAcoes, id]);
    }
    setDropdownAcao('');
  };
  const removeAcao = (idToRemove) => {
    setSelectedAcoes(selectedAcoes.filter(id => id !== idToRemove));
  };
  const addAtributo = () => {
    const id = Number(dropdownAtributo);
    if (id && !selectedAtributos.includes(id)) {
      setSelectedAtributos([...selectedAtributos, id]);
    }
    setDropdownAtributo('');
  };
  const removeAtributo = (idToRemove) => {
    setSelectedAtributos(selectedAtributos.filter(id => id !== idToRemove));
  };
  
  const getAcaoNome = (id) => acoesDisponiveis.find(a => a.id === id)?.nome || '??';
  const getAtributoNome = (id) => atributosDisponiveis.find(a => a.id === id)?.nome || '??';
  const getEfeitoNome = (id) => efeitosDisponiveis.find(e => e.id === id)?.nome || '??';
  
  const addEfeito = () => {
    const id = Number(dropdownEfeito);
    if (id && !selectedEfeitos.includes(id)) {
      setSelectedEfeitos([...selectedEfeitos, id]);
    }
    setDropdownEfeito('');
  };
  const removeEfeito = (idToRemove) => {
    setSelectedEfeitos(selectedEfeitos.filter(id => id !== idToRemove));
  };

  const usedAnimalIds = cartasExistentes.map(carta => carta.animalID);

  const renderFormContent = () => {
    switch (activeTab) {
      case 'Criatura':
        return (
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="vida" className="block text-sm font-medium leading-6 text-gray-900">Vida (HP)</label>
              <input type="number" id="vida" value={vida} onChange={(e) => setVida(e.target.value)} min="0" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="tamanho" className="block text-sm font-medium leading-6 text-gray-900">Tamanho</label>
              <input type="number" id="tamanho" value={tamanho} onChange={(e) => setTamanho(e.target.value)} min="0" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="ataque" className="block text-sm font-medium leading-6 text-gray-900">Ataque</label>
              <input type="number" id="ataque" value={ataque} onChange={(e) => setAtaque(e.target.value)} min="0" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="defesa" className="block text-sm font-medium leading-6 text-gray-900">Defesa</label>
              <input type="number" id="defesa" value={defesa} onChange={(e) => setDefesa(e.target.value)} min="0" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="custo" className="block text-sm font-medium leading-6 text-gray-900">Custo</label>
              <input type="number" id="custo" value={custo} onChange={(e) => setCusto(e.target.value)} min="0" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="animal" className="block text-sm font-medium leading-6 text-gray-900">Animal Base</label>
              <select id="animal" value={selectedAnimalId} onChange={(e) => setSelectedAnimalId(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm">
                <option value="">Selecione...</option>
                {animaisDisponiveis.map(animal => {

                  const jaExiste = usedAnimalIds.includes(animal.animalID);
                  return (
                    <option
                      key={animal.animalID}
                      value={animal.animalID}
                      disabled={jaExiste}
                    >
                      {animal.nomeCientifico} {jaExiste ? '(Já Criado)' : ''}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-span-full">
                <label htmlFor="habilidade" className="block text-sm font-medium leading-6 text-gray-900">Habilidade (Descrição)</label>
                <textarea id="habilidade" rows={3} value={habilidade} onChange={(e) => setHabilidade(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"></textarea>
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">Ações Associadas</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {selectedAcoes.map(id => (
                    <span key={id} className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                      {getAcaoNome(id)}
                      <button type="button" onClick={() => removeAcao(id)} className="font-bold text-blue-600 hover:text-blue-800">X</button>
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <select
                    value={dropdownAcao}
                    onChange={(e) => setDropdownAcao(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  >
                    <option value="">Selecione uma ação...</option>
                    {acoesDisponiveis.map(acao => (
                      <option key={acao.id} value={acao.id} disabled={selectedAcoes.includes(acao.id)}>
                        {acao.nome}
                      </option>
                    ))}
                  </select>
                  <button type="button" onClick={addAcao} className="rounded bg-pink-200 px-3 py-1 text-sm hover:bg-pink-300 whitespace-nowrap">
                    + Adicionar Ação
                  </button>
                </div>
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">Atributos Associados</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {selectedAtributos.map(id => (
                    <span key={id} className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800">
                      {getAtributoNome(id)}
                      <button type="button" onClick={() => removeAtributo(id)} className="font-bold text-yellow-600 hover:text-yellow-800">X</button>
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <select
                    value={dropdownAtributo}
                    onChange={(e) => setDropdownAtributo(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  >
                    <option value="">Selecione um atributo...</option>
                    {atributosDisponiveis.map(attr => (
                      <option key={attr.id} value={attr.id} disabled={selectedAtributos.includes(attr.id)}>
                        {attr.nome}
                      </option>
                    ))}
                  </select>
                  <button type="button" onClick={addAtributo} className="rounded bg-pink-200 px-3 py-1 text-sm hover:bg-pink-300 whitespace-nowrap">
                    + Adicionar Atributo
                  </button>
                </div>
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">Efeitos Associados</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {selectedEfeitos.map(id => (
                    <span key={id} className="flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800">
                      {getEfeitoNome(id)}
                      <button type="button" onClick={() => removeEfeito(id)} className="font-bold text-purple-600 hover:text-purple-800">X</button>
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <select
                    value={dropdownEfeito}
                    onChange={(e) => setDropdownEfeito(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm">
                    <option value="">Selecione um efeito...</option>
                    {efeitosDisponiveis.map(ef => (
                      <option key={ef.id} value={ef.id} disabled={selectedEfeitos.includes(ef.id)}>
                        {ef.nome}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={addEfeito}
                    className="rounded bg-pink-200 px-3 py-1 text-sm hover:bg-pink-300 whitespace-nowrap">
                    + Adicionar Efeito
                  </button>
                </div>
              </div>
          </div>
        );

      case 'Animal':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="animalNomeCient" className="block text-sm font-medium text-gray-900">Nome Científico</label>
              <input
                type="text"
                id="animalNomeCient"
                value={animalNomeCient}
                onChange={(e) => setAnimalNomeCient(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="Ex: Nautilus pompilius"
              />
            </div>
            <div>
              <label htmlFor="animalDesc" className="block text-sm font-medium text-gray-900">Descrição</label>
              <textarea
                id="animalDesc"
                rows={3}
                value={animalDesc}
                onChange={(e) => setAnimalDesc(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="Ex: Um fóssil vivo..."
              ></textarea>
            </div>
            <div>
              <label htmlFor="animalFile" className="block text-sm font-medium text-gray-900">Arquivo da Imagem</label>
              <input
                type="file"
                id="animalFile"
                onChange={handleFileChange}
                accept="image/png, image/jpeg"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
              />
            </div>
            {animalPreview && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Preview da Imagem:</label>
                <img src={animalPreview} alt="Preview" className="w-32 h-32 object-cover rounded shadow-md mt-1" />
              </div>
            )}
            <p className="text-sm text-gray-500">Ao salvar, o animal e sua imagem serão enviados ao servidor.</p>
          </div>
        );

      case 'Ação':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="acaoNome" className="block text-sm font-medium text-gray-900">Custo da Ação</label>
              <input type="text" id="acaoNome" value={acaoNome} onChange={(e) => setAcaoNome(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Ex: 3" />
            </div>
            <div>
              <label htmlFor="acaoDesc" className="block text-sm font-medium text-gray-900">Descrição</label>
              <textarea id="acaoDesc" rows={3} value={acaoDesc} onChange={(e) => setAcaoDesc(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Ex: Descarte 1 carta..."></textarea>
            </div>
            <p className="text-sm text-gray-500">Ao salvar, a ação ficará disponível no dropdown da aba "Criatura".</p>
          </div>
        );

      case 'Atributo':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="atributoNome" className="block text-sm font-medium text-gray-900">Nome do Atributo</label>
              <input type="text" id="atributoNome" value={atributoNome} onChange={(e) => setAtributoNome(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Ex: Hidrodinâmico" />
            </div>
            <div>
              <label htmlFor="atributoDesc" className="block text-sm font-medium text-gray-900">Descrição (Opcional)</label>
              <textarea id="atributoDesc" rows={3} value={atributoDesc} onChange={(e) => setAtributoDesc(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
            </div>
            <p className="text-sm text-gray-500">Ao salvar, o atributo ficará disponível no dropdown da aba "Criatura".</p>
          </div>
        );

      case 'Efeito':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="efeitoNome" className="block text-sm font-medium text-gray-900">Nome do Efeito</label>
              <input type="text" id="efeitoNome" value={efeitoNome} onChange={(e) => setEfeitoNome(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Ex: Dano em área" />
            </div>
            <div>
              <label htmlFor="EfeitoDesc" className="block text-sm font-medium text-gray-900">Descrição (Opcional)</label>
              <textarea id="EfeitoDesc" rows={3} value={efeitoDesc} onChange={(e) => setEfeitoDesc(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
            </div>
            <p className="text-sm text-gray-500">Ao salvar, o efeito ficará disponível no dropdown da aba "Criatura".</p>
          </div>
        );
      default:
        return null;
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Criar novo(a)
        </h3>

        <div className="my-4 border-b border-gray-200">
          <nav className="-mb-px flex space-x-4" aria-label="Tabs">
            {TABS.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`${activeTab === tab ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium`}>{tab}</button>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="mt-2 space-y-4 max-h-[60vh] overflow-y-auto p-1">
            {renderFormContent()}
          </div>

          <div className="mt-6 flex justify-end space-x-3 border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-pink-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-pink-400"
            >Cancelar (X)</button>
            <button
              type="submit"
              className="rounded-md border border-transparent bg-pink-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-pink-500"
            >
              {activeTab === 'Criatura' ? 'Salvar Criatura (✓)' : `Salvar ${activeTab} (✓)`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEntityModal;