import api from './api.js';
/* class of ui */
class UI {
  constructor() {
    this.optionPick = document.querySelector('.optionPick');
    this.title = document.querySelector('#questionTitle');
    this.number = document.querySelector('#oneOfFive');
    this.button = document.querySelector('#next-btn');
    this.progressBar = document.querySelector('.progress-bar');
    this.progress = document.querySelector('.progress');
    this.answers = document.querySelector('#answers');
    this.restart = document.querySelector('#restart');
  }

  /* get the JSON  */
  getData() {
    const res = fetch(api.apiAdress).then((res) => res.json());
    return res;
  }
  /* print to the 'Pick and option below' to the DOM */
  option() {
    this.optionPick.innerHTML = `
      <h3 id="complete" class="mt-3 optionText">
        pick an option below!
      </h3>
      `;
  }

  /* print the question to the DOM */
  questionTitle(i) {
    this.getData().then((data) => {
      this.title.textContent = data.questions[i].questionString;
      if (data.questions[i].questionId == data.questions.length - 1) {
        this.title.textContent = 'Restart to try again';
        this.optionPick.innerHTML = `
          <h3 id="complete" class="mt-3 optionText">
            Complete
          </h3>
        `;
      }
    });
  }

  /* Printing the result to the dom */
  progressNumber(i, math) {
    this.getData().then((data) => {
      if (data.questions[i].questionId == data.questions.length - 1) {
        this.number.textContent = `${math}%`;
        this.button.style.display = 'none';
      }
    });
  }

  /* Changing the progress bar depeding on what question that gets printed */
  progressbar(i) {
    this.getData().then((data) => {
      for (let x = 0; x < data.questions.length - 1; x++) {
        if (x == 0) {
          this.progress.classList.remove('hidden');
          this.progressBar.style.width = '0%';
          this.restart.style.display = 'block';
          this.button.innerHTML = 'Next';
        }
        if (x >= 1) {
          let length = data.questions.length - 1;
          this.progressBar.style.width = `${(100 / length) * i}%`;

          this.number.textContent = `${i + 1} of ${data.questions.length - 1}`;
        }
      }
    });
  }

  resetAll() {
    this.button.style.display = '';
    this.optionPick.innerHTML = '';
    this.button.innerHTML = 'Start Again';
    this.restart.style.display = 'none';
    this.progress.classList.add('hidden');
    this.number.classList.add('hidden');
    this.title.textContent = 'Hit next to get the first question';
    this.answers.innerHTML = '';
  }

  /* printing the possible answers to the DOM */
  cards(i) {
    this.getData().then((data) => {
      let html = '';
      const array = data.questions[i].possibleAnswers.length;
      for (let x = 0; x < array; x++) {
        html += `
          <div id="cardStyle" class="card col-sm-5 border-0">
            <span class="d-flex align-items-center pt-3 pb-3" id="cardInfo">
              <input type="radio" value="${data.questions[i].possibleAnswers[x]}" name="value" class="card-answer" id="card${x}" />
              <label for="card${x}" id="cardText" class="card-answer-label m-3">${data.questions[i].possibleAnswers[x]}</label>
            </span>
          </div>`;
      }
      this.answers.innerHTML = html;
    });
  }
}

/* exporting Ui class */
export default UI;
