// For conference and workshop schedule
//dateStr is expected in the format 2015-07-16", then returns "Thu Jul 16 2015"
function parseJson(e,t,s){var n=e.schedule,o=[],i=[],r=0,a=0;n.forEach(function(e,t,s){var n=[];s[t].date=getDateString(e.date),s[t].tableid="table-"+t,e.slots.forEach(function(e,o,i){var r=e.sessions;o===0&&(s[t].start=getIST(getTimeString(e.sessions[0].start))),o===i.length-1&&(s[t].end=getIST(getTimeString(e.sessions[r.length-1].end))),r.forEach(function(e,i){e.room&&n.indexOf(e.room)===-1&&n.push(e.room),s[t].slots[o].sessions[i].start=getIST(getTimeString(e.start)),s[t].slots[o].sessions[i].end=getIST(getTimeString(e.end))}),s[t].type="conference"}),n.sort(),n.forEach(function(e,t,s){s[t]={name:e,title:getAudiTitle(e),shorttitle:getShortAudiTitle(e),track:t}}),s[t].rooms=n,e.slots.forEach(function(e,o){var i=e.sessions;i.forEach(function(e,i){e.room&&(s[t].slots[o].sessions[i].track=getTrack(e.room,n),s[t].slots[o].sessions[i].roomTitle=getAudiTitle(e.room))})}),s[t].type==="conference"?(i.push({date:s[t].date,tableid:s[t].tableid,rooms:s[t].rooms,start:s[t].start,end:s[t].end}),createTable(i[r]),r+=1):(o.push({date:s[t].date,rooms:s[t].rooms,start:s[t].start,end:s[t].end}),createTable(o[a]),a+=1)}),r=0,a=0,n.forEach(function(e){e.slots.forEach(function(e){e.sessions.length>1&&e.sessions.sort(function(e,t){return e.track-t.track})}),e.type==="conference"?(pushSessions(i[r],e.slots),addRowSpan(i[r]),checkColumns(i[r]),r+=1):(pushSessions(o[a],e.slots),addRowSpan(o[a]),checkColumns(o[a]),a+=1)}),t==="conference"?renderScheduleTable(i,"conference",s):renderScheduleTable(o,"workshop",s)}var getDateString=function(e){var t=parseInt(e.substr(0,4),10),s=parseInt(e.substr(5,2),10)-1,n=parseInt(e.substr(8,2),10),o=new Date;return o.setFullYear(t,s,n),o.toDateString()},getTimeString=function(e){return e.substr(e.indexOf("T")+1,5)},getHrMin=function(e){var t=e.substring(0,e.indexOf(":")),s=e.substring(e.indexOf(":")+1);return[t,s]},getdateObject=function(e,t){var s=new Date;return s.setHours(e),s.setMinutes(t),s},toTimeString=function(e){return(10>e.getHours()?"0":"")+e.getHours()+":"+((10>e.getMinutes()?"0":"")+e.getMinutes())},getIST=function(e){var t=parseInt(getHrMin(e)[0],10)+5,s=parseInt(getHrMin(e)[1],10)+30,n=getdateObject(t,s);return ist=toTimeString(n)},createTable=function(e){var t,s,n,o,i;t=getHrMin(e.start)[0],s=getHrMin(e.start)[1],n=getdateObject(t,s),t=getHrMin(e.end)[0],s=getHrMin(e.end)[1],o=getdateObject(t,s),e.slots=[];do i=toTimeString(n),e.slots.push({slot:i,issession:!1,sessions:[],occupied:"empty"}),n.setMinutes(n.getMinutes()+5);while(o>=n)},getTotalMins=function(e){var t=parseInt(getHrMin(e)[0],10),s=parseInt(getHrMin(e)[1],10);return t*60+s},getAudiTitle=function(e){return e.substring(e.indexOf("/")+1).replace(/-/g," ")+", "+e.substring(0,e.indexOf("/")).replace(/-/g," ")},getShortAudiTitle=function(e){return e.substring(e.indexOf("/")+1).replace(/-/g," ")},getTrack=function(e,t){var s;for(s=0;t.length>s;s++)if(t[s].name===e)return t[s].track},pushSessions=function(e,t){t.forEach(function(t){var s=t.sessions;s.forEach(function(t){var s=getTotalMins(t.start);getTotalMins(t.end),e.slots.forEach(function(e,n,o){getTotalMins(e.slot)===s&&(o[n].sessions.push(t),o[n].issession=!0)})})})},addRowSpan=function(e){e.slots.forEach(function(t,s,n){if(t.issession){(t.sessions[0].track===0||t.sessions[0].is_break)&&(t.occupied=0);var o=t.sessions;for(sessionindex=0;o.length>sessionindex;sessionindex++){var i=getTotalMins(o[sessionindex].end),r=s+1,a=1,c=!1;for(r=s+1;n.length>r;r++){if(n[r].issession===!0&&getTotalMins(n[r].sessions[0].start)>=i)break;n[r].issession===!0&&i>getTotalMins(n[r].sessions[0].start)&&(c=!0,a+=1)}c&&(e.slots[s].sessions[sessionindex].rowspan=a)}}})},checkColumns=function(e){for(var t=0;e.slots.length>t;t++)if(e.slots[t].issession&&e.slots[t].occupied!==0){var s=!1;for(j=t-1;j>0;j--)e.slots[j].issession&&getTotalMins(e.slots[j].sessions[0].end)>getTotalMins(e.slots[t].sessions[0].start)&&(s=!0);if(s===!1){var n=parseInt(getHrMin(e.slots[t].sessions[0].start)[0],10),o=parseInt(getHrMin(e.slots[t].sessions[0].start)[1],10)+5,i=getdateObject(n,o),r=toTimeString(i);e.slots[t].sessions[1]=e.slots[t].sessions[0],e.slots[t].sessions[0]={track:"empty",start:e.slots[t].sessions[1].start,end:r}}}},renderResponsiveTable=function(){$("td.tab-active").attr("colspan",3)},disableResponsiveTable=function(){$("td").not(".centered").attr("colspan","")},renderScheduleTable=function(e,t,s){e.forEach(function(e){var n=$("#scheduletemplate").html();t==="conference"?($(s).append(Mustache.render(n,e)),$(".schedule-table-container p.loadingtxt").hide()):($(s).append(Mustache.render(n,e)),$(".schedule-table-container p.loadingtxt").hide())}),768>$(window).width()&&renderResponsiveTable()};$(document).ready(function(){var e=$(window).width();$(window).resize(function(){e=$(window).width()}),$(window).scroll(function(){$(this).scrollTop()>0?$("#site-nav").addClass("navbar-fixed-top"):$("#site-nav").removeClass("navbar-fixed-top")}),$("#menu-btn").click(function(){$("#dropdown-menu").hasClass("off")?$("#dropdown-menu").slideDown().removeClass("off"):$("#dropdown-menu").slideUp().addClass("off")}),$(".smooth-scroll").click(function(e){e.preventDefault();var t=$(this).attr("href"),s=$(""+t).offset().top-$(".site-navbar").height();$("html,body").animate({scrollTop:s},"900")}),$(".button, .click-btn").click(function(){var e=$(this).html(),t=$(this).attr("href");typeof ga!="undefined"&&ga("send",{hitType:"event",eventCategory:"click",eventAction:e,eventLabel:t})});var t="https://droidconin.talkfunnel.com/2016/schedule/json";if($(".schedule-table-container").length&&($("#conferenceschedule").length&&(t=t,divContainer="#conferenceschedule",eventType="conference"),$.ajax({type:"GET",dataType:"jsonp",url:t,success:function(e){parseJson(e,eventType,divContainer)}})),$(window).resize(function(){768>$(window).width()?renderResponsiveTable():disableResponsiveTable()}),$("#conferenceschedule").on("click","table td .js-expand",function(){$(this).hasClass("fa-caret-right")?($(this).removeClass("fa-caret-right").addClass("fa-caret-down"),$(this).parents("td").find(".description-text").slideDown()):($(this).removeClass("fa-caret-down").addClass("fa-caret-right"),$(this).parents("td").find(".description-text").slideUp())}),$("#conferenceschedule").on("click","table th.track0, table th.track1, table th.track2",function(){if(768>$(window).width()){var e=$(this).parents("table"),t=$(this).attr("data-td");e.find(".tab-active").removeClass("tab-active"),$(this).addClass("tab-active"),e.find("."+t).addClass("tab-active"),renderResponsiveTable()}}),$("#boxoffice-widget").popover({selector:".t-shirt-image",placement:"right",trigger:"hover",html:!0}),$("#conf-photos").length){var s=new Freewall("#conf-photos");s.reset({selector:".brick",animate:!0,cellW:150,cellH:"auto",delay:200,onResize:function(){s.fitWidth()}});var n=s.container.find(".brick");n.find("img").load(function(){s.fitWidth()}),$(window).load(function(){s.fitWidth()})}if($("#section1-photos").length){var o=new Freewall("#section1-photos");o.reset({selector:".brick",animate:!0,cellW:150,cellH:"auto",delay:200,onResize:function(){o.fitWidth()}}),$(window).load(function(){o.fitWidth()})}});