import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';

// Table
export type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  noRecordsMessage?: string;
  showHeader?: boolean;
  minHeight?: number;
  maxHeight?: number;
  isLoading?: boolean;
  showSearch: true;
  iconSearch?: ImageSourcePropType;
  onSearch?: (item: T) => void;
  renderItem?: (item: T) => React.JSX.Element;
} | {
  columns: Column<T>[];
  data: T[];
  noRecordsMessage?: string;
  showHeader?: boolean;
  minHeight?: number;
  maxHeight?: number;
  isLoading?: boolean;
  showSearch?: false;
  iconSearch?: never;
  onSearch?: never;
  renderItem?: never;
};

// Column
export type Column<T> = 
  | { name: Extract<keyof T, string>; width: number; type: 'currency'; options: CurrencyOptions }
  | { name: Extract<keyof T, string>; width: number; type: 'status'; options: StatusOptions[] }
  | { name: Extract<keyof T, string>; width: number; type: 'text'; options?: never };

// Column options
interface CurrencyOptions {
  currency: string;
}

interface StatusOptions {
  value: string;
  bgColor: string;
  color?: string;
}