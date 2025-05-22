
export interface AuthContextType {
    isAuthenticated: boolean;
    userName?: string;
    email?: string;
    OTP?: string;
    setIsAuthenticated?: (isAuthenticated: boolean) => void;
    setEmail?: (email: string) => void;
    setOTP?: (OTP: string) => void;
}


