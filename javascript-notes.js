// 1. Backticks - allows us to use ${} string manipulation(?), if single or double quotes cannot
  // *When using backtick, value is no longer a string literal but a template literal
  // *one difference is in template literals, ctrl-enter(new lines) are allowed and considered


// 2. parseInt() parseFloat()
  // *e.g. 
    5+parseInt('5') 
  // *shortform for parseInt/Float is +
    // e.g. 
    5 + +'5.0'


// 3. Arrays and Objects in Js
  // *Objects is similar to a map/dictionary 
    Object = { key : value }
    // One big difference is in Js they use doy notation to access values using keys
    object.keyName = keyValue

  // *Array is the same as list, an array is a type of object(everything are objects in OOP)
    [value, value2,value3]

  // *In Js, arrays use the .push method to add values(contrary to list.append in python)


// 4. Other data types
  // *Undefined is a data type(which is what we get when we try array[array.length()] instead of array[array.length()-1]
    // Undefined is a default value given to unassigned variables
    // typeof undefined returns undefined
  // *Null is another data type
    // Unlike undefined, null is not a default value, but one that is assigned by code
    // Null is usually assigned to variables you want to clear/reset
    // typeof null returns object


// 5. <script> defer, async attribute
  // *defer attribute tells browser to download script from web server but do not immediately execute the script but wait until after the HTML file has finished parsing
    // defer follows order in which scripts were written
    // <script src=1 defer>
    // <script src=2 defer> no matter which loads first, script 1 is executed first
  // *async attribute tells browser to download the script fron web server and execute it once it has finished downloading
    // async therefore also means order of code does not matter i.e. if a later introduced async script of smaller file size finishes downloading first, it will execute first


// 6. Declaring vs initialising
  // *Declaring : let var;
    // creating variable
  // *initializing : let var = 2;
    // creating and assigning value to variable


// 7. Expressions vs statements
  // *Expressions are statements that evaluates down to a value that you can store in a variable and return
    // All expressions are also statements(actually they're called expression statements lol)
  // *Statements run some sort of behavior but do not yield a value
    // e.g. functions, if statements, while statementd
  // *Note: There is some complexity involved in determining if a statement is an expression, and that can only be revealed after code is parsed.


// 8. Boolean
  // *"===" and "!==" operators
    // Checks for both value and type equality
    // is a requirement due to javascript being weakly typed, where var x="2" which is a string can be reassigned a value of x=2.
    // also due to fact that "==" default equality operator imposes boolean coercion.

  // *Boolean Coercion
    // All values have truthy and falsy values that are applicable when used with boolean operators
    // Truthy: non zero values, non empty strings, all objects
    // Falsy: 0, "", null, undefined
    // NOTE: truthy/falsy values are only relevant when using comparison operators(single/double bang or equality operator) 

  // *Boolean double bang operator
    // The double !! operator will return the real boolean(boolean coercion) of truthy/falsy values
    // e.g. !!"" returns false even though !"" is a truthy value 
    // e.g. !!1 returns true even though !1 is a falsy value
    // *single bangs also return real boolean values but the opposite

  // *Assignments via the AND && and OR operator || 
    // Understand that AND/OR operators do not always return boolean values(although its use case is most of the time to)
    // AND/OR operators return boolean values when they work with boolean values but can also not return boolean values when it worths with non-boolean values.
    isNaN || 5>3 //(both operands evaluate to boolean values, so the operator returns a boolean value)
    //  >>>When we try assigning truthy/falsy values using the || operator, something similar occurs 
    const name = inputValue || "Max" //the || operator will return the first truthy(or real boolean) value it finds without converting the value into a real/fake boolean value
                                      //( if inputValue has any value, it returns it. Otherwise it returns "Max")
    // Therefore we can assign default values with the || operator
    // The AND operator, unlike the OR returns the last value without converting it(it goes past all operands and reaches the end if all are true/truthy, and returns the last value
    // if any value checked is false, it returns that value
    // so we use AND in assignments to check for TRUE conditions and return a value in that case


// 9. Loops
  // *for-of loop
    for (const element of arrayName) {
      console.log(element)
    }
    // It is python equivalent of "for i in range arrayName"

    // *In Js, the condition must always initialize a value, even for a normal for loop
    for (let i=0; i<3; i++) {}
      // (initialize iterator i, defining end condition, defining end of loop function)
      // if u put initialize with const, you will get an error for attempting to change the value of a const variable
      // * for end of loop function, instead of i++ i think you can pass in a function

  // --for-in loops work same as for-of except it allows you to iterate through each key-value pair in an object
    for (const key in objectName) {
      console.log(key)
      console.log(objectName[key])
    }

  // *do-while loops allow you to execute block of code first before checking loop condition
    j =3
    do  {
      console.log(j)
      j++
    } while(j<3);
    // This will log "3" unlike 
    while(j<3) {console.log(j)} 
    // because it executes the DO block before checking the condition
      // This is useful in some cases where u want to execute some code at least once in a loop.

  // *continue and break in loops
    // same as in python, where continue is pass
    // to be clear, continue will skip all code left in current loop and move on to next iteration of the loop
  // *Labelled statements
    // assigning a name to a loop for reference within the loop
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


