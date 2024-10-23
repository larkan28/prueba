function handleMotion(e)
{
    let a = e.rotationRate.alpha;
    let b = e.rotationRate.beta;
    let g = e.rotationRate.gamma;

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
    if (typeof DeviceMotionEvent != 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        try {
            const state = await DeviceMotionEvent.requestPermission()

            if (state === 'granted') {
                window.addEventListener('devicemotion', handleMotion)
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    else if ('DeviceMotionEvent' in window) {
        window.addEventListener('devicemotion', handleMotion)
    }
    else {
        alert('not supported')
    }
}
