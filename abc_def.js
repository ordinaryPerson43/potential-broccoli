/*
  Работа с интерфейсом задания интервала с двумя ползунками:
*/
(function() {
  window.slider = function(sliderObj, minNum, maxNum) {
    // Основные элементы выбора промежутка значений:
    const bar = sliderObj.querySelector('.range-selecting-group__bar'),
    leftThumb = sliderObj.querySelector('.range-selecting-group__thumb--low-edge'),
    rightThumb = sliderObj.querySelector('.range-selecting-group__thumb--high-edge');
    let LimitMovementX, leftThumbX, rightThumbX, leftThumbXPercent, leftThumbXPercentMax, rightThumbXPercent, rightThumbXPercentMax, i;

    // Элементы input:
    const inputElement = sliderObj.querySelectorAll('.thumb-slider-content__item input');

    leftThumbXPercentMax = ((bar.offsetLeft + bar.offsetWidth - leftThumb.offsetWidth) / (bar.offsetLeft + bar.offsetWidth)) * 100;
    rightThumbXPercentMax = ((bar.offsetLeft + bar.offsetWidth - rightThumb.offsetWidth) / (bar.offsetLeft + bar.offsetWidth)) * 100;

    for (i = 0; i < inputElement.length; i++) {
      inputElement[i].addEventListener('change', function() {
        if (this.value <= minNum) {
          this.value = minNum;
        } else if (this.value >= maxNum) {
          this.value = maxNum;
        } else if (inputElement[0].value > inputElement[1].value) {
          leftThumb.style.left = ((inputElement[0].value - minNum) * leftThumbXPercentMax / (maxNum - minNum)) + '%';
          // rightThumb.style.left = ((inputElement[1].value - minNum) * rightThumbXPercentMax / (maxNum - minNum)) + '%';
        }
      });
    }

    function moveThumb(event) {
      LimitMovementX = {
        min: bar.offsetLeft,
        leftThumbDisplacementXMax: bar.offsetLeft + bar.offsetWidth - leftThumb.offsetWidth,
        rightThumbDisplacementXMax: bar.offsetLeft + bar.offsetWidth - rightThumb.offsetWidth
      };

      // Вычисление величины текущего смещения левого ползунка (в пикселах):
      leftThumbX = leftThumb.offsetLeft + event.movementX;
      // Перевод величины текущего смещения левого ползунка в проценты:
      leftThumbXPercent = (leftThumbX / (bar.offsetLeft + bar.offsetWidth)) * 100;
      // Вычисление величины текущего смещения правого ползунка (в пикселах):
      rightThumbX = rightThumb.offsetLeft + event.movementX;
      // Перевод величины текущего смещения правого ползунка в проценты:
      rightThumbXPercent = (rightThumbX / (bar.offsetLeft + bar.offsetWidth)) * 100;

      // Описание ограничений для левого ползунка:
      if (leftThumbX <= LimitMovementX.min) {
        leftThumbX = LimitMovementX.min;
        leftThumbXPercent = 0;
      } else if (leftThumbX >= LimitMovementX.leftThumbDisplacementXMax) {
        // Ограничение величины смещения левого ползунка вправо:
        leftThumbX = LimitMovementX.leftThumbDisplacementXMax;
        // Вычисление максимальной величины смещения левого ползунка вправо (в процентах):
        // leftThumbXPercent = ((bar.offsetLeft + bar.offsetWidth - leftThumb.offsetWidth) / (bar.offsetLeft + bar.offsetWidth)) * 100;
        leftThumbXPercent = leftThumbXPercentMax;
      }

      // Описание ограничений для правого ползунка:
      if (rightThumbX <= LimitMovementX.min) {
        rightThumbX = LimitMovementX.min;
        rightThumbXPercent = 0;
      } else if (rightThumbX >= LimitMovementX.rightThumbDisplacementXMax) {
        // Ограничение величины смещения правого ползунка вправо:
        rightThumbX = LimitMovementX.rightThumbDisplacementXMax;
        // Вычисление максимальной величины смещения правого ползунка вправо (в процентах):
        // rightThumbXPercent = ((bar.offsetLeft + bar.offsetWidth - rightThumb.offsetWidth) / (bar.offsetLeft + bar.offsetWidth)) * 100;
        rightThumbXPercent = rightThumbXPercentMax;
      }

      if (event.target == leftThumb) {
        leftThumb.style.left = leftThumbXPercent + '%';
        inputElement[0].value = parseInt((maxNum - minNum) * leftThumbXPercent / leftThumbXPercentMax + minNum);
      } else if (event.target == rightThumb) {
        rightThumb.style.left = rightThumbXPercent + '%';
        inputElement[1].value = parseInt((maxNum - minNum) * rightThumbXPercent / rightThumbXPercentMax + minNum);
      }

      if (event.target == leftThumb && leftThumbXPercent >= rightThumbXPercent) {
        leftThumb.style.left = rightThumbXPercent + '%';
      }

      if (event.target == rightThumb && rightThumbXPercent <= leftThumbXPercent) {
        rightThumb.style.left = leftThumbXPercent + '%';
      }
    }

    document.querySelector('.range-selecting-group').addEventListener('mousedown', function(event) {
      this.addEventListener('dragstart', function(event) {
        event.preventDefault();
      });

      if (event.target) {
        document.addEventListener('mousemove', moveThumb);
        document.addEventListener('mouseup', onThumbMouseup);
      }
    });

    function onThumbMouseup() {
      document.removeEventListener('mousemove', moveThumb);
      document.removeEventListener('mouseup', onThumbMouseup);
    }
  };
}());

(function() {
  window.slider(document.querySelector('#twoThumbSlider0'), 125, 1850);
})();
