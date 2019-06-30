step(1,1000);
step(2,1000);
step(3,1000);
function print(num,timer){
    var time = 0;
    return function(){
        time+=timer;
        setTimeout(()=>{
            console.log(num);
        },time)
    }
}
var step = print();
