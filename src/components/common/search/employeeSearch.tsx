'use client';
import React from 'react';
import { Input, Select } from 'antd';
import { useDebounce } from '@/utils/useDebounce';

const { Option } = Select;

const EmployeeSearch: React.FC = () => {
  /*eslint-disable @typescript-eslint/no-unused-vars */

  const handleSearchEmployee = async (
    e: React.ChangeEvent<HTMLInputElement>,
    keyValue: string,
    isSelect: boolean,
  ) => {
    const value = isSelect ? e : e.target.value;
  };

  /* eslint-disable @typescript-eslint/no-unused-vars */

  const onSearchChange = useDebounce(handleSearchEmployee, 2000);
  return (
    <div className="flex flex-col items-center space-y-4 w-full pb-4">
      <div className="flex flex-wrap w-full">
        <div className="w-full md:w-1/2 p-2">
          <Input
            placeholder="Search company"
            onChange={(e) => onSearchChange(e, 'companyName', false)}
            className="w-full h-14"
            allowClear
          />
        </div>
        <div className="w-full md:w-1/4 p-2" id="subscriptionTypeFilter">
          <Select
            placeholder="Subscription Type"
            onChange={(value) =>
              onSearchChange(value, 'subscriptionType', true)
            }
            allowClear
            className="w-full h-14"
          >
            <Option value="Premium">Premium</Option>
          </Select>
        </div>
        <div className="w-full md:w-1/4 p-2" id="subscriptionStatusFilter">
          <Select
            placeholder="Subscription Status"
            onChange={(value) =>
              onSearchChange(value, 'subscriptionStatus', true)
            }
            allowClear
            className="w-full h-14"
          >
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSearch;
