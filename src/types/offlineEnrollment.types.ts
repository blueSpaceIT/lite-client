export interface IOfflineEnrollment {
    _id: string;
    studentName: string;
    phone: string;
    studentId: string;
    email: string;
    address: string;
    class: {
        _id: string;
        title: string;
        isDeleted: boolean;
        deletedAt: string;
        createdAt: string;
        updatedAt: string;
        slug: string;
        __v: number;
    } | null;
    batch: any; // Based on the example, this is null
    month: string;
    status: string;
    courseFee: number;
    paidAmount: number;
    dueAmount: number;
    paymentStatus: string;
    payments: Array<{
        amount: number;
        month: string;
        method: string;
        transactionId: string;
        paymentDate: string;
        note: string;
        invoiceUrl: string;
        _id: string;
    }>;
    isDeleted: boolean;
    enrollmentDate: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
