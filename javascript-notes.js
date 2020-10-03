// 1. Backticks - allows us to use ${} string manipulation(?), if single or double quotes cannot
// --When using backtick, value is no longer a string literal but a template literal
// --one difference is in template literals, ctrl-enter(new lines) are allowed and considered


// 2. parseInt() parseFloat()
// --e.g. 
5+parseInt('5') 
// --shortform for parseInt/Float is +
// --e.g. 
5 + +'5.0'


// 3. Arrays and Objects in Js
// --Objects seems to be similar to a map/dictionary 
Object = { key : value }
//  >>>One big difference is in Js they use doy notation to access values using keys
object.keyName = keyValue
// --Array is the same as list, an array is a type of object(everything are objects in OOP)
[value, value2,value3]
//  >>>In Js, arrays use the .push method to add values(contrary to list.append in python)


// 4. Other data types
// --Undefined is a data type(which is what we get when we try array[array.length()] instead of array[array.length()-1]
//  >>>Undefined is a default value given to unassigned variables
//  >>> typeof undefined returns undefined
// --Null is another data type
//  >>>Unlike undefined, null is not a default value, but one that is assigned by code
//  >>>Null is usually assigned to variables you want to clear/reset
//  >>>typeof null returns object


// 5. <script> defer, async attribute
// --defer attribute tells browser to download script from web server but do not immediately execute the script but wait until after the HTML file has finished parsing
//  >>>defer follows order in which scripts were written
//  >>> <script src=1 defer>
//  >>> <script src=2 defer> no matter which loads first, script 1 is executed first
// --async attribute tells browser to download the script fron web server and execute it once it has finished downloading
//  >>>async therefore also means order of code does not matter i.e. if a later introduced async script of smaller file size finishes downloading first, it will execute first


// 6. Declaring vs initialising
// --Declaring : let var;
//  >>>creating variable
// --initializing : let var = 2;
//  >>>creating and assigning value to variable

// 7. Expressions vs statements
// -- Expressions are statements that evaluates down to a value that you can store in a variable and return
//  >>>All expressions are also statements(actually they're called expression statements lol)
// --Statements run some sort of behavior but do not yield a value
//  >>>e.g. functions, if statements, while statementd
// *Note: There is some complexity involved in determining if a statement is an expression, and that can only be revealed after code is parsed.


// 10. Boolean
// --"===" and "!==" operators
//  >>>Checks for both value and type equality
//  >>> is a requirement due to javascript being weakly typed, where var x="2" which is a string can be reassigned a value of x=2.
//  >>> also due to fact that "==" default equality operator imposes boolean coercion.
// --Boolean Coercion
//  >>>All values have truthy and falsy values that are applicable when used with boolean operators
//  >>> Truthy: non zero values, non empty strings, all objects
//  >>> Falsy: 0, "", null, undefined
//  >>> NOTE: truthy/falsy values are only relevant when using comparison operators(single/double bang or equality operator) 
// --Boolean double bang operator
//  >>>The double !! operator will return the real boolean(boolean coercion) of truthy/falsy values
//  >>>e.g. !!"" returns false even though !"" is a truthy value 
//  >>>e.g. !!1 returns true even though !1 is a falsy value
// *single bangs also return real boolean values but the opposite
// --Assignments via the AND && and OR operator || 
//  >>>Understand that AND/OR operators do not always return boolean values(although its use case is most of the time to)
//  >>>AND/OR operators return boolean values when they work with boolean values but can also not return boolean values when it worths with non-boolean values.
isNaN || 5>3 //(both operands evaluate to boolean values, so the operator returns a boolean value)
//  >>>When we try assigning truthy/falsy values using the || operator, something similar occurs 
const name = inputValue || "Max" //the || operator will return the first truthy(or real boolean) value it finds without converting the value into a real/fake boolean value
                                 //( if inputValue has any value, it returns it. Otherwise it returns "Max")
//  >>>Therefore we can assign default values with the || operator
//  >>>The AND operator, unlike the OR returns the last value without converting it(it goes past all operands and reaches the end if all are true/truthy, and returns the last value
//  >>>if any value checked is false, it returns that value
//  >>>so we use AND in assignments to check for TRUE conditions and return a value in that case


// 10. Loops
// --for-of loop
for (const element of arrayName) {
  console.log(element)
}
//  >>> is python equivalent of "for i in range arrayName"
// --In Js, the condition must always initialize a value, even for a normal for loop
for (let i=0; i<3; i++) {}
//  >>> (initialize iterator i, defining end condition, defining end of loop function)
//  >>> if u put initialize with const, you will get an error for attempting to change the value of a const variable
//  * for end of loop function, instead of i++ i think you can pass in a function
// --for-in loops work same as for-of except it allows you to iterate through each key-value pair in an object
for (const key in objectName) {
  console.log(key)
  console.log(objectName[key])
}
// --do-while loops allow you to execute block of code first before checking loop condition
j =3
do  {
  console.log(j)
  j++
} while(j<3);
//  >>> This will log "3" unlike 
while(j<3) {console.log(j)} 
// because it executes the DO block before checking the condition
//  >>>This is useful in some cases where u want to execute some code at least once in a loop.
// --continue and break in loops
//  >>>same as in python, where continue is pass
//  >>>to be clear, continue will skip all code left in current loop and move on to next iteration of the loop
// --Labelled statements
//  >>>assigning a name to a loop for reference within the loop
let str = '';
loop1:
for (let i = 0; i < 5; i++) {
  if (i === 1) {
    continue loop1;
  }
  str = str + i;
}
console.log(str);
// expected output: "0234"

