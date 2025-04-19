import 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: {
            id?: string
            username?: string
            email?: string
            token?: string
            role?: string
        },
        student: {
            access_token: string
            token_type: string
            userInfo: {
                name: string
                surname: string
                patronym: string
                stgroup: string
                cardid: string
            }
        }
    }
}