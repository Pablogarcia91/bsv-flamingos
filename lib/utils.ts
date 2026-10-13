import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Dorsal para mostrar: «—» si aún no está asignado. */
export const dorsal = (n: number | null | undefined) => (n == null ? "—" : String(n));

/** Ordena por dorsal, dejando al final los pendientes. */
export const byNumber = (a: { number: number | null }, b: { number: number | null }) =>
  (a.number ?? Infinity) - (b.number ?? Infinity);
