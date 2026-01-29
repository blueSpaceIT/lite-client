import { Controller, useFormContext } from "react-hook-form";
import { Input } from "antd";
import type { ReactNode } from "react";

type Props = {
    name: string;
    label?: string | ReactNode;
    placeholder: string;
    extra?: ReactNode;
    disable?: boolean;
};

const InputField = ({ name, label, placeholder, extra, disable }: Props) => {
    const form = useFormContext();

    return (
        <Controller
            control={form.control}
            name={name}
            defaultValue={""}
            render={({ field, fieldState: { error } }) => (
                <div>
                    <div className="flex justify-between items-center">
                        {label && (
                            <label className="text-sm text-slate-500 font-semibold mb-1.5">
                                {label}
                            </label>
                        )}
                        {extra && extra}
                    </div>
                    <div>
                        <Input
                            className="w-full font-medium px-3.5 py-2 rounded-lg border text-accent bg-white hover:bg-white border-slate-600 hover:border-primary focus:border-primary shadow-none"
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

export default InputField;
