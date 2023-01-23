# brainfuck-interpreter
a brainfuck interpreter written in pure/vanilla JavaScript

...............................................................................................................

>"Brainfuck is an esoteric programming language created in 1993 by Urban Müller" -- Wikipedia.

You can find more information about brainfuck language from the following links or a simple google search. [Wikipedia](https://en.wikipedia.org/wiki/Brainfuck) or [esolangs](https://esolangs.org/wiki/Brainfuck).

This is a interpreter for executing brainfuck program into JavaScript supported enviourment

...............................................................................................................

## How to program in brainfuck language?
Brainfack is a Turing-complete language that supports just 8 commands. Just like the Turing machine model, brainfuck also has an array of memory cells and each of them has an initial value of zero.
Besides the array of memory cells, brainfuck also has a pointer and as  brainfuck programmers we just control this pointer to read / write a value to a particular memory cell (just like the [Turing Machine](https://en.wikipedia.org/wiki/Turing_machine)).

You can find various programming guides that show you how to program in the Brainfuck language, but for a summary here is a table from Wikipedia:
|Character|Meaning|
|---------|-------|
|>|Increment the data pointer (to point to the next cell to the right).|
|<|	Decrement the data pointer (to point to the next cell to the left).|
|+|Increment (increase by one) the byte at the data pointer.|
|-|	Decrement (decrease by one) the byte at the data pointer.|
|.|Output the byte at the data pointer.|
|,|Accept one byte of input, storing its value in the byte at the data pointer.|
|[|If the byte at the data pointer is zero, then instead of moving the instruction pointer forward to the next command, jump it forward to the command after the matching ] command.|
|]|If the byte at the data pointer is nonzero, then instead of moving the instruction pointer forward to the next command, jump it back to the command after the matching [ command.|

...............................................................................................................

## How to use this interpreter?
To use this interpreter / library firstly, you need to link bf_interpreter.js to your project, you can do that by using two ways:
* (1) you can either download/clone it and then use **'bf_interpreter.js'** file
* (2) or you can use it directly using **`https://cdn.jsdelivr.net/gh/nirmalpaul383/brainfuck-interpreter@latest/bf_interpreter.js`**
  For using it in browser/webpage you can use **``` <script src="https://cdn.jsdelivr.net/gh/nirmalpaul383/brainfuck-interpreter@latest/bf_interpreter.js"></script> ```**

Then you need to create a brainfuck interpreter object using ` new bf_interpreter ` keywords:
```JavaScript
let myInterpreter = new bf_interpreter();
```
#### Usage of ` .interpret() ` method
To execute a brainfuck program just use ` .interpret() ` method
```JavaScript
//Storing a hello world brain fuck program into a variable called codes.
let codes = `>[-] >[-]++++++++[<+++++++++>-]<.>+++++[<++++++>-]<-.+++++++..+++.>+++++++++[<--------->-]<++.>+++++++[<++++++++>-]<-.>+++++[<+++++>-]<-.+++.------.   --------.>++++++++[<-------->-]<---.<`;
//Note: for better organization (multiline string) of code, it is recommended to use backticks (`) instead of normal single (') or double quote (")

console.log(myInterpreter.interpret(codes)) //Executes Brainfuck program and returns "Hello World!" into the javascript console
```

#### Usage of ` .memoryTape `,` .pointer `,` .stack `,` .output `,` .steps ` properties
To view the last (after the last time code is interpreted) memory tape value in the brainfuck interpreter you can use ` .memoryTape ` property

Similarly to view last (after the last time code is interpreted) position of the pointer you can use ` .pointer ` property

For viewing any un-settelment last (after the last time code is interpreted) stack information you can use ` .stack ` property (This is for debugging usage only, in normal case this should return an empty array)

For viewing the last (after the last time code is interpreted) output / returned value in the brainfuck interpreter you can use ` .output ` property.

For veiwing the last (after the last time code is interpreted) codes execution logs / steps you can use `.steps` property.
**Note:** To use the ` .step ` property, the stepRecorder must be set to **True** when interpreting the code (e.g. ` myInterpreter.interpret(codes , True) `)

```JavaScript
console.log(myInterpreter.memoryTape) //Returns [ 0, 33, 0 ] into the console object
console.log(myInterpreter.pointer) //Returns 0 into the console object
console.log(myInterpreter.stack) //Returns [] into the console object
console.log(myInterpreter.output) //Returns "Hello World!" into the console object
console.log(myInterpreter.steps) //Returns codes execution steps (logs) into the console object
```

...............................................................................................................

## Another sample brainfuck program
```JavaScript
//a sample brainfuck program with examples of how to use this interpreter
let bfCodes = `Sample brainfuck program "by N Paul"
our first cell will be used as counter
++++++++++[->++++++++++<]>--.  for printing "b"
<++++++++++[->>++++++++++++<<]>>+. for printing "y"
<<++++++++[->>>++++<<<]>>>. for printing " " (Space)
<<<++++++++++[->>>>++++++++<<<<]>>>>--.  for printing "N"
<<<<++++++++[->>>>>++++<<<<<]>>>>>.  for printing " " (Space)
<<<<<++++++++++[->>>>>>++++++++<<<<<<]>>>>>>.  for printing "P"
from now on the next cell after our last current cell will be used as counter
>>++++++++++[-<++++++++++>]<---.  for printing "a"
>>++++++++++[-<++++++++++++>]<---. for printing "u"
>>++++++++++[-<+++++++++++>]<--.  for printing "l"
`
let BF_Interpreter = new bf_interpreter(); //Creating a new brainfuck interpreter
console.log(BF_Interpreter.interpret(bfCodes)) //Print "by N Paul" into the console
```
...............................................................................................................

If you like this project please give a star to these projects. https://github.com/nirmalpaul383/brainfuck-interpreter

This project is originally made by me(N Paul). My **github profile:** https://github.com/nirmalpaul383/ 

My **youtube page:** https://www.youtube.com/channel/UCY6JY8bTlR7hZEvhy6Pldxg/

This is an open source program. You are welcomed to modify it...

If you want to support me please give a like to our **facebook page:** https://facebook.com/a.new.way.Technical/
