// Converts CSV date "June 24th, 2024" to the modal's displayed format "24 June,2024"
export function formatDateForModal(date: string): string {
    const match = date.match(/^([A-Za-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?,\s+(\d{4})$/);

    if (!match) {
        throw new Error(`Invalid date format: ${date}. Expected format: "June 24th, 2024"`);
    }

    const [, month, day, year] = match;
    return `${day.padStart(2, '0')} ${month},${year}`;
}
