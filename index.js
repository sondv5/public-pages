var inputText = document.getElementById('inputText');
var voicesList = document.getElementById('voicesList');
var speakButton = document.getElementById('speakButton');
var information = document.getElementById('information');
var voices = speechSynthesis.getVoices();

inputText.value = `After the sudden thunderstorm the once dry and dusty desert landscape was transformed into a lush verdant oasis where the sun's rays now glinted off the droplets of water on the emerald leaves of the palm trees and the air was filled with the sweet fragrance of blooming flowers.`;

speakButton.addEventListener('click', function() {
  speechSynthesis.cancel();
  var selectedVoice = voicesList.options[voicesList.selectedIndex].value;
  var utterance = new SpeechSynthesisUtterance(inputText.value);
  utterance.voice = speechSynthesis.getVoices().find(function(voice) {
    return voice.name === selectedVoice;
  });
  speechSynthesis.speak(utterance);
  var { lang, name, voiceURI, localService } = voices.find(e => e.name === selectedVoice);
  information.value = JSON.stringify({ lang, name, voiceURI, localService }, null, 2);
});

speechSynthesis.onvoiceschanged = function() {
  voices = speechSynthesis.getVoices().filter(e => e.lang === 'en-US' || e.lang === 'en-AU');
  voicesList.innerHTML = '';

  for (var i = 0; i < voices.length; i++) {
    var option = document.createElement('option');
    option.value = voices[i].name;
    option.textContent = voices[i].name;
    if (voices[i].localService) {
      option.style.color = '#2196F3';
    }
    voicesList.appendChild(option);
  }
};