// 10. Compiled vs interpreted
    // *High Level > Byte Code > Machine Code
    // *Interpretors read our code line, convert them to byte code, and execute them line by line. It is simple, but inefficient
    // *Compilors go through entire code once, compiles it to machine code, then executes the machine code line by line. This is wht you can call functions before declaring them etc.
    // *So is Javascript compiled or interpreted? There is no short answer.
      // Traditionally Js was interpreted but that is not entirely true because Javascript engines such as V8 or SpiderMonkey work with both interpretors and compilors
    // *The flow of a program goes something like this:
      // 1. The source code gets transpiled (Babel) and packaged (Webpack).
      // 2. The JS engine parses the code to an Abstract Syntax Tree (AST).
      // 3. The engine converts that AST to a kind-of byte code, which is then converted even further by the JIT compiler.
      // 4. JS VM executes the program.
    // Some will argue that the JS VM is “interpreting” the “byte code”, but if you say that you also say that Java (another JVM-driven language) is also interpreted.


// 11. Var vs let/const
  // *Var
    // Only has function(local)/global scope
    // variable can be reinitialized(recreated) or reassigned
    var x=3; var x =2; //throws no error
    // Any var created within a function is function scope(only can be accessed within the function itself)
  // *let/const
    //  >>>block scoped
    //  >>variable can only be reassigned. Recreating throws error
  // *E.g.1
    var name = "max"
    if (name==="max") {
      var hobbies = ['sports', 'cooking']
      console.log(hobbies)
    }
    console.log(name, hobbies)
    // Hobbies in this case is global scoped, therefore console.log(name, hobbies) throws no error
    // NOW if we change VAR to LET, we get a ReferenceError because hobbies is now local scoped(scope to that block)
    var name = "max"
    if (name==="max") {
      let hobbies = ['sports', 'cooking']
      console.log(hobbies)
    }
    console.log(name, hobbies)
  // *E.g.2
    console.log(name)
    var name = 'Max'
    // console.log prints undefined, but throws no error
    // this is due to the Js engine hoisting feature
    // hoisting: when loading script, engine goes through entire script to registsr and load function/variables
    // in this case, it pulls declarations/initializations to the top(hence hoisting), but not assignments. Therefore name is initialized with no value and is thus undefined

  // *E.g.3
    console.log(name)
    let name ='Win'
    // throws error because we cannot access a variable before initialization
    // hoisting therefore doesnt initialize variables created with for let/const
    // this forces us to write good readable code where we cannot reference objects before initializing them first


// 12. Primitive vs reference values
  // *Primitive values
    // Strings Numbers, Boolean, Undefined, Null, Symbol are primitive values
    // Variables store the primitive value itself which is small in memory and stored on the stack usually
    // such values are usually shortlived and easily recreated
    // Copying the value of a variable that holds a primitive value(by assigning it to another variable) copies the value
    // *Note: If strings and numbers are primitive values, how is it we are able to use methods on then( String.length)? Simplified answer is when we use methods, these primitive values are turned into pseudo objects
  // *Reference values
    // All objects are reference values
    // Variables store a pointer in memory to the location in memory of a reference value
    // Copying the value of a variable that holds a reference value copies the pointer in memory
  // *Examples
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


// 13. Inside Js engine, 2 functions
  // *First, managing memory, done in:
    // Heap
      // is about long term memory allocation - storing data in memory(data that persists - function definitions etc)
      // this memory allocation is done by the browser
  // *Second, executing steps, done in:
    // Stack
      // is about managing execution context  which is resources allocated and data that is used in that execution
      // done by managing program flow(function calls/returns)
      // the stack is a short living data structure where function executions are temporarily stored for browser to be aware of what is currently executing.
      // When a function is called, it is pushed onto the stack
  // When a function executes finish and returns a value(btw if a function has no declared return value it implicitly returns null), is is popped off the stack
  // *E.g.1
    function getName() {
      return prompt('Your name: ')
    function greet() {
      const userName = getName()
      console.log('Hello' + userName)
    }
    }
    // greet();
    // When script is run:
    // Hoisting: Engine stores functions definitions getName() and greet() for future calls on the Heap
    // (anonymous function i.e. entire script) is pushed onto the Stack
    // greet() is called and thus pushed onto the Stack
    // getName() is called and pushed onto the stack
    // prompt() is called and pushed onto stack
    // prompt() returns a value and is popped off the stack
    // getName() returns a value and is popped off the stack
    // greet() fully executes, implicity returns Null and is popped off the stack
    // (anonymous function i.e. script) is popped off the stack


// 14. Garbage collector and memory leaks
  // *Garbage collector : Periodically checks Heap for unused objects(objects with our references=variables assigned to it) and removes them
  // *Memory leaks: Objects that cannot automatically be removed by Garbage collector because they still have references to
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


