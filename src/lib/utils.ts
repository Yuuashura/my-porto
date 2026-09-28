// ponytail: plain join, no tailwind-merge. Add clsx + tailwind-merge if callers start overriding conflicting classes.
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}
