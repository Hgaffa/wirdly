import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Option } from "react-multi-select-component";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
