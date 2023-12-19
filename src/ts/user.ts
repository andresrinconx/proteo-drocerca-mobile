export interface Auth {
  status: 'checking' | 'authenticated' | 'notAuthenticated';
  id: string;
  isBoss: boolean;
  isHRBoss: boolean;
}

export interface Login {
  id: string;
  jwt: string;
  isBoss: boolean;
  isHRBoss: boolean;
}

export interface Profile {
  name:   string;
  email:  string;
  phone:  string;
  idCard: string;
}
