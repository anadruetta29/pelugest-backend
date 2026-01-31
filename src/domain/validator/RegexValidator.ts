export class RegexValidator {

    public static readonly EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    public static readonly NAME = /^[\p{L}]{2,20}(?:[ '-][\p{L}]{2,20})*$/u;

    public static readonly SURNAME = /^[\p{L}]{2,20}(?:[ '-][\p{L}]{2,20})*$/u;

    public static readonly PASSWORD = /^\S{1,8}$/;

    public static readonly MOBILE_NUMBER  = /^[0-9]{10,15}$/;

    public static readonly LANDLINE_NUMBER = /^[0-9]{6,15}$/;

    public static validate(value: string, pattern: RegExp): boolean {
        return pattern.test(value);
    }
    
}