// 15. Functions and methods
  // *Methods are functions stored in an object, specific to a class
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

    const sumArray = (prevValue, currentValue, currentIndex, arr) => {
      return prevValue+currentValue;
    }
    // since currentIndex and arr is not used, it can be removed. Since function block only has 1 line- return statement, curly braces can be omitted
    const shortForm = (prevValue, currentValue) => prevValue+currentValue;

    // What if we want to return an object for a single line function? We wrap the object in parenthesis
    const people = [...persons.map((value) => ({name: value.name, age: value.age}))]

// 16. DOM
    // *Document Object Model
      //  After engine parses and renders HTML code, HTML elements are represented as Javascript Objects in the DOM by the browser, for us to access with Javascript methods such as query methods
      //  DOM is one of the many web APIs the browser exposes so that we can work with the parsed document
      //  DOM gives us access in 2 ways, through exposing the root DOM node, which exposes all HTML content and through providing methods such of querying elements etc
      //  DOM is not strictly found only in browsers, there are external plugins for other programming languages that also parse HTML code to produce a DOM

    // *Window vs document
      //  Window is the main Javasript object root aka the Global Object in a browser, which is also the root of the DOM
      //  Everything you access in the browser is a property of the window. For example to accees document, instead of window.document you can just write document. To access screen, screen(and not window.screen)
      //  Document is the main object of the potentially visible/rendered DOM, is the Root DOM node, is a property of window
      //  it is the active window/tab open, and it is the initial/root entry point
      // *For clearer reference, go to Developer Tools > Console and type "window", which will show the properties of the window object. Listed among all items is the document object.
      // *One of the properties of window is the alert() method, which we commonly use, showing that the window object is what provides these methods
      // *Note also that the window Object does not give access to the entire window, but the currently accessed tab.

    // *DOM 
      // A typical DOM Tree looks like this
      // Document Node > Root Element Node - HTML > Element Node - Head, Element Node - Body >...
      // The Head and Body are sibling nodes
      // *However, the real DOM tree does not only contain Element Nodes. Truth is, while parsing HTML code construct the DOM, text Nodes are also created
      // *Text Nodes from from the indentation in HTML code. For example
      // <html>
      //  <body>
      // creates in the DOM
      // Element Node - HTML
      //  Text Node - |__
      //  Element Node - Body
      // *Note: Nodes vs Elements
      // Nodes are objects that make up the DOM - such as Text Nodes, and Element Nodes
      // All HTML tags are Element Nodes - <html>, <head>, <body>, <header>, <p>, <h1>, etc
      // All Text creates Text Nodes - including Text inside an Element or Attribute, not just indented white spaces
      // Elements == Element Nodes (is just shortform reference)


// 17. Querying Elements
  // *Returns Single Elements
    // querySelector(), getElementById()
    // querySelector() returns the first Element that that satisfies the query
    // Provides different ways to query(by CSS selector, by ID)
    // *Returns the reference to DOM element (DOM nodes are just javascript objects==reference values, therefore references to it are passed around)
    //  For example, in code below
        {/* <body>
        <header><h1 id="main-title">Dive into the DOM!</h1></header>
        <ul>
          <li>
            Item 1
          </li>
          <li class="list-item">
            Item 2
          </li>
          <li class="list-item">
            Item 3
          </li>
        </ul>
        </body> */}
    // * const ul = document.querySelector("ul") stores the Element Node - ul reference to ul.
    // * const li3 = ul.querySelector("li:last-of-type") stores the Element Node - li reference to li3.
    // * Since this is a tree, you can only query children, not your parent

  // *Retuns Collections of Element References
    //  >>> querySelectorAll(), getElementsBy(TagName)
    //  >>> returns collections which are array-like objects == a NodeList(usually)
    //  >>> Provides different ways of querying (by CSS selector, by tag name, class etc)
  // * Consider
    // <html>
    // <head>...</head>
    // <body>
    //   <ul>
    //     <li>foo</li>
    //     <li>bar</li>
    //     <li>baz</li>
    //   </ul>
    // </body>
    // </html>
    const listItems_querySelectorAll = document.querySelectorAll('li');
    console.log(listItems_querySelectorAll); // returns NodeList(3) [li, li, li]
    const allList = document.getElementsByTagName("li");
    console.log(allList); //returns HTMLCollection(3)
    // *General rule of thumb, querySelectorAll() returns a non-live collections, getXbyY return live collections(meaning updates reflect on the collections)
    // *Reason being querySelector all simply takes a snapshot to create the list
    // *If there are no elements that satisfies query in querySelectorAll(), querySelectorAll() still returns an empty NodeList
    // *Live vs non Live collections
    
    // A live is: when the changes in the DOM are reflected in the collection. The content suffers the change when a node is modified.
    // A Not Live is : when any change in the DOM does not affect the content of the collection.
    // For example, adding a child using .appendChild() would add a Node, but that is only reflected in live collections.
    // ALL HTMLCollections are live collections
    // NOT all NodeLists are non live collections (for example, using .childNodes to access a collection returns a Live NodeList)
    // *Demonstrating live collections, and how a live NodeList comes about
    const list  = document.querySelector('ul');
    const listItems_childNodes = list.childNodes;
    console.log(listItems_childNodes); // returns NodeList(7) [text, li, text, li, text, li, text] where text is the indentation/spacing
    list.appendChild(document.createElement('li')); // we change the DOM by adding a Node
    console.log(listItems_querySelectorAll); // same, no change - NodeList(3) [li, li, li]
    console.log(listItems_childNodes);       // NodeList(8) [text, li, text, li, text, li, text, li]
    // e.g. If we change text content of one of the <li> Element Nodes, it will be reflected in the list returned by getElementsByTagName but not for querySelectorAll
    // *Extras
    // document.body => Selects the <body> element node.
    // document.head => Selects the <head> element node.
    // document.documentElement => Selects the <html> element node

