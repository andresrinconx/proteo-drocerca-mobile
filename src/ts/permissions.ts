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

export interface PermissionWithUser extends Permission {
  name: string;
  status: string;
}

export interface PermissionForm extends PermissionWithUser {
  isLoading: boolean;
  isFetching: boolean;
  pickerMode: 'date' | 'time' | string;
  currentPickerValue: 'finicial' | 'hsalida' | 'ffinal' | 'hingreso' | 'hcita' | string;
  isPickerOpen: boolean;
}

export type PermissionFormProps = 
  | { status: 'create'; id?: never }
  | { status: 'update' | 'approval'; id: string }

export interface UserPermission {
  id: string;
  date:   string;
  place:  string;
  status: string;
}

export interface BossPermission {
  id: string;
  date:   string;
  time:   string;
  name:   string;
  status: string;
}