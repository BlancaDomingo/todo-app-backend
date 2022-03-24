import jwt from 'jsonwebtoken';


export const auth = () => {

    // Dies ist die Middleware Funktion
    return (req, res, next) => {
        const authHeader = req.headers.authorization;

        // aqui se ve si hay token o no 
        const token = authHeader && authHeader.split(' ')[1] // undefined || 'dfogvnjsdfjger5jngeirgneir'
        console.log('authHeader', authHeader);


        if (!token) {

            return next();
        }
        try {
            const content = jwt.verify(token, process.env.JWT_KEY)
            // speiche die infos in den request
            req.tokenContent = content
            next();
        } catch (e) {

            next();
        }


    }

}