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


 //Rotaries
		if(channel==1 && number >= 16 && number <= 23){
       		var index = number-16;
       		local.values.strips.getChild('Strip '+(index+1)).rotaryValue.set(value);    }
            
            
 //Faders            
         if(channel==1 && number >= 0 && number <= 7){
        	var index = number;
            local.values.strips.getChild('Strip '+(index+1)).faderValue.set(value);    }
        
//Rec Button
		if (number >= 64 && number <= 71){
        var index = number-64;
       local.values.strips.getChild('Strip '+(index+1)).rec.set(value); } 
            
//Solo Button
		if (number >= 32 && number <= 39){
        var index = number-32;
		local.values.strips.getChild('Strip '+(index+1)).solo.set(value); }
            
//Mute Button
		if (number >= 48 && number <= 55){
        var index = number-48;
       local.values.strips.getChild('Strip '+(index+1)).mute.set(value);  } 
            
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
        if (number == 60) {local.values.misc.setButton.set(value);}
        if (number == 61) {local.values.misc.markLeft.set(value);}
        if (number == 62) {local.values.misc.markRight.set(value);}     
        
}

