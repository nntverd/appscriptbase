function TEST__F_CreateProfile() {
  var __email = ""+Math.random().toString(36).substring(2, 6)+"ains@ains.kz  ";
  var __name = "nikolay tverdokhlebov";
  var __phone = "asdf2314"
  var __letter = "adsfkljh"
  var __resumeurl = "ains.kz"
  try{
    var id = F_CreateProfile(__email, __name, __phone, __letter, __resumeurl);
    Logger.log( 'creation is succeeded');
    Logger.log( 'file id is ' + id );
  }
  catch(e){
    Logger.log( 'creation is failed');
    Logger.log( 'reson is ' + e );
     
  }
   __email = ""+Math.random().toString(36).substring(2, 6);
  try{
    var id = F_CreateProfile(__email, __name, __phone, __letter, __resumeurl);
    Logger.log( 'creation is stupid');
  }
  catch(e){
    Logger.log( 'creation is canceled by wrong email');
    Logger.log( 'reson is ' + e );
     
  }
}
