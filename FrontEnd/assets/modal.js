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
    });
  });

  const ajouPhoto = document.querySelector('.ajouPhoto');
  const section1 = document.querySelector('.section1');
  const section2 = document.querySelector('.section2');
  const previous = document.querySelector('.previous');
  const resetModal = document.querySelector('.resetModal');

  ajouPhoto.addEventListener('click', () => {
    section1.style.display='none'
    section2.style.display='block'
  });

  previous.addEventListener('click', () => {
    section1.style.display='block'
    section2.style.display='none'
  });

  resetModal.addEventListener('click', () => {
    section1.style.display='block'
    section2.style.display='none'
  });

const logout = document.querySelector('.editButton');
  logout.addEventListener('click', () => {
    localStorage.removeItem("token")
    location.reload()
    console.log('exit')
  });