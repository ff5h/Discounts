export function formatTimestampToHHMM(timestamp: string): string {
    const date = new Date(timestamp);
    const formattedTime = date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    return formattedTime;
}

export function formatTimestampToUkrainianDate(timestamp: string): string {
    const date = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const formattedDate = date.toLocaleDateString('uk-UA', options);

    return formattedDate;
}
