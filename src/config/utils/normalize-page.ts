export const normalizePage = (page: number | null | undefined): number => {
    return (page !== undefined && page !== null && page > 0) ? page - 1 : 0;
};