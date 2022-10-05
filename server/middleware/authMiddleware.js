import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {

    try {
       
        const token = req.headers.authorization.split(' ')[1];
        const isCustomAuth = token.length < 500;
        const isGoogleAuth = token.length > 500;
 
        let decodedData;
        if(token && isCustomAuth) {

           decodedData = jwt.verify(token, 'secret');
           req.userId = decodedData?.id; //unique user id from our database
           console.log('CustomAuth', decodedData);

        } else if (isGoogleAuth) {

            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub; //unique user id from google database
            console.log('GoogleAuth', decodedData);


        }
        next();

    } catch (error) {

        res.status(500).json({ message: error });

    }

}

export default auth;