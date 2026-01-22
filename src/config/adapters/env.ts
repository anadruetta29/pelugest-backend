import path from 'path';
import dotenv from 'dotenv';
import { get } from 'env-var';

const getEnvPath = () => {
    if (process.env.RESOURCES_PATH) {
        return path.join(process.env.RESOURCES_PATH, 'server', '.env');
    }

    return path.resolve(process.cwd(), '.env'); 
};

dotenv.config({ path: getEnvPath() });

export const env = {
    PORT: get('PORT').default(3000).asPortNumber(), 
    
    DB: {
        HOST: get('PG_HOST').required().asString(),
        PORT: get('PG_PORT').required().asPortNumber(),
        NAME: get('PG_DATABASE').required().asString(),
        USER: get('PG_USER').required().asString(),
        PASS: get('PG_PASSWORD').required().asString(),
    },

    JWT: {
        SECRET: get('JWT_SECRET').required().asString(),
        EXPIRES_IN: get('JWT_EXPIRES_IN').default('28800').asIntPositive(),
    }
};