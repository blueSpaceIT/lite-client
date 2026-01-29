import { Controller, useFormContext } from "react-hook-form";
import { Rate } from "antd";
import type { ReactNode } from "react";

type Props = {
    name: string;
    label?: string | ReactNode;
    disable?: boolean;
};

const RateField = ({ name, label, disable }: Props) => {
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
                    </div>
                    <div>
                        <Rate disabled={disable} {...field} />
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

export default RateField;
