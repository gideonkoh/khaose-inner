import command from '../config.json' assert {type: 'json'};
import { HELP } from "./commands/help";
import { BANNER } from "./commands/banner";
import { DEFAULT } from "./commands/default";

//mutWriteLines gets deleted and reassigned
let mutWriteLines = document.getElementById("write-lines");
let historyIdx = 0
let tempInput = ""
let userInput : string;
let isPasswordInput = false;
let bareMode = false;

//WRITELINESCOPY is used to during the "clear" command
const WRITELINESCOPY = mutWriteLines;
const TERMINAL = document.getElementById("terminal");
const USERINPUT = document.getElementById("user-input") as HTMLInputElement;
const PRE_HOST = document.getElementById("pre-host");
const PRE_USER = document.getElementById("pre-user");
const HOST = document.getElementById("host");
const USER = document.getElementById("user");
const PROMPT = document.getElementById("prompt");
const COMMANDS = ["help", "banner", "clear"];
const HISTORY : string[] = [];

const scrollToBottom = () => {
  const MAIN = document.getElementById("main");
  if(!MAIN) return

  MAIN.scrollTop = MAIN.scrollHeight;
}

function userInputHandler(e : KeyboardEvent) {
  const key = e.key;

  switch(key) {
    case "Enter":
      e.preventDefault();
      if (!isPasswordInput) {
        enterKey();
      } 

      scrollToBottom();
      break;
    case "Escape":
      USERINPUT.value = "";
      break;
    case "ArrowUp":
      arrowKeys(key);
      e.preventDefault();
      break;
    case "ArrowDown":
      arrowKeys(key);
      break;
    case "Tab":
      tabKey();
      e.preventDefault();
      break;
  }
}

function enterKey() {
  if (!mutWriteLines || !PROMPT) return
  const resetInput = "";
  let newUserInput;
  userInput = USERINPUT.value;

  if (bareMode) {
    newUserInput = userInput;
  } else {
    newUserInput = `<span class='output'>${userInput}</span>`;
  }

  HISTORY.push(userInput);
  historyIdx = HISTORY.length

  //if clear then early return
  if (userInput === 'clear') {
    commandHandler(userInput.toLowerCase().trim());
    USERINPUT.value = resetInput;
    userInput = resetInput;
    return
  }

  const div = document.createElement("div");
  div.innerHTML = `<span id="prompt">${PROMPT.innerHTML}</span> ${newUserInput}`;

  if (mutWriteLines.parentNode) {
    mutWriteLines.parentNode.insertBefore(div, mutWriteLines);
  }

  /*
  if input is empty or a collection of spaces, 
  just insert a prompt before #write-lines
  */
  if (userInput.trim().length !== 0) {
      commandHandler(userInput.toLowerCase().trim());
    }
  
  USERINPUT.value = resetInput;
  userInput = resetInput; 
}

function tabKey() {
  let currInput = USERINPUT.value;

  for (const ele of COMMANDS) {
    if(ele.startsWith(currInput)) {
      USERINPUT.value = ele;
      return
    }
  }
}

function arrowKeys(e : string) {
  switch(e){
    case "ArrowDown":      
      if (historyIdx !== HISTORY.length) {
          historyIdx += 1;
          USERINPUT.value = HISTORY[historyIdx];
          if (historyIdx === HISTORY.length) USERINPUT.value = tempInput;  
      }      
      break;
    case "ArrowUp":
      if (historyIdx === HISTORY.length) tempInput = USERINPUT.value;
      if (historyIdx !== 0) {
        historyIdx -= 1;
        USERINPUT.value = HISTORY[historyIdx];
      }
      break;
  }
}

