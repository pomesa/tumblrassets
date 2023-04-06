/*---------------------------------------------------
    
    MUSIC PLAYER #02 by glenthemes
    
    Initial release: 2018/10/30
    Rework date: 2022/02/03
    Last updated: 2022/02/16
    
    CREDITS:
    > play & pause icons: Phosphor Icons
    > music note icon: by Ahmed Agrma
      behance.net/gallery/94660737/400-Free-Line-Icons
    
    WHAT'S COOKIN, TRAVELLER? 
    it's been a tradition of mine to put hidden
    learning resources here in the comments, so
    let's continue that :)
    
    to build a music player you need javascript
    as well as html components. css is wherever you
    want the player to be and how you want it to look!
    
    > audio javascript:
      https://www.w3schools.com/jsref/dom_obj_audio.asp
    > audio html:
      https://www.w3schools.com/tags/tag_audio.asp
    
---------------------------------------------------*/
var root = getComputedStyle(document.documentElement);

var customize_page = window.location.href.indexOf("/customize") > -1;
var on_main = window.location.href.indexOf("/customize") < 0;

$(document).ready(function(){
    
    $("[glenplayer02] .tumblr_preview_marker___").remove();
    
    /* add the buttons */
    $("[glenplayer02] [controls]").each(function(){
        $(this).attr("M02controls","");
        $(this).append("<div M02play></div>");
        $(this).append("<div M02pause></div>");
    })
    
    var filamu = $.trim(root.getPropertyValue("--MusicPlayer-Buttons-Fill"));
    
    // outlined icons
    if(filamu == "no"){
        $("[M02play]").append('<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 256 256"><path d="M79.99805,235.98535A19.99182,19.99182,0,0,1,60,215.98877V40.01123A20.00021,20.00021,0,0,1,90.42969,22.9458l143.97656,87.98877h0a20.00038,20.00038,0,0,1,0,34.13086L90.42969,233.0542A19.99874,19.99874,0,0,1,79.99805,235.98535ZM84,47.14355v161.7129L216.30566,128Z"/></svg>');
        $("[M02pause]").append('<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 256 256"><path d="M200,28H164a20.0226,20.0226,0,0,0-20,20V208a20.0226,20.0226,0,0,0,20,20h36a20.0226,20.0226,0,0,0,20-20V48A20.0226,20.0226,0,0,0,200,28Zm-4,176H168V52h28ZM92,28H56A20.0226,20.0226,0,0,0,36,48V208a20.0226,20.0226,0,0,0,20,20H92a20.0226,20.0226,0,0,0,20-20V48A20.0226,20.0226,0,0,0,92,28ZM88,204H60V52H88Z"/></svg>');
    }
    
    // filled icons
    if(filamu == "yes"){
        $("[M02play]").append('<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 256 256"><path d="M239.96875,128a15.9,15.9,0,0,1-7.65625,13.65625L88.34375,229.64062A15.9978,15.9978,0,0,1,64,215.99219V40.00781A15.99781,15.99781,0,0,1,88.34375,26.35937L232.3125,114.34375A15.9,15.9,0,0,1,239.96875,128Z"/></svg>');
        $("[M02pause]").append('<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 256 256"><path d="M216,48V208a16.01833,16.01833,0,0,1-16,16H164a16.01833,16.01833,0,0,1-16-16V48a16.01833,16.01833,0,0,1,16-16h36A16.01833,16.01833,0,0,1,216,48ZM92,32H56A16.01833,16.01833,0,0,0,40,48V208a16.01833,16.01833,0,0,0,16,16H92a16.01833,16.01833,0,0,0,16-16V48A16.01833,16.01833,0,0,0,92,32Z"/></svg>');
    }
    
    /* music player position */
    var MPpoz = $.trim(root.getPropertyValue("--MusicPlayer-Position"));
    
    var uvalz = MPpoz.split(" ").length;
    var uveach = MPpoz.split(" ");
    for(elf=0; elf<uvalz; elf++){
        if(uveach[elf] == "top"){
            $("[glenplayer02]").addClass("mp-top")
        }
        
        if(uveach[elf] == "bottom"){
            $("[glenplayer02]").addClass("mp-bot")
        }
        
        if(uveach[elf] == "left"){
            $("[glenplayer02]").addClass("mp-left")
        }
        
        if(uveach[elf] == "right"){
            $("[glenplayer02]").addClass("mp-right")
        }
    }
    
    /* audio events */
    /* fix dropbox links first */
    $("[glenplayer02] audio").each(function(){
        $(this).attr("src",$.trim($(this).attr("src")));
        if($(this).attr("src").indexOf("dropbox.com").length > -1){
            $(this).attr("src",$(this).attr("src").replace("www.dropbox.com","dl.dropbox.com").replace("?dl=0",""));
        } else {
            
        }
    });
    
    /* then assign the audio elems to vars */
    var ood = $("[glenplayer02]").find("audio");
    var oodz = $("[glenplayer02]").find("audio")[0];
    
    /* retrieve volume */
    var vrun = $.trim(ood.attr("volume"));
        vrun = parseInt(vrun) / 100;
        
    oodz.volume = vrun;
    
    $("[m02controls]").click(function(){
        if(oodz.paused){
            oodz.play();
            $("[M02play]").addClass("sxnvw");
            $("[M02pause]").addClass("qxdvl");
        } else {
            oodz.pause();
            $("[M02play]").removeClass("sxnvw");
            $("[M02pause]").removeClass("qxdvl");
        }
    })
    
    ood.bind("ended", function(){
        $("[M02play]").removeClass("sxnvw");
        $("[M02pause]").removeClass("qxdvl");
    });
    
    ood.bind("pause", function(){
        $("[M02play]").removeClass("sxnvw");
        $("[M02pause]").removeClass("qxdvl");
    });
    
    ood.bind("play", function(){
        $("[M02play]").addClass("sxnvw");
        $("[M02pause]").addClass("qxdvl");
    });
    
    /* initialize line icons by ahmed agrma */
    /* glenthemes.tumblr.com/icons/aa-line-icons */
    $("head").prepend("<link href='//glenthemes.github.io/aa-line-icons/style.css' rel='stylesheet'>");
    
    document.querySelectorAll(".aa-line-icons").forEach(aa_icons => {
        var z_z = aa_icons.getAttribute("icon-name").replace(/ /g,"-").toLowerCase().trim();
        
        fetch("//glenthemes.github.io/aa-line-icons/-/" + z_z + ".svg")
        .then(y_y => {
            return y_y.text();
        }).then(y_y => {
            aa_icons.innerHTML = y_y;
            if(aa_icons.querySelectorAll("[http-equiv='Content-Security-Policy']").length){
                aa_icons.textContent = "";
            }
            
            var svgtit = aa_icons.querySelectorAll("title");
            if(svgtit.length){
                svgtit[0].remove();
            }
        });
    });
    
    /*--- song name ---*/
    $("[glenplayer02]").contents().filter(function(){
        return this.nodeType === 3 && this.data.trim().length > 0
    }).wrap("<span/>");
    
    $("[glenplayer02] span").each(function(){
        var eoeojg = $(this).html();
        $(this).html($.trim(eoeojg));
    })
    
    $("[m02controls]").each(function(){
        if($(this).next().is(".aa-line-icons")){
            $(this).next().nextUntil("audio").wrapAll("<div song-name></div>")
        } else {
            $(this).nextUntil("audio").wrapAll("<div song-name></div>")
        }
    })
    
    $("[glenplayer02]").css("visibility","visible");
    
})// end ready
