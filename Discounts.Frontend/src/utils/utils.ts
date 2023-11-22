export function formatTimestampToHHMM(timestamp: string): string {
    const date = new Date(timestamp);
    const formattedTime = date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    return formattedTime;
}