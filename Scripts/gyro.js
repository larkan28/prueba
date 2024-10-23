function handleOrientation(e)
{
    let a = e.alpha;
    let b = e.beta;
    let g = e.gamma;

    document.getElementById('alpha').innerText = a;
    document.getElementById('beta').innerText = b;
    document.getElementById('gamma').innerText = g;

    var unityInstance = window.unityInstance;
    if (unityInstance) {
        unityInstance.SendMessage('PlayerPC', 'RecibirDatosGiroscopio', a + ',' + b + ',' + g);
    }
}

async function requestOrientation()
{
    if (typeof DeviceOrientationEvent != 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
            const state = await DeviceOrientationEvent.requestPermission()

            if (state === 'granted') {
                window.addEventListener('deviceorientation', handleOrientation)
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    else if ('DeviceOrientationEvent' in window) {
        window.addEventListener('deviceorientation', handleOrientation)
    }
    else {
        alert('not supported')
    }
}
