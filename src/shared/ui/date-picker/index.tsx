import { FC, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import DatePicker from 'react-datepicker';

import './styles.scss';

type DateValue = Date | null;

interface DatePickerProps {
  value: DateValue;
  onSelected: (dateStringValue: string) => void;
}

export const DatePickerShared: FC<DatePickerProps> = ({
  onSelected,
  value,
}) => {
  const [startDate, setStartDate] = useState<DateValue>(value);

  useEffect(() => {
    const stringValue = value?.toLocaleDateString() ?? '';

    // TODO разобраться с этим
    onSelected(stringValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const datePickerEvent = (date: DateValue) => {
    const stringValue = date?.toLocaleDateString() ?? '';
    setStartDate(date);

    onSelected(stringValue);
  };

  return (
    <div className="date-picker-wrapper">
      <DatePicker
        dateFormat="dd.MM.yyyy"
        className="date-picker"
        popperPlacement="bottom-start"
        isClearable
        selected={startDate}
        onChange={datePickerEvent}
      />
    </div>
  );
};