// 11. Compiled vs interpreted
// --High Level > Byte Code > Machine Code
// --Interpretors read our code line, convert them to byte code, and execute them line by line. It is simple, but inefficient
// --Compilors go through entire code once, compiles it to machine code, then executes the machine code line by line. This is wht you can call functions before declaring them etc.
// --So is Javascript compiled or interpreted? There is no short answer.
//  >>>Traditionally Js was interpreted but that is not entirely true because Javascript engines such as V8 or SpiderMonkey work with both interpretors and compilors
//  >>>The flow of a program goes something like this:
//  >>>1. The source code gets transpiled (Babel) and packaged (Webpack).
//  >>>2. The JS engine parses the code to an Abstract Syntax Tree (AST).
//  >>>3. The engine converts that AST to a kind-of byte code, which is then converted even further by the JIT compiler.
//  >>>4. JS VM executes the program.
//  >>>Some will argue that the JS VM is “interpreting” the “byte code”, but if you say that you also say that Java (another JVM-driven language) is also interpreted.

// 12. Var vs let/const
// --Var
//  >>>Only has function(local)/global scope
//  >>>variable can be reinitialized(recreated) or reassigned
var x=3; var x =2; //throws no error
//  >>>Any var created within a function is function scope(only can be accessed within the function itself)
// --let/const
//  >>>block scoped
//  >>variable can only be reassigned. Recreating throws error
// E.g.1
var name = "max"
if (name==="max") {
   var hobbies = ['sports', 'cooking']
   console.log(hobbies)
}
console.log(name, hobbies)
// *Hobbies in this case is global scoped, therefore console.log(name, hobbies) throws no error
// *NOW if we change VAR to LET, we get a ReferenceError because hobbies is now local scoped(scope to that block)
var name = "max"
if (name==="max") {
   let hobbies = ['sports', 'cooking']
   console.log(hobbies)
}
console.log(name, hobbies)
// E.g.2
console.log(name)
var name = 'Max'
// *console.log prints undefined, but throws no error
// *this is due to the Js engine hoisting feature
// *hoisting: when loading script, engine goes through entire script to registsr and load function/variables
// *in this case, it pulls declarations/initializations to the top(hence hoisting), but not assignments. Therefore name is initialized with no value and is thus undefined
// E.g.3
console.log(name)
let name ='Win'
// *throws error because we cannot access a variable before initialization
// *hoisting therefore doesnt initialize variables created with for let/const
// *this forces us to write good readable code where we cannot reference objects before initializing them first


// 13. Primitive vs reference values
// --Primitive values
//  >>>Strings Numbers, Boolean, Undefined, Null, Symbol are primitive values
//  >>>Variables store the primitive value itself which is small in memory and stored on the stack usually
//  >>>such values are usually shortlived and easily recreated
//  >>>Copying the value of a variable that holds a primitive value(by assigning it to another variable) copies the value
// *Note: If strings and numbers are primitive values, how is it we are able to use methods on then( String.length)? Simplified answer is when we use methods, these primitive values are turned into pseudo objects
// --Reference values
//  >>>All objects are reference values
//  >>>Variables store a pointer in memory to the location in memory of a reference value
//  >>>Copying the value of a variable that holds a reference value copies the pointer in memory
// --Examples
let  first=[1]
let second = first
first.push(2)
// *Evaluating second will return [1,2]
let a =[199]
let b =[...a]
a.push(200)
// *Evaluating b will return [199]
// *... is the spread operator which basically returns each element of a list/object
const one =[2]
const two =[2]
// *Evaluating one===two or one==two returns false because their variables hold only pointers which are different
const array1=[23]
array1.push[24]
// *One might expect an error given the const keyword, but applying const to a variable holding a reference value simply means the pointer is const
// *We now know the spread operator, introducing the rest operator
const sumUp = (...numbers) => {
    // when spread operator is used within parenthesis i.e. as argument, ... acts as the spread operator, which is a replacement for arguments keyword/variable
    // ...numbers will convert all following arguments into an array (following..?)
    // if function has multiple parameters, the rest operator can only be used as the last parameter, as it converts all FOLLOWING arguments into an array
    // const sumUp = (a,b, ...numbers) {....}
    let sum = 0;
    for (const num of numbers) {
        sum += num;
    }
    return sum;
};
console.log(sumUp(1,5,10,-3,6,10));
// *We mentioned arguments keyword/variable(not important since rest operator was created to replace it), but before ES6:
const subtractUp = function() {
    let sum =0;
    for (const num of arguments) {
        // * arguments is the automatically created variable which contains an array that contains all arguments passed into the function
        sum-=num;
    }
    return sum;
}
console.group(subtractUp(1,5,15,1,-1));