function commandHandler(input : string) {

  switch(input) {
    // Commands from the album lyrics here:
    case 'blog':
      writeLines(["Opening up khaose.com/blog...", "<br>"]);
      setTimeout(() => {
       window.open("https://khaose.com/blog", '_blank');
      }, 500);
      break;

    case 'letter':
      writeLines(["Ah, do you mean the letter that I received from the future?"]);
      writeLines(["I’m sorry, I don’t know if I can share them with you yet."]);
      writeLines(["Some things require trust, and trust takes time, effort, and commitment to build."]);
      writeLines(["Try to get to know me better, and maybe… we’ll see.", "<br>"]);
    break;

    case 'dictionary':
      writeLines(["...", "<br>"]);
    break;

    case 'purge':
      writeLines(["I have so many things within me that I hope to purge..", "<br>"]);
    break;

    case 'khaose':
      writeLines(["Do you mean 'khaosé' instead, with the 'é'?","<br>"]);
    break;

    case 'khaosé':
      writeLines(["Ugh, I hate that name!", "<br>"]);
    break;

    case 'judgment day':
      writeLines(["It refers to the end of the world,"]);
      writeLines(["but what if the people who execute these judgments are… not exactly friendly."]);
      writeLines(["The letter told me that this is coming.", "<br>"]);
    break;

    case 'king':
      writeLines(["What about him? Apparently, he still never appears in the future."]);
      writeLines(["How surprising. At this point, I don’t even know if he is real.", "<br>"]);
    break;

    case 'relational':
      writeLines(["I’m a bit reserved when it comes to being relational."]);
      writeLines(["I’m not sure if it is because I fear - what if the person I’m relating to does not like me."]);
      writeLines(["What if the person is trying to take advantage of me."]);
      writeLines(["Maybe, deep inside, I just want to avoid the hassle of navigating these feelings."]);
      writeLines(["I’m fine with just me and my wife, against the world.", "<br>"]);
    break;

    case 'religion':
      writeLines(["I am a believer of the Kingdom. Although, what is a Kingdom when no one knows where the King is.", "<br>"]);
    break;

    case 'evil entity':
      writeLines(["It exists. But I don’t know much about it at this moment though.", "<br>"]);
    break;

    case 'friends':
      writeLines(["I have no friends.", "<br>"]);
    break;

    case 'secret whisperer':
      writeLines(["Just a voice in my head."]);
      writeLines(["I’m not sure if it is Sophia, or the King, or just my own mind going wild.", "<br>"]);
    break;

    case 'mask':
      writeLines(["I need it to display my true self.", "<br>"]);
    break;

    case 'sophia':
      writeLines(["Ah, the wisdom of the King itself. The messenger."]);
      writeLines(["Legend says that it moves around you without you realizing.", "<br>"]);
    break;

    case 'prophet':
      writeLines(["I wanted to be one. But how do I be one when I’m in doubt of everything."]);
      writeLines(["Also, why should I be one? What will I gain in return?", "<br>"]);
    break;

    case 'pillars':
      writeLines(["My pillars are the lessons and beliefs that I was taught throughout my life.", "<br>"]);
    break;

    case 'enemy':
      writeLines(["The enemy is real.", "<br>"]);
    break;

    case 'love':
      writeLines(["I can’t love, and therefore I can never be who I want to be.", "<br>"]);
    break;

    case 'faith':
      writeLines(["I am still trying to believe…", "<br>"]);
    break;

    case 'joy':
      writeLines(["I think I am trying to achieve constant happiness and avoid any negative emotions, not knowing what joy is.", "<br>"]);
    break;

    case 'purpose':
      writeLines(["I am living a purposeless life..", "<br>"]);
    break;

    case 'world':
      writeLines(["Well, the world is screwed. :)", "<br>"]);
    break;

    case 'hope':
      writeLines(["I think I’ve lost hope.", "<br>"]);
    break;

    case 'father':
      writeLines(["We will have our own fathers. But we also call the king, our Father. Where are you, my King..", "<br>"]);
    break;

    case 'romancers':
      writeLines(["Dear wife, I will love you forever!", "<br>"]);
    break;

    case 'fight':
      writeLines(["What’s the point of fighting?", "<br>"]);
    break;

    case 'sin':
      writeLines(["This amount of darkness in me.. It drags me down.", "<br>"]);
    break;

    case 'vices':
      writeLines(["See 'Sin'.", "<br>"]);
    break;

    case 'tongues':
      writeLines(["The Kingdom Writing was so common once, but not many people write with it any longer these days."]);
      writeLines(["It has been laughed at by people these days as writing in “tongues”.", "<br>"]);
    break;

    case 'god':
      writeLines(["Our God, the King. The Father of Worlds.", "<br>"]);
    break;

    case 'countdown':
      writeLines(["36 years to go before the end arrives.", "<br>"]);
    break;

    case 'festive season':
      writeLines(["Learn to celebrate, before it is too late.", "<br>"]);
    break;

    case 'consciousness':
      writeLines(["...", "<br>"]);
    break;

    case 'easter eggs':
      writeLines(["Easter eggs! I love to hunt easter eggs in movies and in songs!", "<br>"]);
    break;

    case 'sleep':
      writeLines(["I can’t sleep at night... I blame the secret whisperer!", "<br>"]);
    break;

    case 'relief':
      writeLines(["There’s no relief.", "<br>"]);
    break;

    case 'extermination':
      writeLines([" This is what the enemy would call their acts of eradication or purging in the future.", "<br>"]);
    break;

    case 'kingdom':
      writeLines(["The original name of our nation, before the current rulers change it to suit modern times."]);
      writeLines(["Funny, 'Kingdom' still sounds better.", "<br>"]);
    break;

    case 'acrostic':
      writeLines(["I love acrostic poems or songs! If ever I write an album, I will make sure I include it in a song.", "<br>"]);
    break;

    case 'commandments':
      writeLines(["His commandments are in my heart.", "<br>"]);
    break;

    case 'name':
      writeLines(["A name is important - it indicates a calling.", "<br>"]);
    break;

    case 'inner':
      writeLines(["My inner soul has been stormy for a while now. Would you like to have a look?"]);
      writeLines(["Type “inner layer” as the next command.", "<br>"]);
    break;

    // game-related words only:

    case 'inner layer':
      writeLines(["Ah, so you do wish to go deeper? Combine 4 sets of characters into a command of 15 characters (no spaces)."]);
      writeLines(["Here are some hints on where to find them:"]);
      writeLines(["<br>"])
      writeLines(["2. A written rhyme."]);
      writeLines(["1. A captured moment."]);
      writeLines(["3. A written experience."]);
      writeLines(["4. A description of collected songs.", "<br>"]);
    break;

    case 'hguonedoogrevenimayhw':
      writeLines(["Success. Diving deeper into the next layer.."]);
      writeLines(["Opening up https://innerbackend-rmhvxfirgb.com"]);
      writeLines(["(Remember to save the link for easier access in the future)", "<br>"]);
      setTimeout(() => {
       window.open("https://innerbackend-rmhvxfirgb.com", '_blank');
      }, 500);
    break;

    case 'letterfromthefuture':
      writeLines(["You’re not ready for this one yet.", "<br>"]);
    break;

    case 'nobodywillacceptme':
      writeLines(["You’re not ready for this one yet.", "<br>"]);
    break;

    case 'uvivkfdpsshjjlwatl':
      writeLines(["You’re not ready for this one yet.", "<br>"]);
    break;

    case 'zxxvkgzmxv':
      writeLines(["You’re not ready for this one yet.", "<br>"]);
    break;

    case 'iwillacceptwhoiam':
      writeLines(["Ah, you're really ahead of the game. But, you’re not ready for this one yet.", "<br>"]);
    break;


    // Other commands

    case 'clear':
      setTimeout(() => {
        if(!TERMINAL || !WRITELINESCOPY) return
        TERMINAL.innerHTML = "";
        TERMINAL.appendChild(WRITELINESCOPY);
        mutWriteLines = WRITELINESCOPY;
      })
      break;
    case 'banner':
      writeLines(BANNER);
      break;
    case 'help':
      writeLines(HELP);
      break;
    case 'outest':
      writeLines(["Returning to the outest layer - khaose.com...", "<br>"]);
      setTimeout(() => {
       window.open("https://khaose.com/", '_blank');
      }, 500);
      break;
    case 'outer':
      writeLines(["Returning to the outer layer - backend.khaose.com...", "<br>"]);
      setTimeout(() => {
       window.open("https://backend.khaose.com/", '_blank');
      }, 500);
      break;
    case 'photos':
      writeLines(["Opening up khaose.com/photos... although I don't get why you want to view such awkward photos..", "<br>"]);
      setTimeout(() => {
       window.open("https://khaose.com/photos", '_blank');
      }, 500);
      break;
    case 'facebook':
      //add stuff here
      break;
    case 'twitter':
      //add stuff here
      break;
    case 'instagram':
      //add stuff here
      break;
    case 'youtube':
      //add stuff here
      break;
    case 'rm -rf':
      writeLines(["Such commands don't work here."]);
      writeLines(["<br>"]);
      break;
    case 'sudo':
      writeLines(["Such commands don't work here."]);
      writeLines(["<br>"]);
      break;
    case 'ls':
      writeLines(["Such commands don't work here."]);
      writeLines(["<br>"]);
      break;
    default:
      writeLines(DEFAULT);
      break;
  }  
}

