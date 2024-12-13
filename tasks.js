
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */


function onDataReceived(text) {
  const remove_space = text.trim(); // Removes unnecessary spaces and newline characters from the input
  const words = remove_space.split(" "); // Splits the cleaned input into an array of words
  const command = words[0]; // The first word in the array is treated as the command, in our case it's hello
  const argument = words.slice(1).join(" "); // Combines all words after the command into a single string (the argument)

    if (text === 'quit\n' || text === 'exit\n') {
      quit();
    }
  
  
    else if (command === 'hello') {
      if (argument) {
        console.log(`hello ${argument}!`); // Respond with the argument
      } else {
        console.log("hello!"); // Default response if no argument was provided
      }
    }

  else if(text =='help\n'){
    help();
  }
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(){
  console.log('hello!')
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

// This function is executed when the user types "help"


function help(){
  console.log ('How we can help you ?')
}

// The following line starts the application
startApp("zahraa alaaeddine")
