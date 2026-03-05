import { GetAllUsersByRoleNameDTO } from "../../../domain/dto/user/get-all-by-role-name";
import { UserService } from "./service";
import { Request, Response, NextFunction } from "express";

export class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    getAllByRoleName = async (req: Request, res: Response,  next: NextFunction) => {
        try {

            const { roleName } = req.params;

            const [error, dto] = GetAllUsersByRoleNameDTO.create({ roleName });

            if (error) {
                return res.status(400).json({ message: error });
            }

            const result = await this.userService.getAllByRoleName(dto!);

            return res.status(200).json(result);
        } 
        catch (error: any) {
            return res.status(500).json({ message: error.message || 'Internal server error' });
        }
    };
}
