function changeMagnet(magnet) {
    return {type:"CHANGE_MAGNET",payload:magnet}
}

function changeTitle(title) {
    return {type:"CHANGE_TITLE", payload:title}
}

function changePoster(poster) {
    return {type:"CHANGE_POSTER", payload:poster}
}

export default {changeMagnet, changeTitle, changePoster}