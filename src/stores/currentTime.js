export default class CurrentTime {
  widget = null;

  constructor({widget}) {
      this.widget = widget;
  }

  bind (moment) {
    const LOCALTIME_CLASS = 'mobilon-localtime';
    const LOCALTIME_CLASS_GOOD = `${LOCALTIME_CLASS}-good`;
    const LOCALTIME_CLASS_BAD = `${LOCALTIME_CLASS}-bad`;

    const widget = this.widget;

    function initLocalTimeProcessHandler() {
      let intervalId;

      function setUpFreshLocaltimeHandler() {
          setUpLocaltimeElementForExistentNumbers();
          setUpNumberFieldsChangeHandlers();
          intervalId = setInterval(refreshAllLocaltimeElements, 10000);
      }

      function setUpLocaltimeElementForExistentNumbers() {
          $('div[data-pei-code="phone"]').each((index, element) => {
              const localtimeElement = createLocaltimeElement()
                  .appendTo(element.closest('.linked-form__field__value'));
              refreshLocalTimeValue(localtimeElement);
          });
      }

      function setUpNumberFieldsChangeHandlers() {
          $('.linked-form__multiple-container')
            .on('change', 'div[data-pei-code="phone"]', (event) => {
              const localtimeElement = $(event.target)
                  .closest('.linked-form__field__value')
                  .find('.mobilon-localtime');  //поменять на LOCALTIME
              refreshLocalTimeValue(localtimeElement);
            });
      }

      setUpFreshLocaltimeHandler();

      createCardHolderTransitionObserver(
          () => setUpFreshLocaltimeHandler(),
          () => clearInterval(intervalId)
      );
    }

    function createCardHolderTransitionObserver(onCardHolderActive, onCardHolderInactive) {

        function onChange(mutations) {
            const lastMutation = mutations[mutations.length - 1];
            if (lastMutation.target.innerHTML) {
                onCardHolderActive();
            } else if (onCardHolderInactive) {
                onCardHolderInactive();
            }
        }

        const observer = new MutationObserver(onChange);
        observer.observe(
            document.getElementById('card_holder'),
            {
                attributes: true,
                attributeFilter: ['data-card-active',],
            }
        );
    }

    function createLocaltimeElement() {
        return $(`<div class="${LOCALTIME_CLASS}"></div>`);
    }

    function refreshLocalTimeValue(element) {
      function normalizeNumber(number) {
        return number.replace(/\D/g, '');
      }
      
      const wrappedElement = $(element);
      const numberInputElement = wrappedElement.closest('.linked-form__field__value').find('input[type=text]');
      const number = normalizeNumber(numberInputElement.val());

      if (number.length < 11) {
          return setAlertOnLocaltimeElement(element);
      }

      getRegionDataForNumber(number)
          .then((regionData) => {
              console.log('region data', regionData);
              const time = moment().utcOffset(regionData.utc_offset).format('HH:mm');
              console.log('time', time);
              clearLocaltimeElement(element);
              console.log('append data');
              const appendedClass = time >= '09:00' && time <= '19:00' ? LOCALTIME_CLASS_GOOD : LOCALTIME_CLASS_BAD;
              console.log('appended class', appendedClass);

              wrappedElement.text(time)
                  .prop('title', regionData.title)
                  .addClass(appendedClass);
          })
          .catch(() => clearLocaltimeElement(element));
    }

    async function getRegionDataForNumber(number) {
        const localStorageKey = `${number}_region`;
        if (!localStorage.getItem(localStorageKey)) {

            localStorage.setItem(localStorageKey, JSON.stringify(await fetchRegionDataForNumber(number)));
        } else {
          console.log('get data from local storage')
        }
        return JSON.parse(localStorage.getItem(localStorageKey));
    }

    function fetchRegionDataForNumber(number) {
        console.log('try get number data region', number);
        return fetch(`https://number.services.mobilon.ru/number/${number}`)
            .then((response) => {
              console.log('response', response);
                return response.ok ? response.json() : Promise.reject(response.statusText);
            })
            .then((data) => data.region);
    }

    function clearLocaltimeElement(element) {
        console.log('clear data');
        $(element).removeClass(LOCALTIME_CLASS_GOOD)
            .removeClass(LOCALTIME_CLASS_BAD)
            .text('');
    }

    function setAlertOnLocaltimeElement(element) {
        clearLocaltimeElement(element);
        $(element).html(createLocaltimeAlertElement());
    }

    function createLocaltimeAlertElement() {
        console.log('widget on img', widget);
        return $(
            `<img src="${widget.params.path}/images/alert.png" 
              title="${widget.i18n('localtime').alert_tooltip}" alt="">`
        );
    }

    function refreshAllLocaltimeElements() {
      console.log('refresh all localtime elements');
        $(`.${LOCALTIME_CLASS}`).each((index, element) => refreshLocalTimeValue(element));
    }



    function addCssFile() {
      const url = `${widget.params.path}/style.css?v=${widget.get_version()}`;
      console.log('url', url);
      $('head').append(`<link type="text/css" rel="stylesheet" href="${url}">`);
    }

    addCssFile();
    initLocalTimeProcessHandler();
  }
}

