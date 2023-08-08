function dummyPromise(){
    return new Promise(function (resolve,reject){
        setTimeout(function(){
            resolve("Timer's promise");
        },1000);
    });
}
console.log("start of the file");
setTimeout(function timer1(){
    console.log("Timer 1 done");
    let y = Promise.resolve("Timer's promise");
    y.then(function promise(value){
        console.log("whose promise ?",value);
    })
},0);
let x=Promise.resolve("Sanket's promise");
x.then(function processPromise(value){
    console.log("whose promise ?",value);
});

setTimeout(function timer2(){
    console.log("Timer 2 done");
},0);
console.log("end of the file");