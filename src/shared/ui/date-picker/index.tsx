import { FC, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import DatePicker, { registerLocale } from 'react-datepicker';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ru } from 'date-fns/locale/ru';

import './styles.scss';

registerLocale('ru', ru);

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
        locale="ru"
        popperPlacement="bottom-start"
        isClearable
        selected={startDate}
        onChange={datePickerEvent}
      />
    </div>
  );
};