// 18. Changing DOM properties
  // *Changing Text Nodes
    // In same code snippet above,
    const h1 = document.querySelector("h1");
    h1.textContent //returns "Dive into the DOM!"
    h1.textContent = "Some new Text"; //returns "Some new Text"
    // Behind the scenes, what this does is to create a new TextNode to replace the old one

  // *Changing style
    h1.style.color = "white";
    h1.style.backgroundColor = "black"; // *The CSS property for this is background-color
    // *Javascript objects, however cannot have property names with dashes, so this property was rewritten in camelCase.

// 19. Attributes vs Properties of Elements
  <input id = "input-1" class = "input-default" value = "Enter Text"></input>
  // id, class and value are attributes == values declared within html tags
    // When the browser parses HTML code and goes pas these attributes, it preconfigures properties of the DOM object based on these attributes.
    // Properties of the DOM object reflect the configuration, set up and positioning etc of the rendered DOM node.
    // Attributes are mapped to properties and live synchronization(updating either one will be reflected on the other) is set up for MOST cases
    // Attributes are used to provide default(preconfigured) values for some properties

  const input = getElemetById("input-1"); //if we get access to the input element, we see the DOM object has the following related properties
  input.id //For this, there is a 1:1 mapping, the attribute name and property is the same. There is also live sync
  input.className //No 1:1 mapping, class attribute is known as className property. There is also live sync
  input.value // 1:1 mapping. No live sync, only has 1-way sync, where changing attribute value updates property, but changing property values does not change attribute value, so that we have a fallback value(default). 
  // i.e. refreshing the screen, we still have a default value which is that declared as attribute value.

  // *What if we want to change the attribute of an element that does not have live sync with its DOM object?
    input.setAttribute("value", "Other default value") //accepts (attributeName, newValue) as arguments
    // *setAttribute does not overwrite any changes ALREADY made

  // *CASE1: setAttribute without prior changes
    const input = getElementById("input-1");
    input.value // returns "Enter Text"
    input.setAttribute("value", "New Default"); // input.value changes to "New Default", <input value= "New Default"...>

  // *CASE2: setAttribute with prior changes
    const input = getElementById("input-1");
    input.value // returns "New Default"
    input.value = "Other default" // input.value changes to "Other default", but attribute no change. <input value = "New Default">
    input.setAttribute("value", "some default"); // expects that attribute updates property due to 1 way sync
    // However, setAttribute does not overwrite any made changes, so, <input value = "some default"> BUT input.value = "Other default"

// 20. Traversing the DOM
  // *Terminologies
    // 1. Child = Direct child node
    // 2. Descendant = Direct and indirect child nodes
    // 3. Parent = Direct parent node
    // 4. Ancestor  = Direct and indirect parent nodes
    // 5. Sibling = Node with same parent

  // *Traversing the tree
    // 1. Upwards
      // .parentNode, .parentElement are properties available to all DOM objects that gives access to PARENT 
        // *.parentNode returns all Nodes, .parentElement returns only Element Node
        // *You might wonder if it is possible to have non-element parent Nodes, yes it is:
        // *The parent of an element is an Element node, a Document node, or a DocumentFragment node.
      // .closest() - gives access to ancestors, accepts CSS selector as string as arguments
    // 2. Downwards
      // .childNodes, .children gives access to CHILD
        // *.childNodes returns all Nodes, .children returns only Element Nodes
        // * To see the content of Text Nodes (spacing/indentations), on relevant element, set css property white-spacing: pre;
        // *Now if you use element.childNodes in console, and you hover over the textNode, you will see the spacing which is normally not rendered by default.
      // .firstChild, .firstElementChild and .lastChild, .lastElementChild
      // .querySelector, .getXbyY() gives access to both child and descendant
    // 3. Sidewards
      // .previousSibling, .previousElementSibling, .nextSibling, .nextElementSibling

