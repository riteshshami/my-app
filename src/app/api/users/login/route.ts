import {connect} from "@/dbconfig/dbConfig";
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log("Request", reqBody);

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User not exist"}, {status: 400})
        }

        const validPassword = await bcryptjs.compare(password, user.password);

        if(!validPassword){
            return NextResponse.json({error: "Invalid Password"},
                {status: 500})
        }

        // create token data
        const tokenData = {
            id: user._id,
            username: user.userName,
            email: user.email
        }

        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response;

    }catch(error: any){
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}