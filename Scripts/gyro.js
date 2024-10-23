const threshold = 0.1;

function handleMotion(e)
{
    var rate = e.rotationRate;

    let a = Math.abs(rate.alpha) > threshold ? rate.alpha : 0;
    let b = Math.abs(rate.beta) > threshold ? rate.beta : 0;
    let g = Math.abs(rate.gamma) > threshold ? rate.gamma : 0;

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
