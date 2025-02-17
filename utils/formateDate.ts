import { parseISO, format } from "date-fns";

export function formatDate(dateString: any) {
  if (!dateString) return "";
  const date = parseISO(dateString);
  return format(date, "d MMM, yyyy");
}

export function formatTime(dateString: string) {
  const date = new Date(dateString);

  // Convert to local time with AM/PM format
  const localTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  return localTime;
}

export function timesAgo(dateString: string) {
  // Convert the dateString to a Date object
  const givenDate: Date = new Date(dateString);

  // Get the current time
  const now: Date = new Date();

  // Calculate the difference in milliseconds
  const diffInMs = now.getTime() - givenDate.getTime();

  // Convert the difference to different time units
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  // Determine how to display the difference
  let timeAgo;

  // If the time difference is greater than 2 hours, return the formatted date and time in IST
  if (diffInHours >= 2) {
    const dateOptions: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata", // Set the timezone to IST
    };

    const formattedDate = givenDate.toLocaleDateString("en-US", dateOptions);
    const formattedTime = givenDate
      .toLocaleTimeString("en-US", timeOptions)
      .replace(":", "."); // Replace colon with a dot in the time

    timeAgo = `${formattedDate}  , ${formattedTime}`;
  }
  // Else if less than 2 hours, return "hours ago" or "minutes ago"
  else if (diffInHours >= 1) {
    timeAgo = `${diffInHours} hours ago`;
  } else if (diffInMinutes < 60) {
    timeAgo = `${diffInMinutes} minutes ago`;
  } else {
    const diffInSeconds = Math.floor(diffInMs / 1000);
    timeAgo = `${diffInSeconds} seconds ago`;
  }

  return timeAgo;
}
