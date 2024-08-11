import { createBrowserRouter } from 'react-router-dom'
import Layaout from './layouts/Layout'
import Products from './views/Products'
import NewProduct from './views/NewProduct'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layaout/>,
        children: [
            {
                index: true,
                element: <Products />
            },

            {
                path: 'productos/nuevo',
                element: <NewProduct />
            }
        ]
    }
])