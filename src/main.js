import MyPromise from "./promise"

function handleClick() {
    console.log("click button")
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

window.handleClick = handleClick
