/*
	exemplo 1 :
	mostrando o compartilhamento do contexto(this)
	da funcao fila, para as outras funcoes do f.go

	Obs.: para usar as funcoes no f.go , as funcoes prescisao estar nomeadas
*/

var fila = require("queuemonkey");
	var contexto ={
		query:null
	};
	var f = new fila(contexto);
	f.go([funcaoUm, funcaoDois, funcaoTres]);

	function funcaoUm(next){
		//self igual ao this do new fila();
		var self = this;
		//setTimeout, para simular eventos assincronos
		setTimeout(function(){
			self.query={"funcaoUm":"OK"};
			//quando finalizar a funcao chame o next
			next();
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
