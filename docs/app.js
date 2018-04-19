$('form').on('submit', function(e) {
    e.preventDefault();
    let name = $('#name').val();
    console.log(name);

    $('#get-qr').attr('src', 'https://api.qrserver.com/v1/create-qr-code/?data=' + name);
});

// scanner
let scanner = new Instascan.Scanner({ video: document.getElementById('video') });

scanner.addListener('scan', function (content) {
    $('#scan-result').text(content);
    if ($('#scan-result').text() !== ''){
        $('#capture-image-btn').removeClass('no-display');
    }
});

$('#start-scan').click(function() {
    
    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            if(cameras[1]) {
                scanner.start(cameras[1]);
            } else {
                scanner.start(cameras[0]);
            }
        } else {
            $('#scan-result').text('No camera found.');
        }
        }).catch(function (e) {
            console.error(e);
        });

});

$('#stop-scan').click(function() {
    scanner.stop();
});

$('#capture-image-btn').click(function(){
    console.log('capture clicked');
    takeSnapshot();
});

function takeSnapshot(){
    let video = document.getElementById('video')
    let image = document.getElementById('captured-img')
    var canvas = document.getElementById("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')
            .drawImage(video, 0, 0, canvas.width, canvas.height);

    image.src = canvas.toDataURL();

}
