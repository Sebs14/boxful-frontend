'use client';

import { DatePicker } from 'antd';
import { IoCalendarOutline } from 'react-icons/io5';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

const { RangePicker } = DatePicker;

interface DateRangePickerProps {
  value?: [string, string] | null;
  onChange?: (dates: [string, string] | null) => void;
  placeholder?: [string, string];
  className?: string;
  disabled?: boolean;
}

export default function DateRangePicker({
  value,
  onChange,
  placeholder = ['Desde mes/año', 'Hasta mes/año'],
  className = '',
  disabled = false,
}: DateRangePickerProps) {
  const handleChange = (dates: null | [Dayjs | null, Dayjs | null]) => {
    if (dates && dates[0] && dates[1]) {
      // Para meses, tomamos el primer día del mes inicial y el último día del mes final
      const startOfMonth = dates[0].startOf('month').format('YYYY-MM-DD');
      const endOfMonth = dates[1].endOf('month').format('YYYY-MM-DD');

      const formattedDates: [string, string] = [startOfMonth, endOfMonth];
      onChange?.(formattedDates);
    } else {
      onChange?.(null);
    }
  };

  const parsedValue: [Dayjs, Dayjs] | null = value
    ? [dayjs(value[0]), dayjs(value[1])]
    : null;

  return (
    <div className={`relative w-full ${className}`}>
      <RangePicker
        value={parsedValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        picker='month'
        format='MMM YYYY'
        className='w-full h-12 px-3 bg-white border border-[#EDEDED] font-mona-sans rounded-lg shadow-sm transition-colors outline-none focus:outline-none focus:ring-0 focus:border-[#EDEDED] hover:border-[#EDEDED]'
        suffixIcon={<IoCalendarOutline size={20} className='text-[#4E4C4C]' />}
        style={{
          fontFamily: 'inherit',
        }}
      />

      <style jsx global>{`
        .ant-picker {
          border-radius: 8px !important;
          border-color: #ededed !important;
          box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05) !important;
        }

        .ant-picker:hover {
          border-color: #ededed !important;
        }

        .ant-picker-focused {
          border-color: #ededed !important;
          box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05) !important;
        }

        .ant-picker-input > input {
          font-family: inherit !important;
          font-size: 14px !important;
          color: #111827 !important;
        }

        .ant-picker-input > input::placeholder {
          color: #9ca3af !important;
          font-family: inherit !important;
        }

        .ant-picker-separator {
          color: #9ca3af !important;
        }

        .ant-picker-dropdown {
          border-radius: 12px !important;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
            0 4px 6px -4px rgb(0 0 0 / 0.1) !important;
        }

        .ant-picker-panel-container {
          border-radius: 12px !important;
        }

        .ant-picker-header {
          border-bottom: 1px solid #f3f4f6 !important;
        }

        .ant-picker-header-view button {
          font-family: inherit !important;
          color: #374151 !important;
        }

        .ant-picker-content th,
        .ant-picker-content td {
          font-family: inherit !important;
        }

        .ant-picker-cell-in-view {
          color: #374151 !important;
        }

        .ant-picker-cell-today .ant-picker-cell-inner::before {
          border: 1px solid #2563eb !important;
        }

        .ant-picker-cell-selected .ant-picker-cell-inner {
          background: #2563eb !important;
          color: white !important;
        }

        .ant-picker-cell-range-start .ant-picker-cell-inner,
        .ant-picker-cell-range-end .ant-picker-cell-inner {
          background: #2563eb !important;
          color: white !important;
        }

        .ant-picker-cell-in-range .ant-picker-cell-inner {
          background: #dbeafe !important;
          color: #2563eb !important;
        }

        .ant-picker-cell:hover .ant-picker-cell-inner {
          background: #f3f4f6 !important;
        }

        .ant-picker-footer {
          border-top: 1px solid #f3f4f6 !important;
        }

        .ant-picker-now-btn,
        .ant-picker-today-btn {
          color: #2563eb !important;
          font-family: inherit !important;
        }

        .ant-picker-ok {
          background: #2563eb !important;
          border-color: #2563eb !important;
          font-family: inherit !important;
        }

        .ant-picker-ok:hover {
          background: #1d4ed8 !important;
          border-color: #1d4ed8 !important;
        }
      `}</style>
    </div>
  );
}
