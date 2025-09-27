(() => {
  if (
    window.location.hostname === "www.e-bebek.com" &&
    window.location.pathname === "/"
  ) {
    const init = () => {
      getProductData();
    };

    const getProductData = () => {
      try {
        let products = JSON.parse(localStorage.getItem("products"));
        buildHTML(products);
      } catch (err) {
        if (err.name === "SyntaxError") {
          localStorage.clear();
        }

        fetch(
          "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json"
        )
          .then((response) => response.json())
          .then((products) => {
            buildHTML(products);
            localStorage.setItem("products", JSON.stringify(products));
          });
      }
    };

    const buildHTML = (products) => {
      let cards = "";
      let isDiscounted = false;
      let discountAmount = 0;

      products.forEach((item) => {
        if (item.price != item.original_price) {
          isDiscounted = true;
          discountAmount = Number(
            ((item.original_price - item.price) / item.original_price) * 100
          );
          discountAmount = Math.round(discountAmount);
          console.log(discountAmount);
        }

        let isHeartChecked = false;

        let hearts = JSON.parse(localStorage.getItem("heart")) || [];

        if (hearts.includes(String(item.id))) {
          isHeartChecked = true;
          console.log("includes", String(item.id));
        } else {
          isHeartChecked = false;
          console.log("doesntincludes", String(item.id));
        }

        cards += `
          <li class="card">
            <a href="${item.url}" target="_blank">
              <div class="img"><img src="${item.img}">
              </div>
              <div class="card-mid">
                  <h2><b>${item.brand}</b> ${item.name}</h2>
                  <div class="stars">
                      <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                      <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                      <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                      <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                      <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                  </div>
              </div>
              <div class="card-bottom">
                  ${
                    isDiscounted
                      ? `
                  <div class="discount-price">
                  <p>${item.original_price}</p>
                  <p class="discount">
                  ${discountAmount}
                  </p>
                  </div>
                  `
                      : ""
                  }
                  <div class="price">
                    <p>${item.price}</p>
                  </div>
              </div>
            </a>
                <button class="heart-btn" data-id="${item.id}">
                  <div class="heart">
                    <i id="heart-icon">
                        ${
                          isHeartChecked
                            ? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="orange">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3594 2.3506C14.5916 1.48585 13.55 1 12.4639 1C11.3778 1 10.3362 1.48585 9.5684 2.3506L8.77939 3.23881L7.99038 2.3506C6.39123 0.550396 3.79851 0.550396 2.19936 2.3506C0.600213 4.15081 0.600214 7.06952 2.19936 8.86973L2.98837 9.75794L8.77939 16.2771L14.5704 9.75794L15.3594 8.86973C16.1276 8.00538 16.5592 6.83283 16.5592 5.61017C16.5592 4.38751 16.1276 3.21495 15.3594 2.3506Z" stroke="orange" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>`
                            : `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3594 2.3506C14.5916 1.48585 13.55 1 12.4639 1C11.3778 1 10.3362 1.48585 9.5684 2.3506L8.77939 3.23881L7.99038 2.3506C6.39123 0.550396 3.79851 0.550396 2.19936 2.3506C0.600213 4.15081 0.600214 7.06952 2.19936 8.86973L2.98837 9.75794L8.77939 16.2771L14.5704 9.75794L15.3594 8.86973C16.1276 8.00538 16.5592 6.83283 16.5592 5.61017C16.5592 4.38751 16.1276 3.21495 15.3594 2.3506Z" stroke="#A2B1BC" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>`
                        }
                    </i>
                  </div>
                </button>
            </li>
        `;
      });

      const html = `
        <div class="wrapper">
          <h2 class="banner__titles secondary-header">Beğenebileceğinizi düşündüklerimiz</h2>
        <div>
            <i id="left">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
               <path d="M15.5527 8.66064H1.55273M1.55273 8.66064L8.55273 1.66064M1.55273 8.66064L8.55273 15.6606" stroke="#212121" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </i>
            <ul class="carousel">
            ${cards}
            </ul>
            <i id="right">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path d="M1.55273 8.66064H15.5527M15.5527 8.66064L8.55273 1.66064M15.5527 8.66064L8.55273 15.6606" stroke="#212121" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </i>
            </div>
        </div>
        `;

      const heroSection = document.querySelector(".Section1");
      heroSection.insertAdjacentHTML("afterend", html);
      buildCSS();
      setEvents();
    };

    const setEvents = () => {
      const carousel = document.querySelector(".carousel");
      const arrowBtns = document.querySelectorAll(".wrapper i");
      const firstCard = carousel.querySelector(".card");
      const firstCardWidth = firstCard.offsetWidth;

      arrowBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          carousel.scrollLeft +=
            btn.id === "left" ? -firstCardWidth : firstCardWidth;
        });
      });

      const heartBtn = document.querySelectorAll(".heart-btn");
      heartBtn.forEach((btn) => {
        btn.addEventListener("click", (event) => {
          event.preventDefault();
          btnId = btn.dataset.id;
          console.log(btnId);

          let storedHearts = JSON.parse(localStorage.getItem("heart")) || [];

          if (storedHearts != null && storedHearts.includes(btnId)) {
            storedHearts = storedHearts.filter((x) => x !== btnId);
          } else {
            storedHearts.push(btnId);
          }
          localStorage.setItem("heart", JSON.stringify(storedHearts));
        });
      });
    };

    const buildCSS = () => {
      const css = `
      *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      .secondary-header{
        font-size: 24px;
        margin: 16px 0;
      }

      .wrapper{
        width: 100%;
        max-width: 1320px;
        position: relative;
        padding: 0 15px;
      }

      .wrapper i {
        height: 40px;
        width: 40px;
        background: white;
        text-align: center;
        line-height: 40px;
        border-radius: 50%;
        cursor: pointer;
        position: absolute;
        top: 50%;
        font-size: 9.6px;
        transform: translateY(-50%);
        box-shadow: 0 6px 2px 0 #b0b0b003, 0 2px 9px 0 #b0b0b014, 0 2px 4px 0 #b0b0b024, 0 0 1px 0 #b0b0b03d, 0 0 1px 0 #b0b0b047;
      }

      .heart{
        position: absolute;
        top: 8px;
        right: -50px;
        curser: pointer;
        z-index: 99;
      }

      .wrapper i:first-child{
        left: -65px;
      }

      .wrapper i:last-child{
        right: -65px;
      }

      .wrapper .carousel{
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: calc((100% / 5) - 16px);
        gap: 16px;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
        scrollbar-width: 0;
        overflow-x: hidden;
      }

      .card{
        scroll-snap-align: start;
        height: 406px;
        list-style: none;
        background: #fff;
        border-radius: 6px;
        display: flex;
        cursor: pointer;
        width: 98%;
        padding-bottom: 15px;
        align-items: left;
        justify-content: start;
        flex-direction: column;
        border: 1px solid #f2f5f7;
      }

      .carousel .card:hover{
        border: 1px solid #c1ccd4;
      }

      .card .img img{
        width: 100%;
        height: auto;
      }

      .card .card-mid{
        padding: 8px;
      }

      .card h2{
        font-family: Quicksand-Medium;
        font-size: 12px;
        text-align: left;
        color: #000000;
      }

      .card span{
        color: #6a6d78;
        font-size: 1.31rem;
      }
      
      .stars{
        display: flex;
        flex-direction: row;
        margin-top: .5rem;
      }

      .discount-price{
        display: flex;
        flex-direction: row;
      }
      
      .discount{
      	border: 2px solid #00a365;
        background-color: #00a365;
        color: #ffffff;
        padding: 0 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 16px;
        font-size: 1.4rem;
        font-weight: 600;
        font-family: Poppins, "cursive";
        margin: auto auto auto 11px;
      }
      
      .price{
        color: #00a365;
        font-size: 2rem;
        font-weight: 800;
      }

      @media screen and (max-width: 900px) {
          .wrapper .carousel {
              grid-auto-columns: calc((100% / 2) - 9px);
          }
      }

      @media screen and (max-width: 600px) {
          .wrapper .carousel {
              grid-auto-columns: 100%;
          }
      }
    `;

      var styles = document.createElement("style");
      styles.setAttribute("type", "text/css");
      styles.textContent = css;
      document.head.appendChild(styles);
    };

    init();
  } else {
    console.log("Wrong Page!");
  }
})();
