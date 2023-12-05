export interface Payroll {
  date:       string;
  number:     string;
  assignment: string;
  deduction:  string;
  paid:       string;
  items:      PayrollItem[];
}

export interface PayrollItem {
  concept:    string;
  assignment: string;
  deduction:  string;
  paid:       string;
}
