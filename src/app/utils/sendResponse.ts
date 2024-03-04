import { Response } from "express";

export interface TMeta {
  page: number;
  limit: number;
  totalPage: number;
  totalData: number;
}

type TData<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  meta?: TMeta;
  data: T;
};

const sendResponse = <T>(res: Response, data: TData<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};

export default sendResponse;
