let search = document.querySelector('.search-box');
document.querySelector('#search-icon').onclick = () =>{
    search.classList.toggle('active');
    cart.classList.remove('active');
    user.classList.remove('active');
    navbar.classList.remove('active');
}


let cart = document.querySelector('.cart');
document.querySelector('#cart-icon').onclick = () =>{
    cart.classList.toggle('active');
    search.classList.remove('active');
    user.classList.remove('active');
    navbar.classList.remove('active');
}

let user = document.querySelector('.user');
document.querySelector('#user-icon').onclick = () =>{
    user.classList.toggle('active');
    cart.classList.remove('active');
    search.classList.remove('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');
document.querySelector('#menu-icon').onclick = () =>{
    navbar.classList.toggle('active');
    search.classList.remove('active');
    cart.classList.remove('active');
    user.classList.remove('active');

}
window.onscroll = () => {
    search.classList.remove('active');
    cart.classList.remove('active');
    user.classList.remove('active');
    navbar.classList.remove('active');
}

let header = document.querySelectorAll('header');
window.addEventListener('scroll',()=>{
    header.classList.toggle('shadow',window.scrollY > 0);
});

var swiper = new Swiper(".new-arival", {
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    centeredSlides:true,
    breakpoints:{
        0:{
            slidesPerView:0,
        },
        568:{
            slidesPerView:2,
        },
        768:{
            slidesPerView:2,
        },
        1020:{
            slidesPerView:3,
        },
    },
  });

  
// main.js

function isValidInput(){
    let ma = document.getElementById('txtMa').value;
    let ten = document.getElementById('txtTen').value;
    
    let ngayTG = document.getElementById('ngayTG').value;
    let sdt = document.getElementById('sdt').value;
    let email = document.getElementById('email').value;

    let regexMa = /^MS-+([0-9]{3})$/;
    if(regexMa.test(ma) == false){
        document.getElementById('errMa').innerHTML = "Nhập sai định dạng mã. Yêu cầu MS và theo sau là 3 chữ số."
        return false;
    }
    else
        document.getElementById('errMa').innerHTML = ""


    let regexTen  = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/    
    if(regexTen.test(ten) == false){
        document.getElementById('errTen').innerHTML = "Chỉ dùng chữ hoa đầu từ không dùng số không rỗng"
        return false;
    }
    else
        document.getElementById('errTen').innerHTML = ""

    let ngayHnay = new Date();
    let ngayThamGia = new Date(ngayTG);
    let ngayThamGiaChuan = new Date(ngayHnay.setDate(ngayHnay.getDate() + 30));
    
    if(ngayThamGia < ngayThamGiaChuan){
        document.getElementById('errNgay').innerHTML = `Ngày tham gia phải sau ngày hôm nay ít nhất 30 ngày.}`
        return false;
    }
    else if(ngayTG == null){
        document.getElementById('errNgay').innerHTML = `Chưa chọn ngày.}`
        return false;
    }
    else   
        document.getElementById('errNgay').innerHTML = ""

    
    let regexSdt = /^0[0-9]{3}-[0-9]{3}-[0-9]{3}$/
    if(regexSdt.test(sdt) == false){
        document.getElementById('errSdt').innerHTML = "Số điện thoại 0xxx-xxx-xxx đúng định dạng"
        return false;
    }
    else
        document.getElementById('errSdt').innerHTML = ""


    let regexEmail = /^[A-Za-z]+[A-Za-z0-9]{4}@gmail.com/
    if(regexEmail.test(email) == false){
        document.getElementById('errEmail').innerHTML = "Email theo mẫu xxxxx@gmail.com kí tự đầu dùng chữ, đúng định dạng"
        return false;
    }
    else
        document.getElementById('errEmail').innerHTML = ""

    return true;

}

function submit(){
    if(isValidInput() == false)
        return;
    else{
        let table = document.getElementById('ds');
        let stt = table.getElementsByTagName('tr').length;
        let ma = document.getElementById('txtMa').value;
        let ten = document.getElementById('txtTen').value;
        let lop = document.getElementById('txtLop').value;
        let ngayTG = document.getElementById('ngayTG').value;
        let sdt = document.getElementById('sdt').value;
        let email = document.getElementById('email').value;

        let newRow = '<tr>' +
        '<td id="STT">' + stt + '</td>' +
        '<td id="ma">' + ma + '</td>' +
        '<td id="hoten">' + ten + '</td>' +
        '<td id="lop">' + lop + '</td>' +
        '<td id="ngaytg">' + ngayTG + '</td>' +
        '<td id="dienThoai">' + sdt + '</td>' +
        '<td id="email">' + email + '</td>' +
        '</tr>';

        $("table tbody").append(newRow);
        $('#successModal').modal('show');
    }
}
  

document.addEventListener("DOMContentLoaded", function() {
    const cartIcons = document.querySelectorAll(".bx-cart");
    const cartContainer = document.querySelector(".cart");

    cartIcons.forEach(icon => {
        icon.addEventListener("click", function() {
            const productBox = this.closest(".pox");
            const productName = productBox.querySelector("h2").innerText;
            const productPrice = productBox.querySelector("span").innerText;

         
            const productItem = document.createElement("div");
            productItem.classList.add("box");

            productItem.innerHTML = `
                <img src="${productBox.querySelector("img").src}" alt="">
                <div class="text">
                    <h3>${productName}</h3>
                    <span>${productPrice}</span>
                    <span>x1</span>
                </div>
                <i class='bx bx-trash-alt'></i>
            `;

            cartContainer.appendChild(productItem);

       
            updateTotal();
        });
    });

 
    function updateTotal() {
        const prices = cartContainer.querySelectorAll(".text span:nth-child(2)");
        let total = 0;
        prices.forEach(price => {
            total += parseFloat(price.innerText.replace(/[^0-9.-]+/g,"")); 
        });

    
        const totalElement = document.querySelector(".cart h2");
        totalElement.innerText = `Tổng cộng: ${total.toFixed(0)}`;
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const cartContainer = document.querySelector(".cart");

   
    cartContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("bx-trash-alt")) {
            const productBox = event.target.closest(".box");
            productBox.remove(); 

            
            updateTotal();
        }
    });

    function updateTotal() {
        const prices = cartContainer.querySelectorAll(".text span:nth-child(2)");
        let total = 0;
        prices.forEach(price => {
            total += parseFloat(price.innerText.replace(/[^0-9.-]+/g,"")); 
        });

        const totalElement = document.querySelector(".cart h2");
        totalElement.innerText = `Tổng cộng: ${total.toFixed(0)}`;
    }
});
const loginBtn = document.querySelector('.login-btn');

      
        loginBtn.addEventListener('click', function(event) {
            event.preventDefault(); 


            const alertBox = document.getElementById('alertBox');
            alertBox.style.display = 'block';
            alertBox.textContent = 'Bạn cần phải đăng ký tài khoản!';
        });
       
    document.addEventListener('DOMContentLoaded', function () {
        var clickableImage = document.querySelector('.clickable-image');
        clickableImage.addEventListener('click', function() {
            window.location.href = 'product-details.html';
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        var productContainer = document.getElementById('product-container');
        var clickableImages = productContainer.querySelectorAll('.clickable-image');

        clickableImages.forEach(function(image) {
            image.addEventListener('click', function() {
                window.location.href = 'product-details.html'; 
            });
        });
    });



    class StoreUser {

    }
    document.getElementById("frmDangky").addEventListener('submit',function(event){
        alert("click here")
    })

    