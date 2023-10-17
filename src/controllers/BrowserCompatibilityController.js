export function brdetect() {
    var res = window.navigator.userAgent;
    if (res.includes('Firefox/')) {
        alert(`Firefox v${res.split('Firefox/')[1]}`);
    } 
    else if (res.includes('Edg/')) {
        alert(`Edge v${res.split('Edg/')[1]}`);
    } 
    else if (res.includes('Chrome/')) {
        alert(`Chrome v${res.split('Chrome/')[1].split(' ')[0]}`);
    }
    else if (res.includes('Safari/')) {
        alert(`Safari v${res.split('Safari/')[1]}`);
    }
    else {
        alert("Unknown Browser");
    }
}
