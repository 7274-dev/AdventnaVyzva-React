import cookie from "react-cookies";

const backendUrl = "http://localhost:7274";

const login = async (username, password) => {
    // TODO: test if this works

    let response = await fetch("/login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    if (response.ok) {
        let json = await response.json();
        cookie.save("token", json.token, []);
        window.location = "/";
        return false;
    }
    else {
        return true;
    }
}

export { login };
