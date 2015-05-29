var htmlparser = require("htmlparser2");
var fs = require('fs');
var archivo = './sap.HTML'
var c = 0;
var d = 0;
var control = 0;
var id ;
var name,
    grup,
    tipe,
    number;

var read = function (){
    fs.readFile(archivo , 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    var parser = new htmlparser.Parser({
        onopentag: function(name, attribs){
            if (attribs.class == 'HEADER1'){

            }

            console.log(attribs,name);
        },
        ontext: function(text){

            //console.log("-->", text);
            if (text.match(/Material/)){
                control = 1;
            }

            if (control == 1){
                c++;

                if ( c <= 8){    
                    if (c==1){
                        name = text;
                    }
                    if (c==3){
                        grup = text;
                    }
                    if (c==5){
                        tipe = text;
                    }
                    if (c==4){
                        number = text;
                    }                           
                }

                if (text.match(/^100\d\d\d\d\d/)){
                    c = 0;
                    d++;
                    //console.log('['+ d +']', '['+ c +']', text );
                    id = text;
                    //console.log(id , '['+ name +']', '['+ grup +']','['+ tipe +']','['+ number +']');


                }
            }
        }
    });
    parser.write(data, lowerCaseAttributeNames= true );
    parser.end();
    });
    c
}



read();


