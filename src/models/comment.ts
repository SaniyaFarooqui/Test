import { DataTypes} from "sequelize";
import db from "../config/database";

let comment = db.define("comments",{

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
    // post_id:{
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

export default comment
