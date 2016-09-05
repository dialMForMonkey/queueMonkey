/*
	exemplo 2 :
	mostrando alteracao do fluxo da funcaoUno direto para funcaoTres

	Obs.: para usar as funcoes no f.go , as funcoes prescisao estar nomeadas
*/

var fila = require("queuemonkey");
	var contexto ={
		query:null
	};
	var f = new fila(contexto);
	//alteracao de fluxo
	f.go([funcaoUm, funcaoDois, funcaoTres]);

	function funcaoUm(next){
		//self igual ao this do new fila();
		var self = this;
		//setTimeout, para simular eventos assincronos
		setTimeout(function(){
			self.query={"funcaoUm":"OK"};
			console.log("function Um");
			console.log(self.query);
			//quando finalizar a funcao chame o next
			//alterado do proximo, sem passar pela funcaoDos
			next("funcaoTres");
		},400);

	}

	function funcaoDois(next){
		//self igual ao this do new fila();
		var self = this;
		//setTimeout, para simular eventos assincronos
		setTimeout(function(){
			self.query.funcaoDois="OK";
			console.log("function Dois");
			console.log(self.query);
			//quando finalizar a funcao chame o next
			next();
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
