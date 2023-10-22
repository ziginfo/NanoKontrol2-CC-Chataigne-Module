/*
This script is for the General-MIDI-Mode
While pressing and holding down the SET MARKER and CYCLE buttons
Connect the USB cable from your computer to the nanoKONTROL2 and engage CC mode.
*/



function init()
{
    script.log();

    //Synchronize Arrays 1-7
    for(counter=0;counter<8;counter++){
       
        //Init Mute
        local.sendNoteOn(1,counter+16,local.values.strips.getChild('Strip '+(counter+1)).mute.get());
        //Init Solo
        local.sendNoteOn(1,counter+8,local.values.strips.getChild('Strip '+(counter+1)).solo.get());
        //Init Rec
        local.sendNoteOn(1,counter+0,local.values.strips.getChild('Strip '+(counter+1)).rec.get());
        
        
    }

    

}

//*****MIDI MODULE SPECIFIC SCRIPTS*****



//Upon receiving MIDI Control Change message
function ccEvent(channel, number, value)
{   
 //Faders
    	if (number == 0) {local.values.strips.strip1.faderValue.set(value);}
        if (number == 1) {local.values.strips.strip2.faderValue.set(value);}
        if (number == 2) {local.values.strips.strip3.faderValue.set(value);}
        if (number == 3) {local.values.strips.strip4.faderValue.set(value);}
        if (number == 4) {local.values.strips.strip5.faderValue.set(value);}
        if (number == 5) {local.values.strips.strip6.faderValue.set(value);}
        if (number == 6) {local.values.strips.strip7.faderValue.set(value);}
        if (number == 7) {local.values.strips.strip8.faderValue.set(value);}
        
//Encoders
    	if (number == 16) {local.values.strips.strip1.rotaryValue.set(value);}
        if (number == 17) {local.values.strips.strip2.rotaryValue.set(value);}
        if (number == 18) {local.values.strips.strip3.rotaryValue.set(value);}
        if (number == 19) {local.values.strips.strip4.rotaryValue.set(value);}
        if (number == 20) {local.values.strips.strip5.rotaryValue.set(value);}
        if (number == 21) {local.values.strips.strip6.rotaryValue.set(value);}
        if (number == 22) {local.values.strips.strip7.rotaryValue.set(value);}
        if (number == 23) {local.values.strips.strip8.rotaryValue.set(value);}
        
//Rec Button
		if (number >= 64 && number <= 71){
        var index = number-64;
        if (local.values.strips.getChild('Strip '+(index+1)).rec.get()==0){
            local.values.strips.getChild('Strip '+(index+1)).rec.set("on");
        }else{
            local.values.strips.getChild('Strip '+(index+1)).rec.set("off");  }   } 
            
//Solo Button
		if (number >= 32 && number <= 39){
        var index = number-32;
        if (local.values.strips.getChild('Strip '+(index+1)).solo.get()==0){
            local.values.strips.getChild('Strip '+(index+1)).solo.set("on");
        }else{
            local.values.strips.getChild('Strip '+(index+1)).solo.set("off");  }   } 
            
//Mute Button
		if (number >= 48 && number <= 55){
        var index = number-48;
        if (local.values.strips.getChild('Strip '+(index+1)).mute.get()==0){
            local.values.strips.getChild('Strip '+(index+1)).mute.set("on");
        }else{
            local.values.strips.getChild('Strip '+(index+1)).mute.set("off");  }   } 
            
//Transport
    	if (number == 43) {local.values.transport.rewind.set(value);}
        if (number == 44) {local.values.transport.forward.set(value);}
        if (number == 42) {local.values.transport.stop.set(value);}
        if (number == 41) {local.values.transport.play.set(value);}
        if (number == 45) {local.values.transport.recSet.set(value);}
        
//Misc
    	if (number == 58) {local.values.misc.trackLeft.set(value);}
        if (number == 59) {local.values.misc.trackRight.set(value);}
        if (number == 46) {local.values.misc.cycle.set(value);}
        if (number == 60) {local.values.misc.setBout.set(value);}
        if (number == 61) {local.values.misc.markLeft.set(value);}
        if (number == 62) {local.values.misc.markRight.set(value);}     
        
}
