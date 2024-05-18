import { DataTypes } from "sequelize";
import db from "../config/database";

let permission = db.define("permission",{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false
    },
    create:{
        type:DataTypes.STRING
    },
    view:{
        type:DataTypes.STRING
    },
    update:{
        type:DataTypes.STRING
    },
    delete:{
        type:DataTypes.STRING
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:db.literal(
            'CURRENT_TIMESTAMP'
        )
    },
    updatedAt:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:db.literal(
            'CURRENT_TIMESTAMP'
        )
    }
})

export default permission