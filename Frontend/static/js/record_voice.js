// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const outputEl = document.getElementById('userInput');

// document.getElementById("imgResumeMicImg").onclick = function () {
//       try {
//         console.log(outputEl)
//       console.log('triggered')
//       outputEl.innerHTML = "Listening...";
//       outputEl.value = "Listening...";
//       recognition.start();
//       } catch (error) {
//         console.log(error)
//       }
  
// };

const lolRecord = ()=>{
      try {
            console.log(outputEl)
          console.log('triggered')
          outputEl.innerHTML = "Listening...";
          outputEl.value = "Listening...";
          recognition.start();
          } catch (error) {
            console.log(error)
          }
}

document.getElementById("sendButton").onclick = function () {
  recognition.stop()
};

recognition.onresult = function (event) {
  var textResult = event.results[0][0].transcript;
  console.log(textResult)
  outputEl.value = textResult + '.';
}

// recognition.onspeechend = function() {
//     console.log('Speech ended')
// }

recognition.onnomatch = function (event) {
  outputEl.textContent = "Sorry, I didn't recognise that.";
}

recognition.onerror = function (event) {
  outputEl.textContent = 'Error occurred in recognition: ' + event.error;
}