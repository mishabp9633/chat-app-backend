export function errorHandling(err,req,res,next){
    try {
        const status = err.status || 500;
        const message = err.message || "Something went wrong";
    
        res
          .status(status)
          .json({
            Error: `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`,
          });
      } catch (error) {
        next(error);
      }
}
