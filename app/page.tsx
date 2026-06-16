export default function Home() {
  return (
    <main className="min-h-screen bg-yellow-50">
      {/* Header */}
      <header className="bg-blue-700 text-white py-6 px-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">📚 Sweet Valley Library</h1>
          <p className="text-blue-200 text-sm mt-1">Sweet Valley Primary School</p>
        </div>
        <button className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-100">
          Librarian Login
        </button>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 px-8">
        <h2 className="text-4xl font-bold text-blue-800 mb-4">
          Find Your Next Favourite Book! 🌟
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Browse our library, read reviews from other kids, and discover amazing stories.
        </p>
        <input
          type="text"
          placeholder="🔍 Search for a book or author..."
          className="w-full max-w-lg border-2 border-blue-300 rounded-full px-6 py-3 text-lg focus:outline-none focus:border-blue-600"
        />
      </section>

      {/* Filter Buttons */}
      <section className="px-8 mb-8 flex flex-wrap gap-3 justify-center">
        {["All", "Adventure", "Fantasy", "Mystery", "Science", "Animals", "Funny"].map((genre) => (
          <button
            key={genre}
            className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-medium hover:bg-blue-700 hover:text-white transition"
          >
            {genre}
          </button>
        ))}
      </section>

      {/* Books Grid */}
      <section className="px-8 pb-16">
        <h3 className="text-2xl font-bold text-blue-800 mb-6">📖 Our Books</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((book) => (
            <div key={book} className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">
              <div className="bg-blue-200 rounded-xl h-40 mb-3 flex items-center justify-center text-5xl">
                📘
              </div>
              <h4 className="font-bold text-gray-800">Book Title Here</h4>
              <p className="text-gray-500 text-sm">Author Name</p>
              <p className="text-yellow-500 text-sm mt-1">⭐⭐⭐⭐⭐</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}