export type TSSLCommerzPaymentRequest = {
    totalAmount: number;
    invoiceID: string;
    name: string;
    phone: string;
    address: string;
    type: "purchase" | "order";
    callbackURL: string;
};

export type TSSLCommerzPaymentResponse = {
    status: "SUCCESS" | "FAILED";
    failedreason: string;
    sessionkey: string;
    GatewayPageURL: string;
};
