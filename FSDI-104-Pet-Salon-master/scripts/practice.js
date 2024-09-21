//JS vs jQuery

//document.getElementById('title')
//$('#title')

//document.getElementsByClassName('classname')
//$('.classname')

// document.getElementsByTagName('p')
// $('p')

// function clickMe(){
//     $('#results').text('The button was clicked')
//     $('p:first').hide();
//     $('p:last').css('background-color', 'red')
// }

function register(){
    // let testEntry = document.getElementById('testInput').value;
    // let results = document.getElementById('results');
    // results.innerHTML += `<li>${testEntry}</li>`;
    // console.log('function working');
    let testEntry = $('#testInput').val();
    $('#results').append(`<li>${testEntry}</li>`)
}
// function hideOpt(){
//     $('#opt1').hide();
//     $('#opt2').hide();
// }
function init(){
    // let h1 = document.getElementById('title');
    // console.log(h1);
    // let h1jQuery = $('#title');
    // console.log(h1jQuery);
    
    // let p = document.getElementsByClassName('paragraph');
    // console.log(p);
    // let p2 = $('.paragraph');
    // console.log(p2);

    // let combined = $('p.paragraph#example');
    // console.log(combined);

    //$('#btn1').on('click',clickMe);

    $('#btn1').on('mouseover', function(){
        $(this).addClass('btn');
    })
    $('#btn1').on('mouseleave', function(){
        $(this).removeClass('btn');
    })
    $('#btnRegister').on('click', register);

    $('#opt1').hide();
    $('#opt2').hide();

    $('#opt1link').click(function(){
        $('#opt1').show();
    })
    $('#opt2link').click(function(){
        $('#opt2').show();
    })
}
window.onload = init;