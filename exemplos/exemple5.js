/*
	exemplo 5 :
	mostrando como usar fluxo com a ideia de evitar scrool para ver todo o fluxo do programa
	Obs.: para usar as funcoes no f.go , as funcoes prescisao estar nomeadas
*/

var fila = require("queuemonkey");
	//contexto de acordo com a sua necessidade
	var contexto ={
		query:null
	};
	var f = new fila(contexto);
	//demonstracao da chave fluxo
	//funcionalidade: visao geral do fluxo do codigo sem a necessidade de scroll
	f.go([funcaoUm, { fluxo:funcaoDois,
					x:funcaoFluxoUm,y:funcaoFluxoDois}, funcaoFluxoUm, funcaoFluxoDois ,funcaoTres]);


	function funcaoFluxoUm(next){

		this.query.funcaoFluxoUm ="OK";
		next("funcaoTres");

	}
	function funcaoFluxoDois(next){
		this.query.funcaoFluxoDois ="OK";
		next("funcaoTres");
	}


	function funcaoUm(next){
		//self igual ao this do new fila();
		var self = this;
		//setTimeout, para simular eventos assincronos
		self.query={};
		setTimeout(function(){
			self.query.funcaoUm="OK";
			console.log("function Uno");
			console.log(self.query);
			//quando finalizar a funcao chame o next
			//alterado do proximo, sem passar pela funcaoDos
			next();
		},400);

	}

	function funcaoDois(next){
		//self igual ao this do new fila();
		var self = this;
		//setTimeout, para simular eventos assincronos
		setTimeout(function(){
			self.query.funcaoDois = "OK";
			console.log("function Dos");
			console.log(self.query);

			if(getRandomInt(0, 3) >= 2)
				next("x");
			else{
				next("y");
			}
		},400);
	}

	function funcaoTres(next){
		//self igual ao this do new fila();
		var self = this;
		//setTimeout, para simular eventos assincronos
		setTimeout(function(){
			self.query.funcaoTres="OK";
			console.log("function Tres");
			console.log(self.query);
			//quando finalizar a funcao chame o next
			next();
		},400);
	}


//funcao para ilustrar o fluxo
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
