import type { UploadFile, UploadProps } from "antd";
import { useState } from "react";
import { useCurrentToken } from "../../../store/slices/authSlice";
import { useAppSelector } from "../../../store/hook";
import UploaderArray from "../../../features/uploader/UploaderArray";

const MultiImage = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const token = useAppSelector(useCurrentToken);

    const uploadHandler: UploadProps["onChange"] = (info) => {
        let newFileList = [...info.fileList];

        newFileList = newFileList.slice(-2);

        newFileList = newFileList.map((file) => {
            if (file.response) {
                file.url = file.response.data.url;
            }
            return file;
        });

        setFileList(newFileList);
        console.log({ newFileList });
    };

    return (
        <div className="mt-5 mb-5">
            <UploaderArray
                token={token as string}
                actionHandler={uploadHandler}
                fileList={fileList}
                size={{ width: "350", height: "auto" }}
            />
        </div>
    );
};

export default MultiImage;
