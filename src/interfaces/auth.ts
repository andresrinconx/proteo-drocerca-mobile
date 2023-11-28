export interface Auth {
  status: 'checking' | 'authenticated' | 'notAuthenticated';
  isBoss: boolean;
}