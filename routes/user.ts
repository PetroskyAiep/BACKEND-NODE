import { Request, Response, Router } from "express";
import userModel from "../models/user.model";
import bcrypt from "bcryptjs";
import Token from "../dist/classes/token";




const userRoutes = Router();

userRoutes.get('/', (req:Request,res:Response)=>{
    return res.json({
        ok:true,
        msj:'Todo funcionando correctamente'
    });

});

userRoutes.post('/',(req:Request,res:Response)=>{
    
    const user = {
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,10)
    }

    userModel.create(user).then((userDb:any)=>{

        res.json({
            ok:true,
            user : userDb
        })

    })
});

userRoutes.post('/login',(req:Request,res:Response)=>{
    const body = req.body;
    userModel.findOne({where :{ email : body.email }}).then(async (userDb:any)=>{
        if(!userDb){
            return res.json({
                ok:false,
                msj:"Usuario o contraseña incorrecta"
            })
        }

        if(! await bcrypt.compareSync(body.password,userDb.password))
        {
            console.log('db: \''+userDb.password+'\' /s: \''+body.password + '\' /c: '+(body.password == userDb.password) )
            return res.json({
                ok:false,
                msj:"Usuario o contraseña incorrecta xx"
            })
        }   

        const tokenUser = Token.getJwtToken({
            id:userDb.id,
            name : userDb.name,
            email: userDb.email
        })

        return res.json({
            ok:true,
            token:tokenUser
        })

    })


});

userRoutes.put('/',(req:Request,res:Response)=>{
    return res.json({
        ok:true
    })

})

export default userRoutes;