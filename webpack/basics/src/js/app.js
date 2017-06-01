import  {btn, lblBar} from './dom.js';
function foo(){
    lblBar.style.display = lblBar.style.display === 'block' ? 'none' : 'block';
}

btn.addEventListener('click', foo);
