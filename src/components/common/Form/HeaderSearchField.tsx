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

const HeaderSearchField = ({
    name,
    label,
    placeholder,
    extra,
    disable,
}: Props) => {
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
                    <div className="relative hidden md:block">
                        <Input
                            className="max-w-[120px] md:max-w-[250px] w-full bg-transparent border border-primary rounded-2xl outline-0 text-white"
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

export default HeaderSearchField;
