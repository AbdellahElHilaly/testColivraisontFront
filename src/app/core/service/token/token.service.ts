export interface TokenService{
  setToken(token: string): void;
  getToken(): string;
  removeToken(): void;
  hasToken(): boolean;
}
