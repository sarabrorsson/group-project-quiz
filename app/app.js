/* importing Ui  */
import UI from './ui.js';

class App {
  constructor() {
    this.count = 0;
    this.correctAnswers = [];
    this.math = 0;
  }

  /* This function runs when the page loads */
  renderToDOM() {
    /* get the ui from the ui.js file */
    const ui = new UI();

    /* eventlistener on the 'next' button */
    ui.button.addEventListener('click', (e) => {
      e.preventDefault();
      ui.getData().then((data) => {
        ui.number.classList.remove('hidden');
        ui.option();
        ui.questionTitle(this.count);
        ui.progressbar(this.count);
        ui.cards(this.count);
        /* save the input value in a variable  */
        const selected = document.querySelector('input[type="radio"]:checked');
        if (selected === null) {
          ui.progressNumber(this.count, this.math);
          this.count++;
          return;
        }
        /* looping trough the JSON and pushing correct answers to an array */
        for (let i = 0; i < data.questions.length - 1; i++) {
          if (selected.value == data.questions[i].correctAnswer) {
            this.correctAnswers.push(selected.value);
          }
        }
        /* getting length of the JSON file*/
        const length = data.questions.length - 1;
        this.math = (100 / length) * this.correctAnswers.length;
        /* send the math variable to be printed to the DOM */
        ui.progressNumber(this.count, this.math);

        if (this.count < data.questions.length) {
          this.count++;
        }
      });
    });
    /* adding evetnlistener to the restart button */
    ui.restart.addEventListener('click', (e) => {
      ui.resetAll();
      this.count = 0;
      this.correctAnswers = [];
      this.math = 0;
    });
  }
}

const app = new App();
/* starting the app */
app.renderToDOM();
