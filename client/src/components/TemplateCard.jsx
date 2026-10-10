export default function TemplateCard({ template, isFavorite, onToggle }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
      <img
        src={template.thumbnail_url}
        alt={template.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-blue-600 font-medium">{template.category}</span>
        <h3 className="text-lg font-semibold">{template.name}</h3>
        <p className="text-sm text-gray-600 flex-1 mb-3">{template.description}</p>
        <button
          onClick={() => onToggle(template.id)}
          className={`py-2 rounded border ${
            isFavorite
              ? 'bg-pink-500 text-white border-pink-500'
              : 'bg-white text-pink-500 border-pink-500 hover:bg-pink-50'
          }`}
        >
          {isFavorite ? '♥ Favorited' : '♡ Favorite'}
        </button>
      </div>
    </div>
  );
}