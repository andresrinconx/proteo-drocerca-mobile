export const capitalize = (text: string): string => text[0]?.toUpperCase() + text?.substring(1).toLowerCase();

export const capitalizeEveryWord = (text: string) => text?.split(' ').map(word => capitalize(word)).join(' ');

export const getCurrency = (currency: string, amount: string) => `${currency} ${amount}`;