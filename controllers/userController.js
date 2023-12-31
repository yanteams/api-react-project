class UserController {
    constructor(models) {
        this.UserModel = models.User;
    }

    async createUser(req, res) {
        const { ho, ten, sdt, email, matkhau, lop, ngaySinh } = req.body;
        try {
            const result = await this.UserModel.createUser({ ho, ten, sdt, email, matkhau, lop, ngaySinh });
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    async loginUser(req, res) {
        const { email, matkhau } = req.body;
        try {
            const user = await this.UserModel.findUserByEmailAndPassword(email, matkhau);
            if (user) {
                res.json({
                    id: user.id,
                    ho: user.ho,
                    ten: user.ten,
                    sdt: user.sdt,
                    email: user.email,
                    lop: user.lop,
                    ngaySinh: user.ngaysinh,
                });
            } else {
                res.status(401).send('Incorrect email or password');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }
}

module.exports = UserController;