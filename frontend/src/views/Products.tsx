import { Link } from 'react-router-dom'

export default function Products() {
  return (
    <>
        <div className='flex justify-between'>
            <h2 className='text-4xl font-black text-slate-700'>Productos</h2>
            <Link
                to="productos/nuevo"
                className='rounded-md bg-slate-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-slate-500'
            >
                Agregar Producto
            </Link>

        </div>
    </>
  )
}
