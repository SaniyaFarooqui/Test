import { DataTypes} from "sequelize";
import db from "../config/database";


let role = db.define("roles",{

    id:{
        type:DataTypes.STRING,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        validate:{
            notEmpty:{
                msg:"Name can't be empty"
            }
        },
        unique:true
    },
    // PermissionsId:{
    //     type:DataTypes.UUID
    // },
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
});

export default role
