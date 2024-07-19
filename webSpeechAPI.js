var recognizing;

if (navigator.userAgent.includes("Firefox")) {
  recognition = new SpeechRecognition();
} else {
  recognition = new webkitSpeechRecognition();
}
recognition.lang = langSelect.value;
recognition.continuous = true;
reset();
recognition.onend = reset;

recognition.onresult = function (event) {
  console.log(event);
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      console.log("Texto reconocido:", event.results[i][0].transcript);
      // En lugar de agregar el texto al textarea, llama a chat() con el texto reconocido
      chat(event.results[i][0].transcript); // Asegúrate de que la función chat pueda manejar una cadena como argumento
    }
  }
};

function reset() {
  recognizing = false;
  speechButton.style.color = "black";
  // speechButton.innerHTML = "&#127908;";
  speechButton.innerHTML = `<span class="material-symbols-outlined">mic</span>`;
  chatButton.removeAttribute("disabled");
  speakButton.removeAttribute("disabled");
}

function toggleStartStop() {
  recognition.lang = langSelect.value;
  if (recognizing) {
    textArea.focus();
    recognition.stop();
    reset();
  } else {
    // No limpies el textarea al iniciar el reconocimiento si deseas mantener el texto previo
    // textArea.value = "";
    recognition.start();
    recognizing = true;
    speechButton.style.color = "red";
    speechButton.innerHTML = "&#x23F9;";
    chatButton.setAttribute("disabled", true);
    speakButton.setAttribute("disabled", true);
  }
}
