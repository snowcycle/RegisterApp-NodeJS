import Sequelize from "sequelize";
import * as DatabaseConnection from "../models/databaseConnection";
import * as  ActiveUserModel from "../models/ActiveUserModel";
import { ActiveUser } from "../../typeDefinitions";

export const clearActive = async (session : Express.Session) => {
  let searchTransaction: Sequelize.Transaction;
  DatabaseConnection.createTransaction()
		.then((createdTransaction: Sequelize.Transaction) => {
      searchTransaction = createdTransaction;
      return ActiveUserModel.queryBySessionKey(session.id)}).then((queriedUser: ( ActiveUserModel.ActiveUserModel | null)) => {
        if(queriedUser != null)
        {
          queriedUser.destroy();
        }
        
      });

}