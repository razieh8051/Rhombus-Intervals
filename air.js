
$(document).ready(function () {
    draw();
})

function draw(){
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
 //Set the position for rhombus
    roundedRectArc(ctx,300, 300, 100, 100, 20);
 //Set the position for drawing the line around rhombus
    linecapLessRecArc(ctx,300, 300, 100, 100, 20);
}

//Draw the rounded arc
function roundedRectArc(ctx,x,y,w,h,r){
 
    var a = x + w/2;
    var b = y + h/2;
    var c = x - w/2;
    var d = y - h/2;
    var rsqr=Math.SQRT2*r;
    var move=rsqr/2;
    var ytop=b-(Math.sqrt(Math.pow(w,2)+Math.pow(h,2)))/2;
    var xright= a+(Math.sqrt(Math.pow(w,2)+Math.pow(h,2)))/2;
    var xleft= a-(Math.sqrt(Math.pow(w,2)+Math.pow(h,2)))/2;
    var ydown=b+(Math.sqrt(Math.pow(w,2)+Math.pow(h,2)))/2;
   
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.save();
    ctx.moveTo(a+move, ytop+move); 
    ctx.lineTo(xright-move,b-move);
    ctx.arc(xright-rsqr, b,r,-1/4*Math.PI,1/4*Math.PI);
    ctx.lineTo(a+move,ydown-move);
    ctx.arc(a, ydown-rsqr,r,1/4*Math.PI,3/4*Math.PI);
    ctx.lineTo(xleft+move,b+move); 
    ctx.arc(xleft+rsqr, b,r,3/4*Math.PI,5/4*Math.PI);
    ctx.lineTo(a-move,ytop+move);
    ctx.arc(a, ytop+rsqr,r,5/4*Math.PI,7/4*Math.PI);
    ctx.stroke();
    ctx.restore();

}
//Draw the line cap
function linecapLessRecArc(ctx,x,y,w,h,r){
    y-=15;h+=30;x-=15;w+=30;r+=21.21-4;//r+=sqrt(15^2+15^2)
    var a = x + w/2;
    var b = y + h/2;
    var c = x - w/2;
    var d = y - h/2;

    var rsqr=Math.SQRT2*r;
    var move=rsqr/2;
    var ytop=b-(Math.sqrt(Math.pow(w,2)+Math.pow(h,2)))/2;
    var xright= a+(Math.sqrt(Math.pow(w,2)+Math.pow(h,2)))/2;
    var xleft= a-(Math.sqrt(Math.pow(w,2)+Math.pow(h,2)))/2;
    var ydown=b+(Math.sqrt(Math.pow(w,2)+Math.pow(h,2)))/2;
    var movestopxf=xright-move;
    var movestopyf=b-move;
    var movestopxs=a+move;
    var movestopys=ydown-move;
    var movestopxt=xleft+move;
    var movestopyt=b+move;
    var movestopxc=a-move;
    var movestopyc=ytop+move;
    var LengthQuarterSqaure=(2*(Math.PI)*(r/4))+ Math.sqrt(Math.pow(movestopxf-movestopxs,2)+Math.pow(movestopyf-movestopyc,2));
    var ArcLengthProportion=0.25*(r*Math.PI/4)/LengthQuarterSqaure;
    var LineLengthProportion=0.25*Math.sqrt(Math.pow(movestopxf-movestopxs,2)+Math.pow(movestopyf-movestopyc,2))/LengthQuarterSqaure;
    var PlusCurrentLine=0.01;
    var PlusCurrentRadius=PlusCurrentLine*Math.sqrt(Math.pow(movestopxf-movestopxs,2)+Math.pow(movestopxc-movestopyc,2))/r*Math.PI/2;
    var currentArc=0;
    var currentQuart=0;
    var currentArcTemp=0;
    var currentQuartTemp=0;
    var Fraction=0.95;
    var ArcType;
    var LineType;

    ctx.lineWidth = 20; 
    ctx.beginPath();
    DrawArcPiece(); 

//Draw the pieces
    function DrawArcPiece(){
        var loadArc1 = setInterval(function(){        
            if(currentArcTemp >= 1) {
                currentArcTemp=0;
                currentArc=0;
                Fraction=Fraction-ArcLengthProportion;
                if(Fraction>0) 
                    DrawLinePiece();
                clearInterval(loadArc1);
            }
            else
            {
                if(Fraction<ArcLengthProportion)
                    tickArc(currentArcTemp,1,Fraction); 
                else{
                    tickArc(currentArcTemp,1,ArcLengthProportion); 
                }       
            }            
        }, 25);
        
    }

    function DrawArcPiece2(){
        var loadArc2 = setInterval(function(){
            if(currentArcTemp < 1) {
                if(Fraction<ArcLengthProportion)
                    tickArc(currentArcTemp,2,Fraction); 
                else{
                    tickArc(currentArcTemp,2,ArcLengthProportion); 
                }       
            }
            else
            {
                currentArcTemp=0;
                currentArc=0;
                Fraction=Fraction-ArcLengthProportion;
                if(Fraction>0) 
                DrawArcPiece3();
                clearInterval(loadArc2);
            }          
        }, 25);
        
    }

    function DrawArcPiece3(){

        var loadArc3 = setInterval(function(){
            if(currentArcTemp < 1) {
                if(Fraction<ArcLengthProportion)
                    tickArc(currentArcTemp,3,Fraction); 
                else{
                    tickArc(currentArcTemp,3,ArcLengthProportion); 
                }       
            }
            else
            {
                currentArcTemp=0;
                currentArc=0;
                Fraction=Fraction-ArcLengthProportion;
                if(Fraction>0) 
                    DrawLinePiece2();
                clearInterval(loadArc3);
            }
        }, 25);
        
    }
    
    function DrawArcPiece4(){

        var loadArc4 = setInterval(function(){
            if(currentArcTemp < 1) {
                if(Fraction<ArcLengthProportion)
                    tickArc(currentArcTemp,4,Fraction); 
                else
                {
                    tickArc(currentArcTemp,4,ArcLengthProportion); 
                }       
            }
            else
            {
                currentArcTemp=0;
                currentArc=0;
                Fraction=Fraction-ArcLengthProportion;
                if(Fraction>0) 
                    DrawArcPiece5();
                clearInterval(loadArc4);
            }
        }, 25);
        
    }

    function DrawArcPiece5(){

        var loadArc5 = setInterval(function(){
            if(currentArcTemp < 1) {
                if(Fraction<ArcLengthProportion)
                    tickArc(currentArcTemp,5,Fraction); 
                else{
                    tickArc(currentArcTemp,5,ArcLengthProportion); 
                }       
            }
            else
            {
                currentArcTemp=0;
                currentArc=0;
                Fraction=Fraction-ArcLengthProportion;
                if(Fraction>0) 
                    DrawLinePiece3();
                clearInterval(loadArc5);
            }
        }, 25);
        
    }

    function DrawArcPiece6(){

        var loadArc6 = setInterval(function(){
            if(currentArcTemp < 1) { 
                if(Fraction<ArcLengthProportion)
                    tickArc(currentArcTemp,6,Fraction); 
                else
                {
                    tickArc(currentArcTemp,6,ArcLengthProportion); 
                }       

            }
            else
                {
                currentArcTemp=0;
                currentArc=0;
                Fraction=Fraction-ArcLengthProportion;
                if(Fraction>0) 
                    DrawArcPiece7();
                clearInterval(loadArc6);
                }
        }, 25);
        
    }

    function DrawArcPiece7(){

        var loadArc7 = setInterval(function(){
            if(currentArcTemp < 1) { 
                if(Fraction<ArcLengthProportion)
                    tickArc(currentArcTemp,7,Fraction); 
                else
                {
                    tickArc(currentArcTemp,7,ArcLengthProportion); 
                }       

            }
            else
            {
                currentArcTemp=0;
                currentArc=0;
                Fraction=Fraction-ArcLengthProportion;
                if(Fraction>0) 
                    DrawLinePiece4();
                clearInterval(loadArc7);
            }
            }, 25);
        
    }

    function DrawArcPiece8(){

        var loadArc8 = setInterval(function(){
            if(currentArcTemp < 1) { 

                if(Fraction<ArcLengthProportion)
                    tickArc(currentArcTemp,8,Fraction); 
                else{
                    tickArc(currentArcTemp,8,ArcLengthProportion); 
                }       
            }
            else
            {
                currentArcTemp=0;
                currentArc=0;
                clearInterval(loadArc8);
            }
        }, 25);
        
    }
//Setting the time interval to draw the arcs
    function tickArc(currentArc,ArcType,frac){
        currentArc += PlusCurrentRadius;
        currentArcTemp=currentArc;

        switch(ArcType)
        {
        case 1:
        Arc1(currentArc,frac);
        break;
        case 2:
        Arc2(currentArc,frac);
        break;
        case 3:
        Arc3(currentArc,frac);
        break;
        case 4:
        Arc4(currentArc,frac);
        break;
        case 5:
        Arc5(currentArc,frac);
        break;
        case 6:
        Arc6(currentArc,frac);
        break;
        case 7:
        Arc7(currentArc,frac);
        break;
        case 8:
        Arc8(currentArc,frac);
        break;
        }    
        ctx.stroke();
        ctx.save();
    }  
    
//Draw the lines
    function DrawLinePiece(){

        var loadLine1 = setInterval(function(){ 
        if( currentQuartTemp < 1) {
            if (Fraction<LineLengthProportion){
                tickLine(currentQuartTemp,1,Fraction);}
            else{
                tickLine(currentQuartTemp,1,LineLengthProportion);
            }
        }
        else
        {
            currentQuart=0;
            currentQuartTemp=0;
            Fraction=Fraction-LineLengthProportion;
            if(Fraction>0)
                DrawArcPiece2();
            clearInterval(loadLine1);
        }
        }, 25);
    }

    function DrawLinePiece2(){
        var loadLine2 = setInterval(function(){ 
        if( currentQuartTemp < 1) {
            if (Fraction<LineLengthProportion){
                tickLine(currentQuartTemp,2,Fraction);}
            else{
                tickLine(currentQuartTemp,2,LineLengthProportion);
            }
        }
        else
        {
            currentQuart=0;
            currentQuartTemp=0;
            Fraction=Fraction-LineLengthProportion;
            if(Fraction>0) 
                DrawArcPiece4();
            clearInterval(loadLine2);
        }
        }, 25);
    }

    function DrawLinePiece3(){
        var loadLine3 = setInterval(function(){ 
        if( currentQuartTemp < 1) {
            if (Fraction<LineLengthProportion){
            tickLine(currentQuartTemp,3,Fraction);}
            
            else{
                tickLine(currentQuartTemp,3,LineLengthProportion);
            }
        }
        else
        {
        currentQuart=0;
        currentQuartTemp=0;
        Fraction=Fraction-LineLengthProportion;
        if(Fraction>0)
            DrawArcPiece6();
        clearInterval(loadLine3);
        }
        }, 25);
    }

    function DrawLinePiece4(){
        var loadLine4 = setInterval(function(){ 
        if( currentQuartTemp < 1) {
            if (Fraction<LineLengthProportion){
                tickLine(currentQuartTemp,4,Fraction);}
            else{
                tickLine(currentQuartTemp,4,LineLengthProportion);
            }
            }
        else
        {
        currentQuart=0;
        currentQuartTemp=0;
        Fraction=Fraction-LineLengthProportion;
        if(Fraction>0) 
            DrawArcPiece8();
        clearInterval(loadLine4);
        }
        }, 25);
    }
//Setting the time interval to draw the lines
    function tickLine(currentQuart,LineType,frac){

        currentQuart += PlusCurrentLine;
        currentQuartTemp=currentQuart;

        switch(LineType)
        {
            case 1:
            LineQuarter(currentQuart,frac);
            break;
            case 2:
            LineHalf(currentQuart,frac);
            break;
            case 3:
            LineThird(currentQuart,frac);
            break;
            case 4:
            LineFull(currentQuart,frac);
            break;
        }
        ctx.stroke();
    }

//Draw the arcs
    function Arc1(currentArc,FractionArc){

        var Ra1= FractionArc*(r*Math.PI/4)/ArcLengthProportion;
        ctx.moveTo(a,ytop+rsqr-r);
        //ctx.arc(a, ytop+rsqr,r,6/4*Math.PI,6/4*Math.PI+1/4*Math.PI*currentArc,false);
        ctx.arc(a, ytop+rsqr,r,6/4*Math.PI,6/4*Math.PI+(Ra1/r)*currentArc,false);

    }  
    //Full arc got seperated in the below 
    // ctx.arc(xright-rsqr, b,r,-1/4*Math.PI,1/4*Math.PI*currentArc);
    function Arc2(currentArc,FractionArc){

        var Ra2= FractionArc*(r*Math.PI/4)/ArcLengthProportion;
        ctx.moveTo(xright-move, b-move);
        ctx.arc(xright-rsqr, b,r,7/4*Math.PI,7/4*Math.PI+(Ra2/r)*currentArc); 
    }

    function Arc3(currentArc,FractionArc){

        var Ra3= FractionArc*(r*Math.PI/4)/ArcLengthProportion;
        ctx.moveTo(xright-rsqr+r,b);
        ctx.arc(xright-rsqr, b,r,0,(Ra3/r)*currentArc);
    }
    //Full arc got seperated in the below 
    //ctx.arc(a, ydown-rsqr,r,1/4*Math.PI,2/4*Math.PI+1/4*Math.PI*currentArc);
    function Arc4(currentArc,FractionArc){

        var Ra4= FractionArc*(r*Math.PI/4)/ArcLengthProportion;
        ctx.moveTo(a+move,ydown-move);
        ctx.arc(a, ydown-rsqr,r,1/4*Math.PI,1/4*Math.PI+(Ra4/r)*currentArc);

    }
    
    function Arc5(currentArc,FractionArc){

        var Ra5= FractionArc*(r*Math.PI/4)/ArcLengthProportion;
        ctx.moveTo(a,ydown-rsqr+r);
        ctx.arc(a, ydown-rsqr,r,1/2*Math.PI,1/2*Math.PI+(Ra5/r)*currentArc);
        
    }
//Full arc got seperated in the below 
//ctx.arc(xleft+rsqr, b,r,3/4*Math.PI,Math.PI+1/4*Math.PI*currentArc); 
    function Arc6(currentArc,FractionArc){

        var Ra6= FractionArc*(r*Math.PI/4)/ArcLengthProportion;
        ctx.moveTo(xleft+move,b+move);
        ctx.arc(xleft+rsqr, b,r,3/4*Math.PI,3/4*Math.PI+(Ra6/r)*currentArc);
        
    }
    
    function Arc7(currentArc,FractionArc){
        
        var Ra7= FractionArc*(r*Math.PI/4)/ArcLengthProportion;
        ctx.moveTo(xleft+rsqr-r, b);
        ctx.arc(xleft+rsqr, b,r,Math.PI,Math.PI+(Ra7/r)*currentArc);
        
    }
    
    function Arc8(currentArc,FractionArc){
        
        var Ra8= FractionArc*(r*Math.PI/4)/ArcLengthProportion;
        ctx.moveTo(a-move,ytop+move);
        ctx.arc(a, ytop+rsqr,r,5/4*Math.PI,5/4*Math.PI+(Ra8/r)*currentArc);
        
    }
   //Draw the quart lines 
    function LineQuarter(currentQuart,FractionLine){

        var Ral1=  FractionLine*Math.sqrt(Math.pow(movestopxf-movestopxs,2)+Math.pow(movestopyf-movestopyc,2))/LineLengthProportion;

        ctx.moveTo(a+move, ytop+move); 
        //ctx.lineTo(xright-move,b-move);  
        if(Math.sqrt(Math.pow(((a+move)*(1-currentQuart)+xright*currentQuart)-(a+move),2)+Math.pow(((ytop+move)*(1-currentQuart)+b*currentQuart)-(ytop+move),2))<=Ral1)  
            if ((a+move)*(1-currentQuart)+xright*currentQuart<=movestopxf&&(ytop+move)*(1-currentQuart)+b*currentQuart<=movestopyf)
            ctx.lineTo((a+move)*(1-currentQuart)+xright*currentQuart,(ytop+move)*(1-currentQuart)+b*currentQuart);
    }
    
    function LineHalf(currentQuart,FractionLine){

        var Ral2=  FractionLine*Math.sqrt(Math.pow(movestopxf-movestopxs,2)+Math.pow(movestopyf-movestopyc,2))/LineLengthProportion;

        ctx.moveTo(xright-move,b+move);
        //ctx.lineTo(a+move,ydown-move); 
        if(Math.sqrt(Math.pow(((xright-move)*(1-currentQuart)+a*currentQuart)-(xright-move),2)+Math.pow(((b+move)*(1-currentQuart)+ydown*currentQuart)-(b+move),2))<=Ral2)  
            if ((xright-move)*(1-currentQuart)+a*currentQuart>=movestopxs&&(b+move)*(1-currentQuart)+ydown*currentQuart<=movestopys)
                ctx.lineTo((xright-move)*(1-currentQuart)+a*currentQuart,(b+move)*(1-currentQuart)+ydown*currentQuart);
    }
    
    function LineThird(currentQuart,FractionLine){

        var Ral3=  FractionLine*Math.sqrt(Math.pow(movestopxf-movestopxs,2)+Math.pow(movestopyf-movestopyc,2))/LineLengthProportion;

        ctx.moveTo(a-move,ydown-move);
        //ctx.lineTo(xleft+move,b+move);
        if(Math.sqrt(Math.pow(((a-move)*(1-currentQuart)+(xleft)*currentQuart)-(a-move),2)+Math.pow(((ydown-move)*(1-currentQuart)+b*currentQuart)-(ydown-move),2))<=Ral3)  
            if ((a-move)*(1-currentQuart)+(xleft)*currentQuart>=movestopxt&&(ydown-move)*(1-currentQuart)+b*currentQuart>=movestopyt)
                ctx.lineTo((a-move)*(1-currentQuart)+(xleft)*currentQuart,(ydown-move)*(1-currentQuart)+b*currentQuart);
    }

    function LineFull(currentQuart,FractionLine){
        
        ctx.moveTo(xleft+move,b-move);
        //ctx.lineTo(a-move,ytop+move);
        var Ral4=  FractionLine*Math.sqrt(Math.pow(movestopxf-movestopxs,2)+Math.pow(movestopyf-movestopyc,2))/LineLengthProportion;

        if(Math.sqrt(Math.pow(((xleft+move)*(1-currentQuart)+(a)*currentQuart)-(xleft+move),2)+Math.pow(((b-move)*(1-currentQuart)+ytop*currentQuart)-(b-move),2))<=Ral4)  
            if ((xleft+move)*(1-currentQuart)+(a)*currentQuart<=movestopxc&&(b-move)*(1-currentQuart)+ytop*currentQuart>=movestopyc)
                ctx.lineTo((xleft+move)*(1-currentQuart)+(a)*currentQuart,(b-move)*(1-currentQuart)+ytop*currentQuart);
        
    }    



}

  
