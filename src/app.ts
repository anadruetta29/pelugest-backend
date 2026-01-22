import { env } from "./config/adapters/env";
import { AppRouter } from "./presentation/server/routes";
import { Server } from "./presentation/server/server";
import { Pool } from "pg";

(async () => {
    main();
})();

async function main() {

	const pool = new Pool({
        host: env.DB.HOST,
        port: env.DB.PORT,
        database: env.DB.NAME,
        user: env.DB.USER,
        password: env.DB.PASS,
    });

	try {
        await pool.query("SELECT 1");
        console.log("Connected to PostgreSQL successfully!");
    } 
	catch (error) {
        console.error("Error connecting to PostgreSQL:", error);
        process.exit(1);
    }

    const server = new Server({
        port: env.PORT,
        routes: AppRouter.routes
    });

    server.start();

	console.log(`Server running on port ${env.PORT}`);

}