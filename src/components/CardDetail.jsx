function CardDetail({ carta, onClose }) {
  
  if (!carta) return null;

  const { nome, numero, imagemSrc, statsDetalhe, descricao, acoes, atributos } = carta;

  return (
    <div className="relative mx-auto max-w-3xl rounded-xl border border-gray-300 bg-white p-6 shadow-2xl">

      <button 
        onClick={onClose} 
        className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-pink-300 text-white text-xl font-semibold shadow-md transition-transform hover:scale-110 hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75"
        aria-label="Fechar modal"
      >
        &times;
      </button>

      <div className="flex flex-col gap-6 md:flex-row">

        <div className="flex-1 pr-0 md:pr-4">
          <h2 className="text-3xl font-bold text-gray-900">{nome} {numero}</h2>
          <p className="mt-2 text-xl text-gray-700">
            hp: {statsDetalhe.hp} tamanho: {statsDetalhe.tamanho} defesa: {statsDetalhe.defesa} ataque: {statsDetalhe.ataque}
          </p>
          <p className="mt-4 text-gray-600">{descricao}</p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h4 className="font-bold text-gray-800">Ações:</h4>
              {acoes && acoes.length > 0 ? (
                acoes.map(acao => (

                  <div key={acao.id || acao.nome} className="mt-2">
                    <h5 className="font-semibold text-gray-800">{acao.nome}</h5>
                    <p className="text-sm text-gray-600">{acao.descricao}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Nenhuma ação.</p>
              )}
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h4 className="font-bold text-gray-800">Atributos:</h4>
              {atributos && atributos.length > 0 ? (
                atributos.map(attr => (

                  <div key={attr.id || attr.nome} className="mt-2">
                    <h5 className="font-semibold text-gray-800">{attr.nome}</h5>
                    <p className="text-sm text-gray-600">{attr.descricao}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Nenhum atributo.</p>
              )}
            </div>
            
          </div>
        </div>
        
        <div className="mt-6 flex w-full items-center justify-center md:mt-0 md:w-1/3">
          <div className="rounded-lg bg-gray-100 shadow-inner">
            <div className="relative overflow-hidden rounded-lg w-56 h-56 md:w-63 md:h-64">
              <img
              src={imagemSrc}
              alt={nome}
              className="absolute inset-0 h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;