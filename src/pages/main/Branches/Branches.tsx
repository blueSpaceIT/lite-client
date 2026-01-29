import { useEffect, useState } from "react";
import type { TBranch } from "../../../types";
import { branchService } from "../../../store/services/branchService";
import Container from "../../../components/common/Container/Container";

const Branches = () => {
    const [branches, setBranches] = useState<TBranch[]>([]);
    const { data, isSuccess } = branchService.useGetBranchesQuery([
        ["limit", 50],
    ]);

    useEffect(() => {
        if (isSuccess && data?.data) {
            setBranches(data.data.result);
        }
    }, [data, isSuccess]);

    return (
        <div className="py-10">
            <Container>
                {branches.map((branch, idx) => (
                    <div
                        key={branch._id}
                        className={`flex flex-col ${
                            idx % 2 === 0
                                ? "md:flex-row"
                                : "md:flex-row-reverse"
                        } justify-between items-start md:items-center gap-5`}
                    >
                        <div>
                            <h3 className="text-xl font-semibold">
                                {branch.name}
                            </h3>
                            <p className="text-black/70">{branch.address}</p>
                        </div>
                        <div>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.340603615122!2d90.36593177539388!3d23.806484386620816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c13cb70c091f%3A0x3fab1e70ccf7c46a!2sBCS%20Oditi%20Career%20Mirpur%2010%20Campus!5e0!3m2!1sen!2sbd!4v1765786653413!5m2!1sen!2sbd"
                                width="600"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                ))}
            </Container>
        </div>
    );
};

export default Branches;
