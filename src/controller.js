import { Running, Cycling } from './model';
import WorkoutView from './view';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const resetButton = document.getElementById('resetButton');

export default class App {
  #map;

  #mapZoomLevel = 13;

  #mapEvent;

  #workouts = [];

  #workoutView;

  constructor() {
    this.#workoutView = new WorkoutView();

    this._getPosition();

    this._getLocalStorage();

    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    resetButton.addEventListener('click', this.reset.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
        alert('Could not get your position');
      });
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#workoutView = new WorkoutView(this.#map);

    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach((work) => {
      this.#workoutView._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInputs = (...inputs) => inputs.every((inp) => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every((inp) => inp > 0);

    e.preventDefault();

    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    try {
      if (type === 'running') {
        const cadence = +inputCadence.value;

        if (
          !validInputs(distance, duration, cadence)
          || !allPositive(distance, duration, cadence)
        ) throw new Error('Inputs have to be positive numbers! 💥💥💥');

        workout = new Running([lat, lng], distance, duration, cadence);
      }

      if (type === 'cycling') {
        const elevation = +inputElevation.value;

        if (
          !validInputs(distance, duration, elevation)
          || !allPositive(distance, duration)
        ) throw new Error('Inputs have to be positive numbers! 💥💥💥');

        workout = new Cycling([lat, lng], distance, duration, elevation);
      }

      this.#workouts.push(workout);

      this.#workoutView._renderWorkoutMarker(workout);

      this.#workoutView._renderWorkout(workout, form);

      this._hideForm();

      this._setLocalStorage();
    } catch (error) {
      this.#workoutView.renderError(error.message);
    }
  }

  _moveToPopup(e) {
    if (!this.#map) return;

    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      (work) => work.id === workoutEl.dataset.id,
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach((work) => {
      this.#workoutView._renderWorkout(work, form);
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    this.#workouts = [];
    this.#workoutView.clearWorkouts();
    location.reload();
  }
}
