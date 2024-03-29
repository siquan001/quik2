(function(){
  var events=[];
  function getEventHandle(){
    var ev_i=events.length;
    events.push({});
    return {
      addEventListener:function(ev,fn){
        if(!events[ev_i][ev]) events[ev_i][ev]=[];
        events[ev_i][ev].push(fn);
        return true;
      },
      removeEventListener:function(ev,fn){
        if(!events[ev_i][ev]) return false;
        for(var i=0;i<events[ev_i][ev].length;i++){
          if(events[ev_i][ev][i]===fn){
            events[ev_i][ev].splice(i,1);
            return true;
          }
        }
        return false;
      },
      doevent:function(ev,args){
        if(!events[ev_i][ev]) return false;
        for(var i=0;i<events[ev_i][ev].length;i++){
          events[ev_i][ev][i].apply(null,args);
        }
        return true;
      }
    }
  }
  return getEventHandle; 
})();