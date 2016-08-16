const readline = require('readline');
var fs=require("fs");

//Initialize Variables
var ageWise={};
var educationCategory={};
var general="India2011.csv";
var sc="IndiaSC2011.csv";
var st="IndiaST2011.csv";
var fileName=new Array(general,sc,st);
var headers= [];

//adding final objects into object array
function values(obj)
{
    var value = [];
    for(var key in obj)
    {
        if(obj.hasOwnProperty(key))//returns true
        {
            value.push(obj[key]);
        }
    }
    return value;
}

//Loop to call the processor in each file
for(var i=0;i<3;i++)
{
    //getting the 3 file name
    var fName = fileName[i];
    //Passing the file names in jsonConverter
    jsonConverter(fName);
}

function jsonConverter(fileName)
{
    //split the file as line by line
        fs.readFileSync(fileName).toString().split('\n').forEach(function (line,index)
        {
            var column = line.split(",");//split iz
            if(index === 0)
            {
                headers = column;
            }
            if(line !== '' && index !== 0)
            {
                //Agewise data
                if(column[4] == "Total" && column[5] !=="All ages" && column[5] != "0-6")
                {
                    var totalLiterate=parseInt(column[12]);
                    if(column[5] in  ageWise)
                    {
                        ageGroup = column[5];
                        ageWise[ageGroup].total += totalLiterate;
                    }
                    else
                    {
                        ageGroup=column[5];
                        ageWise[ageGroup] = {
                        group : ageGroup,
                        total : totalLiterate
                    };
                }

                //Education category wise data
                for(var i = 15; i <=43 ; i+=3)
                {
                    var edu = headers[i].trim().match(/^Educational level\s+-\s+(.*[^\\*])\s+-\s+\w*$/i);
                    eduTitle = edu[1];
                    if(eduTitle in educationCategory)
                    {
                        educationCategory[eduTitle].total += parseInt(column[i]);
                    }
                    else
                    {
                            educationCategory[eduTitle]={
                            eduLevel : eduTitle,
                            total : parseInt(column[i])
                        };
                    }
                }
            }
        }
    });
    }

//fs.writeFile('age.json',JSON.stringify(values(ageWise)));//writes the file in age.json
fs.writeFile('educations.json',JSON.stringify(values(educationCategory)));//writes the file in educationCategory

 console.log("Data Length of Age wise Literates:"+values(ageWise).length);//data length
 console.log("Age Wise : ");
 console.log(values(ageWise)) ;

console.log("Data Length of Education Category :"+values(educationCategory).length) ;
console.log("Education Category Wise : ");
console.log(values(educationCategory)) ;
