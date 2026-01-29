import { Controller, useFormContext } from "react-hook-form";
import { Radio } from "antd";
import type { ReactNode } from "react";

type Props = {
    name: string;
    label?: string | ReactNode;
    options: { value: string; label: string | ReactNode; disabled?: boolean }[];
    extra?: ReactNode;
    disable?: boolean;
};

const RadioField = ({ name, label, options, extra, disable }: Props) => {
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
                        <Radio.Group
                            options={options}
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

export default RadioField;
