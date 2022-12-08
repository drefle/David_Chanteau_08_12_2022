 async function getCards(){
  try{
      let response = await fetch('./data.json');

      if(response.ok){
          let data = await response.json();
          return data;
      }
      else{
          console.error('Erreur lors de la récupération des données : erreur '+ response.status);
      }
  }catch(e){
      console.log(e);
  }
}

  main()
  async function main(){
      let active = document.getElementsByClassName('active');
      const cards = await getCards(); //Récupération de tous les produits auprès de l'api
  
      //Affichage de tous les products
      for(let card of cards){
        displayAllCards(card,active[0].textContent);
      }
  }
  
  
  /**
   * Affichage de la card passée en paramètre
   * @param {Object} card 
   * @param {String} time
   */
  function displayAllCards(card,time){
      const templateElt = document.getElementById("templateCard");
      const cloneElt = document.importNode(templateElt.content,true);
      cloneElt.getElementById("card__name").textContent = card.title;
      switch(card.title){
        case "Work":
          cloneElt.getElementById("icon__card").src = "./images/icon-work.svg";
          cloneElt.getElementById("card").style.background = "hsl(15, 100%, 70%)";
          break;
        case "Play":
          cloneElt.getElementById("icon__card").src = "./images/icon-play.svg";
          cloneElt.getElementById("card").style.background = "hsl(195, 74%, 62%)";
          break;
        case "Exercise":
          cloneElt.getElementById("icon__card").src = "./images/icon-exercise.svg";
          cloneElt.getElementById("card").style.background = "hsl(145, 58%, 55%)";
          break;
        case "Social":
          cloneElt.getElementById("icon__card").src = "./images/icon-social.svg";
          cloneElt.getElementById("card").style.background = "hsl(264, 64%, 52%)";
          break;
        case "Study":
          cloneElt.getElementById("icon__card").src = "./images/icon-study.svg";
          cloneElt.getElementById("card").style.background = "hsl(348, 100%, 68%)";
          break;
        case "Self Care":
          cloneElt.getElementById("icon__card").src = "./images/icon-self-care.svg";
          cloneElt.getElementById("card").style.background = "hsl(43, 84%, 65%)";
          break;
        default:break;
      }
      switch(time){
        case 'Daily':
          cloneElt.getElementById("card__actual").textContent = card.timeframes.daily.current + "Hrs";
          cloneElt.getElementById("card__previous").textContent = "Last day - " + card.timeframes.daily.previous + "hrs";
          break;
        case 'Weekly':
          cloneElt.getElementById("card__actual").textContent = card.timeframes.weekly.current + "Hrs";
          cloneElt.getElementById("card__previous").textContent = "Last week - " + card.timeframes.weekly.previous + "hrs";
          break;
        case 'Monthly':
          cloneElt.getElementById("card__actual").textContent = card.timeframes.monthly.current + "Hrs";
          cloneElt.getElementById("card__previous").textContent = "Last month - " + card.timeframes.monthly.previous + "hrs";
          break;
      }
  
      document.getElementById("container").appendChild(cloneElt);
  }



  async function change(time){
    let active = document.getElementsByClassName('active');
    let cardsBefore = document.getElementsByClassName("card__before");
    const cards = await getCards(); //Récupération de tous les produits auprès de l'api
    active[0].classList.remove("active");
    time.classList.add("active")
    for(let i=0;i<cards.length;i++){
      switch(time.textContent){
        case 'Daily':
          cardsBefore[i].querySelector("#card__actual").textContent = cards[i].timeframes.daily.current + "Hrs";
          cardsBefore[i].querySelector("#card__previous").textContent = "Last day - " + cards[i].timeframes.daily.previous + "hrs";
          break;
        case 'Weekly':
          cardsBefore[i].querySelector("#card__actual").textContent = cards[i].timeframes.weekly.current + "Hrs";
          cardsBefore[i].querySelector("#card__previous").textContent = "Last week - " + cards[i].timeframes.weekly.previous + "hrs";
          break;
        case 'Monthly':
          cardsBefore[i].querySelector("#card__actual").textContent = cards[i].timeframes.monthly.current + "Hrs";
          cardsBefore[i].querySelector("#card__previous").textContent = "Last month - " + cards[i].timeframes.monthly.previous + "hrs";
          break;
      }
    }
    
  }