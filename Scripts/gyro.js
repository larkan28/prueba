const threshold = 10;

function handleMotion(e)
{
    var rate = e.rotationRate;

    let a = Math.abs(rate.alpha) > threshold ? (rate.alpha / threshold) : 0;
    let b = Math.abs(rate.beta) > threshold ? (rate.beta / threshold) : 0;
    let g = Math.abs(rate.gamma) > threshold ? (rate.gamma / threshold) : 0;

    var unityInstance = window.unityInstance;
    if (unityInstance) {
        if (window.matchMedia("(orientation: landscape)").matches) {
            unityInstance.SendMessage('PlayerPC', 'RecibirDatosGiroscopio', -b + ',' + -a + ',' + g);
        }
        else {
            unityInstance.SendMessage('PlayerPC', 'RecibirDatosGiroscopio', a + ',' + -b + ',' + g);
        }
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
