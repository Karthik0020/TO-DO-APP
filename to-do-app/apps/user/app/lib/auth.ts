import db from "@repo/db/client"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Enail" , type: "text" , placeholder:"abc@gmail.com" , required:true},
                password: {label: "Password" , type: "password" , required:true}
            },
            async authorize(credentials: any){
                const hashedPassword = await bcrypt.hash(credentials.password , 10);
                const existingUser = await db.user.findFirst({
                    where:{
                        email: credentials.email
                    }
                });
                if(existingUser){
                    const passwordValidation = await bcrypt.compare(credentials.password , existingUser.password)
                    if(passwordValidation){
                        return{
                            id: existingUser.id.toString(),
                            email: existingUser.email,
                            name: existingUser?.name                            
                        }
                    }
                    return null;
                }
                try{
                    const user = await  db.user.create({
                        data:{
                            email: credentials.email,
                            password: hashedPassword
                        }
                    });
                    return{
                        id: user.id.toString(),
                            email: user.email,
                            name: user?.name
                    }
                } catch (e){
                    console.error(e)
                }
                return null
            }
        })
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        async session({token , session} : any){
            session.user.id = token.sub
            return session
        }
    }
}