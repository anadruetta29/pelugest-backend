export class RegexValidator {

    public static readonly NAME_PATTERN = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;
    
    public static readonly LASTNAME_PATTERN = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;
    
    public static readonly EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    public static validate(value: string, pattern: RegExp): boolean {
        return pattern.test(value);
    }
    
}