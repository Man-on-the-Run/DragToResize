function dragToResize(element) {
    var range = 10;
    
    function getWidth(element) {
      return parseInt(getComputedStyle(element).getPropertyValue('width'));
    }
    
    function adjustWidth(e) {
      this.firstElementChild.style.width = e.clientX + 'px';
      this.classList.add('resizing');
      this.addEventListener('mouseup', function() {
        this.removeEventListener('mousemove', adjustWidth);
        this.classList.remove('resizing');
        this.firstElementChild.addEventListener('mousemove', highlightEdge);
      });
    }
    
    function select() {
      this.removeEventListener('mousemove', highlightEdge);
      this.parentElement.addEventListener('mousemove', adjustWidth);
    }
    
    function highlightEdge(e) {
      if(e.clientX >= getWidth(this) - range) {
        this.classList.add('on-edge');
        this.addEventListener('mousedown', select);
      } else {
        this.classList.remove('on-edge');
      }
    }
    
    element.addEventListener('mousemove', highlightEdge);
    element.addEventListener('mouseleave', function() {
      this.classList.remove('on-edge');
    });
}

var sidebar = document.getElementById('sidebar');

dragToResize(sidebar);