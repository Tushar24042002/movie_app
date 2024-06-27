import express from 'express';
import { createUser, generateToken, getAllUsers, login, validateToken } from '../services/user.service.js';

const router = express.Router();

// Route to create a new user
router.post('/create', createUser);

router.get("/", getAllUsers);

// Route to get all users
// router.get('/', abc);

router.post("/generate-token", generateToken)
router.get("/validate-token", validateToken)
router.post("/login", login);
function abc(request, response) {
    var filePath = path.resolve("1719058470287_output.pdf");
    response.download(filePath, function(err) {
        if (err) {
        } else {
            fs.unlink(filePath, function(err) {
                if (err) {
                } else {
                }
            });
        }
    });
}


export default router;
