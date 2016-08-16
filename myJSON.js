
//Importing
var fs = require('fs');
const reader=require('readline');
var stream=require('stream');

//Initialize Variables
var writeAge = fs.createWriteStream('age.json');
var writeEducation = fs.createWriteStream('education.json');

var count = 0;
var age,liPerson;

var eduLevel,belowPrim,primary,middle,matric,higherSec,nonTech,techDip,gradu,unclassi;
//Reading and  merging file
var push_age = [];
var push_educate = [];

//Printing the message after the file is Read and Merged
function ReadMerge(file,mergeFile)
{
  fs.readFile(mergeFile,function  (err,data){
    if(err) throw err;
    console.log("File Read");

    fs.appendFile(file,data,function(err){
      if(err) throw err;
      console.log("File Merged");
    });
  });
}
//Reading and Merging Files
var file='India2011.csv';
mergeFile='IndiaSC2011.csv';
ReadMerge(file,mergeFile);

mergeFile='IndiaST2011.csv';
ReadMerge(file,mergeFile);

console.log(file);

var readerStream = fs.createReadStream(file);
function Push_Age(age,liPerson){
    this.age = age,
    this.liPerson = liPerson;
};

function Push_Education(Area,liPerson,eduLevel,belowPrim,primary,middle,matric,higherSec,nonTech,techDip,gradu,unclassi){
    this.Area = Area,
    this.liPerson = liPerson,
    this.eduLevel=eduLevel,
    this.belowPrim=belowPrim,
    this.primary=primary,
    this.middle=middle,
    this.matric=matric,
    this.higherSec=higherSec,
    this.nonTech=nonTech,
    this.techDip=techDip,
    this.gradu=gradu,
    this.unclassi=unclassi;
};

var lineReader=reader.createInterface(
    {
        input:readerStream
    }
);

lineReader.on('line',function(line)
{
    if(count==0)
    {
        var headers = line.split(",");
        //Setting index for the Headings

        age = headers.indexOf("Age-group");
        liPerson = headers.indexOf("Literate - Persons");
        Area = headers.indexOf("Area Name");
        eduLevel=headers.indexOf("Educational level - Literate without educational level - Persons");
        belowPrim=headers.indexOf("Educational level - Below Primary - Persons");
        primary=headers.indexOf("Educational level - Primary - Persons");
        middle=headers.indexOf("Educational level - Middle - Persons");
        matric=headers.indexOf("Educational level - Matric/Secondary - Persons");
        higherSec=headers.indexOf("Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Persons");
        nonTech=headers.indexOf("Educational level - Non-technical diploma or certificate not equal to degree - Persons");
        techDip=headers.indexOf("Educational level - Technical diploma or certificate not equal to degree - Persons");
        gradu=headers.indexOf("Educational level - Graduate & above - Persons");
        unclassi=headers.indexOf("Educational level - Unclassified - Persons");
        count = 1;
    }
    else
    {
        objectArray1 = '';
        var lines = line.split(',');

//age wise

        if(lines[5] != "0-6" && lines[5] !="All ages" || lines[5] =="Total")
        {
            objectArray1 =  new Push_Age(lines[age],lines[liPerson]);
            console.log(objectArray1);
            push_age.push(objectArray1);
        }

//education wise

            objectArray2 = '';
            objectArray2 =  new Push_Education(lines[Area],lines[liPerson],lines[eduLevel],lines[belowPrim],lines[primary],lines[middle],lines[matric],lines[higherSec],lines[nonTech],lines[techDip],lines[gradu],lines[unclassi]);
            console.log(objectArray2);
            push_educate.push(objectArray2);
    }
});
//writing into JSON
lineReader.on('close',function(){
     writeAge.write(JSON.stringify(push_age));
     writeEducation.write(JSON.stringify(push_educate));
});
