/* export const permission = (role) => {


    return (req, res, next) => {
       
        if (!req.tokenContent || role !== req.user.role) {
            return res.status(401).send({
                message: 'no access',
            })

        }
        next();
    }
} */

export const permission = () => {
  return (req, res, next) => {
    // console.log('req.body.user.role', req.data);
    if (!req.tokenContent) {
      return res.status(401).send({
        message: "no access",
      });
    }
    next();
  };
};
