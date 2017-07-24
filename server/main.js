import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';
Meteor.startup(() => {
    // const petSchema = new SimpleSchema({
    //     name:{
    //         type:String,
    //         min:1,
    //         max:50
    //     },
    //     age:{
    //         type:Number,
    //         min:1
    //     }
    // });
    // petSchema.validate({
    //     name:'fuck',
    //     age:-10
    // })
    Accounts.validateNewUser((user)=>{
       const email = user.email[0].address;
      try{
          new SimpleSchema({
              email:{
                  type:String,
                  regEx:SimpleSchema.RegEx.Email
              }
          }).validate({email});
      }catch(e) {
          throw new Meteor.Error(400,e.message )
      }
       return true
    });

});
