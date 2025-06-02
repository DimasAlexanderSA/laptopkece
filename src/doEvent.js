import Swal from "sweetalert2";

const outputdiv = document.getElementById('outputdiv');
let stateDetail = false;

const symbols = {
'idr': 'Rp',
'usd': '$',
'eur': '€',
'jpy': '¥',
'gbp': '£',
'krw': '₩',
};

const getCurrency = cur => symbols[cur] || cur;

function dot(number){
    let count = 1;
    let result = "";
    for (const char of number.split('').reverse().join('')){
        result+= char;
        if (count === 3 && !isNaN(parseInt(char))) {
            result+='.';
            count=0;
        }
        ++count;
    }

    console.log(result)

    return result.split('').reverse().join('');
}

function detail(event) {
    document.getElementById('spec').style.display = !stateDetail ? "inline" : "none"
    event.currentTarget.innerText = stateDetail ? "Lihat Detail" : "Sembunyikan Detail";
    stateDetail = !stateDetail;
}

function addProduct(){
    let data = document.getElementsByClassName('inp');
    let list;
    for (const inpobj of data){
        if(!(inpobj.value)){
            Swal.fire({
                title: 'Error',
                text: 'Harap isi data !',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true
            })
             
            return;
        }
    } 

    list = [
        `<p>Nama Produk : ${data[0].value}</p>`,
        `<p>Harga : ${getCurrency(currency.value)} ${dot(data[1].value)}</p>`, 
        `<p>Deskripsi : ${data[2].value}</p>` 
    ]
        
    const button = document.createElement('button');
    button.innerText = "Delete"
    button.id = "delbutton";
        
    button.addEventListener('click',()=>{
        Swal.fire({
            title: 'Apakah Anda Yakin?',
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText : 'Nggak jadi',
        }).then((result) => {
            if (result.isConfirmed) {
                outputdiv.removeChild(div)
            }
        })
    });

    const div = document.createElement('div');
    div.classList.add('item','no-scrollbar');
    div.innerHTML = list.join('');
    div.appendChild(button)
    outputdiv.appendChild(div)

   for (const inpobj of data) inpobj.value = "";
}

document.getElementById('detail').addEventListener('click',detail);
document.getElementById('addProduct').addEventListener('click', addProduct);

const currency = document.getElementById('currency');
currency.addEventListener('click',event=> event.currentTarget.options[0].hidden = true);
currency.addEventListener('input', ()=> allowchangeSymbol = true )

const numberOnly = document.getElementById('numberOnly');

numberOnly.addEventListener('input',event => event.currentTarget.value = event.currentTarget.value.replace('/[^0-9]/g',''));


// numberOnly.addEventListener('input',event => {
//     event.currentTarget.value = withSymbol? event.currentTarget.value : event.currentTarget.value.replace('/[^0-9]/g','')
//     console.log(withSymbol)
// })
// numberOnly.addEventListener('blur',event => {
//     // if(!allowchangeSymbol) event.currentTarget.value = ""
//     // currentPrice = event.currentTarget.value;
//     // if(allowchangeSymbol) event.currentTarget.value = `${getCurrency(currency.value)} ${currentPrice}`;
//     // else event.currentTarget.value = currentPrice;
//     // allowchangeSymbol = false;


// });
// numberOnly.addEventListener('focus',event => {
//     // currentSymbol = getCurrency(currency.value);
//     // console.log(currentSymbol)
// })
