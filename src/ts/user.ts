export interface Auth {
  status: 'checking' | 'authenticated' | 'notAuthenticated';
  isBoss: boolean;
  isHRBoss: boolean;
}

export interface Login {
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
