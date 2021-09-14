let guid = 1;

export function addEvent(element, type, handler) {
    if(!element.events) {
        element.events = {};
    }

    if (!handler.guid) {
        handler.guid = guid++;
    }

    const handlers = (element.events[type] || (element.events[type] = {}))
    if (element[`on${type}`]) {
        handlers[`0`] = element[`on${type}`]
    }
    
    handlers[handler.guid] = handler

    element[`on${type}`] = handleEvent;
}

export function removeEvent(element, type, handler) {
    const handlers = element && element.events && element.events[type];
    if (handlers) {
        const guid = handler.guid;
        if (guid in handlers) {
            delete handlers[guid];
        }
    }
}

function handleEvent(event) {
    event = event || window.event;
    const handlers = this.events[event.type];

    for(let i in handlers) {
        this.handleEvent = handlers[i]
        this.handleEvent(event)        
    }

}