// 21. Styling DOM elements
  // *Via style property
    // Directly targets individual styles of the element e.g. backgroundColor, color etc
    // Controls styles by initializing value for inline style attribute on the element
      // *Implying that styling with .style has the highest specificity 
    //  Style property names are camelCase
  // *Via className property(or any CSS selector whose value is exposed in DOM object property)
    // className gives to access to the class attribute, where you can add or overwrite an elements class, so that CSS properties start/stop affecting it.
    // Controls className by (re)initializing class attribute value;
      // e.g. ul.className = ul.className + " #nav-bar";
    // Directly sets styling done on that class all at once
  // *Via classList property
    // typically used as an alternative to classNAme, NEVER TOGETHER
    // similar to className except presented in a List, so it is easier to add,remove classes.
    // also has other you can use on the list such as .toggle, which adds if not in list or removes if in list.
    // *is in general the preferred way to go.

// 22. Creating & Inserting Elements
  // *By HTML String
    // innerHTML = newValue
      // Replaces all existing HTML code within an HTML opening and closing tag with given string
      // All descendants/children will de replaced
      document.querySelector("section").innerHTML = "<h2> A new Title </h2>";
    // insertAdjacentHTML()
      // add and render HTML content next to existing content instead of replacing it
      element.insertAdjacentHTML("beforeend", "<p> Error occurred </p>");
      // accepts positon as first argument, there are 4 possible arguments.
        // 'beforebegin': Before the element itself.
        // 'afterbegin': Just inside the element, before its first child.
        // 'beforeend': Just inside the element, after its last child.
        // 'afterend': After the element itself.
      // *IS NOT THE SAME AS element.innerHTML = element.innerHTML + "some HTML code";
        // Above code is reassigning a value. This means that all Nodes are still replaced.
    // *None of the methods here can give us access to the HTML part that we added/replaced, which is where createElement() comes into play

  // *By calling document.createElement() to create single DOM element nodes
    const list = document.querySelector("ul");
    const newLi = document.createElement("li");
    list.appendChild(newLi); //we will see an empty bullet point being rendered as newLi has no content
    newLi.textContent = "New List Item";
    // .appendChild() & append()
      // Appends new DOM Node
      // .appendChild() adds 1 Element Node ONLY whereas  .append() can add multipe text nodes and element nodes
      // e.g.
        document.querySelector("ul").append("This adds a text Node", newLi);
    // prepend(), before(), after(), insertBefore()
      // Inserts DOM Nodes in a specific position
      // *Similar to .append(), can add multiple nodes.
      // ParentNode.prepend = Add as first child
      // Node.before(), after() = Add sibling node beside itself
      // *IF DOM Node already exists in the DOM and you call before() or after(), then the existing Node is shifted, the node will not be copy-pasted.
      // E.g.
      list.firstElementChild.after(newLi); //shifts from last position to second position.
        // *If you want to clone a Node, instead of just shifiting its position, use:
        list.firstElementChild.after(newLi.cloneNode(true));
          // accepts deep property as argument. Deep can be true(clones all child nodes) or false(clones only the relevant node)
    // .replaceChild(), replaceWith()
      // Replaces existing DOM Element node with a new one(destoys old one)
    //.insertAdjacentElement()
      //*has best browser support for methods that add Nodes.

// 23. Deleting Elements
  // 1. .remove() removes the entire element from the DOM
  // 2. .remvoeChild() does the same thing, but has better support
  // *Use element.parentElement.removeChild() as it has the most support

// 24. Movie Library Practice Project
  // *input.value
    // input has a value property and not a textContent property.
    // input.value gives you the current input text, so if you want to clear inputs after user cancels a form,
    function clearModalFormInputs() {
      for (const userInput of modalFormInputs) {
        userInput.value = "";
      }
    }
  // *Modal Sheets and Backdrop
    // This project includes code for Modal Sheets appearing after triggering a listener ==button
    function toggleMovieModal() {
      addMovieModal.classList.toggle("visible");
      toggleBackdrop();
    }
    function closeMovieModal() {
      addMovieModal.classList.remove("visible");
    }
  // *Bind
    // Using .bind to pass in arguments without calling function
    newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id))
  // *cloneNode hack to remove listeners
    // In a scenario where 
    // 1) User presses button, modal sheet with form appears
    // 2) Event handlers for buttons are set up
    // 3) User cancels form
    // 4) User opens form again
    // BY DEFAULT, Javascript is smart enough to replace existing listeners, however in some cases, it cannot.
    // For exmaple, if an anonymous function was passed in, similar to below.
    // And we have no convenient way of modifying code, then we use the hack below:
    let acceptButton = rejectButton.nextElementSibling;
    // if this is not first time user opens form, then acceptButton points to same object, and multiple listeners are set up.
    acceptButton.replaceWith(acceptButton.cloneNode(true));
    // Here, we replace the current object with a deep clone, then reinitialize acceptButton with new object.
    acceptButton = rejectButton.nextElementSibling;
    // Since reference to old object is gone, garbage collector removes it along with its listeners.
    acceptButton.addEventListener("click", () => deleteMovie(id));

