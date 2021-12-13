import React from 'react';
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import pl from 'date-fns/locale/pl';

registerLocale('pl', pl);

const DateSelect = ({title, selected, onChange}) => (
  <div>
    <div className="flex justify-between">
      <label className="font-semibold text-gray-900">{title}</label>
    </div>
    <div className="mt-1">
      <DatePicker
        className="w-full px-3 py-2 flex items-center justify-between bg-white border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
        locale="pl"
        selected={selected}
        onChange={(date) => onChange(date)}
        showTimeSelect
        minDate={moment().add(1, 'day').set({hour: 9, minute: 0}).toDate()}
        dateFormat="dd/MM/yyyy HH:mm"
        timeFormat="HH:mm"
      />
    </div>
  </div>
);

export default DateSelect;
