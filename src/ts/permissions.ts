export interface Permission {
  lugar:     string;
  tiposol:   string;
  tipomot:   string;
  finicial:  string;
  ffinal:    string;
  hsalida:   string;
  hingreso:  string;
  totald:    string;
  mot:       string;
  hcita:     string;
  fsolicita: string;
}

export interface UserPermission {
  date:   string;
  place:  string;
  status: string;
}

export interface BossPermission {
  date:   string;
  time:   string;
  name:   string;
  status: string;
}