import * as Api from "./Api";

const testLogin = async () => {
    const token = await Api.login("test_username", "test_password");
}

// noinspection JSIgnoredPromiseFromCall
testLogin();
