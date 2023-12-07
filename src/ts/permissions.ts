export interface Permission {
  tiposol:   string;
  finicial:  string;
  hsalida:   string;
  ffinal:    string;
  hingreso:  string;
  totald:    string;
  tipomot:   string;
  hcita:     string;
  lugar:     string;
  mot:       string;
  fsolicita: string;
}

export interface PermissionForm extends Permission {
  isPickerOpen: boolean;
  pickerMode: 'date' | 'time';
  currentPickerValue: string;
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