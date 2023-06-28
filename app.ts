import express from "express";
import { AppConfig } from './src/configs/appConfig';
import { DatabaseConfig } from './src/configs/dbConfig';
import auth_router from './src/routes/Auth'
import { ExceptionHandler } from './src/middleware/exception-handler';
import file_router from './src/routes/File';
import cors from 'cors'

const app = express();
app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(auth_router);
app.use('/file', file_router);
app.use(ExceptionHandler);


const appConfig = new AppConfig().createServerConfig();
const sequelize = new DatabaseConfig().connectDB();

const StartServer = () => {
   sequelize.authenticate()
      .then(() => {
         console.log('Connection has been established successfully.');
      })
      .catch((error: any) => {
         console.error('Unable to connect to the database: ', error);
   });

   app.listen(appConfig.port);
	console.log(`Server is running on port ${appConfig.port}`);
};


StartServer();

	