// 25. Iterables and iterators
  // *What is an iterable/iterator : A iterable is an interface that provides an iterator. A iterator is an interface which has the implementation to iterate over elements.
  // *Why the need for iterables: Iterables are what allows us to make objects useable in a for...of loop
  // *When the for...loop starts it checks if a method "Symbol.iterator" is available and it calls it, else it goes up the prototype chain, if it's still not available it throws a TypeError.
    // Iterable: Objects that represent a series of elements that can be iterated over, does not have iteration state but has one method that produces an iterator.
    // An iterable must satsify the iterable protocol
      // Iterable protocol: allows JavaScript objects to define or customize their iteration behavior, such as what values are looped over in a for...of construct.
        // An object is an iterable if it implements the @@iterator method
        // @@iterator key == [Symbol.iterator] constant
        // *Examples of iterables:  NodeList, String, Map, Set
    // Iterator: An object with iteration state, has multiple methods, such as hasNext() which checks if 
      // Iterator protocol: defines a standard way to produce a sequence of values (either finite or infinite), and potentially a return value when all values have been generated.
        // An object is an iterator when it implements a next() method with the following semantics:
          // A zero-argument function that returns an object with at least the following two properties:
            // done (boolean) : Has the value false if the iterator was able to produce the next value in the sequence OR  
            // true if the iterator has completed its sequence. In this case, value optionally specifies the return value of the iterator.
            // value : Any JavaScript value returned by the iterator. Can be omitted when done is true.
          // The next() method must always return an object with appropriate properties including done and value 
          // If a non-object value is returned, such as false or undefined, a TypeError is thrown
      // Example of an iterable that satisfies both the Iterator Protocol and Iterable Protocol
      let obj = {
        start : 1,
        end : 5
      };
    
      //for..of initially calls this method
      obj[Symbol.iterator] = function() {
          //iterator object that is returned
        return {
            start : this.start,
            end : this.end,
            //next is called on each iteration
          next : function(){
            if (this.start <= this.end) {
                return { done : false, value : this.start++};
            } else{
                return { done : true };
            }
          }
        }
      }
  
  // *Array-like
    // When we say a NodeList is array-like, we mean that certain array methods work, that it is an iterator.
    // *However, arrays-like objects are simply objects that have 
    // *1) indexes(0,1,2,etc..) and 
    // *2) a length property just like normal arrays.
    // Array-likeobjects do not have the Symbol.iterator method implemented, but are considered as iterables
    // Array-like objects can be used in a for loop, similar to arrays.
    // Array-like objects do not have all Array methods, hence they are iterables that are not exactly arrays, which is why functions like .from() exist.
    // *Examples of array-like objects: NodeList, String

