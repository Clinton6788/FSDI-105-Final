document.addEventListener('DOMContentLoaded', function() {
    const monthYearElement = document.getElementById('month-year');
    const selectedDateElement = document.getElementById('selected-date');
    const bookingSlotsElement = document.getElementById('booking-slots');
    const calendarGrid = document.querySelector('.calendar-grid');

    let currentDate = new Date();
    let bookings = {}; // Store bookings in a dictionary
    let selectedSlot = null; // Track currently selected slot

    function renderCalendar(date) {
        calendarGrid.innerHTML = ''; // Clear previous content
        bookingSlotsElement.innerHTML = ''; // Clear previous slots

        // Get first day of the month
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        // Get day of the week for the first and last days
        const startDay = firstDay.getDay();
        const endDate = lastDay.getDate();

        // Display the month and year
        monthYearElement.textContent = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;

        // Fill the calendar with days
        for (let i = 0; i < startDay; i++) {
            calendarGrid.innerHTML += '<div></div>'; // Empty cells before the first day
        }

        for (let i = 1; i <= endDate; i++) {
            const dayCell = document.createElement('div');
            dayCell.textContent = i;
            dayCell.addEventListener('click', () => {
                showBookingSlots(date.getFullYear(), date.getMonth() + 1, i);
            });
            calendarGrid.appendChild(dayCell);
        }
    }

    function showBookingSlots(year, month, day) {
        const dateKey = `${year}-${month}-${day}`;
        selectedDateElement.textContent = `Selected Date: ${day}/${month}/${year}`;
        
        // Clear previous slots
        bookingSlotsElement.innerHTML = '';

        // Generate booking slots
        for (let hour = 0; hour < 24; hour++) {
            const slot = document.createElement('div');
            slot.classList.add('slot');
            slot.textContent = `${hour}:00`;

            if (bookings[dateKey] && bookings[dateKey].includes(hour)) {
                slot.classList.add('booked');
                slot.textContent += ' (Booked)';
            } else {
                slot.addEventListener('click', () => {
                    handleSlotClick(year, month, day, hour, slot);
                });
            }

            bookingSlotsElement.appendChild(slot);
        }
    }

    function handleSlotClick(year, month, day, hour, slot) {
        // Deselect previously selected slot
        if (selectedSlot && selectedSlot !== slot) {
            selectedSlot.classList.remove('selected');
        }

        // Check if the slot is already booked
        const dateKey = `${year}-${month}-${day}`;
        if (bookings[dateKey] && bookings[dateKey].includes(hour)) {
            return; // Cannot select a booked slot
        }

        // Toggle selection
        if (selectedSlot === slot) {
            slot.classList.remove('selected');
            selectedSlot = null; // Deselect if the same slot is clicked again
        } else {
            slot.classList.add('selected');
            selectedSlot = slot;
        }
    }

    function bookSlot(year, month, day, hour) {
        const dateKey = `${year}-${month}-${day}`;
        if (!bookings[dateKey]) {
            bookings[dateKey] = [];
        }

        if (!bookings[dateKey].includes(hour)) {
            bookings[dateKey].push(hour);
            showBookingSlots(year, month, day); // Refresh slots
        }
    }

    function goToPreviousMonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    }

    function goToNextMonth() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    }

    document.getElementById('prev-month').addEventListener('click', goToPreviousMonth);
    document.getElementById('next-month').addEventListener('click', goToNextMonth);

    // Initial render
    renderCalendar(currentDate);
});


