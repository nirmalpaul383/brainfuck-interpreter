'use strict'
/**
This brainfuck interpreter project is originally made by me(N Paul). My github profile https: //github.com/nirmalpaul383/ My youtube page https://www.youtube.com/channel/UCY6JY8bTlR7hZEvhy6Pldxg/
This is an open source program. You are welcomed to modify it... If you want to support me please give a like to our facebook page https://facebook.com/a.new.way.Technical/
"Brainfuck is an esoteric programming language created in 1993 by Urban Müller" -- Wikipedia. I have just created a interpreter for executing brainfuck program into JavaScript supported enviourment.
You can download source files from my github profile https://github.com/nirmalpaul383/brainfuck-interpreter .
If you like this project please give a star to these projects. https://github.com/nirmalpaul383/brainfuck-interpreter
My YouTube Page: https://www.youtube.com/channel/UCY6JY8bTlR7hZEvhy6Pldxg/
   FaceBook Page: https://www.facebook.com/a.New.Way.Technical/
   GitHub Page: https://github.com/nirmalpaul383
**/

//Class defination for BrainFuck interpreter
class bf_interpreter {

    memoryTape = [0]; //Defining empty array for brainfuck 's memory tape (initilized with one cell with value of 0)
    pointer = 0; //For defining brainfuck 's pointer
    stack = []; //For stacking loop information (loop start / loop end positions)
    output = ""; //For holding output value
    steps = []; //For recording log for every step of execution


    interpret(codes, stepRecorder = false) {

        this.memoryTape = [0] //To reset brainfuck 's memory tape (re-initilized one cell with value of 0)
        this.pointer = 0; //To reset brainfuck 's pointer

        this.stack = []; //To clear brainfuck's loop stack
        let execSkip = false; /* To indicate whether current code execution will be skipped or not (in case of "[//ignorable codes//]" if current cell value is zero) */
        let skipCounter = 0; //To store the number of occurance of "[" in the ignorable codes (codes under "[" and "]" where current cell value is 0).

        this.output = ""; //To reset output

        this.steps = ["To record step-logs, stepRecorder parameter must be set to true during code interpretion [e.g. my_BF_Interpreter.interpret(codes,true)]"]; //To reset step-logs
        let stepCount = 0; //For counting the steps


        //To individually check each character in the brainfuck codes
        for (let i = 0; i < codes.length; i += 1) {

            let currentCmd = codes[i]; //Current keyword / command in codes string

            //Step recording function will only works if stepRecorder parameter is true
            if (stepRecorder == true) {
                this.steps[stepCount] = {Memorytape: `${this.memoryTape}`, Pointer: `${this.pointer}`, Output: `${this.output}`, CurrentChr: `${currentCmd}` };
                stepCount +=1; //The step counter will be incremented each time when a new step log is recorded
            }

            if ((currentCmd === ">") && (execSkip === false)) {
                this.pointer += 1;

                //If the pointer tries to access a cell on the memory tape that is not yet exists, then the value of that cell is initialized to zero.
                if (this.memoryTape[this.pointer] === undefined) {
                    this.memoryTape[this.pointer] = 0;
                }
            }
            else if ((currentCmd === "<") && (execSkip === false)) {
                this.pointer -= 1;

                //Negetive index of pointer is not allowed
                if (this.pointer < 0) {
                    this.pointer = 0;
                }
            }
            else if ((currentCmd === "+") && (execSkip === false)) {
                this.memoryTape[this.pointer] += 1;

                //The maximum value of a cell can be up to 255 and if the value of the current cell is greater than 255, it will be return back to 0
                if (this.memoryTape[this.pointer] > 255) {
                    this.memoryTape[this.pointer] = 0
                }
            }
            else if ((currentCmd === "-") && (execSkip === false)) {
                this.memoryTape[this.pointer] -= 1;

                //The minimum value of a cell cannot be below 0 and if the value of the current cell is less than 0, it will be return back to 255
                if (this.memoryTape[this.pointer] < 0) {
                    this.memoryTape[this.pointer] = 255
                }
            }

            else if ((currentCmd === ".") && (execSkip === false)) {
                //To record character from the cell 's value
                this.output += `${String.fromCharCode(this.memoryTape[this.pointer])}`
            }

            else if ((currentCmd === ",") && (execSkip === false)) {
                //To input user-provided character in the current cell

                //Try to use "prompt()" function
                try {
                    let inp = prompt("Enter a character:");
                    if (inp === null) {
                        this.memoryTape[this.pointer] = 0;
                    }
                    else {
                        //To store the value from user inputted character
                        this.memoryTape[this.pointer] = inp.charCodeAt(0)
                    }
                }
                catch {
                    console.log("'prompt()' function is not available")
                }

            }


            else if (currentCmd === "[") {
                this.stack.push(i); //Record loop start ("[") position in the stack

                //If the current cell value is 0, code execution  will be skipped until the corresponding "]" is found in the code.
                if (this.memoryTape[this.pointer] === 0) {
                    execSkip = true; //To set true value to global variable execSkip

                    skipCounter += 1; //The value of this counter will increment by one each time.
                }
            }

            else if (currentCmd === "]") {

                //For start looping (going back to the corresponding "[" , when current cell value is non-zero)
                if (this.memoryTape[this.pointer] !== 0) {
                    i = this.stack[this.stack.length - 1] - 1; //The index of the main loop (code string loop) will be equalled to the position just before the "[" in the code string (using stack (LIFO bassis)).
                }

                //If the current cell value is zero, the loop will not start and the value of the skip counter will also be decremented by one
                else if (this.memoryTape[this.pointer] === 0) {
                    skipCounter -= 1;
                    if (skipCounter === 0) {
                        execSkip = false //If the value of the skip counter becomes zero, the executable code will no longer be ignored next time.
                    }
                }

                this.stack.pop(); //To delete last loopstart (loop position) information from the stack (LIFO basis)
            }

            else {
                //Do nothing
            }

        }

        return this.output; //To return output value
    }
}

