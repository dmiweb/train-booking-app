export const calcDurationTime = (departureTimestamp: number, arrivalTimestamp: number): string => {
    const departureDate = new Date(departureTimestamp * 1000);
    const arrivalDate = new Date(arrivalTimestamp * 1000);

    const diffMs = arrivalDate.getTime() - departureDate.getTime();

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${diffHours}:${diffMinutes.toString().padStart(2, '0')}`;
};