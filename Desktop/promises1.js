console.log("start of the file");
setTimeout(function timer1(){
    console.log("Timer 1 done");
},0);
for(let i=0;i<100000000;i++){

}
let x=Promise.resolve("Sanket's promise");
x.then(function processPromise(value){
    console.log("whose promise ?",value);
});

setTimeout(function timer2(){
    console.log("Timer 2 done");
},0);
console.log("end of the file");