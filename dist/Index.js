"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const server_1 = __importDefault(require("./dist/classes/server"));
const user_1 = __importDefault(require("./routes/user"));
const connection_1 = __importDefault(require("./dist/classes/connection"));
const user_model_1 = __importDefault(require("./models/user.model"));
const server = new server_1.default();
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
server.app.use('/user', user_1.default);
function dbConn() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connection_1.default.authenticate(),
                console.log('Bd Online');
        }
        catch (error) {
            console.error('Ocurrio un error con la bd:', error);
        }
    });
}
;
function createModels() {
    return __awaiter(this, void 0, void 0, function* () {
        yield user_model_1.default.sync({ alter: true });
    });
}
;
//createModels();
dbConn();
server.start(() => {
    console.log("Servidor corriendo en el puerto: " + server.port);
});
