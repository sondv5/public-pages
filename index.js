// Lấy các phần tử HTML cần thiết
var inputText = document.getElementById('inputText');
var voicesList = document.getElementById('voicesList');
var speakButton = document.getElementById('speakButton');
var information = document.getElementById('information');
var voices = speechSynthesis.getVoices();

inputText.value = `After the sudden thunderstorm the once dry and dusty desert landscape was transformed into a lush verdant oasis where the sun's rays now glinted off the droplets of water on the emerald leaves of the palm trees and the air was filled with the sweet fragrance of blooming flowers.`;

// Thiết lập sự kiện khi nhấn vào nút "Speak"
speakButton.addEventListener('click', function() {
  speechSynthesis.cancel();
  // Lấy giọng nói được chọn
  var selectedVoice = voicesList.options[voicesList.selectedIndex].value;

  // Tạo đối tượng SpeechSynthesisUtterance với nội dung từ người dùng nhập vào
  var utterance = new SpeechSynthesisUtterance(inputText.value);

  // Thiết lập giọng nói cho đối tượng SpeechSynthesisUtterance
  utterance.voice = speechSynthesis.getVoices().find(function(voice) {
    return voice.name === selectedVoice;
  });

  // Phát âm thanh từ đối tượng SpeechSynthesisUtterance
  speechSynthesis.speak(utterance);

  var { lang, name, voiceURI } = voices.find(e => e.name === selectedVoice);
  information.value = JSON.stringify({ lang, name, voiceURI }, null, 2);
});

// Thiết lập sự kiện khi danh sách các giọng nói có sẵn được tải lên
speechSynthesis.onvoiceschanged = function() {
  // Lấy danh sách các giọng nói có sẵn
  voices = speechSynthesis.getVoices().filter(e => e.lang === 'en-US' || e.lang === 'en-AU');
  // Xóa tất cả các phần tử trong danh sách giọng nói
  voicesList.innerHTML = '';

  // Tạo các phần tử option cho danh sách giọng nói
  for (var i = 0; i < voices.length; i++) {
    var option = document.createElement('option');
    option.value = voices[i].name;
    option.textContent = voices[i].name;
    voicesList.appendChild(option);
  }
};
