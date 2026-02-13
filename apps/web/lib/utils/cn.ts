type Falsy = false | null | undefined | '';

export const cn = (...cls: (string | Falsy)[]) => cls.filter(Boolean).join(' ');
