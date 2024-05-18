import user from "../models/user"
import post from "../models/post"
import role from "../models/role"
import comment from "../models/comment"

let associations = ()=> {
    user.hasMany(post,{onUpdate:"CASCADE",onDelete:"CASCADE",foreignKey:"userId"});
    post.belongsTo(user);

    post.hasMany(comment,{onUpdate:"CASCADE",onDelete:"CASCADE",foreignKey:"postId"});
    comment.belongsTo(post);
    
    role.hasOne(user,{onUpdate:"CASCADE",onDelete:"CASCADE",foreignKey:"roleId"});
    role.belongsTo(user)
}
export default associations;