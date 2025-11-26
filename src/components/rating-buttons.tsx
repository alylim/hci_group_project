export default function RatingButtons({ onRate }) {
  return (
    <div className="flex space-x-4">
      <button
        onClick={() => onRate('again')}
        className="px-4 py-2 bg-red-500 text-white rounded-xl shadow"
      >
        Again
      </button>
      <button
        onClick={() => onRate('hard')}
        className="px-4 py-2 bg-yellow-500 text-white rounded-xl shadow"
      >
        Hard
      </button>
      <button
        onClick={() => onRate('good')}
        className="px-4 py-2 bg-green-500 text-white rounded-xl shadow"
      >
        Good
      </button>
      <button
        onClick={() => onRate('easy')}
        className="px-4 py-2 bg-blue-500 text-white rounded-xl shadow"
      >
        Easy
      </button>
    </div>
  )
}
