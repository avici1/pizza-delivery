import bcrypt from 'bcrypt';

export default class Bcrypt {
    private compareStatus: boolean;
    private rawPassword: string;

    constructor(rawPassword: string) {
        this.rawPassword = rawPassword;
        this.compareStatus = false;
    }

    public async compare(hash: string): Promise<boolean> {
        this.compareStatus = await bcrypt.compare(this.rawPassword, hash);
        return this.compareStatus;
    }

    public async hash(): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.rawPassword, salt);
        return hash;
    }
}