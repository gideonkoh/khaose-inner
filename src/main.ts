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
      writeLines(["There is no such thing as “blogs” now. The Internet is only for the rich and victorious."]);
      writeLines(["Do you mean 'letter' instead?", "<br>"]);
    break;

    case 'letter':
      writeLines(["The letters are here:"]);
      writeLines(["1/10: <a href='https://postimg.cc/qtGTzqFq'>https://postimg.cc/qtGTzqFq</a>"]);
      writeLines(["2/10: <a href='https://postimg.cc/7Gsrncwy'>https://postimg.cc/7Gsrncwy</a>"]);
      writeLines(["3/10: <a href='https://postimg.cc/R6Vzf9rR'>https://postimg.cc/R6Vzf9rR</a>"]);
      writeLines(["4/10: <a href='https://postimg.cc/fSVn2KRS'>https://postimg.cc/fSVn2KRS</a>"]);
      writeLines(["5/10: <a href='https://postimg.cc/Dm0Tw2Pf'>https://postimg.cc/Dm0Tw2Pf</a>"]);
      writeLines(["6/10: <a href='https://postimg.cc/hhYqJH2L'>https://postimg.cc/hhYqJH2L</a>"]);
      writeLines(["7/10: <a href='https://postimg.cc/V0YW23Rm'>https://postimg.cc/V0YW23Rm</a>"]);
      writeLines(["Embrace the letters and know yourself.", "<br>"]);
    break;

    case 'dictionary':
      writeLines(["... it's a little too soon for this.", "<br>"]);
    break;

    case 'purge':
      writeLines(["I feel dirty and lousy, and it has been holding me back from life."]);
      writeLines(["So many things within me that I wish to purge, so I can be who I am meant to be..", "<br>"]);
    break;

    case 'khaose':
      writeLines(["Do you mean 'khaosé' instead, with the 'é'?","<br>"]);
    break;

    case 'khaosé':
      writeLines(["Ah, yes, the “nickname” that people close to me assigned to me since I was a baby."]);
      writeLines(["For quite a period of time, it made me feel like I’m an outsider to them.", "<br>"]);
    break;

    case 'judgment day':
      writeLines(["The end of the world. It is here.", "<br>"]);
    break;

    case 'king':
      writeLines(["I used to love him with all of my being."]);
      writeLines(["However, at some point, I start to wonder if he is ever coming back.", "<br>"]);
    break;

    case 'relational':
      writeLines(["I wish I knew more people I can walk life with.. I wish some of them were still around.", "<br>"]);
    break;

    case 'religion':
      writeLines(["I am still a believer of the Kingdom. I know the King is always watching, even if I don’t feel like it.", "<br>"]);
    break;

    case 'evil entity':
      writeLines(["It exists, and it wants our lives.", "<br>"]);
    break;

    case 'friends':
      writeLines(["I have friends, but we’re all at the gates of hell. I wish we were all friends 36 years earlier.", "<br>"]);
    break;

    case 'secret whisperer':
      writeLines(["I blame it for convincing me to go ahead with the mission."]);
      writeLines(["I can’t betray the voice even if I want to.", "<br>"]);
    break;

    case 'mask':
      writeLines(["If only I learn to accept my mask early on.", "<br>"]);
    break;

    case 'sophia':
      writeLines(["I will never know if it is real, but it has brought me up to this point, so it has to be real. Right?", "<br>"]);
    break;

    case 'prophet':
      writeLines(["I could have been one..", "<br>"]);
    break;

    case 'pillars':
      writeLines(["I will always stick to my pillars, as it has never failed me.", "<br>"]);
    break;

    case 'enemy':
      writeLines(["The enemy has taken over the world.", "<br>"]);
    break;

    case 'love':
      writeLines(["If only.. I learned to love more.. Perhaps, the world would be a better place.", "<br>"]);
    break;

    case 'faith':
      writeLines(["I still believe…", "<br>"]);
    break;

    case 'joy':
      writeLines(["In this sad and tortured state of the world, I wish I knew how to have joy. It may be the only thing that could have kept me going.", "<br>"]);
    break;

    case 'purpose':
      writeLines(["Is this mission.. my purpose? The very reason I was born?", "<br>"]);
    break;

    case 'world':
      writeLines(["The world is dying… Was there anything that I could have done?", "<br>"]);
    break;

    case 'hope':
      writeLines(["Somebody, please give me hope..", "<br>"]);
    break;

    case 'father':
      writeLines(["I wish I can talk to you face to face..", "<br>"]);
    break;

    case 'romancers':
      writeLines(["Dear wife, please, never ever leave me.", "<br>"]);
    break;

    case 'fight':
      writeLines(["I wish I could step up and bring the fight to the enemy.", "<br>"]);
    break;

    case 'sin':
      writeLines(["Can somebody pull me out of this darkness..???", "<br>"]);
    break;

    case 'vices':
      writeLines(["See 'Sin'.", "<br>"]);
    break;

    case 'tongues':
      writeLines(["Wait.. it can be used to send hidden messages to people, no?", "<br>"]);
    break;

    case 'god':
      writeLines(["I know you’re out there, watching over us. God.", "<br>"]);
    break;

    case 'countdown':
      writeLines(["10 days to go before the end arrives.", "<br>"]);
    break;

    case 'festive season':
      writeLines(["Learn to celebrate, even if it may be too late.", "<br>"]);
    break;

    case 'consciousness':
      writeLines(["...", "<br>"]);
    break;

    case 'easter eggs':
      writeLines(["Easter eggs - it signifies resurrection. Would these easter eggs bring forth true resurrection?", "<br>"]);
    break;

    case 'sleep':
      writeLines(["Sleep is a luxury..", "<br>"]);
    break;

    case 'relief':
      writeLines(["Truly.. There’s no relief.", "<br>"]);
    break;

    case 'extermination':
      writeLines(["My friends.. Have been exterminated everywhere..", "<br>"]);
    break;

    case 'kingdom':
      writeLines(["Long live the Kingdom!", "<br>"]);
    break;

    case 'acrostic':
      writeLines(["... have you figured it out yet?", "<br>"]);
    break;

    case 'commandments':
      writeLines(["His commandments are in my heart, always..", "<br>"]);
    break;

    case 'name':
      writeLines(["What if a name tears you down, how would it be a calling?", "<br>"]);
    break;

    case 'inner':
      writeLines(["Sometimes, it feels like my inner soul has been stormy since I was born..", "<br>"]);
    break;

    // game-related words only:

    case 'inner layer':
      writeLines(["You’re already here at the inner layer. You can go deeper, but you have to find your own way there.", "<br>"]);
    break;

    case 'hguonedoogrevenimayhw':
      writeLines(["This command won’t work here.", "<br>"]);
    break;

    case 'letterfromthefuture':
      writeLines(["Form a command with these elements without spaces:", "<br>"]);
      writeLines(["1: 17xN(orange)"]);
      writeLines(["1: 21xZ(red)"]);
      writeLines(["1: 28xH(blue)"]);
      writeLines(["1: 30xW(blue)"]);
      writeLines(["2: 14xS(purple)"]);
      writeLines(["2: 21xF(green)"]);
      writeLines(["2: 29xE(purple)"]);
      writeLines(["2: 30xB(red)"]);
      writeLines(["3: 1xH(purple)"]);
      writeLines(["3: 1xL(orange)"]);
      writeLines(["3: 23xB(green)"]);
      writeLines(["4: 16xB(red)"]);
      writeLines(["4: 22xM(red)"]);
      writeLines(["4: 34xL(blue)"]);
      writeLines(["5: 6xF(blue)"]);
      writeLines(["5: 25xP(orange)"]);
      writeLines(["6: 22xX(red)"]);
      writeLines(["7: 31xT(purple)", "<br>"]);
    break;

    case 'nobodywillacceptme':
      writeLines(["You’re almost there."]);
      writeLines(["However, this system requires this to be cipher for security reasons,"]);
      writeLines(["and it prefers if it is converted to a *cipher of an emperor*, and the emperor loves *his birth month*.", "<br>"]);
    break;

    case 'uvivkfdpsshjjlwatl':
      writeLines(["Success. Diving deeper into the deepest layer.."]);
      writeLines(["Opening up https://deepestbackend-lfghrwvi.com"]);
      writeLines(["(Remember to save the link for easier access in the future)", "<br>"]);
      setTimeout(() => {
       window.open("https://deepestbackend-lfghrwvi.com", '_blank');
      }, 500);
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
      writeLines(["Opening up https://www.facebook.com/khaose.createsmusic/", "<br>"]);
      setTimeout(() => {
       window.open("https://www.facebook.com/khaose.createsmusic/", '_blank');
      }, 500);
      break;
    case 'instagram':
      writeLines(["Opening up https://www.instagram.com/khaose.createsmusic", "<br>"]);
      setTimeout(() => {
       window.open("https://www.instagram.com/khaose.createsmusic", '_blank');
      }, 500);
      break;
    case 'youtube':
      writeLines(["Opening up https://www.youtube.com/@khaose.createsmusic", "<br>"]);
      setTimeout(() => {
       window.open("https://www.youtube.com/@khaose.createsmusic", '_blank');
      }, 500);
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
