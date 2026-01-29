import { Link } from "react-router-dom";
import type { TCourse } from "../../../../types";
import localeDate from "../../../../utils/localeDate";

const PurchasedCourseCard = ({
    course,
    expiredAt,
}: {
    course: TCourse;
    expiredAt: Date;
}) => {
    return (
        <div className="flex items-center gap-3 rounded-lg lg:rounded-xl bg-white border border-primary p-2 lg:p-3">
            <div className="max-w-[150px] md:max-w-[160px] lg:max-w-[200px] w-full rounded-xl lg:rounded-2xl overflow-hidden">
                <img
                    src={course?.image}
                    alt=""
                    className="size-full object-center object-cover"
                />
            </div>
            <div className="px-2">
                <Link to={`/my-course/${course?.id}`}>
                    <h3 className="text-sm md:text-base lg:text-xl font-bold mb-2">
                        {course?.name}
                    </h3>
                </Link>

                <div className="text-xs lg:text-sm">
                    <p>Expired At: {localeDate(expiredAt)}</p>
                </div>
            </div>
        </div>
    );
};

export default PurchasedCourseCard;
