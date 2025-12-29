function generateMainHtml(i) {
    const extract = currentNames[i];
    return /*html*/ `
          <div onclick="renderDetailCard(${i})" class="card d-flex ${
      extract.types[0].type.name
    }">
              <div class="cardImg d-flex">
                <img src="${
                  extract.sprites.other.dream_world.front_default
                }" alt="">
              </div>
              <div class="cardType d-flex">
                <h3 class="type">  
                  ${extract.types[0].type.name}  
                </h3>
                <h3 class="type ${extract.types[1]?.type.name}">   
                  ${extract.types[1]?.type.name || ""}   
                </h3>
              </div>
              <div class="cardName d-flex">
                  <h3> 
                    #${extract.id} 
                  </h3>
                  <h3> 
                   ${extract.name} 
                  </h3>
              </div>
          </div>`;
  }
  
  function generateDetailHtml(i) {
    let extract = currentNames[i];
    let ability2 = ifVaild(extract.abilities);
  
    return /*html*/ `
    <div class="mCard ${extract.types[0].type.name}">
        <div class="d-flex mHead">
            <p>${extract.name}</p>
            <p>#${extract.id}</p>
        </div>
        <div class="mCardImg d-flex">
            <img src="${extract.sprites.other.dream_world.front_default}" alt="">
        </div>
        <div class="d-flex mHeight">
            <p>Größe: ${extract.height} m</p>
            <p>Gewicht: ${extract.weight} kg</p>
        </div>
        <div class="abilities">
            <p>${extract.abilities[0].ability.name}</p>
            <p>${ability2} </p>
        </div>
        <div class="stats">
            <div>
                <p>${extract.stats[0].stat.name}: ${extract.stats[0].base_stat}</p>
                <p>${extract.stats[1].stat.name}: ${extract.stats[1].base_stat}</p>
                <p>${extract.stats[2].stat.name}: ${extract.stats[2].base_stat}</p>
            </div>
            <div>
                <p>${extract.stats[3].stat.name}: ${extract.stats[3].base_stat}</p>
                <p>${extract.stats[4].stat.name}: ${extract.stats[4].base_stat}</p>
                <p>${extract.stats[5].stat.name}: ${extract.stats[5].base_stat}</p>
            </div>
        </div>
        <div class="d-flex leftRightDiv">
          <img onclick="previousNext(${i}-1)" class="leftRight" src="./img/left.png" alt="Left">
          <img onclick="previousNext(${i}+1)" class="leftRight " src="./img/right.png" alt="Right">
        </div>
        <div onclick="closeMainCard()" class="closeMainCard"></div>
    </div>
    `;
  }
  