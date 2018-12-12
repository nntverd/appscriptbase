function F_CreateProfile(__email, __name, __phone, __letter, __resumeurl) {
  var email = (""+__email).trim();
  if( email.split('@').length <= 1 ) throw ('there is no email');
  var ALL_PROFILE_FOLDER = DriveApp.getFolderById(ID_PROFILE_FOLDER_ALL);
  var profiles = ALL_PROFILE_FOLDER.getFiles();
  while( profiles.hasNext() ){
    var profile = profiles.next();
    if( profile.getName() == email ) return profile.getId();
  }
  
  var temp = DriveApp.getFileById(ID_PROFILE_TEMPLATE);
  var newprofile = temp.makeCopy(email, ALL_PROFILE_FOLDER);
  newprofile.setDescription( __email + " - " + __name + " - " + __phone ) ;
  
  var bio_sheet = FOpenSheet( newprofile.getId(), 'bio' );
  var names = __name.split(' ');
  var fname = __name;
  var sname = '';
  if( names.length > 1 ){
    fname = names[0];
    sname = names[1]
  }
  var pswrd = Math.random().toString(36).substring(2, 6);
  FInsertFixParam(bio_sheet, pswrd, ADDR_RESUME_PASWRD);
  FInsertFixParam(bio_sheet, fname, ADDR_RESUME_F_NAME);
  FInsertFixParam(bio_sheet, sname, ADDR_RESUME_S_NAME);
  FAddHistoryParam(bio_sheet, email, ADDR_RESUME_EMAIL)
  
  
  return newprofile.getId();
}

function FInsertFixParam(__sheet, __value, __addr_resume){
  __sheet.getRange(__addr_resume[1], __addr_resume[2]).setValue(__value);
}
function FGetFixParam(__sheet, __addr_resume){
  __sheet.getRange(__addr_resume[1], __addr_resume[2]).getValue();
}
//function FInsertSecondName(__sheet, __sname, __addr_resume_sname){
//  __sheet.getRange(__addr_resume_sname[1], __addr_resume_sname[2]).setValue(__sname);
//}
//function FGetSecondName(__sheet, __addr_resume_sname){
//  __sheet.getRange(__addr_resume_sname[1], __addr_resume_sname[2]).getValue();
//}

function FAddHistoryParam(__sheet, __value, __addr_resume){
  var params = {};
  try{
    params = FGetEmails_json( __sheet, __addr_resume ); 
  }
  catch(e){
    params = {
      "current":'',
      "history": []
      
    }
  }
  params['current'] = __value;
  params['history'].push(__value);
  __sheet.getRange(__addr_resume[1], __addr_resume[2]).setValue(JSON.stringify(params)); 
}

function FGetHistoryParam_str( __sheet, __addr_resume ){
  var emails_str = __sheet.getRange(__addr_resume[1], __addr_resume[2]).getValue();
  return emails_str;
}

function FGetHistoryParam_json( __sheet, __addr_resume){
  var emails_str = __sheet.getRange(__addr_resume[1], __addr_resume[2]).getValue();
  return JSON.parse(emails_str);
}

function FGetCurrentParam( __sheet, __addr_resume ){
  var emails_str = __sheet.getRange(__addr_resume[1], __addr_resume[2]).getValue();
  return JSON.parse(emails_str).current;
}

function FOpenSheet( __fileid, __sheetname ){
  var ss = SpreadsheetApp.openById(__fileid);
  var sheets = ss.getSheets();
  for( var i in sheets ){
    if( sheets[i].getName() == __sheetname ) return sheets[i];
  }
  return ss.insertSheet( __sheetname );
}