// 26. Arrays
  // *1.Creating arrays
    // a) const array = [1,2,3]
    // b) const array1 = new Array(1,2,3) // creates (3), [1, 2, 3]
      // if you pass in only 1 argument and that argument is an integer, then the argument is taken as value arrayLength.
      // only if you pass in more than 1 integer argument will the arguments not be used for arrayLength parameter.
      const array1 = new Array(5) //creates (5), []
    // c) const array2 = Array.of(1,2) //creates (2) [1,2]
    // d) Using .from() which converts an iterable or array-like object into an array
    const array2 = Array.from("Hi!"); //creates (3), ["H", "i", "!"]

  // *2. Array Methods
  const hobbies = ["Sports", "Music"]

    // *.push == .append
      // .push(...items: <type>[])
      hobbies.push('Reading') //returns 3, mutates hobbies to (3), ["Sports", "Music", "Reading"]
      hobbies.push(el1,el2,el3) //appends multiple elements at once

    // *.unshift
      hobbies.unshift("Coding") //returns 4, mutaties hobbies to (4), ["Coding", "Sports", "Music", "Reading"]

    // *.pop()
      hobbies.pop() //returns "Reading", mutates hobbies to (3), ["Coding", "Sports", "Music"]

    // *.shift()
      hobbies.shift() //returns "Coding", mutates hobbies to (2), ["Sports", "Music"]

    // *Indexing
      hobbies[1] = "Coding" //returns "Coding", mutates hobbies to (2), ["Sport", "Coding"]

    // *Indexing with index > Array.length (ALLOWED IN JS)
      hobbies[5] = "Reading" // mutates hobbies to (6), ["Sport", "Coding", Empty x3, "Reading"]
      // hobbies[4] returns undefined

    // *Splicing  - only available on arrays(array-like and other iterables don't work)
      // .splice(start: number, deleteCount: number, ...items: string[])
      hobbies.splice(2,3) // returns [empty],  mutates hobbies to (3), ["Sport", "Coding", "Reading"]
      hobbies.splice(1,0, "Eating") //returns [], mutates hobbies to (4), ["Sport", "Eating", "Coding", "Reading"]
      hobbies.splice(2, 0, "Running", "Bowling") // returns [], mutates hobbies to (6), ["Sport", "Eating", "Running", "Bowling", "Coding", "Reading"]
      hobbies.splice(-2,2) // returns ["Coding", "Reading"], mutates hobbies to (4),  ["Sport", "Eating", "Running", "Bowling"]

    // *.slice() python equivalent is list[start:end]
      // .slice(start: number, end: number)
      hobbies.slice(0,2) // returns ["Sport", "Eating"]
      hobbies.slice(-3,-1) //returns ["Eating", "Running"]
      hobbies.slice(-3, 1) //returns [], doesnt work.
      hobbies.slice(2) // returns ["Running", "Bowling"], is Python equivalent of [2:]
      hobbies.slice(undefined||null, 2) // is equivalent of [:2]
      hobbies.slice() // *returns copy of array, is equivalent of [:]

    // *.concat()
      // .concat(...items : ConcatArray<type>[])
      // combines another array with self, returns a new array.
      // unlike .push() which will nest the argument within self.

    // *.indexOf() & lastIndexOf()
      // .indexOf/lastIndexOf(searchElement: number, fromIndex?: number)
      // returns first/last matching value's index.
      // returns -1 if value does not exist in array
      hobbies.indexOf("Running", 1) // returns 2.
      // *Works only for values that are primitive values.
      const personData = [{name: "Max"}, {name: "Winston"}]
      personData.indexOf({name: "Max"}) // returns -1

    // *.includes()
      // .includes(searchElement: number, fromIndex?: number)
      // returns true or false, does not work for reference values also.

    // *.find() and .findIndex()
      // .find(predicate: (value, index, arrayName) => {})
      // returns value of first element in the array where the predicate is true OR undefined if otherwise
      const currentUser = personData.find((value, index, arrayName)=>value.name =='Winston'); // returns {name: "Winston"}
      // Since both the object in the array, and currentUser has the same reference to memory, changing one will update the other
      // .findIndex is the exact same except it returns the first INDEX of the value where the predicate is true.
    
    // *.forEach()
      // .forEach((value, index, arrayName)=>{})
      // applies the anonymous function on each value
      const prices  = [15, 24, 37, 12];
      const taxRate = 0.19;
      prices.forEach((value, index, arrayName) => {
        arrayName[index] = value*(1+taxRate)
      })
      // prices = [17.849999999999998, 28.56, 44.03, 14.28]
    // *.map()
      // .map((value, index, arrayName) => {any})
      // .map applies a function on each value in the array where each function call returns a new element
      // *unlike forEach, the function here MUST return something
      // .map() returns a new array of the new elements that were returned by each function call
      const adjustedPrices = prices.map((value, index, arrayName)=> {
        return value*(1+taxRate)
      })
      // adjustPrices equates to [21.241499999999995, 33.986399999999996, 52.3957, 16.993199999999998];
    
    // *.sort()
      // .sort(compareFn: (num1, num2) => number);
      // .sort() when called on an array, automatically converts all values into strings to compare them, IF there is no compareFn provided
      // returns the new array after sorting
      const newPrices = [10.99, 3.99, 5.99, 6.59]
      newPrices.sort() //returns [10.99, 3.99, 5.99, 6.59]
      const sortedPrices = newPrices.sort((num1, num2) => {
        if(num2> num1) {
          return 1;
        } else if (num2===num1) {
          return 0;
        } else {
          return -1;
        }
      })
      // returns [10.99, 6.59, 5.99, 3.99]
    // *.reverse()
      // reverses the order of an array.
      sortedPrices.reverse() // returns [3.99, 5.99, 6.59, 10.99]

    // *.filter()
      // .filter(predicate: (value,index, arr)=> bool )
      // returns a brand new value where each value satisfies the predicate
      newPrices.filter((value,index, arr) => value>3); // returns [5.99, 6.59, 10.99]

    // *.reduce()
      // .reduce((prevValue, currentValue, currentIndex, arr)=>{}, intialValue)
      newPrices; //[10.99, 6.59, 5.99, 3.99]
      const sum = newPrices.reduce((prevValue, currentValue, currentIndex, arr) => {
        return prevValue+currentValue;
      }, 0)
      // returns 10.99+6.59+5.99+3.99 = 27.56
      // prevValue = inital value for first reducer function execution
      // subsequently, prevValue = result returned from previous reducer function execution
      // currentValue = value of element in array of currentIndex

  // *String <-> Array Conversion
    // *.split()
      // .split(separator: String)
      const data = "winston;20;nus;";
      const dataArray = data.split(";") //returns ["winston", "20", "nus"]
    // *.join()
      // .join()
      const name = ["Winston", "Lim"]
      const greeting = name.join(); //returns "Winston,Lim"
      const greeting1 = name.join(" "); //returns "Winston Lim"
  
  // *Array Destructuring
  const nameData = ["Winston", "Lim"];
  // const firstName = nameData[0];
  // const lastName = nameData[1];
  const [firstName, lastName] = nameData;
  firstName; //returns "Winston"
  lastName; //returns "Lim"

  const userData = ["Winston Lim", 20, "Gymnastics", "Computer Engineering"];
  const [name, age, ...otherData] = userData;
  // ... is the rest operator in this case, takes all other elements in array that are not assigned and puts them in an array.
  // otherData evaluates to ["Gymnastics", "Computer Engineering"]
  
