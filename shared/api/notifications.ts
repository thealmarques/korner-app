export function sendNotification(tokens: string[], message: string) {
    const requestMessage = {
        to: tokens[0],
        sound: 'default',
        title: 'Notification',
        body: message,
        _displayInForeground: true
    }
    tokens.map(async (token) => {
        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestMessage),
        });
    });
}