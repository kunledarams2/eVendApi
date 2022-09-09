
import Jwt from "jsonwebtoken";

export const verifyToken = (req, res, next)=>{
const token = req.headers['authorization']
if (!token) {
    return res.status(403).send("A token is required for authication")

}
try {
    const splitToken = token.split(' ')
    const bearToken = splitToken[1]
    // console.log(bearToken)
    const decode = Jwt.verify(bearToken,"kudakunle783984")
    req.user = decode
   
} catch (error) {
    return res.status(401).send("Invalid Token")
}
return next()
}