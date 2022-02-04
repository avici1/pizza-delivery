import BaseController from '../Base/controller';
import UserModel from './model'
import out from '../Helpers/out';
import Jwt from '../Helpers/jwt';
import Bcrypt from '../Helpers/bcrypt';

export default class Controller extends BaseController {
    
    private jwt: Jwt;
    private bcrypt: Bcrypt;

    constructor(model: any) {
        super(model);
        this.jwt = new Jwt();
        this.bcrypt = new Bcrypt();
    }
    
    public async login(req: any, res: any): Promise<void> {
        const { email, password } = req.body;
        const user = await this.model.findOne({ email });
        if (!user) {
            return out(res, 404, {}, "User not found", undefined);
        }
        const compareStatus = await this.bcrypt.compare(password, user.password);
        if (!compareStatus) {
            return out(res, 401, {}, "Invalid password", undefined);
        }
        const payload = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
        const token = this.jwt.sign(payload);
        return out(res, 200, { token }, "Login success", undefined);
    }
    
    public async register(req: any, res: any): Promise<void> {
        const { email, name, password } = req.body;
        const user = await this.model.findOne({ email });
        if (user) {
            return out(res, 400, {}, "User already exists", undefined);
        }
        const hash = await this.bcrypt.hash();
        const newUser = new this.model({
            email,
            name,
            password: hash,
        });
        const status = await newUser.save();
        if (status) {
            return out(res, 201, {}, "User created", undefined);
        }
        return out(res, 500, {}, "User not created", undefined);
    }
    
    public async getUser(req: any, res: any): Promise<void> {
        const { id } = req.params;
        const user = await this.model.findById(id);
        if (!user) {
}