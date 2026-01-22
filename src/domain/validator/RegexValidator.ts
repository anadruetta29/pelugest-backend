export class RegexValidator {

    public static readonly EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    public static readonly NAME = /^[\p{L}]{2,20}(?:[ '-][\p{L}]{2,20})*$/u;

    public static readonly LASTNAME = /^[\p{L}]{2,20}(?:[ '-][\p{L}]{2,20})*$/u;

    public static readonly PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{8,}$/;

    public static validate(value: string, pattern: RegExp): boolean {
        return pattern.test(value);
    }
    
}