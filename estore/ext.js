

var firebaseConfig = {
    apiKey: "AIzaSyBLC0yWBzRzTN2uaNsRo6BTu5xc-gkZzoQ",
    authDomain: "emarket-7deaf.firebaseapp.com",
    projectId: "emarket-7deaf",
    storageBucket: "emarket-7deaf.appspot.com",
    messagingSenderId: "107494635013",
    appId: "1:107494635013:web:6f1053cb806a82efc58e6c",
    measurementId: "G-EWMG4G7HBY"
};

// initialize Firebase
firebase.initializeApp(firebaseConfig);

function buy() {
    for (let index = 0; index < products.length; index++){
        if (products[index].cart) {
            var product = {
                name: products[index].name,
                price: products[index].price,
                quantity: products[index].quantity,
                total: products[index].total,
            }
            productsFirebase.push(product);
        }
        
    }
    firebase.firestore().collection('cart').add({
        total: total(),
        products: productsFirebase
    });
    Swal.fire({
        type: 'success',
        title: 'Purchase made successfully!',
        text: 'Purchase order is completed',
    })
    clean();

}

var products = [
    {
        id: 1,
        img: 'img/cloth/suit1.jpg',
        name: 'Suit(Blue stripe)',
        price: 150,
        cart: false,
        quantity: 1,
        total: 0
        
    },
    {
        id: 2,
        img: 'img/cloth/suit2.jpg',
        name: 'Suit(Green stripe)',
        price: 200,
        cart: false,
        quantity: 1,
        total: 0
    },
    {
        id: 3,
        img: 'img/cloth/suit3.jpg',
        name: 'Suit(Dark-blue stripe)',
        price: 100,
        cart: false,
        quantity: 1,
        total: 0
    },
    {
        id: 4,
        img: 'img/cloth/shirt1.jpg',
        name: 'Men shirt',
        price: 55,
        cart: false,
        quantity: 1,
        total: 0
    },
    {
        id: 5,
        img: 'img/cloth/shirt2.jpg',
        name: 'Men shirt',
        price: 50,
        cart: false,
        quantity: 1,
        total: 0
    }

];
// total
function total() {
    let total = 0;
    for (let index = 0; index < products.length; index++){
        if (products[index].cart) {
            total += products[index].total;
        }
    }
    return total
}
var con = 0;
var con2 = [];
function clean() {
    for (let index = 0; index < products.length; index++){
        products[index].total = 0;
        products[index].quantity = 1;
        products[index].cart = false;
        con2 = [];
        updateCart();
    }
}

function add(id) {


    for (let index = 0; index < products.length; index++) {
        if (products[index].id != id || products[index].cart==true) {
            
        } else {
            products[index].cart = true;
            con2.push(products[index].id);
            console.log(con2)
            document.getElementById('tableProducts').innerHTML += `
            <tr>
                <th scope="row">${con + 1}</th>
                    <td><button class="btn btn-danger" onclick="remove(${products[index].id})"> X </button></td>
                    <td><img style="width: 7rem;" src="${products[index].img}"></td>
                    <td>${products[index].name}</td>
                    <td><button class="btn btn-primary" onclick="reduceAmount(${products[index].id})"> - </button>
                    <input class="btn btn-secondary" style="width:3rem;" id="input${products[index].id}" value="${products[index].quantity}"disabled>
                    <button class="btn btn-primary" onclick="addAmount(${products[index].id})"> + </button></td>
                    <td>€ ${products[index].price * products[index].quantity}.00</td>
            </tr>


            `
            con++;
            products[index].total=products[index].price*products[index].quantity
        }




    }


    document.getElementById('total').innerHTML = `
    <tr>
    <th scope="row"></th>
    <td></td>
    <td></td>
    <td></td>
    <td>
        <h4>Total:</h4>
    </td>
    <td>€ ${total()}.00</td>
    </tr>
    <tr>
    <th scope="row"></th>
    <td></td>
    <td></td>
    <td></td>
    <td>
        
    </td>
    <td>
        <button onclick="buy()" class="btn btn-success">Buy</button>
    </td>
    </tr>
    `


}
function remove(id) {

    for (let index = 0; index < products.length; index++) {
        if (products[index].id == id) {
            products[index].cart = false;
            products[index].total = 0;
            products[index].quantity = 1;
            total();
            for (let index2 = 0; index2 < products.length; index2++) {
                if (products[index].id == con2[index2]) {
                    con2.splice(index2, 1);
                    console.log(con2)
                } else {

                }

            }

            updateCart();
        } else {
        updateCart();
        }
           
    }
}
function updateCart() {
    con = 0;
    var totalTable = 0;
    document.getElementById('tableProducts').innerHTML = '';
    for (let index = 0; index < con2.length; index++) {
        var position = con2[index];
        for (let index3 = 0; index3 < products.length; index3++) {

            if (position == products[index3].id) {
                console.log( 'ENCONTRADO: ' +position + '  '+products[index3].id);
                document.getElementById('tableProducts').innerHTML += `
            <tr>
            <th scope="row">${con + 1}</th>
            <td><button class="btn btn-danger" onclick="remove(${products[index3].id})"> X </button></td>
            <td><img style="width: 7rem;" src="${products[index3].img}"></td>
            <td>${products[index3].name}</td>
            <td><button class="btn btn-primary" onclick="reduceAmount(${products[index3].id})"> - </button>
            <input class="btn btn-secondary" style="width:3rem;" id="input${products[index3].id}" value="${products[index3].quantity}"disabled>
            <button class="btn btn-primary" onclick="addAmount(${products[index3].id})"> + </button></td>
            <td>€ ${products[index3].price * products[index3].quantity}.00</td>
            </tr>
            `
                
            products[index3].total = products[index3].price * products[index3].quantity
            } else {
            
            }
        }
        con = con + 1;
        
    }
    if (total() == 0) {
        document.getElementById('total').innerHTML = '';
        
    } else {
        document.getElementById('total').innerHTML = `
    <tr>
    <th scope="row"></th>
    <td></td>
    <td></td>
    <td></td>
    <td>
        <h4>Total:</h4>
    </td>
    <td>€ ${total(totalTable)}.00</td>
    </tr>

    <tr>
    <th scope="row"></th>
    <td></td>
    <td></td>
    <td></td>
    <td>
        
    </td>
    <td>
        <button onclick="but()" class="btn btn-success">Buy</button>
    </td>
   
    </tr>
    `
    }
    
}

//reduce functiom
function reduceAmount(id) {
    for (let index = 0; index < products.length; index++){
        if (products[index].id == id) {
            if (products[index].quantity > 1) {
                products[index].quantity = products[index].quantity - 1;
                updateCart();
            } else {
                
            }
        } else {
            
        }
    }
}
//add functiom
function addAmount(id) {
    for (let index = 0; index < products.length; index++){
        if (products[index].id == id) {
            if (products[index].quantity > 0) {
                products[index].quantity = products[index].quantity + 1;
                updateCart();
            } else {
                
            }
        } else {
            
        }
    }
}

(()=>{
    for (let index = 0; index < products.length; index++) {
        document.getElementById('row1').innerHTML += `
        <div class="card m-2" style="width:12rem;"><img src="${products[index].img}" class="card-img-top" style=height:12rem; alt="...">
            <div class="card-body><h5 class="card-title">${products[index].name}</5><p class="card-text">€ ${products[index].price}.00</p>
                <button class="btn btn-warning m-1" onclick="add(${products[index].id})">Add</button>
            </div>
        </div>
        `
    }
})();