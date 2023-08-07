document.addEventListener('DOMContentLoaded', () => { 
    const triggers = document.querySelectorAll('[aria-haspopup="dialog"]');
    const doc = document.querySelector('.js-document');
  
    const open = function (dialog) {
      dialog.setAttribute('aria-hidden', false);
      doc.setAttribute('aria-hidden', true);
    };
  
    const close = function (dialog) {
      dialog.setAttribute('aria-hidden', true);
      doc.setAttribute('aria-hidden', false);
    };
  
    triggers.forEach((trigger) => {
      const dialog = document.getElementById(trigger.getAttribute('aria-controls'));
      const dismissTriggers = dialog.querySelectorAll('[data-dismiss]');
  
      // open dialog
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
  
        open(dialog);
      });
  
      // close dialog
      dismissTriggers.forEach((dismissTrigger) => {
        const dismissDialog = document.getElementById(dismissTrigger.dataset.dismiss);
  
        dismissTrigger.addEventListener('click', (event) => {
          event.preventDefault();
  
          close(dismissDialog);
        });
      });
  /*
      window.addEventListener('click', (event) => {
        if (event.target === dialog) {
          close(dialog);
        }
      });*/
    });
  });

  const ajouPhoto = document.querySelector('.ajouPhoto');
  const section1 = document.querySelector('.section1');
  const section2 = document.querySelector('.section2');
  const previous = document.querySelector('.previous');
  const resetModal = document.querySelector('.resetModal');

  ajouPhoto.addEventListener('click', (event) => {
    event.preventDefault();

    section1.style.display='none'
    section2.style.display='block'
  });

  previous.addEventListener('click', (event) => {
    console.log("coucou")

    section1.style.display='block'
    section2.style.display='none'

  });

  resetModal.addEventListener('click', (event) => {
    console.log("coucou")

    section1.style.display='block'
    section2.style.display='none'

  });
