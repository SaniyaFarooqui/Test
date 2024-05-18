import { DataTypes} from "sequelize";
import db from "../config/database";

let post = db.define("posts",{

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
        }
    },
    // user_id:{
    //     type:DataTypes.STRING
    // },
    description :{
        type:DataTypes.STRING,
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
});

export default post
