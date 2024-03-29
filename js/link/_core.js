var initsto = storage('link', {
  sync: true,
  title:"链接",
  desc:"QUIK起始页链接数据",
  get:async function(){
    var a=initsto.getAll();
    var sm=a['storage-mode'];
    if(sm=='db'){
      a.links=await localforage.getItem(a.links);
      a.cates=await localforage.getItem(a.cates);
    }
    delete a['storage-mode'];
    return a;
  },
  rewrite:function(ast,k,a){
    return new Promise(function(r){
      a['storage-mode']=initsto.get('storage-mode');
      if(initsto.get('storage-mode')=='db'){
        initsto.remove('links',true,function(){
          dbTool.set(a.links,function(hash){
            a.links=hash;
            initsto.remove('cates',true,function(){
              dbTool.set(a.cates,function(hash){
                a.cates=hash;
                ast[k]=a;
                r();
              });
            });
          });
         
        })
      }else{
        ast[k]=a;
      }
    })
    
  },
  compare:function(a){
    return new Promise(function(r){
      a['storage-mode']=initsto.get('storage-mode');
      if(a['storage-mode']=='db'){
        initsto.get('links',true,function(old){
          initsto.remove('links',true,function(){});
          a.links=compareLinks(old,a.links);
          dbTool.set(a.links,function(hash){
            a.links=hash;
            initsto.get('cates',true,function(ocate){
              initsto.remove('cates',true,function(){});
              a.cates=compareCates(ocate,a.cates);
              dbTool.set(a.cates,function(hash){
                a.cates=hash;
                ast[k]=a;
                r();
              });
            });
          });
        })
      }else{
        a.links=compareLinks(initsto.get('links'),a.links);
        a.cates=compareLinks(initsto.get('cates'),a.cates);
        ast[k]=a;
      }
    })
  }
});

/**
 * 
 * @param {Array} a 
 * @param {Array} b 
 */
function compareLinks(a,b){
  for(var i=0;i<a.length;i++){
    if(!b.find(function(v){
      return v.title==a[i].title&&v.url==a[i].url;
    })){
      b.push(a[i]);
    }
  }
  return b;
}

function compareCates(a,b){
  for(var k in a){
    if(b[k]){
      b[k]=compareLinks(a[k],b[k]);
    }else{
      b[k]=a[k];
    }
  }
  return b;
}

var eventfns = {
  change: []
};
function pushLink(detail, ob) {
  var link = {
    title: detail.title,
    url: detail.url
  }
  if (typeof detail.index == 'number' && detail.index >= 0) {
    if (detail.index > ob.length) {
      console.warn('添加链接时，index超出范围，应在0-' + ob.length + '之间');
      ob.push(link);
    } else {
      ob.splice(detail.index, 0, link);
    }
  } else {
    ob.push(link);
  }
  return ob;
}

function writeLink(index, detail, ob) {
  if (!ob[index]) {
    return false;
  }
  var link = {
    title: detail.title,
    url: detail.url
  }
  ob[index] = link;
  if (typeof detail.index == 'number' && detail.index >= 0) {
    if (detail.index >= ob.length) {
      console.warn('修改链接时，index超出范围，应在0-' + (ob.length - 1) + '之间');
    } else {
      var linkb = ob.splice(index, 1)[0];
      ob.splice(detail.index, 0, linkb);
    }
  }
  return ob;
}

function limitURL(detail) {
  if (detail.url.length > 1000) {
    return 'url';
  } else if (detail.title.length > 60) {
    return 'title';
  }
  return false;
}