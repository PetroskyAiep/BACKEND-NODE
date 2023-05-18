import bodyParser from "body-parser";
import Server from  "./dist/classes/server";
import userRoutes from "./routes/user";
import sequelize from "./dist/classes/connection";
import userModel from "./models/user.model";

const server = new Server();
server.app.use(bodyParser.urlencoded({ extended:true }));
server.app.use(bodyParser.json());
server.app.use('/user', userRoutes);

async function dbConn(){
    try{
        await sequelize.authenticate(),
        console.log('Bd Online');
    } catch(error){
        console.error('Ocurrio un error con la bd:',error);
    }
};

async function createModels() {
    await userModel.sync({alter:true})
};

//createModels();

dbConn();
server.start(()=>{

    console.log("Servidor corriendo en el puerto: "+server.port);

});