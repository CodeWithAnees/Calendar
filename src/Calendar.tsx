import { useState } from 'react';

// Types
type CalendarProps = {
	date: Date;
};

type Day = {
	date: number;
	isCurrentMonth: boolean;
	isHighlighted: boolean;
};

// Function to get days in a month
const getDaysInMonth = (year: number, month: number): number => {
	return new Date(year, month + 1, 0).getDate();
};

const Calendar: React.FC<CalendarProps> = ({ date }) => {
	const [selectedDate, setSelectedDate] = useState<Date>(date);

	const year = selectedDate.getFullYear();
	const month = selectedDate.getMonth();
	const daysInMonth = getDaysInMonth(year, month);
	const firstDay = new Date(year, month, 1).getDay();

	const days: Day[] = [];
	for (let i = 1; i <= daysInMonth; i++) {
		const currentDate = new Date(year, month, i);
		const isCurrentMonth = currentDate.getMonth() === month;
		const isHighlighted =
			currentDate.toDateString() === selectedDate.toDateString();

		days.push({ date: i, isCurrentMonth, isHighlighted });
	}

	const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

	// Generate an array for empty days in the first week
	const emptyDaysArray = Array.from({ length: firstDay }, (_, i) => i);

	return (
		<div className="w-full max-w-md mx-auto">
			<div className="text-center mb-4">
				<h2 className="text-lg font-bold mb-2">
					{selectedDate.toLocaleString('default', {
						month: 'long',
						year: 'numeric',
					})}
				</h2>
			</div>
			<div className="grid grid-cols-7 gap-1">
				{weekDays.map((day) => (
					<div key={day} className="text-center font-bold">
						{day}
					</div>
				))}
				{emptyDaysArray.map((_, index) => (
					<div key={`empty-${index}`}></div>
				))}
				{days.map(({ date, isCurrentMonth, isHighlighted }) => (
					<div
						key={date}
						className={`text-center py-2 ${
							isHighlighted ? 'bg-blue-500 text-white' : ''
						} ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}
						onClick={() => setSelectedDate(new Date(year, month, date))}>
						{date}
					</div>
				))}
			</div>
		</div>
	);
};

export default Calendar;
