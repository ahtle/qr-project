$('form').on('submit', function(e) {
    e.preventDefault();
    let name = $('#name').val();
    console.log(name);

    $('#get-qr').attr('src', 'https://api.qrserver.com/v1/create-qr-code/?data=' + name);
});

// scanner
let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });

scanner.addListener('scan', function (content) {
    console.log(content);
    $('#scan-result').text(content);
});

$('#start-scan').click(function() {
    
    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
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

$('#capture-image').click(function(){

});