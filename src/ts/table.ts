// Table
export type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  noRecordsMessage?: string;
  currency?: string;
  showHeader?: boolean;
  showSearch: true;
  renderItem: (item: T) => React.JSX.Element;
} | {
  columns: Column<T>[];
  data: T[];
  noRecordsMessage?: string;
  currency?: string;
  showHeader?: boolean;
  showSearch?: false;
  renderItem?: never;
};

// Column
export type Column<T> = {
  name: Extract<keyof T, string>;
  width: number;
  type?: Exclude<ColumnType, 'status'>;
  options?: never;
} | {
  name: Extract<keyof T, string>;
  width: number;
  type?: 'status';
  options: ColumnOptions[]
};

interface ColumnOptions {
  value: string;
  bgColor: string;
  color?: string;
}

type ColumnType = 'currency' | 'status';