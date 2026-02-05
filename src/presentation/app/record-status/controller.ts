import { Request, Response } from 'express';
import { RecordStatusService } from './service';

export class RecordStatusController {
    constructor(private readonly recordStatusService: RecordStatusService) {}

    findByName = async (req: Request, res: Response) => {
        const { name } = req.params;

        const status = await this.recordStatusService.findByName(name);

        return res.status(200).json({ recordStatus: status });
    }
}
