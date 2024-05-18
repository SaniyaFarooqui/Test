import { DataTypes} from "sequelize";
import db from "../config/database";

let user = db.define("users",{

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
    age:{
        type:DataTypes.BIGINT,
        
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        validate:{
            notEmpty:{
                msg:"password required"
            },
        }
    },
    address:{
        type:DataTypes.TEXT
    },
    // role_id:{
    //     references:{
    //         model:'roles',
    //     },
    //     type:DataTypes.UUID,
    //     allowNull:true
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

export default user
