// Define the Loader class
class Loader {
    constructor(parentDOM) {
        this.newLoaderDOM(parentDOM);
    }

    newLoaderDOM(parentDOM) {
        const loaderDOM = document.createElement('div');
        loaderDOM.id = 'pageLoader';
        loaderDOM.className = 'pageLoader';
        loaderDOM.style.display = 'none';

        loaderDOM.innerHTML = `
            <div class="loading"></div>
            <div class="loadingInfoContainer">
                <h1 class="loadingTitle">Loading please wait</h1>
                <div class="loadingOptions">
                    <button class="loadingCancel">Cancel</button>
                    <button class="loadingRetry" style="display:none;">Retry</button>
                    <button class="loadingClose" style="display:none;">Close</button>
                </div>
            </div>
        `;

        parentDOM.appendChild(loaderDOM);
        this.loaderDOM = loaderDOM;

        return loaderDOM;
    }

    showConnectionLost() {
        // Display the loader when the connection is lost
        this.loaderDOM.style.display = 'grid';

        const loading = this.loaderDOM.querySelector('.loading');
        const loadingTitle = this.loaderDOM.querySelector('.loadingTitle');
        const loadingOptions = this.loaderDOM.querySelector('.loadingOptions');
        const loadingCancel = this.loaderDOM.querySelector('.loadingCancel');
        const loadingRetry = this.loaderDOM.querySelector('.loadingRetry');
        const loadingClose = this.loaderDOM.querySelector('.loadingClose');
        loading.style.borderColor = 'red';
        loading.style.animation = 'none';
        loadingTitle.innerText = 'Connection Lost';
        loadingOptions.style.gridTemplateColumns = '1fr 1fr 1fr'; // Adjusted for Close button
        loadingCancel.style.display = 'none';
        loadingRetry.style.display = 'block';
        loadingClose.style.display = 'block';
        this.loaderDOM.classList.add('connection-lost');
    }

    show() {
        this.loaderDOM.style.display = 'grid';
    }

    hide() {
        this.loaderDOM.style.display = 'none';
    }
}

// Create an instance of the Loader
const loader = new Loader(document.body);

let xhr; // Variable to store the XHR request
let loaderTimeout; // Variable to store the timeout ID

// Function to handle aborting the request
function abortRequest() {
    if (xhr) {
        xhr.abort();
        xhr = null;
        hideLoadingSpinner();
    }
}

// Function to handle retrying the request
function retryRequest() {
    abortRequest();
    clearTimeout(loaderTimeout); // Clear the timeout
    resetUILoadingState(); // Reset the UI loading state
    document.getElementById('load-data').click(); // Trigger the HTMX request
}

function hideLoadingSpinner() {
    loader.hide();
}

// Event listener to display the spinner when HTMX request starts
document.body.addEventListener('htmx:beforeRequest', async function (event) {
    if (event.detail.elt.matches('#load-data')) {
        xhr = event.detail.xhr;

        // Set a new timeout to show the loader after 150 milliseconds
        loaderTimeout = setTimeout(() => {
            loader.show();
        }, 150);

        xhr.addEventListener('error', function (event) {
            if (event.type === 'error' && event.target.status === 0) {
                // Handle network error (ERR_INTERNET_DISCONNECTED)
                loader.showConnectionLost();
                clearTimeout(loaderTimeout); // Clear the timeout
            }
        });
    }
});

// Event listener to hide the spinner when HTMX request is complete
document.body.addEventListener('htmx:afterRequest', function (event) {
    xhr = null;
    hideLoadingSpinner();
    clearTimeout(loaderTimeout); // Clear the timeout
    event.preventDefault();
});

// Event listener for htmx:sendAbort
document.body.addEventListener('htmx:sendAbort', function (event) {
    // Prevent the default behavior to suppress the error message
    event.preventDefault();
});

// Event listener for the cancel button
document.body.addEventListener('click', function (event) {
    const target = event.target;
    if (target.matches('.loadingCancel')) {
        abortRequest();
        loader.hide(); // Hide the loader
        clearTimeout(loaderTimeout); // Clear the timeout
    }
});

// Event listener for the close button
document.body.addEventListener('click', function (event) {
    const target = event.target;
    if (target.matches('.loadingClose') && loader.loaderDOM.classList.contains('connection-lost')) {
        loader.hide(); // Hide the loader
        // Remove the 'connection-lost' class and reset styles
        resetUILoadingState();
        clearTimeout(loaderTimeout); // Clear the timeout
    }
});

// Event listener for the retry button
document.body.addEventListener('click', function (event) {
    const target = event.target;
    if (target.matches('.loadingRetry')) {
        retryRequest();
        clearTimeout(loaderTimeout); // Clear the timeout
    }
});

// Function to reset the UI loading state
function resetUILoadingState() {
    loader.loaderDOM.classList.remove('connection-lost');
    // Reset styles to mimic the loading state
    const loading = loader.loaderDOM.querySelector('.loading');
    const loadingTitle = loader.loaderDOM.querySelector('.loadingTitle');
    const loadingOptions = loader.loaderDOM.querySelector('.loadingOptions');
    const loadingCancel = loader.loaderDOM.querySelector('.loadingCancel');
    const loadingRetry = loader.loaderDOM.querySelector('.loadingRetry');
    const loadingClose = loader.loaderDOM.querySelector('.loadingClose');
    loading.style.borderColor = '';
    loading.style.animation = '';
    loadingTitle.innerText = 'Loading please wait';
    loadingOptions.style.gridTemplateColumns = '';
    loadingCancel.style.display = 'block';
    loadingRetry.style.display = 'none';
    loadingClose.style.display = 'none';
}
