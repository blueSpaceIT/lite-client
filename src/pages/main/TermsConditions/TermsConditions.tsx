import ContainerSM from "../../../components/common/Container/ContainerSM";
import "./TermsConditions.css";

const TermsConditions = () => {
    return (
        <div className="terms py-10">
            <ContainerSM>
                <h3 className="text-xl lg:text-3xl text-center font-bold mb-6">
                    Terms & Conditions
                </h3>

                <p>
                    To avoid any potential conflicts, please refrain from using
                    the application, website, or services if you have any issues
                    with the terms or Privacy Policy. Our Application along with
                    all our services and products can only be accessed through a
                    registration/subscription.
                </p>

                <ol className="list-decimal pl-6">
                    <li>
                        General Use
                        <p>
                            By registering for and using the Lite Edu 
                            website, applications, or services (collectively,
                            “Services”), you agree to comply with these Terms &
                            Conditions. All content, materials, and intellectual
                            property on our platform are owned by Lite Edu 
                            and may not be reproduced, modified, or distributed
                            without permission. Users may only access Services
                            for personal, non-commercial purposes.
                        </p>
                    </li>
                    <li>
                        <p>Course Enrollment and Migration</p>

                        <ul className="list-[disc] pl-6">
                            <li>
                                <p>
                                    Learners must ensure their course selection
                                    is final before enrollment, as migration
                                    from one course to another is generally not
                                    allowed.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Offline-enrolled learners may migrate to
                                    online classes, but migration back to
                                    offline will not be permitted. Offline
                                    course fees are generally higher, and no
                                    refund will be provided if switching from
                                    offline to online.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Online-enrolled learners may migrate to any
                                    offline campus. In such cases, the
                                    difference between the offline course fee
                                    and the online fee already paid must be paid
                                    by the student.
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p>Class Schedule and Management</p>

                        <ul className="list-[disc] pl-6">
                            <li>
                                <p>
                                    Scheduling of classes, changes in class
                                    timing, topics, or instructors is at the
                                    sole discretion of Lite Edu .
                                </p>
                            </li>
                            <li>
                                <p>
                                    Students may provide feedback regarding
                                    schedules, but final decisions rest with the
                                    authority.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Examination methods and schedules may also
                                    be modified by the authority as necessary.
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p>Online Classroom Conduct</p>

                        <ul className="list-[disc] pl-6">
                            <li>
                                <p>
                                    Students must keep audio and video muted
                                    during classes. Unmute only to ask
                                    questions, then mute again. Questions should
                                    preferably be asked after completion of a
                                    topic.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Students must show respect toward
                                    instructors and fellow classmates.
                                    Harassment, bullying, or disruptive behavior
                                    is strictly prohibited.
                                </p>
                            </li>
                            <li>
                                <p>
                                    One student ID may not be shared with
                                    another.
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p>Content Use and Intellectual Property</p>

                        <ul className="list-[disc] pl-6">
                            <li>
                                <p>
                                    Class materials, videos, and content may not
                                    be downloaded, distributed, or used for
                                    commercial purposes. Uploading content
                                    elsewhere is strictly prohibited.
                                </p>
                            </li>
                            <li>
                                <p>
                                    By submitting content to the platform, users
                                    grant Lite Edu  a non-exclusive license
                                    to use, display, or distribute such content
                                    within the platform in accordance with these
                                    Terms.
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p>Account Responsibility</p>

                        <ul className="list-[disc] pl-6">
                            <li>
                                <p>
                                    Users must provide accurate and complete
                                    registration information. Users are
                                    responsible for the security of their
                                    accounts and any activity under their login
                                    credentials.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Students under the age of 18 must obtain
                                    parental or guardian consent to use the
                                    Services. Lite Edu  is not liable for any
                                    misuse by minors without proper consent.
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p>Liability and Disclaimer</p>

                        <ul className="list-[disc] pl-6">
                            <li>
                                <p>
                                    Lite Edu  provides all Services “as is”
                                    and does not guarantee uninterrupted access
                                    or error-free content.
                                </p>
                            </li>
                            <li>
                                <p>
                                    The institution is not responsible for any
                                    loss, damage, or liability resulting from
                                    the use of the Services, including technical
                                    issues, misuse, or external factors beyond
                                    our control.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Lite Edu  reserves the right to modify,
                                    suspend, or discontinue any Service,
                                    content, or feature at its discretion
                                    without prior notice.
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p>Compliance and Legal</p>

                        <ul className="list-[disc] pl-6">
                            <li>
                                <p>
                                    By using the Services, you agree to comply
                                    with all applicable laws and these Terms.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Any breach of these Terms may result in
                                    suspension or termination of access, and
                                    legal action may be taken where necessary.
                                </p>
                            </li>
                            <li>
                                <p>
                                    These Terms are governed by the laws of
                                    Bangladesh, and disputes shall be settled in
                                    the jurisdiction of Dhaka courts.
                                </p>
                            </li>
                        </ul>
                    </li>
                </ol>
            </ContainerSM>
        </div>
    );
};

export default TermsConditions;
