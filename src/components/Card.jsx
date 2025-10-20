function Card({ nome, imagemSrc, statsResumo, tags, onClick }) {

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

  return (

    <div 
      onClick={onClick} 
      className="max-w-xs cursor-pointer rounded border border-gray-400 bg-white p-2 shadow-md transition-all hover:scale-105 hover:shadow-lg"
    >

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