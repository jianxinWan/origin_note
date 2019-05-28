var url = ['/a','/b','/c'];
function Ajax(url,resolve,reject){
    //....
    var xml = null;
    if(window.XMLHttpRequest){
        xml = new XMLHttpRequest();
    }else{
        xml = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xml.onreadyStatechange = function(){
        var obj = {
            success:false,
            error:false,
            date:""
        };
        if(xml.readystate ===4){
            if(xml.status >=200 && xml.status<300||xml.status ==304){
                obj.success = true;
                obj.data = xml.responseText;
                resolve(obj);
            }else{
                obj.error = true;
                obj.data = "error";
                resolve(obj)
            }
        }
    }
    xml.open('get',url,true);
    xml.send(null);
}
function promiseArr(url){
    return url.map((item)=>{
        return new Promise((resolve,reject)=>{
            Ajax(item,resolve,reject);
        })
    })
}
const list = promiseArr(url);
Promise.all(list);
