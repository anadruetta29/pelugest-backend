import { v4 as uuidv4 } from 'uuid';

export class GenerateUUIDHelper {
    static generate(): string {
        return uuidv4();
    }
}