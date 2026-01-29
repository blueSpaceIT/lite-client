import { Controller, useFormContext } from "react-hook-form";
import { Input } from "antd";
import type { ReactNode } from "react";

type Props = {
    name: string;
    label: string;
    placeholder: string;
    extra?: ReactNode;
    disable?: boolean;
};

const TextareaField = ({ name, label, placeholder, extra, disable }: Props) => {
    const form = useFormContext();

    return (
        <Controller
            control={form.control}
            name={name}
            defaultValue={""}
            render={({ field, fieldState: { error } }) => (
                <div className="mb-5">
                    <div className="flex justify-between items-center">
                        <label className="text-sm text-slate-500 font-semibold mb-1.5">
                            {label}
                        </label>
                        {extra && extra}
                    </div>
                    <div>
                        <Input.TextArea
                            className="w-full font-medium px-3.5 py-2 rounded-lg border text-accent bg-white hover:bg-white border-slate-600 hover:border-primary focus:border-primary shadow-none text-accent"
                            placeholder={placeholder}
                            disabled={disable}
                            {...field}
                        />
                    </div>
                    {error && (
                        <p className="text-sm text-rose-600 mt-1">
                            {error.message}
                        </p>
                    )}
                </div>
            )}
        />
    );
};

export default TextareaField;
