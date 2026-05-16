import { fetchAPI } from '@/src/lib/fetch';

/**
 * Checks if a Clerk user exists in the MongoDB database.
 * If not, it automatically syncs them.
 */
export const syncUserToDatabase = async (user: any) => {
    if (!user) return;
    
    try {
        // Check if user exists in the database
        await fetchAPI(`/(api)/user/${user.id}`);
    } catch (err: any) {
        // If the user doesn't exist (e.g. 404 error), create them in the db
        if (err.message?.includes('404')) {
            try {
                await fetchAPI('/(api)/user', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || 'User',
                        email: user.emailAddresses?.[0]?.emailAddress || '',
                        clerkId: user.id,
                    }),
                });
                console.log("User successfully synced to database");
            } catch (createErr) {
                console.error("Failed to sync user:", createErr);
            }
        }
    }
};
