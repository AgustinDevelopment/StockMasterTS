"use strict";
// Configuracion del servidor
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const express_1 = __importDefault(require("express"));
const colors_1 = __importDefault(require("colors"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const db_1 = __importDefault(require("./config/db"));
// Conectar a la BD
async function connectDB() {
    try {
        await db_1.default.authenticate();
        db_1.default.sync();
        // console.log(colors.bgBlue.white('Conexion Exitosa a la BD'))
    }
    catch (error) {
        // console.log(error)
        console.log(colors_1.default.bgRed.white('Hubo un error al conectar a la BD'));
    }
}
connectDB();
// Instancia de express
const server = (0, express_1.default)();
// Permitir conexiones
const corsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Error de CORS'));
        }
    }
};
server.use((0, cors_1.default)(corsOptions));
// Leer datos de formularios
server.use(express_1.default.json());
// server.use(morgan('dev'))
server.use('/api/products', router_1.default);
server.get('/api', (req, res) => {
    res.json({ msg: 'Desde API' });
});
exports.default = server;
//# sourceMappingURL=server.js.map