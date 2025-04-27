/**
 * Format a date string
 * @param {string|Date} dateInput - Date string or Date object
 * @param {string} [locale=en-US] - Locale for formatting
 * @returns {string} - Formatted date string
 */
export function FormatDate(dateInput:any, locale = "en-US") {
    if (!dateInput) return "";
  
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "";
  
    return date.toLocaleString(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  