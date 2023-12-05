export const capitalize = (text: string): string => text[0].toUpperCase() + text.substring(1);

export const getCurrency = (currency: string, amount: string) => `${currency} ${amount}`;