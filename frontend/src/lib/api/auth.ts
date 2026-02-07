import apiClient from './client';

export interface SignInRequest {
    email: string;
    password: string;
}

export interface SignUpRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    user: {
        id: string;
        email: string;
    };
}

export interface UserResponse {
    id: string;
    email: string;
}

// Auth API methods
export const authApi = {
    // Sign in
    signIn: async (data: SignInRequest): Promise<AuthResponse> => {
        const response = await apiClient.post('/auth/signin', data);
        return response.data;
    },

    // Sign up
    signUp: async (data: SignUpRequest): Promise<AuthResponse> => {
        const response = await apiClient.post('/auth/signup', data);
        return response.data;
    },

    // Sign out
    signOut: async (): Promise<void> => {
        await apiClient.post('/auth/signout');
    },

    // Get current user
    getCurrentUser: async (): Promise<UserResponse> => {
        const response = await apiClient.get('/auth/me');
        return response.data;
    },
};
