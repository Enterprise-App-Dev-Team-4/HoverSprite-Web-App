const serviceAPI = 'http://localhost:8080/service/all'

function getAllService()
{
    fetch(serviceAPI)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json(); // assuming the response is in JSON
    })
    .then(data => {
        console.log(data); // Process the data
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

getAllService();