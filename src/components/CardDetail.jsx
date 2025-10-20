
function CardDetail({ carta, onClose }) {
  
  if (!carta) return null;

  const { nome, numero, imagemSrc, statsDetalhe, descricao, habilidades } = carta;

  return (
    <div className="relative mx-auto max-w-3xl rounded-xl border border-gray-300 bg-white p-6 shadow-2xl">

      <button 
        onClick={onClose} 
        className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700 text-xl font-semibold shadow-md transition-transform hover:scale-110 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
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
              <h4 className="font-bold text-gray-800"> Ação:</h4>
              <h4 className="font-bold text-gray-800"> {habilidades[0].nome}</h4>
              <p className="text-sm text-gray-600">{habilidades[0].descricao}</p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h4 className="font-bold text-gray-800"> Atributos:</h4>
              <h4 className="font-bold text-gray-800">{habilidades[1].nome}</h4>
              <p className="text-sm text-gray-600">{habilidades[1].descricao}</p>
              
              {habilidades[1].social && (
                <>
                  <h5 className="mt-3 font-semibold text-gray-700">{habilidades[1].social.nome}</h5>
                  <p className="text-sm text-gray-600">{habilidades[1].social.descricao}</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex w-full items-center justify-center md:mt-0 md:w-1/3">
          <div className="flex h-56 w-56 items-center justify-center rounded-lg bg-gray-100 p-4 shadow-inner">
            <img 
              src={imagemSrc} 
              alt={nome} 
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;