export const permission = (options) => {

  
    return (req, res, next) => {
        if (!req.tokenContent) {
              return res.status(401).send({
                  message: 'no access',
              }) 
             
          }
          next();
    }
}