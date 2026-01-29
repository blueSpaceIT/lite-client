export interface IPayStationInitiateResponse {
    status_code: string;
    status: 'success' | 'failed';
    message: string;
    payment_url?: string;
    invoice_number?: string;
}