//*27. Sets and Maps
  //*Sets
    // Similar to arrays, sets are iterables and store (nested) data of any type and length
    // Sets have some special set methods, and array methods cannot be used on sets
      // *Again, you can convert a set using .from()
    // *Special characteristics of sets
      // Unlike arrays, order is NOT guaranteed
      // Duplicates are NOT allowed
      // There is no index-based access to elements in a set

    // *Creating a Set
      const set = new Set() // set = Set(0) {}
      // Set(iterable: Iterable<any>)
      const set1 = new Set([1,2,3]) //set1 = Set(3) {1,2,3}
    
    // *Obtaining values from a Set
      // *Single Elements
        // There are no getter methods for a set, but .has(value) returns a bool from checking if a set contains a value
      
      // *Multiple Elements
        // .values() returns an Iterable of values of all elements in a Set
          for (const entry of set1.values()) {
            console.log(entry)
          }
          // returns 1 2 3
        // .entries() returns an Iterable of arrays of [value,value] of all elements in the Set
          for (const entry of set1.entries()) {
            console.log(entry);
          }
          // returns [1,1] [2,2] [3,3]
          // .entries() is a method available for Maps also, which may explain why there are pairs of value per element in a Set

    //* Adding/Deleting Values from a Set
      // *.add()
        set1.add(4) //returns Set(4) {1,2,3,4}
        // .add(value) 
        // if value already exists in the Set, no error is thrown, but nothing happens also
      // *.delete
        set1.delete(4) //returns true, set1 mutates to Set(3) {1,2,3}
        // .delete(value)
        // if value does not exist in set, returns false and set is not mutated
       

  
  //*Maps
    // Store key-value data of any kind and length, *ANY key values are allowed
      // *Unlike objects, where keys must be strings, any value is accepted for keys in a Map
    // Is also an iterable with special map methods
    // Order is guranteed
    // Duplicate keys are NOT allowed, but duplicate values are allowed
    // There is key-based access to elements in a map.

    // *Creating a Map
      const person1 = {name: "Winston"}
      const person2 = {name: "Map"}
      const personData = new Map([[person1, {date: "17/10/2020", time: "1125"}]]);
      // .map(iterable: Iterable<any>) accepts an Iterable that typically contains pairs of values, which will be the key-value pairs in created map
      // personData = {{name: "Winston"} : {date: "17/10/2020", time: "1125"}}

      // *Adding Values
      personData.set(person2, {date: "18/10/2020", time: "1230"});
      // .set(key<any>:value<any>)
      //personData = {{name: "Winston"} : {date: "17/10/2020", time: "1125"}, {name: "Map"}: {date: "18/10/2020", time: "1230"}}

      // *Retrieving values
        // *Single values
          const person1Data = personData.get(person1)
          // .get(key: any) returns value of the key which is {date: "17/10/2020", time: "1125"}
        
        // *Multiple values
          // *.entries()
            for (const entry of personData.entries()) {
              console.log(entry)
            }
            // returns [{name: "Winston"}, {date: "17/10/2020", time: "1125"}] , [ {name: "Winston"}, {date: "18/10/2020", time: "1230"}]
            // Another syntax (array destructuring) that is possible because we know entries returns an iterable containg arrays of key-value pairs is:
            for (const [key, value] of personData.entries()) {
              console.log(key,value);
            }
          
          //*.keys()
            // returns an iterable of keys of a map
            for (const key of personData.keys()) {
              console.log(key);
            }
          
          // *values()
            // returns an iterable of values of a map
            for (const value of personData.values()) {
              console.log(value);
            }
      
      // *Other methods
        // *.clear() empties the map
        // *.delete(key: any) deletes a single entry by key
        // *.forEach(()=>{}) runs a function on each entry
        // *.has(key: any) checks if a key is in a map
        // *NOT A METHOD but a property, .size returns how many items are in a map

      // *Maps vs Objectgs
        // Keys: Maps can have ANY value for their key, while Objects are restricted to strings, numbers and symbols
        // Performance: For large quantities of data, Maps have better performance
        // Methods: Ways to manipulate entires, are only available for objects
      
    // *WeakSet
      const persons = new WeakSet()
      persons.add(person1) //persons = {{name: "Winston"}}
      // Can only store objects as values(arrays therefore are allowed)
      person1 = null
      // When person1 is set to null, the object {name: "Winston"} is usually cleared by the garbage collector as it is not in use
      // However, if you person1 has a reference in a Set(), then the Set still holds a reference to the object, and it will not be cleared unless you delete that value.
      // But in a weakset, values not used will automatically be removed and released to garbage collector
      // Methods available: .add(), .delete(), .has()

    // *WeakMap
      // Same as WeakSet


  






      





  
    

    
