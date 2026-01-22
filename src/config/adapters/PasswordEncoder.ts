import bcrypt from 'bcrypt';

export interface IPasswordEncoder {
    
    hash(password: string): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;

}

export const PasswordEncoder: IPasswordEncoder = {
    
    hash: async (password: string): Promise<string> => {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    },

    compare: async (password: string, hash: string): Promise<boolean> => {
        return await bcrypt.compare(password, hash);
    }

};