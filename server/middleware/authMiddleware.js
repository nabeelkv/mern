import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {

    try {
       
        const token = req.headers.authorization.split(' ')[1];
        let decodedData;
        
        if(token) {

           decodedData = jwt.verify(token, 'secret');
           req.userId = decodedData?.id; //unique user id from our database
        //    console.log('CustomAuth', decodedData);

        } 
        next();

    } catch (error) {

        res.status(500).json({ message: 'Unauthenticated (authMiddleware)' });

    }

}

export default auth;