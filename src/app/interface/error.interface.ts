export type TErrorSources = [
  {
    path: any;
    message: string;
  },
];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
