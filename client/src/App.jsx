import OUATIH from '../assets/OUATIH.jpeg'

export default function App() {
  return (
    <main className="p-2.5 max-w-[800px] mx-auto">
      <header className="flex justify-between mb-12 mt-5 items-center">
        <a href="" className="no-underline text-[#222] font-bold text-2xl">My Blog</a>
        <nav className="flex gap-4 text-lg">
          <a href="">Login</a>
          <a href="">Register</a>
        </nav>
      </header>

      <div className="mb-9 grid grid-cols-[0.9fr_1.1fr] gap-10">
        <div>
          <img src={OUATIH} className="max-w-full w-4/5 mx-auto"></img>
        </div>
        <div>
          <h1 className='m-0 text-2xl font-bold'>
            The most Non Tarantino - Tarantinoish Quentin Tarantino movie
          </h1>
          <p className='mx-0 my-1.5 text-[#888] text-sm font-bold flex gap-2.5'>
            <a className='text-[#333]'>Jainil Patel</a>
            <time>17-06-2024 19:00</time>
          </p>
          <p className='my-2.5 mx-0 leading-6'>A joyous wake for movies that will probably will be remembered as the last movie ever made. But what a gift, it charts the course for better living through movie mindset. Movies are realer than reality. There is no past outside of the movies, so rather than be trapped reliving the nightmares of history why not make a better present by changing the past through art? And who better to save us from the atrocities of American history than two Hollywood bros?</p>
        </div>
      </div>

      <div className="mb-9 grid grid-cols-[0.9fr_1.1fr] gap-10">
        <div>
          <img src={OUATIH} className="max-w-full w-4/5 mx-auto"></img>
        </div>
        <div>
          <h1 className='m-0 text-2xl font-bold'>
            The most Non Tarantino - Tarantinoish Quentin Tarantino movie
          </h1>
          <p className='mx-0 my-1.5 text-[#888] text-sm font-bold flex gap-2.5'>
            <a className='text-[#333]'>Jainil Patel</a>
            <time>17-06-2024 19:00</time>
          </p>
          <p className='my-2.5 mx-0 leading-6'>A joyous wake for movies that will probably will be remembered as the last movie ever made. But what a gift, it charts the course for better living through movie mindset. Movies are realer than reality. There is no past outside of the movies, so rather than be trapped reliving the nightmares of history why not make a better present by changing the past through art? And who better to save us from the atrocities of American history than two Hollywood bros?</p>
        </div>
      </div>

    </main>
  )
}