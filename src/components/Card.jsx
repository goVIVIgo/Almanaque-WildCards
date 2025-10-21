function Card({ nome, imagemSrc, statsResumo, tags, onClick, isAdmin, onDelete, cardId }) {

  const getTagColor = (tipo) => {
    switch (tipo) {
      case 'amarelo':
        return 'bg-yellow-200 text-yellow-800';
      case 'ciano':
        return 'bg-cyan-200 text-cyan-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    if (window.confirm(`Tem certeza que deseja excluir a carta "${nome}"?`)) {
      onDelete(cardId);
    }
  };

  return (

    <div 
      onClick={onClick} 
      className="relative max-w-xs cursor-pointer rounded border border-gray-400 bg-white p-2 shadow-md transition-all hover:scale-105 hover:shadow-lg"
    >
      {isAdmin && (
        <button
          onClick={handleDeleteClick}
          className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white text-sm font-bold shadow-md transition-transform hover:scale-110 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
          aria-label={`Excluir ${nome}`}
          title={`Excluir ${nome}`}
        >
          &times; 
        </button>
      )}

      <h3 className="text-center font-bold">{nome}</h3>

      <div className="my-2 flex h-36 w-full items-center justify-center bg-gray-200 p-2 rounded border">
        <img 
          src={imagemSrc} 
          alt={nome}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <p className="text-xs text-gray-700">{statsResumo}</p>

      <div className="mt-2 flex flex-wrap gap-1">
        {tags.map((tag) => (
          <span 
            key={tag.nome} 
            className={`rounded px-2 py-0.5 text-xs ${getTagColor(tag.tipo)}`}
          >
            {tag.nome}
          </span>
        ))}
      </div>

    </div>
  );
}

export default Card;