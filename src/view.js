export default class WorkoutView {
  constructor(map) {
    this.map = map;
  }

  _renderWorkoutMarker(workout) {
    if (!this.map) return;

    L.marker(workout.coords)
      .addTo(this.map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        }),
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`,
      )
      .openPopup();
  }

  _renderWorkout(workout, form) {
    let html = `
          <li class="workout workout--${workout.type}" data-id="${workout.id}">
            <h2 class="workout__title">${workout.description}</h2>
            <div class="workout__details">
              <span class="workout__icon">${
  workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
}</span>
              <span class="workout__value">${workout.distance}</span>
              <span class="workout__unit">km</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">⏱</span>
              <span class="workout__value">${workout.duration}</span>
              <span class="workout__unit">min</span>
            </div>
        `;

    if (workout.type === 'running') {
      html += `
            <div class="workout__details">
              <span class="workout__icon">⚡️</span>
              <span class="workout__value">${workout.pace.toFixed(1)}</span>
              <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">🦶🏼</span>
              <span class="workout__value">${workout.cadence}</span>
              <span class="workout__unit">spm</span>
            </div>
          </li>
          `;
    }

    if (workout.type === 'cycling') {
      html += `
            <div class="workout__details">
              <span class="workout__icon">⚡️</span>
              <span class="workout__value">${workout.speed.toFixed(1)}</span>
              <span class="workout__unit">km/h</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">⛰</span>
              <span class="workout__value">${workout.elevationGain}</span>
              <span class="workout__unit">m</span>
            </div>
          </li>
          `;
    }

    form.insertAdjacentHTML('afterend', html);
  }

  clearWorkouts() {
    const workoutElements = document.querySelectorAll('.workout');
    workoutElements.forEach((element) => {
      element.remove();
    });
  }

  renderError(errorMessage) {
    const markup = `
      <div class="error">
        <button class="btn--close-modal">&times;</button>
        <p>${errorMessage}</p>
      </div>
    `;
    const overlay = document.querySelector('.overlay');
    const errorWindow = document.querySelector('.error__window');

    overlay.classList.remove('hidden');
    errorWindow.innerHTML = markup;

    errorWindow.classList.remove('hidden');

    const btnClose = document.querySelector('.btn--close-modal');

    const closeErrorWindow = () => {
      overlay.classList.add('hidden');
      errorWindow.classList.add('hidden');
    };

    [btnClose, overlay].forEach((element) => {
      element.addEventListener('click', closeErrorWindow);
    });

    document.addEventListener('keydown', () => {
      closeErrorWindow();
    });
  }
}
