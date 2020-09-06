const ICON = ""

const requestPermission = async() => {
    return Notification.requestPermission()
}

const sendNotification = (title, body) => {
    new Notification(title, {body, icon:ICON})
}

export {requestPermission, sendNotification}