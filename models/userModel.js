const mssql = require('mssql');
const dotenv = require('dotenv');

dotenv.config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
};

class UserModel {
    constructor(databaseConfig) {
        this.pool = new mssql.ConnectionPool(databaseConfig || config);
    }

    async createUser(user) {
        try {
            const pool = await this.pool.connect();
            const request = new mssql.Request(pool);
            request.input('ho', mssql.NVarChar, user.ho);
            request.input('ten', mssql.NVarChar, user.ten);
            request.input('sdt', mssql.NVarChar, user.sdt);
            request.input('email', mssql.NVarChar, user.email);
            request.input('matkhau', mssql.NVarChar, user.matkhau);
            request.input('lop', mssql.NVarChar, user.lop);
            request.input('ngaysinh', mssql.NVarChar, user.ngaySinh);
            const insertSql =
                'INSERT INTO [User] (Ho, Ten, SDT, Email, MatKhau, Lop, NgaySinh) VALUES (@ho, @ten, @sdt, @email, @matkhau, @lop, @ngaysinh)';
            const result = await request.query(insertSql);
            pool.close();
            return result.rowsAffected[0];
        } catch (error) {
            console.error(error);
            throw new Error('Failed to create user');
        }
    }

    async findUserByEmailAndPassword(email, matkhau) {
        try {
            const pool = await this.pool.connect();
            const request = new mssql.Request(pool);
            request.input('email', mssql.NVarChar, email);
            request.input('matkhau', mssql.NVarChar, matkhau);
            const selectSql =
                'SELECT * FROM [User] WHERE Email = @email AND MatKhau = @matkhau';
            const result = await request.query(selectSql);
            const user = result.recordset[0];
            pool.close();
            return user;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to find user');
        }
    }
}

module.exports = UserModel;