function writeLines(message : string[]) {
  message.forEach((item, idx) => {
    displayText(item, idx);
  });
}

function displayText(item : string, idx : number) {
  setTimeout(() => {
    if(!mutWriteLines) return
    const p = document.createElement("p");
    p.innerHTML = item;
    mutWriteLines.parentNode!.insertBefore(p, mutWriteLines);
    scrollToBottom();
  }, 40 * idx);
}


const initEventListeners = () => {
  if(HOST) {
    HOST.innerText= command.hostname;
  }

  if(USER) {
    USER.innerText = command.username;
  }

  if(PRE_HOST) {
    PRE_HOST.innerText= command.hostname;
  }

  if(PRE_USER) {
    PRE_USER.innerText = command.username;
  } 

    window.addEventListener('load', () => {
    writeLines(BANNER);
  });
  
  USERINPUT.addEventListener('keypress', userInputHandler);
  USERINPUT.addEventListener('keydown', userInputHandler);

  window.addEventListener('click', () => {
    USERINPUT.focus();
  });

  // pleading message
  console.log(`Are you trying to violate me and force vulnerable answers out of me? I know I CANNOT stop you from doing so, but what if I tell you that you're violating me by doing so. Would you still do it?`);
}

// stop visitors from opening up Developer Tools
window.addEventListener("keydown", (event) => {
  if(event.ctrlKey && (event.key === "S" || event.key === "s")) {
     event.preventDefault();
  }
  if(event.ctrlKey && (event.key === "C")) {
     event.preventDefault();
  }
  if(event.ctrlKey && (event.key === "E" || event.key === "e")) {
     event.preventDefault();
  }
  if(event.ctrlKey && (event.key === "I" || event.key === "i")) {
     event.preventDefault();
  }
  if(event.ctrlKey && (event.key === "K" || event.key === "k")) {
     event.preventDefault();
  }
  if(event.ctrlKey && (event.key === "U" || event.key === "u")) {
     event.preventDefault();
  }
});

initEventListeners();
