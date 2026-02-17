import ContainerSM from "../../../components/common/Container/ContainerSM";

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy py-10">
            <ContainerSM>
                <h3 className="text-xl lg:text-3xl text-center font-bold mb-6">
                    Privacy Policy
                </h3>

                <p className="mb-4">
                    At <strong>Lite Edu</strong>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website, applications, and services.
                </p>

                <ol className="list-decimal pl-6 space-y-6">
                    <li>
                        <h4 className="text-lg font-bold mb-2 inline">Information We Collect</h4>
                        <p className="mt-2">
                            We collect information that you provide to us directly, such as your name, email address, phone number, and payment information when you register for an account or enroll in a course. We may also collect information about your usage of our services, including your IP address, browser type, and pages visited.
                        </p>
                    </li>
                    <li>
                        <h4 className="text-lg font-bold mb-2 inline">How We Use Your Information</h4>
                        <p className="mt-2">
                            We use your information to provide and improve our services, process your enrollments, communicate with you about your account, and send you updates and promotional materials. We do not sell or share your personal information with third parties for their marketing purposes.
                        </p>
                    </li>
                    <li>
                        <h4 className="text-lg font-bold mb-2 inline">Data Security</h4>
                        <p className="mt-2">
                            We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </li>
                    <li>
                        <h4 className="text-lg font-bold mb-2 inline">Your Choices</h4>
                        <p className="mt-2">
                            You can access and update your account information at any time by logging into your account. You can also opt-out of receiving promotional emails from us by following the instructions in those emails.
                        </p>
                    </li>
                    <li>
                        <h4 className="text-lg font-bold mb-2 inline">Changes to This Policy</h4>
                        <p className="mt-2">
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                        </p>
                    </li>
                    <li>
                        <h4 className="text-lg font-bold mb-2 inline">Contact Us</h4>
                        <p className="mt-2">
                            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:liteedu@gmail.com" className="text-primary hover:underline">liteedu@gmail.com</a>.
                        </p>
                    </li>
                </ol>
            </ContainerSM>
        </div>
    );
};

export default PrivacyPolicy;
