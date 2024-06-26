import { Sequelize } from "sequelize";

const db = new Sequelize('postgresql://rest_api_node_typescript_bzzm_user:15bwgkwAlBjAR9klZaj5VlHaYQTgIPvw@dpg-cplghn7109ks73dsedvg-a.oregon-postgres.render.com/rest_api_node_typescript_bzzm?ssl=true')

export default db