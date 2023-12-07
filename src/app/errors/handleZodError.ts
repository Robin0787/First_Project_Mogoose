import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface/error.interface";

const handleZodError = (err: ZodError) => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    const paths = issue?.path;
    return {
      path: paths[paths.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export default handleZodError;
