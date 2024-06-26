import { Table, Column, Model, DataType } from 'sequelize-typescript' // Importamos los decoradores

@Table({

    tableName: 'products'

})

class Product extends Model {

    @Column({
        type: DataType.STRING(100)
    })
    name: string

    @Column({
        type: DataType.FLOAT
    })
    price: number

    @Column({
        type: DataType.BOOLEAN
    })
    availability: boolean

}

export default Product