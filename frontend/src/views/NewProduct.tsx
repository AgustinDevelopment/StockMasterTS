import { Link } from 'react-router-dom'

export default function NewProducts() {
  return (
    <>
      <div className='flex justify-between'>
            <h2 className='text-4xl font-black text-slate-700'>Registrar Producto</h2>
            <Link
                to="/"
                className='rounded-md bg-slate-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-slate-500'
            >
                Volver a Producto
            </Link>

        </div>
    </>
  )
}
