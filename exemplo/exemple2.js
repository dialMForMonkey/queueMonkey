/*
	exemplo 2 :
	mostrando alteracao do fluxo da funcaoUno direto para funcTres
	
	Obs.: para usar as funcoes no f.go , as funcoes prescisao estar nomeadas
*/

var fila = require("queuemonkey");
	var contexto ={
		query:null
	};
	var f = new fila(contexto);
	//alteracao de fluxo
	f.go([funcUno, funcDos, funcTres]);
	
	function funcUno(next){
		//self igual ao this do new fila();
		var self = this;
		//setTimeout, para simular eventos assincronos
		setTimeout(function(){
			self.query={"funcUno":"OK"};
			console.log("function Uno");
			console.log(self.query);
			//quando finalizar a funcao chame o next
			//alterado do proximo, sem passar pela funcaoDos
			next("funcTres");
		},400);
		
	}
	
	function funcDos(next){
		//self igual ao this do new fila();
		var self = this;
		//setTimeout, para simular eventos assincronos
		setTimeout(function(){
			self.query.funcDos="OK";
			console.log("function Dos");
			console.log(self.query);
			//quando finalizar a funcao chame o next
			next();
		},400);
	}
	
	function funcTres(next){
		//self igual ao this do new fila();
		var self = this;
		//setTimeout, para simular eventos assincronos
		setTimeout(function(){
			self.query.funcTres="OK";
			console.log("function Tres");
			console.log(self.query);
			//quando finalizar a funcao chame o next
			next();
		},400);
	}
	
	