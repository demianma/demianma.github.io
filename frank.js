function fillFrank() {
	
	//sufixo 1, 2 e 3 p/ os quadrinhos 1, 2 e 3.
	//eu crio elementos canvas mas nao lanco no html.
	//eles sao convertidos em png e esses vao pro html
	//pois canvas tem muitas restricoes, como nao poder
	//alterar tamanho depois de gerado e dificuldade de 
	//salvar imagem em telefones onde tb nao sao responsivos.
	
	var canvas1 = document.createElement("canvas");
	var canvas2 = document.createElement("canvas");
	
	canvas1.width = 1080;
	canvas1.height = 1080;
	canvas2.width = 1080;
	canvas2.height = 1080;
	
	var context1 = canvas1.getContext("2d");
	var context2 = canvas2.getContext("2d");
	
	var font = "30pt Comic Sans MS";
	
	var txtLines1 = document.getElementById("txtQuadro1").value;
	var txtLines2 = document.getElementById("txtQuadro2").value;
	
	//preenche quadrinho 1
	var imageObj1 = new Image();
	
	imageObj1.onload = function() {
		let lineheight = 50;
		
		//centro do balao
		let x = 445;
		let y = 235;
		
		//quebra linhas do texto
		let textWrapped1 = getLines(context1, txtLines1, 670, font);
		
		//reajusta y de acordo com nro de linhas
		if (textWrapped1.length > 1)
			y = y - (textWrapped1.length * lineheight/4);
		
		context1.drawImage(imageObj1, 0, 0);
		context1.font = font;
		context1.textAlign = "center";
		
		//preenche cada linha de texto no array textWrapped
		for (let i = 0; i<textWrapped1.length; i++)
		    context1.fillText(textWrapped1[i], x, y + (i*lineheight));
		
		//lanca canvas no png
		let imageURL = canvas1.toDataURL();
		let img = document.getElementById('frank1');
		img.src = imageURL;
		
		//lanca atributo download no botao
		let btnFrank1 = document.getElementById("btnFrank1");
		btnFrank1.setAttribute('href', imageURL);
	}
	
	imageObj1.src = "frank1.png";
	
	
	
	//preenche quadrinho 2
	var imageObj2 = new Image();
	
	imageObj2.onload = function() {
		let lineheight = 50;
		
		//centro do balao
		let x = 430;
		let y = 215;
		
		//quebra linhas do texto
		let textWrapped2 = getLines(context2, txtLines2, 670, font);
		
		//reajusta y de acordo com nro de linhas
		if (textWrapped2.length > 1)
			y = y - (textWrapped2.length * lineheight/4);
	
		context2.drawImage(imageObj2, 0, 0);
		context2.font = font;
		context2.textAlign = "center";
	
		//preenche cada linha de texto no array textWrapped
		for (let i = 0; i<textWrapped2.length; i++)
		    context2.fillText(textWrapped2[i], x, y + (i*lineheight));
		
		//lanca canvas no png
		let imageURL = canvas2.toDataURL();
		let img = document.getElementById('frank2');
		img.src = imageURL;
		
		//lanca atributo download no botao
		let btnFrank2 = document.getElementById("btnFrank2");
		btnFrank2.setAttribute('href', imageURL);

		
	}
	imageObj2.src = "frank2.png";
    
	
	//junta tudo
	weldImages();
	
	//faz leganda
	let legenda = document.getElementById("txtLegenda");
	let txtLegenda = document.getElementById("txtLegenda").value;
	
	legenda.value = "";
	legenda.value = geraLegenda(txtLegenda, txtLines1, txtLines2);
	
}


//emenda os campos e gera uma legenda
function geraLegenda(txtLegenda, txtLines1, txtLines2){
	let hashtags = ["#quadrinhos #tirinhasinteligentes #humorbrasil", 
					"#tirinhasengraçadas #quadrinhosgram #sincerona",
					"#humorinteligente, #tirinhasengraçadas #baleiafranca",
					"#humorbrasil #ficaemcasa #tirinha"
					];
	let legenda = [txtLegenda];
	
	legenda.push(txtLines1);
	legenda.push("\n\n");
	legenda.push(txtLines2);
	legenda.push("\n\n");
	legenda.push("Siga Frank –> @frankabaleiafranca");
	legenda.push("\n\n");
	legenda.push("#frankabaleiafranca #falomesmo #humoracido #tirinhas");
	legenda.push(hashtags[Math.floor(Math.random() * hashtags.length)]);
	
	return legenda.join("");
}


function copyToClipboard(textArea){
	  var copyText = document.getElementById(textArea);

	  copyText.select();
	  copyText.setSelectionRange(0, 99999); // For mobile devices
	  document.execCommand("copy");
	  //alert("Copiada legenda: " + copyText.value);
}


//emendar imagens tirinha completa
function weldImages(){
	var quadro1 = document.getElementById("frank1");
	var quadro2 = document.getElementById("frank2");
	var quadro3 = document.getElementById("frank3");
	
	var canvas4 = document.createElement("canvas");
	
	canvas4.width = 1080;
	canvas4.height = 1080;
	
	var context4 = canvas4.getContext('2d');
	
	context4.fillStyle = "#FFFFFF";
	context4.fillRect(0, 0, canvas4.width, canvas4.height);
	context4.drawImage(quadro1, 0, 0, 1080/2, 1080/2);
	context4.drawImage(quadro2, 1080/2, 0, 1080/2, 1080/2);
	context4.drawImage(quadro3, 1080/2-1080/4, 1080/2, 1080/2, 1080/2);
	
	//lanca canvas no png
	let imageURL = canvas4.toDataURL();
	let img = document.getElementById('frank4');
	img.src = imageURL;
	
	//lanca atributo download no botao
	let btnFrank4 = document.getElementById("btnFrank4");
	btnFrank4.setAttribute('href', imageURL);
	
}


//lanca os canvas nos png
function putImage(source) {
	Pagelink = "about:blank";
	var pwa = window.open(Pagelink, "_new");
	var img = document.getElementById(source);
	
	//pwa.document.open();
	//pwa.document.write(ImagetoPrint(img));
	//pwa.document.close();
}



//mede o texto e divide em array com frases
function getLines(ctx,phrase,maxPxLength,textStyle) {
    var wa=phrase.split(" "),
        phraseArray=[],
        lastPhrase=wa[0],
        measure=0,
        splitChar=" ";
    if (wa.length <= 1) {
        return wa
    }
    ctx.font = textStyle;
    for (var i=1;i<wa.length;i++) {
        var w=wa[i];
        measure=ctx.measureText(lastPhrase+splitChar+w).width;
        if (measure<maxPxLength) {
            lastPhrase+=(splitChar+w);
        } else {
            phraseArray.push(lastPhrase);
            lastPhrase=w;
        }
        if (i===wa.length-1) {
            phraseArray.push(lastPhrase);
            break;
        }
    }
    return phraseArray;
}
