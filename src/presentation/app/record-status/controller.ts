import { Request, Response, NextFunction } from 'express';
import { RecordStatusService } from './service';

export class RecordStatusController {
    constructor(private readonly recordStatusService: RecordStatusService) {}

    findByName = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name } = req.params;

            if (!name) {
                return res.status(400).json({ error: "Status name is required" });
            }

            const status = await this.recordStatusService.findByName(name);

            return res.status(200).json({ recordStatus: status });
        } 
        catch (error) {
            next(error);
        }
    }
}
