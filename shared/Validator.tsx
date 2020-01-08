export class Validator {
    static validateEmail(email: string) {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email.toLowerCase());
    }

    static validateConfirmation(password: string, confirm: string) {
        return password === confirm;
    }

    static validatePassword(password: string) {
        return password.length > 6;
    }

    static validateName(name: string) {
        return name.length > 2;
    }
}