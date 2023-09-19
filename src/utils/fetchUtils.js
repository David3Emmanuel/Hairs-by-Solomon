export function get(url, setData) {
    fetch(url)
        .then(response => response.json())
        .then(data => setData(data))

}

export function post(url, setData, body) {
    fetch(url, { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } })
        .then(response => response.json())
        .then(data => setData(data))
}