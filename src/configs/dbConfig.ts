import { error } from 'console';
import dotenv from "dotenv";
import { Sequelize } from 'sequelize';

dotenv.config();

export class DatabaseConfig {
	private readonly port: string;
    private readonly host: string;
    private readonly username: string;
    private readonly password: string;
    private readonly db_name: string;

	constructor() {
		this.port = process.env.MY_SQL_PORT || "";
        this.host = process.env.MY_SQL_HOST || "";
        this.username = process.env.DB_USERNAME || "";
        this.password = process.env.PASSWORD || "";
        this.db_name = process.env.DB_NAME || "";
	}

	public connectDB() {
		const sequelize = new Sequelize(
            this.db_name, this.username, this.password, {
                host: this.host,
                dialect: 'mysql',
                port: +this.port,
            }
        )
        sequelize.sync().then(result => 'Tables are synced').catch(error => console.log(error))
        return sequelize;
	}
}