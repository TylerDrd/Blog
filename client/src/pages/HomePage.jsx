export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-3xl font-bold">My Blog</h1>
          <div>
            <a href="/login" className="text-white mr-4">Login</a>
            <a href="/register" className="text-white">Register</a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <section className="text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Welcome to My Blog</h2>
          <p className="text-lg mb-6 text-gray-600">
            Discover insightful articles, latest news, and trending topics.
          </p>
          <a href="/login" className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-md shadow-md">
            Explore Posts
          </a>
        </section>

        <section className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src="https://via.placeholder.com/400" alt="Post 1" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Post Title 1</h3>
              <p className="text-gray-600">
                Brief description of the blog post content to entice readers to click and read more.
              </p>
              <a href="/post/1" className="text-blue-500 hover:underline mt-4 block">Read More</a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src="https://via.placeholder.com/400" alt="Post 2" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Post Title 2</h3>
              <p className="text-gray-600">
                Brief description of the blog post content to entice readers to click and read more.
              </p>
              <a href="/post/2" className="text-blue-500 hover:underline mt-4 block">Read More</a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src="https://via.placeholder.com/400" alt="Post 3" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Post Title 3</h3>
              <p className="text-gray-600">
                Brief description of the blog post content to entice readers to click and read more.
              </p>
              <a href="/post/3" className="text-blue-500 hover:underline mt-4 block">Read More</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 My Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

