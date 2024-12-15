
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

//list command for tasks
let tasks=["solve nodejs excercise", "learn more about js", "help your friends"]


function onDataReceived(text) {
  const remove_space = text.trim(); // Removes unnecessary spaces and newline characters from the input
  const words = remove_space.split(" "); // Splits the cleaned input into an array of words
  const command = words[0]; // The first word in the array is treated as the command, in our case it's hello
  const argument = words.slice(1).join(" "); // Combines all words after the command into a single string (the argument)

    if (command === 'quit\n' || command === 'exit\n') {
      quit();
    }
  //listing tasks

  else if (command === 'list') {
    if (tasks.length === 0) { //check if the list task is empty
      console.log("No tasks available."); 
    } else {
      tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`); // Display task number and description ,output of first task will be 1. task name
      });
    }

    
}
    // Adding a task
    else if (command === 'add') {
      if (argument) {
        tasks.push(argument); // Add the task to the list
        console.log(`Task added: ${argument}`); // Confirm the task was added
      } else {
        console.log("Error: No task provided."); // Handle errors in case of missing argument
      }
    }


    //remove element 
 /*
  else if (command === 'remove') {
    if (tasks.length > 0) {
      const removedTask = tasks.pop(); // Remove the last task
      console.log (`Removed task: ${removedTask}\n Updated tasks: ${tasks}`);
    } else {
      console.log('Task list is empty.');
    }
  } 
  else if (command === 'remove1') {
    if (tasks.length > 0) {
      const removedTask = tasks.shift(); // Remove the first task
      console.log(`Removed task: ${removedTask}\n Updated tasks: ${tasks}`);
    } else {
      console.log('Task list is empty.');
    }
  } 
  else if (command === 'remove2') {
    if (tasks.length > 1) {
      const removedTask = tasks.splice(1, 1)[0]; // Remove the second task
      console.log(`Removed task: ${removedTask}\n Updated tasks: ${tasks}`);
    } else {
      console.log('Not enough tasks to remove the second one.');
    }
    
  }*/
  



  /* another way for step 4 and 1 in step 5*/
  
  else if (command.startsWith('remove')) {
    // Check if there's a number after 'remove'
    const number = command.slice(6); // Extract the part after 'remove'
    
    if (number === '') {
      // If no number is provided, default to removing the last task
      if (tasks.length > 0) {
        const removedTask = tasks.pop(); // Remove the last task
        console.log(`Removed task: ${removedTask}\nUpdated tasks:\n${tasks.join("\n")}`);
      } else {
        console.log('Task list is empty.');
      }
    } else {
      // Convert the number to an index (1-based to 0-based)
      const index = parseInt(number) - 1;
  
      // Check if the index is valid
      if (isNaN(index) || index < 0 || index >= tasks.length) {
        console.log('Error: Invalid task number. Please provide a valid number.');
      } else {
        // Remove the specified task
        const removedTask = tasks.splice(index, 1)[0];
        console.log(`Removed task: ${removedTask}\nUpdated tasks:\n${tasks.join("\n")}`);
      }
    }
  }
  

  
    else if (command === 'hello') {
      if (argument) {
        console.log(`hello ${argument}!`); // Respond with the argument
      } else {
        console.log("hello!"); // Default response if no argument was provided
      }
    }

  else if(command =='help\n'){
    help();
  }
  else{
    unknownCommand(command);
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

