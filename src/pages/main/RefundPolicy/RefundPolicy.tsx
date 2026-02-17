import ContainerSM from "../../../components/common/Container/ContainerSM";

const RefundPolicy = () => {
    return (
        <div className="refund-policy py-10">
            <ContainerSM>
                <h3 className="text-xl lg:text-3xl text-center font-bold mb-6">
                    Refund Policy
                </h3>

                <p className="mb-4">
                    Thank you for choosing <strong>Lite Edu</strong>. Please read our refund policy carefully before enrolling in any of our courses or purchasing our products.
                </p>

                <ol className="list-decimal pl-6 space-y-6">
                    <li>
                        <h4 className="text-lg font-bold mb-2 inline">General Policy</h4>
                        <p className="mt-2">
                            Our courses and services are non-refundable once enrollment is confirmed. As we provide digital educational content that is accessible immediately upon purchase, we encourage students to review course details, syllabus, and demo classes (if available) before making a purchase.
                        </p>
                    </li>
                    <li>
                        <h4 className="text-lg font-bold mb-2 inline">Exceptions</h4>
                        <p className="mt-2">
                            Refunds may be considered in exceptional cases, such as the cancellation of a course by <strong>Lite Edu</strong> or technical issues that prevent access to the service for an extended period. Any such refund request must be submitted within 7 days of the purchase or the issue occurring.
                        </p>
                    </li>
                    <li>
                        <h4 className="text-lg font-bold mb-2 inline">Course Migration</h4>
                        <p className="mt-2">
                            As stated in our Terms & Conditions, migration from one course to another is generally not allowed. In cases where migration is permitted (e.g., from online to offline), the difference in fees must be paid, and no refund will be provided for any difference if switching to a lower-priced course.
                        </p>
                    </li>
                    <li>
                        <h4 className="text-lg font-bold mb-2 inline">Processing Refunds</h4>
                        <p className="mt-2">
                            If a refund is approved, it will be processed using the original method of payment. Please allow up to 14 business days for the refund to be reflected in your account, depending on your bank or payment provider's processing time.
                        </p>
                    </li>
                    <li>
                        <h4 className="text-lg font-bold mb-2 inline">Contact Information</h4>
                        <p className="mt-2">
                            For any refund-related inquiries, please contact our support team at <a href="mailto:liteedu@gmail.com" className="text-primary hover:underline">liteedu@gmail.com</a> with your enrollment details and transaction ID.
                        </p>
                    </li>
                </ol>
            </ContainerSM>
        </div>
    );
};

export default RefundPolicy;
