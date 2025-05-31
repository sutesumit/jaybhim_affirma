import { AuthResult, AuthState, User } from "@/lib/auth/auth-types";


export interface AuthContextType extends AuthState {
    setUser: (user: User | null) => (void)
    revalidate: ()=> Promise<void>
    logout: ()=>Promise<void>
}


