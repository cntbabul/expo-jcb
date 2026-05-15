import { connectToDB } from '@/src/lib/mongoose';
import User from '@/src/models/User';

export async function POST(request: Request) {
    try {
        await connectToDB();

        const { name, email, clerkId } = await request.json();
        
        if (!name || !email || !clerkId) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newUser = await User.create({
            name,
            email,
            clerkId,
        });

        return Response.json({ data: newUser }, { status: 201 });
    } catch (error: any) {
        console.log("Error creating user:", error);
        
        // Handle MongoDB duplicate key errors
        if (error.code === 11000) {
            return Response.json({ error: "User already exists" }, { status: 409 });
        }
        
        return Response.json({ error: "Failed to create user" }, { status: 500 });
    }
}

