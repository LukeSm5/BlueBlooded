export const validatePassword = (password: string): string | null => {
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  if (password.length > 20) {
    return 'Password must be no more than 20 characters long';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  const trimmed = email.trim();
  if (!trimmed) {
    return 'Email is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validateUsername = (username: string): string | null => {
  const trimmed = username.trim();
  if (!trimmed) {
    return 'Username is required';
  }
  if (trimmed.length < 3) {
    return 'Username must be at least 3 characters long';
  }
  if (trimmed.length > 20) {
    return 'Username must be no more than 20 characters long';
  }
  return null;
};