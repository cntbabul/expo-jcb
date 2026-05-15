import { connectToDB } from '@/src/lib/mongoose';
import User from '@/src/models/User';

export async function GET(request: Request, { id }: { id: string }) {
    if (!id) {
        return Response.json({ error: "Missing clerkId" }, { status: 400 });
    }

    try {
        await connectToDB();
        
        const user = await User.findOne({ clerkId: id });

        if (!user) {
            return Response.json({ data: null }, { status: 404 });
        }

        return Response.json({ data: user }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return Response.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}
