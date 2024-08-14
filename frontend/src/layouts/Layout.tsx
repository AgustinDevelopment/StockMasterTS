import { Outlet } from 'react-router-dom'

export default function Layaout() {
  return (
    <>
        <header className='bg-slate-900'>
          <div className='mx-auto max-w-6xl py-10'>
            <h1 className='text-5xl font-extrabold text-white text-center'>StockMaster</h1>
          </div>
        </header>

        <main className='mt-10 mx-auto max-w-6xl p-10 bg-white shadow'>
          <Outlet />
        </main>

        <footer className="bg-slate-900 text-white py-10 mt-10">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left">
              <h2 className="text-lg font-bold text-white">StockMaster</h2>
              <p className="text-sm text-white">© 2024 Todos los derechos reservados.</p>
            </div>
            <div className="mt-4 md:mt-0 text-center">
              <h2 className="text-white font-bold text-lg">Proyecto Desarrollo de Software</h2>
            </div>
            <div className="mt-4 md:mt-0 text-center">
              <a href="https://github.com/AgustinDevelopment" className="rounded-md bg-slate-700 p-3 text-sm font-bold text-white shadow-sm hover:bg-slate-700' hover:bg-slate-800">GitHub/AgusDev</a>
            </div>
          </div>
        </footer>

        
    </>
  )
}
