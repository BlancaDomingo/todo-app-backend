import User from "../model/users.model.js";

export const permission = (roleArr) => {
  return async (req, res, next) => {
    const user = await User.findById(req.tokenContent.userId);
    if (!req.tokenContent || !roleArr.includes(user.role) ) {
      return res.status(401).send({
        message: "no access",
      });
    }
    next();
  };
};
