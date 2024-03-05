import {connect} from "@/dbconfig/dbConfig";
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request: NextRequest){
    try{

        const reqBody = await request.json()
        const {username, email, password} = reqBody;

        console.log(reqBody);

        // check user already exist
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({
                error: "User already exist"
            },
            {status: 400}
            )
        }


        // hashedPassword
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);


        const newUser = new User({
            userName: username, 
            email,
            password: hashedPassword
        })

        console.log(newUser);


        const savedUser  = await newUser.save()

        console.log("Saved user");

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    }catch(error: any){
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}