export interface Permission {
  tiposol:   string;
  finicial:  string | Date;
  hsalida:   string | Date;
  ffinal:    string | Date;
  hingreso:  string | Date;
  totald:    string;
  tipomot:   string;
  hcita:     string | Date;
  lugar:     string;
  mot:       string;
  fsolicita: string | Date;
}

export interface PermissionForm extends Permission {
  isFetching: boolean;
  pickerMode: 'date' | 'time' | string;
  currentPickerValue: 'finicial' | 'hsalida' | 'ffinal' | 'hingreso' | 'hcita' | string;
  isPickerOpen: boolean;
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