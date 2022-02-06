import { Response } from "express";
export default (
  res: Response,
  status: number,
  data: any,
  message: String | undefined,
  error: String | undefined
): Response<any, Record<string, any>> => {
  return res.status(status).json({
    status,
    data,
    message,
    error,
  });
};
