    import jwt from 'jsonwebtoken';
    import Studdent from '../Student/studdent.model.js';
    import Professor from '../Professor/professor.model.js';

    const authMiddleware = async (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
    
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
    
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
            // Aquí verificamos qué datos contiene req.user
            const user = await (decoded.role === 'PROFESSOR_ROLE' 
                ? Professor.findById(decoded.uid) 
                : Studdent.findById(decoded.uid)
            );
    
            if (!user) {
                return res.status(401).json({ message: 'Invalid token' });
            }
    
            req.user = user;
            console.log("Decoded user:", req.user);  // Verifica que los datos sean correctos
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    };
    export default authMiddleware;