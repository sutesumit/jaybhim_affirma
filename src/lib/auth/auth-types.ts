export interface User {
    id: string;
    phone?: string | null;
    email?: string | null,
    created_at: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    error: string | null
}

export type AuthStep = 'input' | 'otp' | 'verified'

export type AuthMethod = 'email' | 'phone'

export interface AuthResult {
    success: boolean;
    error?: string;
    user?: User
}

export interface OtpResult {
    success: boolean;
    error?: string;
    message?: string;
}

export interface AuthCardProps {
    onAuthSuccess?: (user: User) => void;
    onAuthError?: (error: string) => void;
    title?: string
    subtitle?: string;
    className?: string;
}

export interface PhoneInputProps {
    phone: string;
    loading: boolean;
    error?: string;
    onChange: (value: string) => void;
    onSubmit: (phone: string) => Promise<void>;
}

export interface EmailInputProps {
    email: string;
    loading: boolean;
    error?: string;
    onChange: (value: string) => void;
    onSubmit: (phone: string) => Promise<void>;
}


export interface OtpInputProps {
    otp: string,
    loading: boolean;
    error?: string;
    onChange: (value: string) => void;
    onSubmit: (otp: string) => Promise<void>;
    onResendOtp?: () => Promise<void>
    onEditContact?: () => void
}
