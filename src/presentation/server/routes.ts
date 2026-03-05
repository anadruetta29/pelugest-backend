import { Router } from "express";
import { AuthRoute } from "../app/auth/route";
import { ClientRoute } from "../app/client/route";
import { RecordStatusRoute } from "../app/record-status/route";
import { ServiceRoute } from "../app/service/route";
import { ProductRoute } from '../app/product/route';
import { StockProductRoute } from "../app/stock-product/route";
import { StockMovementRoute } from "../app/stock-movement/route";
import { UserRoute } from "../app/user/route";
import { AppointmentRoute } from "../app/appointment/route";

export class AppRouter {
    static get routes(): Router {
        const router = Router();

        router.use('/api/auth', AuthRoute.routes);
        router.use('/api/clients', ClientRoute.routes);
        router.use('/api/record-status', RecordStatusRoute.routes);
        router.use('/api/services', ServiceRoute.routes);
        router.use('/api/products', ProductRoute.routes);
        router.use('/api/stock-products', StockProductRoute.routes);
        router.use('/api/stock-movements', StockMovementRoute.routes);
        router.use('/api/users', UserRoute.routes);
        router.use('/api/appointments', AppointmentRoute.routes);
        return router;
    }
}