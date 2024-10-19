import { GetProp, SelectProps, TablePaginationConfig, TableProps } from 'antd';

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

type PhoneNumber = number | number[] | string[];

export interface DataType {
  key: string;
  id: string;
  contactPerson: string;
  email: string;
  phoneNumber: PhoneNumber;
  organizationName: string;
  organizationDomain: string;
  office: string;
  paymentStatus: string;
  status: boolean;
  accountStatus: string;
  avatar: string;
  subscriptionDate: string;
  subscriptionEndDate: string;
  [key: string]: string | boolean | number | React.Key | PhoneNumber;
}

export interface TableRowSelection<T> {
  selectedRowKeys?: React.Key[];
  onChange?: (
    selectedRowKeys: React.Key[],
    selectedRows: T[],
    info: any,
  ) => void;
  onSelect?: (
    record: T,
    selected: boolean,
    selectedRows: T[],
    nativeEvent: Event,
  ) => void;
  onSelectMultiple?: (
    selected: boolean,
    selectedRows: T[],
    changeRows: T[],
  ) => void;
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
  hideSelectAll?: boolean;
}

export interface FilterDropdownProps {
  setSelectedKeys: (keys: string[]) => void;
  selectedKeys: string[];
  confirm: () => void;
  clearFilters: () => void;
}

export type TagRender = SelectProps['tagRender'];

export interface CustomTagProps {
  label: string;
}

export interface TenantTableProps {
  data: DataType[];
  isLoading: boolean;
  totalItems: number;
}

// test interface

export interface Tenant {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  companyName: string;
  companyEmail: string;
  phoneNumber: string;
  address: string | null;
  businessSize: string | null;
  industry: string | null;
  country: string | null;
  region: string | null;
  timezone: string | null;
  subscriptionDate: string;
  subscriptionEndDate: string;
  subscriptionType: string;
  subscriptionStatus: string;
  billingEmail: string | null;
  billingPhoneNumber: string | null;
  notes: string | null;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonPhoneNumber: string;
}

export interface MetaData {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface TenantApiResponse {
  data: {
    items: Tenant[];
    meta: MetaData;
  };
}
