/*
* Akari CPU v0.1
*/
//node stuff
//== eventually offload this to loader.js and
var fs = require('fs');
var file = './nop.bin';

var memspace;
//load data to var
data = fs.readFileSync(file);
console.log("data read");
memspace = data;
//generate memory array buffer, 8*0xff
//var memspace 	//= new ArrayBuffer(0xff); //make arraybuffer (bytes) in size
var mem 		= new Uint8Array(memspace); //make array split into 8bit chunks

//== eventually offload this to cpu.js
//make CPU class
class CPU {
	constructor(){
		this.start = 0x00;
	}
	halt(){
		//not implimented properly, at all
		//MEMDUMP!
		console.log(mem);
		process.exit(0);
	}
	execute(instr){
		var A = mem[instr];
		var B = mem[instr+1];
		var C = mem[instr+2];
		//console.log(`A = ${A}, B = ${B}, C = ${C}`);
		if (!(A+B)){
			if (C==(instr+2)){ //if C points to it's own position
				this.halt();
			}
		} else {
			mem[instr+1] = A;
		}
		this.execute(C);
	}
	run() {
		let instruction = mem[this.start];
		this.execute(instruction);
	}
}


//== eventually offload this to init.js
let cpu = new CPU();
cpu.run();
