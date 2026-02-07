// Email validation
export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Password validation
export interface PasswordValidation {
    valid: boolean;
    errors: string[];
}

export function validatePassword(password: string): PasswordValidation {
    const errors: string[] = [];

    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

// Task title validation
export function validateTaskTitle(title: string): { valid: boolean; error?: string } {
    if (!title || title.trim().length === 0) {
        return {
            valid: false,
            error: 'Task title is required',
        };
    }

    if (title.length > 200) {
        return {
            valid: false,
            error: 'Task title must be less than 200 characters',
        };
    }

    return { valid: true };
}