// 14. Inside Js engine, 2 functions
// First, managing memory, done in:
// --Heap
//  >>>is about long term memory allocation - storing data in memory(data that persists - function definitions etc)
//  >>>this memory allocation is done by the browser
// Second, executing steps, done in:
// --Stack
//  >>> is about managing execution context  which is resources allocated and data that is used in that execution
//  >>> done by managing program flow(function calls/returns)
//  >>> the stack is a short living data structure where function executions are temporarily stored for browser to be aware of what is currently executing.
//  >>>When a function is called, it is pushed onto the stack
//  >>>When a function executes finish and returns a value(btw if a function has no declared return value it implicitly returns null), is is popped off the stack
// E.g.1
function getName() {
   return prompt('Your name: ')
function greet() {
   const userName = getName()
   console.log('Hello' + userName)
}
}
// greet();
// When script is run:
// *Hoisting: Engine stores functions definitions getName() and greet() for future calls on the Heap
// *(anonymous function i.e. entire script) is pushed onto the Stack
// *greet() is called and thus pushed onto the Stack
// *getName() is called and pushed onto the stack
// *prompt() is called and pushed onto stack
// *prompt() returns a value and is popped off the stack
// *getName() returns a value and is popped off the stack
// *greet() fully executes, implicity returns Null and is popped off the stack
// *(anonymous function i.e. script) is popped off the stack

// 15. Garbage collector and memory leaks
//  >>>Garbage collector : Periodically checks Heap for unused objects(objects with our references=variables assigned to it) and removes them
//  >>>Memory leaks: Objects that cannot automatically be removed by Garbage collector because they still have references to
function printMessage() {
    console.log("Test")
}
function addListener() {
    clickableBtn.addEventListener("click", printMessage)
}
// One likely cause of memory leaks could be if a user is able to spam the addListener() function, which would theoretically add multiple listeners to the same function, printMessage
// Since event listeners store the functions as well, these objects will permanently have reference to, which results in memory leak
// To prevent this, Js engines NEVER add multiple listeners to the same function IF the action is the same also e.g. "click"
// *There is a way to delibrately cause a memory leak in the same situation, assuming user is able to call addListner() more than once, such as if button is not disabled after 1 tap.
// We know javascript does not add multiple listeners if the ACTION and Function passed into .addEventListner() is the same
// The follow code will result in memory leaks
function addListener() {
    clickableBtn.addEventListener("click", () => { console.log("test")})
}
// For anonymous functions, Js engines are not able to tell if one anonymous function is the same as another, therefore multiple listeners containing multiple functions will be added


// 16. Functions and methods
// Methods are functions stored in an object, specific to a class
const person = {
    name : "Gregg",
    // name is a property
    greet : function greet() {console.log("Hello")},
    // greet is a method
}
// --Functions are objects
function startGame() {
    console.log("Game is starting");
}
console.log(startGame.apply)
console.log(startGame.bind)
console.log(startGame.call)
// functions have proprties just like objects

// --Functions as expressions
function start() {
   //this is a declaration===statement
}
// *As expected, hoisting pulls this to the top and registers the function definition such that you can reference it anywhere
// *Now consider this: 
const start = function start() {}
// function is now an expression(expression statement)
// on the right, start() can be replaced with () to create a anonymous function since we can never reference the function from its name anyway, but only from the variable name.
// *Hoisting now is of a variable i.e. start will be hoisted but not initialized or defined(until the line of code with assignment statement to anonymous function), so you can only call start() after assignment statement
// --Callback Functions
//  >>>Callback functions are functions that are not called by developer, functions that we cannot know when it will be called
//  >>>Examples of callback functions are handlers that are triggered by listeners(we do not kno when listener triggers handler)
// *Arrow functions
const getWinner =(p1,p2) => p1>p2 ? p1:p2
getWinner(5) //does not throw error, default behavior is to assign undefined to p2

const getWinner = (p1 =10, p2 = 20) => p1>p2 ? p1 : p2
getWinner(5) // returns 20
getWinnder(undefined, 5) //default value is taken when undefined is passed in, so 10 is returned (10>5)
getWinner(null, 5) //5 is returned, null does not cause default value to be taken ONLY undefined does.

// 17. DOM
// --Document Object Model
//  >>>After engine parses and renders HTML code, HTML elements are represented as Javascript Objects in the DOM, for us to access with Javascript methods such as query methods
//  >>> DOM is one of the many web APIs the browser exposes so that we can work with the parsed document
//  >>> DOM gives us access in 2 ways, through exposing the root DOM node, which exposes all HTML content and through providing methods such of querying elements etc
// --Window
//  >>> Besides the document object, another global object the browser exposes is the window object, which has document as its property
//  >>> it is the active window/tab open, and it is the initial/root entry point
//  >>>provides windows specific properties