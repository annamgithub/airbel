import 'bootstrap';
// Alternatively we can import features individually.
// Also make sure to update the project.config.js if you are going to take this approach
// import 'bootstrap/js/dist/util';
// import 'bootstrap/js/dist/dropdown';

import App from './App';
import mixitup from 'mixitup';
import mixitupMultifilter from './vendor/mixitup-multifilter';
mixitup.use(mixitupMultifilter);

import getUrlParameter from './params';

const containerEl = document.getElementById('projects');

if (containerEl) {
  const focus = getUrlParameter('focus');
  let activeFilters = focus ? `.active.${focus}` : `.active`;
  let mixer = mixitup(containerEl, {
    multifilter: {
      enable: true
    },
    selectors: {
      control: '[data-mixitup-control]'
    },
    load: {
      filter: activeFilters
    },
    callbacks: {
      onMixStart: function(state, futureState) {}
    }
  });
  
  $('#active-focus-text').text(focus);
}

const projectVisualizer = document.getElementById('project-visualizer');
if (projectVisualizer) {
  $('.stage-pane').each(function() {
    const container = $(this);
    let mixer = mixitup(container, {
      selectors: {
        control: '[data-visualizer-control]'
      },
      load: {
        filter: '.status-active'
      },
      callbacks: {
        onMixStart: function(state, futureState) {}
      }
    });
  });
}


$('.filter').on('click', function(){
  let text = $(this).text();
  let target = "#"+ $(this).attr('data-active-text');
  $(target).text(text);
  $('.dropdown-menu').removeClass('show');
});


