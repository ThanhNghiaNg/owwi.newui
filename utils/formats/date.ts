export function formatDate(isoDateString: string, format= 'dd/mm/yyyy'): string {
    const date = new Date(isoDateString);
    
    // Get day, month, and year in local timezone (+07:00)
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so +1
    const year = date.getFullYear();

    const result: string[] = [];
    (format).toLocaleLowerCase().split('/').forEach(part => {
        switch (part) {
            case 'dd':
                result.push(day)
                break;
            case 'mm':
                result.push(month)
                break;
            case 'yyyy':
                result.push(String(year))
                break;
            default:
                throw new Error(`Unsupported format part: ${part}`);
        }
    })    
    return result.join('/');
  }