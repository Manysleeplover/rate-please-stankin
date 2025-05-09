'use client' // Убедитесь, что компонент является клиентским

import {useSession} from "next-auth/react";

export default function Page() {
    const { data: session } = useSession();

    if (!session) {
        return <div className="text-center py-8">Not signed in</div>;
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-8">
            <div className="p-8">
                <div className="flex items-center mb-6">
                    {session.user.image && (
                        <img
                            className="h-16 w-16 rounded-full mr-4 object-cover"
                            src={session.user.image}
                            alt="User avatar"
                        />
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{session.user.name}</h1>
                        <p className="text-gray-600">{session.user.email}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h2 className="text-sm font-medium text-gray-500">User ID</h2>
                        <p className="mt-1 text-sm text-gray-900 break-all">{session.user.id}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h2 className="text-sm font-medium text-gray-500">Role</h2>
                        <p className="mt-1 text-sm text-gray-900">{session.user.role || 'No role assigned'}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h2 className="text-sm font-medium text-gray-500">Access Token</h2>
                        <p className="mt-1 text-sm text-gray-900 break-all font-mono truncate">
                            {session.user.token || 'No token available'}
                        </p>
                        {session.user.token && (
                            <p className="mt-2 text-xs text-gray-500">
                                Warning: Tokens should be handled securely and not exposed unnecessarily
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                        Signed in via {session.provider || 'unknown provider'}
                    </p>
                    <p className="text-sm text-gray-500">
                        Session expires: {new Date(session.expires).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    )
}