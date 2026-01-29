import { studentService } from "../../../store/services/studentService";

const useStudentByPhone = (phone: string) => {
    const { data, isSuccess } = studentService.useGetStudentByPhoneQuery(phone);
    return [data, isSuccess];
};

export default useStudentByPhone;
