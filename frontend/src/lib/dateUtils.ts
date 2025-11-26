/**
 * Formats a date according to the app's requirements:
 * - "today" for same day
 * - "yesterday" for previous day
 * - "MMM DD" for older dates
 */
export function formatNoteDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  // Reset time to compare only dates
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const noteDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Calculate difference in days
  const diffTime = today.getTime() - noteDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "today";
  } else if (diffDays === 1) {
    return "yesterday";
  } else {
    // Format as "MMM DD"
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }
}

/**
 * Formats a full timestamp for detailed display
 */
export function formatFullTimestamp(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
