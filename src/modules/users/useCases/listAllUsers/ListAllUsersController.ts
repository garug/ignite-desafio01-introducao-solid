import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const list =  this.listAllUsersUseCase.execute({ user_id: request.headers.user_id as string });
      console.log(list);
      return response.json(list);
    } catch (err) {
      console.log(err);
      return response.status(400).json({ error: err})
    }
  }
}

export { ListAllUsersController };
