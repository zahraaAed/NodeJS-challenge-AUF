
const fs = require("fs"); // Import the file system module
const fileToRead = process.argv[2] || "database.json"; //process.argv is an array in Node.js that contains the command-line arguments passed when you run the script. i give it 2 to take file user add .
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

let tasks=[{text:"solve nodejs excercise" ,done:true}, {text:"learn more about js", done:false},{text: "help your friends", done:false}]



function loadTasks() {
  try {
    const fileContent = fs.readFileSync(fileToRead, "utf8"); // Read the file's content from the fileor default database.json and we use utf8  ensures the file's content is read as a proper string that humans can understand.

    tasks = JSON.parse(fileContent); // JSON.parse() is a method used to convert a JSON string into a JavaScript object (or array).
    console.log(`Tasks loaded from ${fileToRead}`);
  } catch (error) {
    // Handle cases where the file doesn't exist or has invalid content
    console.error(`Could not load tasks from ${fileToRead}. Starting with an empty task list.`);
    tasks = []; // Default to an empty array
  }
}

// Call the function to load tasks before starting the app
loadTasks();

//save tasks
function saveTasks() {
  const json = JSON.stringify(tasks, null, 2); // Convert tasks array to a JSON string
  fs.writeFileSync(fileToRead, json); // Save the JSON string to the specified file
  console.log(`Tasks saved to ${fileToRead}`);
}
saveTasks()
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
    if (tasks.length === 0) { // Check if the task list is empty
      console.log("No tasks available.");
    } else {
      listTasks(); // we Called the listTasks function to display the tasks
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

  else if (command==='remove') {
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
      // Convert the number to an index (1-based to 0-based) in case number provided is 3 then index is 2
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
  

//edit task
else if (command === 'edit') {
  if (!argument) {
    // Case 1: No argument provided
    console.log("Error: Nothing to edit.");
  } else {
    const args = argument.split(" "); // Split the argument into parts
    if (args.length === 1) {
      // Case 2: Only new text is provided, replace the last task
      if (tasks.length > 0) {
        tasks.splice(tasks.length - 1, 1, argument); // Replace the last task
        console.log(`Edited last task to: ${argument}`);
      } else {
        console.log("Error: No tasks available to edit.");
      }
    } else {
      // Case 3: A task number and new text are provided
      const taskIndex = parseInt(args[0]) - 1; // Parse the task number
      const newText = argument.substring(args[0].length + 1); // Extract the new text
      if (isNaN(taskIndex) || taskIndex < 0 || taskIndex >= tasks.length) {
        console.log("Error: Invalid task number.");
      } else {
        tasks.splice(taskIndex, 1, newText); // Replace the specified task
        console.log(`Task ${taskIndex + 1} edited to: ${newText}`);
      }
    }
  }
}

//check command
else if (command === 'check') {
  if (!argument) {
    console.log("Error: Please specify a task number to check.");
  } else {
    const taskIndex = parseInt(argument) - 1; // Convert argument to a number and adjust for 0-based index
    if (isNaN(taskIndex) || taskIndex < 0 || taskIndex >= tasks.length) {
      console.log("Error: Invalid task number.");
    } else {
      tasks[taskIndex].done = true; // Mark the task as done
      console.log(`Task ${taskIndex + 1} marked as done.`);
    }
  }
}

//uncheck command
else if (command === 'uncheck') {
  if (!argument) {
    console.log("Error: Please specify a task number to uncheck.");
  } else {
    const taskIndex = parseInt(argument) - 1; // Convert argument to a number and adjust for 0-based index
    if (isNaN(taskIndex) || taskIndex < 0 || taskIndex >= tasks.length) {
      console.log("Error: Invalid task number.");
    } else {
      tasks[taskIndex].done = false; // Mark the task as false
      console.log(`Task ${taskIndex + 1} marked as not achieved.`);
    }
  }
}

//hello command
    else if (command === 'hello') {
      if (argument) {
        console.log(`hello ${argument}!`); // respond with the argument
      } else {
        console.log("hello!"); // Default resonse if no argument was provided
      }
    }



    //quit 
    else if (command === 'quit' || command==="exit") {
      quit();
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

//function for checked tasks
function listTasks() {
  tasks.forEach((task, index) => {
    const status = task.done ? "[✓]" : "[ ]"; // Show ✓ for done, blank for not done
    console.log(`${index + 1}. ${status} ${task.text}`);
  });
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  const json = JSON.stringify(tasks, null, 2); // Convert tasks to a JSON string  that can be saved to a file.
  const fileName = fileToRead ?? "database.json"; // Use fileToRead or if it's not defined it will be saved by default to "database.json"

  fs.writeFile(fileName, json, (err) => {
    if (err) {
      console.error("Error saving tasks:", err);
    } else {
      console.log(`Tasks saved to ${fileName}. Quitting now, goodbye!`);
      process.exit();
    }
  });
}


// This function is executed when the user types "help"


function help(){
  console.log ('How we can help you ?')
}

// The following line starts the application
startApp("zahraa alaaeddine")

