document.write('<script src="http://' 
                 + (location.host || 'localhost').split(':')[0] +
                 ':5729/livereload.js?snipver=1"></' + 'script>');



import MyPromise from "./promise"
import { addEvent, removeEvent } from "./event";
function onload() {
    const promise = new MyPromise((resolve, reject) => {
       const p = fetch("./json/a.json").then(res => res.json());
       p.then(data => {
        console.log('a', data)
        resolve(data)
       })
    });

    promise.then(value => {
        console.log(value, 'value')
        const p1 = new MyPromise((resolve, reject) => {
            const p = fetch(`./json/b.json?v=${value.result}`).then(res => res.json())
            p.then(data => {
                console.log(data, 'b')
                resolve(data)
            })
        })
        return p1; 
    });
}

window.addEventListener('load', onload, false);

(function() {
    const button = document.body.querySelector("button");
    function onButtonClick() {
        console.log('on button click')
        removeEvent(button, 'click', onButtonClick)
    }
    addEvent(button, 'click', onButtonClick)

    window.handleClick = () => {
        console.log('self click')
    }
})();